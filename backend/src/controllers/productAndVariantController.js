import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import ColorVariant from "../models/colorVariantModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import SizeInventory from "../models/sizeInventoryModel.js";
import Voucher from "../models/voucherModel.js";

import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
// ngoc
// ==============================================================================
// 🛠️ HELPER: XÓA FILE
// ==============================================================================
const deleteFile = (filePath) => {
    // Kiểm tra an toàn: Phải có dữ liệu, là chuỗi và bắt buộc nằm trong '/uploads/' để tránh xóa nhầm file hệ thống
    if (!filePath || typeof filePath !== 'string' || !filePath.startsWith('/uploads/')) return;
    // Xử lý đường dẫn: Cắt dấu '/' đầu tiên và chuyển thành đường dẫn tuyệt đối trên ổ cứng server
    const fullPath = path.resolve(filePath.substring(1)); 
    // Thực hiện lệnh xóa file (bất đồng bộ) và log lỗi ra console nếu xóa thất bại
    fs.unlink(fullPath, (err) => {
        if (err) console.error(`Lỗi xóa file: ${fullPath}`, err);
    });
};

// Helper xử lý dữ liệu trả về
const processProductResponse = async (productDoc) => {
    // Chuyển đổi từ Mongoose Document sang Object thuần để có thể sửa đổi dữ liệu
    const product = productDoc.toObject ? productDoc.toObject() : productDoc; 
    const now = new Date();
    // Làm tròn rating 1 chữ số thập phân và xử lý giá trị null
    product.averageRating = Math.round((product.averageRating || 0) * 10) / 10;
    product.reviewCount = product.reviewCount || 0;
    // Khởi tạo giá trị mặc định cho việc tính toán giảm giá
    product.discountValue = 0;
    product.appliedVoucher = null;
    let maxDiscount = 0;
    let bestVoucher = null;
    // Lấy danh sách Voucher đang hoạt động và còn hạn (trừ loại freeship)
    const vouchers = await Voucher.find({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
        discountType: { $ne: 'freeship' } 
    });
    // Vòng lặp tìm Voucher giảm giá tốt nhất (giảm nhiều tiền nhất)
    for (const voucher of vouchers) {
        // Bỏ qua nếu đơn hàng chưa đủ giá trị tối thiểu
        if (voucher.minOrderValue && product.basePrice < voucher.minOrderValue) continue;
        let discount = 0;
        if (voucher.discountType === "percentage") {
            // Tính giảm theo % và áp trần giảm tối đa (nếu có)
            discount = (product.basePrice * voucher.discountValue) / 100;
            if (voucher.maxDiscountAmount && discount > voucher.maxDiscountAmount) {
                discount = voucher.maxDiscountAmount;
            }
        } else if (voucher.discountType === "fixed") {
            // Tính giảm theo số tiền cố định
            discount = voucher.discountValue;
        }
        // So sánh và lưu lại voucher tốt nhất tìm được tính đến hiện tại
        if (discount > maxDiscount) {
            maxDiscount = discount;
            bestVoucher = voucher;
        }
    }
    // Áp dụng voucher tốt nhất vào giá sản phẩm gốc
    if (bestVoucher) {
        product.appliedVoucher = bestVoucher.code;
        product.discountValue = maxDiscount;
        product.finalPrice = Math.max(product.basePrice - maxDiscount, 0); // Đảm bảo không âm
    } else {
        product.finalPrice = product.basePrice; 
    }
    // Tính TỶ LỆ giảm giá (VD: 100k giảm 20k -> 0.2) để áp dụng đồng bộ cho các Size
    const discountRatio = product.basePrice > 0 ? maxDiscount / product.basePrice : 0;
    // Cập nhật giá sau giảm (finalPrice) cho từng Size con
    if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
            if (variant.sizes && variant.sizes.length > 0) {
                for (const size of variant.sizes) {
                    const sizePrice = size.price;
                    // Size giảm theo cùng tỷ lệ % với sản phẩm gốc
                    const sizeDiscount = sizePrice * discountRatio;
                    size.finalPrice = Math.max(sizePrice - sizeDiscount, 0);
                }
            }
        }
    }

    return product;
};


// ==============================================================================
// 🎮 PRODUCT CONTROLLERS
// ==============================================================================

// 1. TẠO SẢN PHẨM MỚI
// Logic: Tạo Cha (Product) -> Tạo Con (Variant) -> Tạo Cháu (Size) -> Cập nhật ngược lại ID
export const createProduct = async (req, res, next) => {
    let uploadedFilePath = null; // Biến tạm để lưu đường dẫn file mới (dùng để xóa nếu code lỗi)
    try {
        // Tách dữ liệu: variants xử lý riêng, productData là các field cơ bản (tên, giá...)
        const { variants, ...productData } = req.validated.body; 
        
        // Xử lý ảnh đại diện: Nếu có file upload thì lấy đường dẫn, không thì rỗng
        let featuredImagePath = req.file ? `/uploads/${req.file.filename}` : ""; 
        if (req.file) { uploadedFilePath = featuredImagePath; } 
        
        // BƯỚC 1: Tạo Product (Cha) trước để lấy _id
        let newProduct = new Product({
            ...productData, 
            featuredImage: featuredImagePath, 
            variants: [], // Mảng ID biến thể tạm thời để trống
        });
        await newProduct.save();

        // BƯỚC 2: Xử lý các biến thể (Nếu có)
        if (Array.isArray(variants) && variants.length > 0) {
            for (const colorVariantData of variants) {
                const { sizes, ...colorVariantFields } = colorVariantData;
                
                // Tạo ColorVariant (Con) - Liên kết với Product (Cha)
                const newColorVariant = await ColorVariant.create({
                    ...colorVariantFields, 
                    product: newProduct._id,
                });
                
                // Tạo SizeInventory (Cháu) - Dùng Promise.all để tạo song song cho nhanh
                const createdSizes = await Promise.all(
                    sizes.map(sizeData => SizeInventory.create({ ...sizeData, variant: newColorVariant._id }))
                );

                // Cập nhật ngược: Con lưu danh sách ID Cháu
                newColorVariant.sizes.push(...createdSizes.map(s => s._id));
                await newColorVariant.save();

                // Cập nhật ngược: Cha lưu ID Con
                newProduct.variants.push(newColorVariant._id);
            }
            // Lưu lại Product sau khi đã cập nhật đủ variants
            await newProduct.save();
        }

        // BƯỚC 3: Lấy lại dữ liệu đầy đủ (Populate) để trả về client hiển thị ngay
        const resultProduct = await Product.findById(newProduct._id)
            .populate({ path: 'variants', populate: { path: 'sizes' } }) // Lấy lồng nhau 3 cấp
            .populate("brand", "name")
            .populate("category", "name");
        
        // Tính toán giá khuyến mãi, voucher (nếu có)
        const result = await processProductResponse(resultProduct);

        res.status(201).json({
            message: "Tạo sản phẩm thành công",
            product: result,
        });
    } catch (error) {
        // ROLLBACK: Nếu lỗi database, xóa file ảnh vừa upload để tránh rác server
        if (uploadedFilePath) deleteFile(uploadedFilePath); 
        next(error);
    }
};

// 2. LẤY DANH SÁCH SẢN PHẨM (FILTER, SORT, SEARCH, PAGINATION)
export const getAllProducts = async (req, res, next) => {
    try {
        // 1. Lấy tham số từ URL Query (VD: ?category=ao-thun&sort=price_asc)
        const { category, brand, minPrice, maxPrice, sort, search } = req.query;

        // 2. Xây dựng bộ lọc (Filter Object)
        let filter = { isActive: true }; // Mặc định chỉ lấy sản phẩm đang hoạt động

        // Lọc theo Danh mục
        if (category && category !== 'all') {
            filter.category = category;
        }

        // Lọc theo Thương hiệu (Hỗ trợ lọc nhiều thương hiệu: ?brand=id1,id2)
        if (brand && brand !== 'all') {
            const brandIds = brand.split(',');
            if (brandIds.length > 1) {
                filter.brand = { $in: brandIds }; // Tìm sản phẩm thuộc 1 trong các brand này
            } else {
                filter.brand = brand;
            }
        }

        // Lọc theo Khoảng giá (Final Price)
        if (minPrice || maxPrice) {
            filter.finalPrice = {};
            if (minPrice) filter.finalPrice.$gte = Number(minPrice); // Lớn hơn hoặc bằng
            if (maxPrice) filter.finalPrice.$lte = Number(maxPrice); // Nhỏ hơn hoặc bằng
        }

        // Tìm kiếm theo tên (Tìm gần đúng - Regex, 'i' là không phân biệt hoa thường)
        if (search) {
             filter.name = { $regex: search, $options: 'i' }; 
        }

        // 3. Khởi tạo Query Mongoose
        let query = Product.find(filter) 
            .populate("brand", "name")
            .populate("category", "name")
            .populate({
                path: 'variants', 
                populate: { path: 'sizes' }
            }); 
        
        // 4. Xử lý Sắp xếp (Sorting)
        if (sort) {
            switch (sort) {
                case 'price_asc': query = query.sort({ finalPrice: 1 }); break; // Giá tăng dần
                case 'price_desc': query = query.sort({ finalPrice: -1 }); break; // Giá giảm dần
                case 'best_selling': query = query.sort({ sold: -1 }); break; // Bán chạy nhất
                case 'newest':
                default: query = query.sort({ createdAt: -1 }); break; // Mới nhất (Mặc định)
            }
        } else {
            query = query.sort({ createdAt: -1 }); 
        }

        // 5. Thực thi Query
        const products = await query.exec();
        
        // 6. Tính toán giá sau giảm/voucher cho từng sản phẩm
        const processedProducts = await Promise.all(
            products.map((p) => processProductResponse(p))
        );

        res.status(200).json(processedProducts);
    } catch (error) {
        next(error);
    }
};

// 3. LẤY CHI TIẾT 1 SẢN PHẨM
export const getProductById = async (req, res, next) => {
    try {
        const identifier = req.params.id || req.params.slug; 
        
        // Kiểm tra xem input là ID (mongoID) hay Slug (chuỗi đường dẫn)
        const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
        const query = isObjectId ? { _id: identifier } : { slug: identifier };
        
        const product = await Product.findOne(query)
            .populate("brand", "name")
            .populate("category", "name")
            .populate({ path: 'variants', populate: { path: 'sizes' } }); // Lấy full thông tin biến thể
        
        if (!product) {
            const error = new Error("Không tìm thấy sản phẩm");
            error.statusCode = 404;
            throw error;
        }
        // Trả về sản phẩm đã tính toán giá
        res.status(200).json(await processProductResponse(product));
    } catch (error) { next(error); }
};

// 4. CẬP NHẬT SẢN PHẨM
export const updateProduct = async (req, res, next) => {
    let uploadedFilePath = null; // Đường dẫn file mới upload (để xóa nếu lỗi)
    try {
        const updates = req.validated.body; 
        
        // Tìm sản phẩm cũ để lấy đường dẫn ảnh cũ
        const oldProduct = await Product.findById(req.params.id);
        if (!oldProduct) { throw new Error("Không tìm thấy sản phẩm"); }
        
        const oldImagePath = oldProduct.featuredImage;
        let shouldDeleteOldImage = false; // Cờ đánh dấu có cần xóa ảnh cũ không

        // Case 1: Người dùng upload ảnh mới
        if (req.file) {
            updates.featuredImage = `/uploads/${req.file.filename}`;
            uploadedFilePath = updates.featuredImage;
            shouldDeleteOldImage = true; // Sẽ xóa ảnh cũ nếu update thành công
        } 
        // Case 2: Người dùng muốn xóa ảnh hiện tại mà không up ảnh mới
        else if (updates.featuredImage === 'null') { 
            updates.featuredImage = ''; 
            shouldDeleteOldImage = true;
        }

        // Thực hiện update (new: true để trả về data mới nhất)
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
            .populate("brand", "name")
            .populate("category", "name")
            .populate({ path: 'variants', populate: { path: 'sizes' }}); 

        if (!updatedProduct) { throw new Error("Cập nhật sản phẩm thất bại."); }

        // DỌN DẸP: Nếu update thành công và có cờ xóa ảnh cũ -> Xóa file cũ khỏi đĩa
        if (shouldDeleteOldImage && oldImagePath) deleteFile(oldImagePath);

        res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            product: await processProductResponse(updatedProduct),
        });
    } catch (error) {
        // ROLLBACK: Nếu lỗi, xóa file MỚI vừa upload (file cũ giữ nguyên)
        if (uploadedFilePath) deleteFile(uploadedFilePath);
        next(error);
    }
};

// 5. XÓA SẢN PHẨM (XÓA CASCADING - XÓA LAN TRUYỀN)
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) { throw new Error("Không tìm thấy sản phẩm"); }
        
        // 1. Xóa file ảnh trên ổ cứng
        if (product.featuredImage) deleteFile(product.featuredImage); 
        
        const colorVariantIds = product.variants; 
        
        // 2. Xóa tất cả SizeInventory (Cháu) thuộc các biến thể của sản phẩm này
        await SizeInventory.deleteMany({ variant: { $in: colorVariantIds } }); 
        
        // 3. Xóa tất cả ColorVariant (Con) của sản phẩm
        await ColorVariant.deleteMany({ product: product._id }); 
        
        // 4. Cuối cùng xóa Product (Cha)
        await product.deleteOne();

        res.status(200).json({ message: "Đã xóa sản phẩm và tất cả biến thể liên quan" });
    } catch (error) { next(error); }
};

// 6. THỐNG KÊ DASHBOARD (Dùng Promise.all để tối ưu tốc độ)
export const getHomepageStats = async (req, res, next) => {
    try {
        // Chạy song song 4 truy vấn để tiết kiệm thời gian chờ
        const [totalProducts, totalCategories, totalBrands, totalSoldResult] = await Promise.all([
            Product.countDocuments({ isActive: true }), // Đếm SP đang bán
            Category.countDocuments({}),                // Đếm Danh mục
            Brand.countDocuments({}),                   // Đếm Thương hiệu
            // Tính tổng số lượng đã bán (dựa trên đơn hàng thành công)
            Order.aggregate([
                { $match: { status: "Delivered" } }, 
                { $group: { _id: null, totalSold: { $sum: { $sum: "$orderItems.quantity" } } }}
            ])
        ]);
        
        res.status(200).json({
            totalProducts: totalProducts || 0,
            totalCategories: totalCategories || 0,
            totalBrands: totalBrands || 0,
            totalSold: totalSoldResult[0]?.totalSold || 0 // Lấy kết quả từ mảng aggregate
        });
    } catch (error) { next(error); }
};

// ==============================================================================
// 🎮 COLOR VARIANT CONTROLLERS
// ==============================================================================

// 7. THÊM BIẾN THỂ MÀU VÀ SIZE MỚI VÀO SẢN PHẨM ĐANG CÓ
// Logic: Tìm Product -> Tạo Variant mới -> Tạo Size cho Variant -> Link ngược lại Product
export const addColorVariantToProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { variants } = req.validated.body; // Mảng các biến thể muốn thêm

        // 1. Kiểm tra sản phẩm cha có tồn tại không
        const product = await Product.findById(productId);
        if (!product) { throw new Error("Không tìm thấy sản phẩm"); }

        const createdColorVariants = [];

        // 2. Duyệt qua từng biến thể trong mảng input (Hỗ trợ thêm nhiều màu cùng lúc)
        for (const colorVariantData of variants) {
            const { sizes, ...colorVariantFields } = colorVariantData;

            // 2.1 Tạo Variant (Con)
            const newColorVariant = await ColorVariant.create({
                ...colorVariantFields, 
                product: productId, // Link về Cha
            });
            
            // 2.2 Tạo danh sách Size (Cháu) - Chạy song song
            const createdSizes = await Promise.all(
                sizes.map(sizeData => SizeInventory.create({ ...sizeData, variant: newColorVariant._id }))
            );

            // 2.3 Cập nhật Variant: Lưu danh sách ID các Size vừa tạo
            newColorVariant.sizes.push(...createdSizes.map(s => s._id));
            await newColorVariant.save();
            
            // 2.4 Cập nhật Product: Lưu ID Variant vừa tạo vào mảng variants của Product
            createdColorVariants.push(newColorVariant);
            product.variants.push(newColorVariant._id);
        }
        
        // 3. Lưu Product lần cuối (quan trọng để cập nhật mảng variants)
        await product.save();
        
        res.status(201).json({ message: "Đã thêm biến thể màu và kích cỡ thành công", createdColorVariants });
    } catch (error) { 
        // Xử lý lỗi trùng lặp (VD: Thêm màu Đen trong khi đã có màu Đen rồi)
        if (error.code === 11000) {
            const customError = new Error("Màu sắc này đã tồn tại cho sản phẩm.");
            customError.statusCode = 400;
            return next(customError);
        }
        next(error); 
    }
};

// 8. CẬP NHẬT BIẾN THỂ MÀU (Tên màu, Ảnh, Giá...)
export const updateColorVariant = async (req, res, next) => {
    let uploadedFilePath = null; // Biến tạm để lưu đường dẫn ảnh mới (phòng khi lỗi thì xóa)
    try {
        const variantId = req.params.id;
        const colorVariant = await ColorVariant.findById(variantId);
        if (!colorVariant) { throw new Error("Không tìm thấy biến thể màu."); }
        
        const updates = req.validated.body; 
        
        // Lấy đường dẫn ảnh cũ để chuẩn bị xóa (nếu user up ảnh mới)
        const oldImageUrl = colorVariant.image?.url;
        let shouldDeleteOldImage = false;
        
        // Case 1: Có upload ảnh mới
        if (req.file) {
            updates.image = { url: `/uploads/${req.file.filename}`, public_id: null };
            uploadedFilePath = updates.image.url;
            shouldDeleteOldImage = true; // Đánh dấu cần xóa ảnh cũ
        } 
        // Case 2: User muốn gỡ bỏ ảnh hiện tại (về rỗng)
        else if (updates.image === 'null') { 
            updates.image = { url: "", public_id: null };
            shouldDeleteOldImage = true;
        }
        
        // Thực hiện Update trong DB
        const updatedColorVariant = await ColorVariant.findByIdAndUpdate(variantId, updates, { new: true, runValidators: true });
        
        // Dọn dẹp: Xóa file ảnh cũ khỏi ổ cứng nếu update thành công
        if (shouldDeleteOldImage && oldImageUrl) deleteFile(oldImageUrl); 

        res.status(200).json({ message: "Cập nhật biến thể màu thành công", variant: updatedColorVariant });
    } catch (error) {
        // Rollback: Xóa file ảnh MỚI vừa upload nếu quá trình update DB bị lỗi
        if (uploadedFilePath) deleteFile(uploadedFilePath);
        
        if (error.code === 11000) {
            const customError = new Error("Màu sắc này đã tồn tại cho sản phẩm.");
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

// 9. XÓA BIẾN THỂ MÀU (Cascading Delete)
// Logic: Xóa Size (Cháu) -> Xóa Variant (Con) -> Xóa ID trong Product (Cha) -> Xóa File ảnh
export const deleteColorVariant = async (req, res, next) => {
    try {
        const variantId = req.params.id;
        const colorVariant = await ColorVariant.findById(variantId);

        if (!colorVariant) { throw new Error("Không tìm thấy biến thể màu."); }

        // Lưu lại các thông tin cần thiết trước khi xóa
        const productId = colorVariant.product;
        const imageToDelete = colorVariant.image?.url;
        const sizeIds = colorVariant.sizes;

        // 1. Xóa tất cả SizeInventory (Cháu) thuộc về Variant này
        await SizeInventory.deleteMany({ _id: { $in: sizeIds } });
        
        // 2. Xóa chính Variant (Con) này
        await colorVariant.deleteOne();
        
        // 3. Cập nhật Product (Cha): Rút (pull) ID của variant này ra khỏi mảng `variants`
        await Product.findByIdAndUpdate(productId, {
            $pull: { variants: variantId }
        });
        
        // 4. Dọn dẹp file ảnh trên server
        if (imageToDelete) deleteFile(imageToDelete); 

        res.status(200).json({ message: "Đã xóa biến thể màu và các kích cỡ liên quan." });
    } catch (error) {
        next(error);
    }
};

// 10. LẤY TẤT CẢ BIẾN THỂ (Thường dùng cho Admin để debug/quản lý chung)
export const getAllColorVariants = async (req, res, next) => {
    try {
        const variants = await ColorVariant.find()
            .populate('product', 'name') // Lấy tên sản phẩm cha
            .populate('sizes')           // Lấy danh sách size con
            .sort({ createdAt: -1 });
        res.status(200).json(variants);
    } catch (error) { next(error); }
};

// 11. LẤY DANH SÁCH BIẾN THỂ CỦA 1 SẢN PHẨM CỤ THỂ
export const getColorVariantsByProduct = async (req, res, next) => {
    try {
        // Tìm tất cả variant có field `product` trùng với ID gửi lên
        const variants = await ColorVariant.find({ product: req.params.productId }).populate('sizes'); 
        res.status(200).json(variants);
    } catch (error) { next(error); }
};

// 12. LẤY CHI TIẾT 1 BIẾN THỂ THEO ID
export const getColorVariantById = async (req, res, next) => {
    try {
        const variant = await ColorVariant.findById(req.params.id)
            .populate('product', 'name')
            .populate('sizes');
        if (!variant) {
            const error = new Error("Không tìm thấy biến thể.");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(variant);
    } catch (error) { next(error); }
};

// ==============================================================================
// 🎮 SIZE INVENTORY CONTROLLERS
// ==============================================================================

// 13. TẠO KÍCH CỠ MỚI CHO BIẾN THỂ
// Logic: Tìm Variant Cha -> Tạo Size Con -> Push ID Size vào mảng sizes của Cha
export const createSizeInventory = async (req, res, next) => {
    try {
        // Tách ID của Variant (Cha) và dữ liệu của Size (kích cỡ, số lượng, giá...)
        const { variant, ...data } = req.validated.body; 
        
        // 1. Kiểm tra Variant cha có tồn tại không
        const colorVariant = await ColorVariant.findById(variant);
        if (!colorVariant) throw new Error("Không tìm thấy biến thể màu cha.");

        // 2. Tạo SizeInventory mới
        const newSize = await SizeInventory.create({ ...data, variant });
        
        // 3. Cập nhật ngược lại Variant cha: Thêm ID của Size vừa tạo vào danh sách quản lý
        colorVariant.sizes.push(newSize._id);
        await colorVariant.save();

        res.status(201).json({ message: "Thêm kích cỡ thành công", sizeInventory: newSize });
    } catch (error) {
        // Xử lý lỗi trùng lặp (VD: Variant này đã có size 'M' rồi mà còn tạo thêm size 'M' nữa)
        // Lỗi này do Unique Compound Index trong Model (variant + size)
        if (error.code === 11000) {
            const customError = new Error(`Kích cỡ ${req.validated.body.size} đã tồn tại.`);
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

// 14. CẬP NHẬT THÔNG TIN SIZE (Giá, Số lượng tồn kho...)
export const updateSizeInventory = async (req, res, next) => {
    try {
        // Tìm và update, { new: true } để trả về data mới sau khi sửa
        const updatedSize = await SizeInventory.findByIdAndUpdate(req.params.id, req.validated.body, { new: true, runValidators: true });
        
        if (!updatedSize) throw new Error("Không tìm thấy Size Inventory");
        
        res.status(200).json({ message: "Cập nhật thành công", sizeInventory: updatedSize });
    } catch (error) {
        // Bắt lỗi nếu sửa tên Size thành một tên đã tồn tại trong cùng Variant
        if (error.code === 11000) {
            const customError = new Error("Kích cỡ này đã tồn tại.");
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

// 15. XÓA SIZE
// Logic: Tìm Size -> Lấy ID Cha -> Xóa Size -> Cập nhật Cha (Rút ID ra khỏi mảng)
export const deleteSizeInventory = async (req, res, next) => {
    try {
        // 1. Tìm size cần xóa
        const sizeInventory = await SizeInventory.findById(req.params.id);
        if (!sizeInventory) throw new Error("Không tìm thấy Size Inventory.");

        // Lấy ID của Variant cha để lát nữa cập nhật
        const variantId = sizeInventory.variant;
        
        // 2. Xóa Size khỏi Database
        await sizeInventory.deleteOne();
        
        // 3. Cập nhật Variant cha: Dùng $pull để rút ID của size đã xóa ra khỏi mảng `sizes`
        // Nếu không làm bước này, Variant sẽ chứa "ID ma" (dẫn đến lỗi khi populate)
        await ColorVariant.findByIdAndUpdate(variantId, {
            $pull: { sizes: req.params.id }
        });

        res.status(200).json({ message: "Đã xóa kích cỡ thành công." });
    } catch (error) { next(error); }
};

// 16. LẤY DANH SÁCH SIZE CỦA 1 VARIANT
// Dùng để hiển thị bảng size trong trang chi tiết Variant
export const getSizesByColorVariant = async (req, res, next) => {
    try {
        // Tìm tất cả Size có `variant` trùng với ID gửi lên, sắp xếp theo tên size (S, M, L...)
        const sizes = await SizeInventory.find({ variant: req.params.id }).sort({ size: 1 });
        res.status(200).json(sizes);
    } catch (error) { next(error); }
};

// 17. LẤY CHI TIẾT 1 SIZE
// Dùng khi bấm nút "Edit" từng size lẻ
export const getSizeInventoryById = async (req, res, next) => {
    try {
        const sizeInventory = await SizeInventory.findById(req.params.id);
        if (!sizeInventory) {
            const error = new Error("Không tìm thấy Size Inventory.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(sizeInventory);
    } catch (error) { next(error); }
};
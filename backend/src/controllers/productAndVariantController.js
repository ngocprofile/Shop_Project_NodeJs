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
    if (!filePath || typeof filePath !== 'string' || !filePath.startsWith('/uploads/')) return;
    const fullPath = path.resolve(filePath.substring(1)); 
    fs.unlink(fullPath, (err) => {
        if (err) console.error(`Lỗi xóa file: ${fullPath}`, err);
    });
};

// Helper xử lý dữ liệu trả về
const processProductResponse = async (productDoc) => {
    const product = productDoc.toObject ? productDoc.toObject() : productDoc; 
    const now = new Date();

    product.averageRating = Math.round((product.averageRating || 0) * 10) / 10;
    product.reviewCount = product.reviewCount || 0;

    product.discountValue = 0;
    product.appliedVoucher = null;
    let maxDiscount = 0;
    let bestVoucher = null;

    const vouchers = await Voucher.find({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
        discountType: { $ne: 'freeship' } 
    });

    for (const voucher of vouchers) {
        if (voucher.minOrderValue && product.basePrice < voucher.minOrderValue) continue;
        let discount = 0;
        if (voucher.discountType === "percentage") {
            discount = (product.basePrice * voucher.discountValue) / 100;
            if (voucher.maxDiscountAmount && discount > voucher.maxDiscountAmount) {
                discount = voucher.maxDiscountAmount;
            }
        } else if (voucher.discountType === "fixed") {
            discount = voucher.discountValue;
        }

        if (discount > maxDiscount) {
            maxDiscount = discount;
            bestVoucher = voucher;
        }
    }

    if (bestVoucher) {
        product.appliedVoucher = bestVoucher.code;
        product.discountValue = maxDiscount;
        product.finalPrice = Math.max(product.basePrice - maxDiscount, 0);
    } else {
        product.finalPrice = product.basePrice; 
    }
    
    const discountRatio = product.basePrice > 0 ? maxDiscount / product.basePrice : 0;

    if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
            if (variant.sizes && variant.sizes.length > 0) {
                for (const size of variant.sizes) {
                    const sizePrice = size.price;
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

// 1. TẠO SẢN PHẨM (Đã bỏ Transaction)
export const createProduct = async (req, res, next) => {
    let uploadedFilePath = null;
    try {
        const { variants, ...productData } = req.validated.body; 
        
        let featuredImagePath = req.file ? `/uploads/${req.file.filename}` : ""; 
        if (req.file) { uploadedFilePath = featuredImagePath; } 
        
        let newProduct = new Product({
            ...productData, 
            featuredImage: featuredImagePath, 
            variants: [], 
        });
        await newProduct.save();

        if (Array.isArray(variants) && variants.length > 0) {
            for (const colorVariantData of variants) {
                const { sizes, ...colorVariantFields } = colorVariantData;
                
                const newColorVariant = await ColorVariant.create({
                    ...colorVariantFields, 
                    product: newProduct._id,
                });
                
                const createdSizes = await Promise.all(
                    sizes.map(sizeData => SizeInventory.create({ ...sizeData, variant: newColorVariant._id }))
                );

                newColorVariant.sizes.push(...createdSizes.map(s => s._id));
                await newColorVariant.save();

                newProduct.variants.push(newColorVariant._id);
            }
            await newProduct.save();
        }

        const resultProduct = await Product.findById(newProduct._id)
            .populate({ path: 'variants', populate: { path: 'sizes' } })
            .populate("brand", "name")
            .populate("category", "name");
        
        const result = await processProductResponse(resultProduct);

        res.status(201).json({
            message: "Tạo sản phẩm thành công",
            product: result,
        });
    } catch (error) {
        if (uploadedFilePath) deleteFile(uploadedFilePath); 
        next(error);
    }
};

// 2. LẤY TẤT CẢ SẢN PHẨM (CÓ LỌC & SẮP XẾP)
export const getAllProducts = async (req, res, next) => {
    try {
        // 1. Lấy tham số từ Query String
        const { category, brand, minPrice, maxPrice, sort, search } = req.query;

        // 2. Khởi tạo bộ lọc cơ bản
        let filter = { isActive: true };

        // --- XỬ LÝ CÁC ĐIỀU KIỆN LỌC ---

        // Lọc theo Danh mục
        if (category && category !== 'all') {
            filter.category = category;
        }

        // Lọc theo Thương hiệu
        if (brand && brand !== 'all') {
            const brandIds = brand.split(',');
            if (brandIds.length > 1) {
                filter.brand = { $in: brandIds };
            } else {
                filter.brand = brand;
            }
        }

        // Lọc theo Giá (Final Price)
        if (minPrice || maxPrice) {
            filter.finalPrice = {};
            if (minPrice) filter.finalPrice.$gte = Number(minPrice);
            if (maxPrice) filter.finalPrice.$lte = Number(maxPrice);
        }

        // Tìm kiếm theo tên
        if (search) {
             filter.name = { $regex: search, $options: 'i' }; 
        }

        // 3. Khởi tạo Query
        let query = Product.find(filter) 
            .populate("brand", "name")
            .populate("category", "name")
            .populate({
                path: 'variants', 
                populate: { path: 'sizes' }
            }); 
        
        // 4. Xử lý Sắp xếp
        if (sort) {
            switch (sort) {
                case 'price_asc':
                    query = query.sort({ finalPrice: 1 });
                    break;
                case 'price_desc':
                    query = query.sort({ finalPrice: -1 }); 
                    break;
                case 'best_selling':
                    query = query.sort({ sold: -1 });
                    break;
                case 'newest':
                default:
                    query = query.sort({ createdAt: -1 }); 
                    break;
            }
        } else {
            query = query.sort({ createdAt: -1 }); 
        }

        // 5. Thực thi
        const products = await query.exec();
        
        // 6. Xử lý dữ liệu đầu ra
        const processedProducts = await Promise.all(
            products.map((p) => processProductResponse(p))
        );

        res.status(200).json(processedProducts);
    } catch (error) {
        next(error);
    }
};

// 3. LẤY CHI TIẾT SẢN PHẨM
export const getProductById = async (req, res, next) => {
    try {
        const identifier = req.params.id || req.params.slug; 
        const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
        const query = isObjectId ? { _id: identifier } : { slug: identifier };
        
        const product = await Product.findOne(query)
            .populate("brand", "name")
            .populate("category", "name")
            .populate({ path: 'variants', populate: { path: 'sizes' } });
        
        if (!product) {
            const error = new Error("Không tìm thấy sản phẩm");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(await processProductResponse(product));
    } catch (error) { next(error); }
};

// 4. CẬP NHẬT SẢN PHẨM
export const updateProduct = async (req, res, next) => {
    let uploadedFilePath = null;
    try {
        const updates = req.validated.body; 
        const oldProduct = await Product.findById(req.params.id);
        if (!oldProduct) { throw new Error("Không tìm thấy sản phẩm"); }
        
        const oldImagePath = oldProduct.featuredImage;
        let shouldDeleteOldImage = false;

        if (req.file) {
            updates.featuredImage = `/uploads/${req.file.filename}`;
            uploadedFilePath = updates.featuredImage;
            shouldDeleteOldImage = true;
        } else if (updates.featuredImage === 'null') { 
            updates.featuredImage = ''; 
            shouldDeleteOldImage = true;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
            .populate("brand", "name")
            .populate("category", "name")
            .populate({ path: 'variants', populate: { path: 'sizes' }}); 

        if (!updatedProduct) { throw new Error("Cập nhật sản phẩm thất bại."); }

        if (shouldDeleteOldImage && oldImagePath) deleteFile(oldImagePath);

        res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            product: await processProductResponse(updatedProduct),
        });
    } catch (error) {
        if (uploadedFilePath) deleteFile(uploadedFilePath);
        next(error);
    }
};

// 5. XÓA SẢN PHẨM (Đã bỏ Transaction)
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) { throw new Error("Không tìm thấy sản phẩm"); }
        
        if (product.featuredImage) deleteFile(product.featuredImage); 
        
        const colorVariantIds = product.variants; 
        
        await SizeInventory.deleteMany({ variant: { $in: colorVariantIds } }); 
        await ColorVariant.deleteMany({ product: product._id }); 
        await product.deleteOne();

        res.status(200).json({ message: "Đã xóa sản phẩm và tất cả biến thể liên quan" });
    } catch (error) { next(error); }
};

// 6. THỐNG KÊ TRANG CHỦ
export const getHomepageStats = async (req, res, next) => {
    try {
        const [totalProducts, totalCategories, totalBrands, totalSoldResult] = await Promise.all([
            Product.countDocuments({ isActive: true }),
            Category.countDocuments({}),
            Brand.countDocuments({}),
            Order.aggregate([{ $match: { status: "Delivered" } }, { $group: { _id: null, totalSold: { $sum: { $sum: "$orderItems.quantity" } } }}])
        ]);
        res.status(200).json({
            totalProducts: totalProducts || 0,
            totalCategories: totalCategories || 0,
            totalBrands: totalBrands || 0,
            totalSold: totalSoldResult[0]?.totalSold || 0
        });
    } catch (error) { next(error); }
};

// ==============================================================================
// 🎮 COLOR VARIANT CONTROLLERS
// ==============================================================================

// 7. THÊM BIẾN THỂ MÀU VÀ SIZE MỚI (Đã bỏ Transaction)
export const addColorVariantToProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { variants } = req.validated.body;

        const product = await Product.findById(productId);
        if (!product) { throw new Error("Không tìm thấy sản phẩm"); }

        const createdColorVariants = [];

        for (const colorVariantData of variants) {
            const { sizes, ...colorVariantFields } = colorVariantData;

            const newColorVariant = await ColorVariant.create({
                ...colorVariantFields, 
                product: productId,
            });
            
            const createdSizes = await Promise.all(
                sizes.map(sizeData => SizeInventory.create({ ...sizeData, variant: newColorVariant._id }))
            );

            newColorVariant.sizes.push(...createdSizes.map(s => s._id));
            await newColorVariant.save();
            
            createdColorVariants.push(newColorVariant);
            product.variants.push(newColorVariant._id);
        }
        
        await product.save();
        
        res.status(201).json({ message: "Đã thêm biến thể màu và kích cỡ thành công", createdColorVariants });
    } catch (error) { 
        if (error.code === 11000) {
            const customError = new Error("Màu sắc này đã tồn tại cho sản phẩm.");
            customError.statusCode = 400;
            return next(customError);
        }
        next(error); 
    }
};

// 8. CẬP NHẬT BIẾN THỂ MÀU
export const updateColorVariant = async (req, res, next) => {
    let uploadedFilePath = null;
    try {
        const variantId = req.params.id;
        const colorVariant = await ColorVariant.findById(variantId);
        if (!colorVariant) { throw new Error("Không tìm thấy biến thể màu."); }
        
        const updates = req.validated.body; 
        const oldImageUrl = colorVariant.image?.url;
        let shouldDeleteOldImage = false;
        
        if (req.file) {
            updates.image = { url: `/uploads/${req.file.filename}`, public_id: null };
            uploadedFilePath = updates.image.url;
            shouldDeleteOldImage = true;
        } else if (updates.image === 'null') { 
            updates.image = { url: "", public_id: null };
            shouldDeleteOldImage = true;
        }
        
        const updatedColorVariant = await ColorVariant.findByIdAndUpdate(variantId, updates, { new: true, runValidators: true });
        if (shouldDeleteOldImage && oldImageUrl) deleteFile(oldImageUrl); 

        res.status(200).json({ message: "Cập nhật biến thể màu thành công", variant: updatedColorVariant });
    } catch (error) {
        if (uploadedFilePath) deleteFile(uploadedFilePath);
        if (error.code === 11000) {
            const customError = new Error("Màu sắc này đã tồn tại cho sản phẩm.");
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

// 9. XÓA BIẾN THỂ MÀU (Đã bỏ Transaction)
export const deleteColorVariant = async (req, res, next) => {
    try {
        const variantId = req.params.id;
        const colorVariant = await ColorVariant.findById(variantId);

        if (!colorVariant) { throw new Error("Không tìm thấy biến thể màu."); }

        const productId = colorVariant.product;
        const imageToDelete = colorVariant.image?.url;
        const sizeIds = colorVariant.sizes;

        // Xóa tuần tự
        await SizeInventory.deleteMany({ _id: { $in: sizeIds } });
        await colorVariant.deleteOne();
        await Product.findByIdAndUpdate(productId, {
            $pull: { variants: variantId }
        });
        
        if (imageToDelete) deleteFile(imageToDelete); 

        res.status(200).json({ message: "Đã xóa biến thể màu và các kích cỡ liên quan." });
    } catch (error) {
        next(error);
    }
};

// 10. GET ALL VARIANTS
export const getAllColorVariants = async (req, res, next) => {
    try {
        const variants = await ColorVariant.find()
            .populate('product', 'name')
            .populate('sizes')
            .sort({ createdAt: -1 });
        res.status(200).json(variants);
    } catch (error) { next(error); }
};

// 11. GET VARIANTS BY PRODUCT
export const getColorVariantsByProduct = async (req, res, next) => {
    try {
        const variants = await ColorVariant.find({ product: req.params.productId }).populate('sizes'); 
        res.status(200).json(variants);
    } catch (error) { next(error); }
};

// 12. GET VARIANT BY ID
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

// 13. CREATE SIZE (Đã bỏ Transaction)
export const createSizeInventory = async (req, res, next) => {
    try {
        const { variant, ...data } = req.validated.body; 
        const colorVariant = await ColorVariant.findById(variant);
        if (!colorVariant) throw new Error("Không tìm thấy biến thể màu cha.");

        const newSize = await SizeInventory.create({ ...data, variant });
        
        colorVariant.sizes.push(newSize._id);
        await colorVariant.save();

        res.status(201).json({ message: "Thêm kích cỡ thành công", sizeInventory: newSize });
    } catch (error) {
        if (error.code === 11000) {
            const customError = new Error(`Kích cỡ ${req.validated.body.size} đã tồn tại.`);
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

// 14. UPDATE SIZE
export const updateSizeInventory = async (req, res, next) => {
    try {
        const updatedSize = await SizeInventory.findByIdAndUpdate(req.params.id, req.validated.body, { new: true, runValidators: true });
        if (!updatedSize) throw new Error("Không tìm thấy Size Inventory");
        res.status(200).json({ message: "Cập nhật thành công", sizeInventory: updatedSize });
    } catch (error) {
        if (error.code === 11000) {
            const customError = new Error("Kích cỡ này đã tồn tại.");
            customError.statusCode = 400;
            return next(customError);
        }
        next(error);
    }
};

// 15. DELETE SIZE (Đã bỏ Transaction)
export const deleteSizeInventory = async (req, res, next) => {
    try {
        const sizeInventory = await SizeInventory.findById(req.params.id);
        if (!sizeInventory) throw new Error("Không tìm thấy Size Inventory.");

        const variantId = sizeInventory.variant;
        await sizeInventory.deleteOne();
        
        await ColorVariant.findByIdAndUpdate(variantId, {
            $pull: { sizes: req.params.id }
        });

        res.status(200).json({ message: "Đã xóa kích cỡ thành công." });
    } catch (error) { next(error); }
};

// 16. GET SIZES BY VARIANT (LIST)
// ⚠️ Đã cập nhật: Dùng `id` thay vì `variantId` để khớp với schema validation (mongoIdParam)
export const getSizesByColorVariant = async (req, res, next) => {
    try {
        const sizes = await SizeInventory.find({ variant: req.params.id }).sort({ size: 1 });
        res.status(200).json(sizes);
    } catch (error) { next(error); }
};

// 17. 🎯 MỚI: GET SINGLE SIZE BY ID (Cho trang Edit Size)
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
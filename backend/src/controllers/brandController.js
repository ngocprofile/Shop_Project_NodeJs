import fs from 'fs'; // 1. IMPORT 'fs' (File System)
import path from 'path'; // 2. IMPORT 'path'
import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";
// ngoc
// --- 3. (Helper) Xóa file an toàn (Giống Category) ---
const deleteFile = (filePath) => {
    // filePath từ DB có dạng /uploads/image.png
    if (!filePath || !filePath.startsWith('/uploads/')) return;
    
    // Chuyển thành 'uploads/image.png'
    const fullPath = path.resolve(filePath.substring(1));
    
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error(`Lỗi khi xóa file cũ: ${fullPath}`, err);
        } else {
            console.log(`Đã xóa file cũ: ${fullPath}`);
        }
    });
};

// ==============================================================================
// 🆕 HÀM MỚI: LỌC THƯƠNG HIỆU CÓ SẢN PHẨM (Sửa lỗi Frontend)
// ==============================================================================

/**
 * 🏷️ Lấy danh sách Thương hiệu chỉ có sản phẩm trong Danh mục/Website
 * @route GET /api/brands?categoryId=...
 * @access Public
 */
export const getBrandsWithProducts = async (req, res, next) => {
    try {
        const { categoryId } = req.query; // Nhận categoryId từ ProductList

        let matchConditions = { isActive: true }; // Điều kiện chung: Brand đang hoạt động

        if (categoryId) {
            // Nếu có categoryId, tìm các Product thuộc category đó
            const brandIds = await Product.distinct('brand', { category: categoryId });

            // Thêm điều kiện: Brand ID phải nằm trong danh sách Brand ID đã tìm thấy từ Product
            matchConditions._id = { $in: brandIds };
        } 
        
        // Truy vấn Brand dựa trên điều kiện lọc
        const brands = await Brand.find(matchConditions).sort({ name: 1 });

        res.status(200).json(brands);
    } catch (error) {
        next(error);
    }
};

/**
 * 🧩 Lấy danh sách tất cả thương hiệu
 * (Giữ nguyên)
 */
export const getAllBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find().sort({ createdAt: -1 });
        res.status(200).json(brands);
    } catch (error) {
        next(error); 
    }
};

/**
 * 🧩 Lấy thông tin chi tiết 1 thương hiệu
 * (Giữ nguyên)
 */
export const getBrandById = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(brand);
    } catch (error) {
        next(error); 
    }
};

/**
 * 🧩 Tạo thương hiệu mới
 * (CẬP NHẬT: Đọc từ req.body và req.file)
 */
export const createBrand = async (req, res, next) => {
    try {
        // 4. Đọc text từ req.body
        const { name, description, origin } = req.body;

        // 5. Đọc file từ req.file
        let logoUrl = "";
        if (req.file) {
            // Chuẩn hóa path cho URL (vd: /uploads/logo-12345.png)
            logoUrl = '/' + req.file.path.replace(/\\/g, "/"); 
        }

        // 6. Validation thủ công (thay Joi)
        if (!name) {
            const error = new Error("Tên thương hiệu là bắt buộc");
            error.statusCode = 400;
            return next(error);
        }
        const existing = await Brand.findOne({ name });
        if (existing) {
            const error = new Error("Thương hiệu này đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        const brand = new Brand({
            name,
            description,
            origin,
            logo: logoUrl, // 7. Lưu đường dẫn URL
        });

        const createdBrand = await brand.save();
        res.status(201).json({
            message: "Thêm thương hiệu thành công",
            brand: createdBrand,
        });
    } catch (error) {
        next(error); 
    }
};

/**
 * 🧩 Cập nhật thương hiệu
 * (CẬP NHẬT: Đọc từ req.body/req.file và Xóa file cũ)
 */
export const updateBrand = async (req, res, next) => {
    try {
        // 4. Đọc text từ req.body
        const { name, description, origin, isActive } = req.body;

        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        // 5. Lưu lại đường dẫn logo cũ
        const oldLogoPath = brand.logo;

        // 6. Xử lý Upload logo mới
        if (req.file) {
            // Nếu có logo mới, cập nhật đường dẫn
            brand.logo = '/' + req.file.path.replace(/\\/g, "/");
            // Xóa logo cũ
            deleteFile(oldLogoPath);

        } else if (req.body.logo === 'null') {
            // Frontend báo XÓA logo
            brand.logo = "";
            // Xóa logo cũ
            deleteFile(oldLogoPath);
        }
        // (Nếu không có req.file và req.body.logo != 'null', thì giữ nguyên logo)

        // 7. Cập nhật các trường khác
        brand.name = name;
        brand.description = description;
        brand.origin = origin;
        brand.isActive = (isActive === 'true'); // Chuyển string sang boolean

        const updatedBrand = await brand.save();
        res.status(200).json({
            message: "Cập nhật thương hiệu thành công",
            brand: updatedBrand,
        });
    } catch (error) {
        next(error); 
    }
};

/**
 * 🧩 Xóa thương hiệu
 * (CẬP NHẬT: Xóa file logo liên quan)
 */
export const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        // 4. Lưu lại đường dẫn logo
        const logoPath = brand.logo;

        await brand.deleteOne();

        // 5. Xóa file logo liên quan
        deleteFile(logoPath);

        res.status(200).json({ message: "Xóa thương hiệu thành công" });
    } catch (error) {
        next(error); 
    }
};
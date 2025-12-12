import fs from 'fs';
import path from 'path';
import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";

// ==============================================================================
// 🛠️ HELPER FUNCTIONS
// ==============================================================================

/**
 * Xóa file ảnh trên ổ cứng (Dùng khi update ảnh mới hoặc xóa thương hiệu)
 * @param {string} filePath - Đường dẫn dạng URL (VD: '/uploads/logo.png')
 */
const deleteFile = (filePath) => {
    // 1. Validation: Chỉ xóa nếu có đường dẫn và nằm trong thư mục uploads (Bảo mật)
    if (!filePath || !filePath.startsWith('/uploads/')) return;
    
    // 2. Chuyển đổi đường dẫn:
    // Input: '/uploads/logo.png' (URL cho frontend)
    // Substring(1): 'uploads/logo.png' (Đường dẫn tương đối)
    // Resolve: 'D:\Project\uploads\logo.png' (Đường dẫn tuyệt đối HDD)
    const fullPath = path.resolve(filePath.substring(1));
    
    // 3. Thực thi xóa bất đồng bộ
    fs.unlink(fullPath, (err) => {
        if (err) {
            // Lỗi thường gặp: ENOENT (File không tồn tại - có thể đã bị xóa trước đó)
            if (err.code !== 'ENOENT') console.error(`[DeleteFile] Lỗi: ${fullPath}`, err);
        } else {
            console.log(`[DeleteFile] Đã xóa file cũ: ${fullPath}`);
        }
    });
};

// ==============================================================================
// 🎮 BRAND CONTROLLERS
// ==============================================================================

/**
 * 🆕 API ĐẶC BIỆT: Lấy danh sách Brand nhưng có lọc theo Category
 * Logic: Frontend đang xem danh mục "Áo thun" -> Chỉ hiện các Brand có bán áo thun.
 * Route: GET /api/brands?categoryId=...
 */
export const getBrandsWithProducts = async (req, res, next) => {
    try {
        const { categoryId } = req.query; 

        // Mặc định: Chỉ lấy brand đang hoạt động
        let matchConditions = { isActive: true }; 

        if (categoryId) {
            // [LOGIC] Bước 1: Tìm tất cả sản phẩm thuộc Category này trước
            // .distinct('brand'): Chỉ lấy danh sách ID các brand (loại bỏ trùng lặp)
            const brandIds = await Product.distinct('brand', { category: categoryId });

            // [LOGIC] Bước 2: Lọc Brand chỉ nằm trong danh sách ID vừa tìm được
            // $in: Toán tử "nằm trong tập hợp"
            matchConditions._id = { $in: brandIds };
        } 
        
        // Bước 3: Query Database với điều kiện đã xây dựng
        const brands = await Brand.find(matchConditions).sort({ name: 1 }); // Xếp tên A-Z

        res.status(200).json(brands);
    } catch (error) {
        next(error);
    }
};

/**
 * Lấy tất cả thương hiệu (Dùng cho trang Admin quản lý)
 */
export const getAllBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find().sort({ createdAt: -1 }); // Mới nhất lên đầu
        res.status(200).json(brands);
    } catch (error) { next(error); }
};

/**
 * Lấy chi tiết 1 thương hiệu (Cho trang Edit)
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
    } catch (error) { next(error); }
};

/**
 * Tạo thương hiệu mới (Có xử lý upload ảnh)
 */
export const createBrand = async (req, res, next) => {
    try {
        // 1. Lấy dữ liệu text (Form data)
        const { name, description, origin } = req.body;

        // 2. Xử lý file ảnh (Nếu user có chọn ảnh)
        let logoUrl = "";
        if (req.file) {
            // [QUAN TRỌNG] Chuẩn hóa đường dẫn:
            // Windows dùng dấu gạch chéo ngược (\), Web dùng dấu gạch chéo thuận (/)
            // .replace(/\\/g, "/"): Thay thế tất cả '\' thành '/' để ảnh hiển thị được trên trình duyệt
            logoUrl = '/' + req.file.path.replace(/\\/g, "/"); 
        }

        // 3. Validation thủ công
        if (!name) {
            const error = new Error("Tên thương hiệu là bắt buộc");
            error.statusCode = 400;
            return next(error);
        }
        
        // Check trùng tên
        const existing = await Brand.findOne({ name });
        if (existing) {
            const error = new Error("Thương hiệu này đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        // 4. Lưu vào DB
        const brand = new Brand({
            name,
            description,
            origin,
            logo: logoUrl, 
        });

        const createdBrand = await brand.save();
        res.status(201).json({
            message: "Thêm thương hiệu thành công",
            brand: createdBrand,
        });
    } catch (error) {
        // Lưu ý: Nếu có lỗi DB (VD: rớt mạng), file ảnh đã upload vẫn nằm đó (rác).
        // Có thể thêm deleteFile(req.file.path) ở đây nếu muốn chặt chẽ hơn.
        next(error); 
    }
};

/**
 * Cập nhật thương hiệu (Logic phức tạp: Xử lý xóa ảnh cũ)
 */
export const updateBrand = async (req, res, next) => {
    try {
        const { name, description, origin, isActive } = req.body;

        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        // Lưu đường dẫn ảnh cũ để quyết định xem có xóa không
        const oldLogoPath = brand.logo;

        // [LOGIC XỬ LÝ ẢNH]
        // Case 1: Người dùng upload ảnh mới -> Thay thế ảnh cũ
        if (req.file) {
            brand.logo = '/' + req.file.path.replace(/\\/g, "/");
            deleteFile(oldLogoPath); // Xóa file cũ để tiết kiệm dung lượng
        } 
        // Case 2: Người dùng bấm nút "Xóa ảnh" ở Frontend -> Xóa ảnh cũ, không set ảnh mới
        else if (req.body.logo === 'null') {
            brand.logo = "";
            deleteFile(oldLogoPath);
        }
        // Case 3: Không làm gì cả -> Giữ nguyên ảnh cũ (brand.logo không đổi)

        // Cập nhật thông tin text
        brand.name = name;
        brand.description = description;
        brand.origin = origin;
        // FormData gửi boolean dưới dạng chuỗi "true"/"false", cần convert lại
        brand.isActive = (isActive === 'true'); 

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
 * Xóa thương hiệu và file ảnh đi kèm
 */
export const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        // Lưu lại đường dẫn trước khi xóa Doc, nếu xóa Doc rồi thì mất thông tin đường dẫn
        const logoPath = brand.logo;

        await brand.deleteOne();

        // Dọn dẹp file rác
        deleteFile(logoPath);

        res.status(200).json({ message: "Xóa thương hiệu thành công" });
    } catch (error) {
        next(error); 
    }
};
import fs from 'fs';
import path from 'path';
import Category from "../models/categoryModel.js";

// ==============================================================================
// 🛠️ HELPER: XÓA FILE ẢNH
// ==============================================================================
const deleteFile = (filePath) => {
    // filePath trong DB thường dạng: /uploads/image.png
    if (!filePath || !filePath.startsWith('/uploads/')) return;
    
    // Bỏ dấu '/' ở đầu để lấy đường dẫn tương đối: uploads/image.png
    const fullPath = path.resolve(filePath.substring(1));
    
    console.log(`--- [Helper deleteFile]: Đang cố gắng xóa file tại: ${fullPath} ---`);

    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error(`Lỗi khi xóa file cũ: ${fullPath}`, err);
        } else {
            console.log(`Đã xóa file cũ: ${fullPath}`);
        }
    });
};

// ==============================================================================
// 🎮 PUBLIC CONTROLLERS (READ ONLY)
// ==============================================================================

/**
 * 🧩 Lấy danh sách tất cả danh mục (Flat List - cho Admin Table)
 * @route GET /api/categories
 */
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
            .populate("parentCategory", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(categories);
    } catch (error) {
        next(error); 
    }
};

/**
 * 🍃 Lấy danh sách các danh mục lá (Leaf Nodes)
 * (Dùng cho dropdown chọn danh mục khi thêm sản phẩm)
 */
export const getLeafCategories = async (req, res, next) => {
    try {
        const allCategories = await Category.find({ isActive: true }).select("name parentCategory").lean();

        // Tìm tất cả ID đang làm cha
        const parentIds = new Set();
        allCategories.forEach(cat => {
            if (cat.parentCategory) {
                parentIds.add(cat.parentCategory.toString());
            }
        });

        // Lọc ra các danh mục KHÔNG nằm trong nhóm cha -> Là lá
        const leafCategories = allCategories.filter(cat => 
            !parentIds.has(cat._id.toString())
        );
        
        res.status(200).json(leafCategories);
    } catch (error) {
        next(error); 
    }
};

/**
 * 🧩 Lấy thông tin chi tiết 1 danh mục theo ID
 * @route GET /api/categories/:id
 */
export const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).populate("parentCategory", "name");

        if (!category) {
            const error = new Error("Không tìm thấy danh mục");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(category);
    } catch (error) {
        next(error); 
    }
};

// ---------------------------------------------------------
// 🆕 QUAN TRỌNG: HÀM NÀY GIẢI QUYẾT LỖI 404 Ở FRONTEND
// ---------------------------------------------------------
/**
 * 🔍 Lấy danh mục theo Slug (Dùng cho URL thân thiện)
 * @route GET /api/categories/slug/:slug
 */
export const getCategoryBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        
        // Tìm chính xác theo slug
        const category = await Category.findOne({ slug })
            .populate("parentCategory", "name");

        if (!category) {
            const error = new Error("Không tìm thấy danh mục với slug này");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
};

// ==============================================================================
// 🌳 NAVIGATION / MEGA MENU LOGIC
// ==============================================================================

/**
 * [Helper] Xây dựng cây từ danh sách phẳng
 */
function buildNavTree(categories) {
    const map = {};
    const roots = [];

    // 1. Map ID -> Object và thêm href
    categories.forEach(doc => {
        const cat = doc.toObject();
        cat.href = `/collections/${cat.slug}`; // Tạo link frontend
        cat.children = [];
        map[cat._id] = cat;
    });

    // 2. Xếp vào cây
    Object.values(map).forEach(cat => {
        if (cat.parentCategory && map[cat.parentCategory]) {
            // Nếu có cha -> chui vào mảng children của cha
            map[cat.parentCategory].children.push(cat);
        } else {
            // Không cha -> Là root (Menu cấp 1)
            roots.push(cat);
        }
    });

    return roots;
}

/**
 * 🌳 API lấy Mega Menu (Tree Structure)
 * @route GET /api/categories/nav-tree
 */
export const getNavTree = async (req, res, next) => {
    try {
        const categories = await Category.find(
            { isActive: true }, 
            "name slug parentCategory image" // Chỉ lấy các trường cần thiết
        ).sort({ name: 1 });

        const navTree = buildNavTree(categories);

        res.status(200).json(navTree);
    } catch (error) {
        next(error); 
    }
};

// ==============================================================================
// 🔒 ADMIN CONTROLLERS (CREATE / UPDATE / DELETE)
// ==============================================================================

/**
 * 📦 Tạo danh mục mới
 * @route POST /api/categories
 */
export const createCategory = async (req, res, next) => {
    console.log("--- Controller: createCategory (POST) ---");
    try {
        const { name, description, parentCategory } = req.body;
        
        // Xử lý file upload
        let imageUrl = "";
        if (req.file) {
            // Chuẩn hóa path cho URL (vd: /uploads/image-12345.png)
            imageUrl = '/' + req.file.path.replace(/\\/g, "/"); 
        }

        // Validate thủ công
        if (!name) {
            const error = new Error("Tên danh mục là bắt buộc");
            error.statusCode = 400;
            return next(error);
        }
        
        const existing = await Category.findOne({ name });
        if (existing) {
            const error = new Error("Danh mục này đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        const category = new Category({
            name,
            description,
            parentCategory: parentCategory || null,
            image: imageUrl,
            // Slug tự động tạo bởi Mongoose Middleware
        });

        const createdCategory = await category.save();
        
        res.status(201).json({
            message: "Thêm danh mục thành công",
            category: createdCategory,
        });
    } catch (error) {
        next(error); 
    }
};

/**
 * ✏️ Cập nhật danh mục
 * @route PUT /api/categories/:id
 */
export const updateCategory = async (req, res, next) => {
    console.log("--- Controller: updateCategory (PUT) ---");
    try {
        const { name, description, parentCategory, isActive } = req.body;

        const category = await Category.findById(req.params.id);
        if (!category) {
            const error = new Error("Không tìm thấy danh mục");
            error.statusCode = 404;
            return next(error);
        }
        
        const oldImagePath = category.image;
        
        // Xử lý ảnh mới
        if (req.file) {
            // Có upload ảnh mới -> Lưu đường dẫn mới -> Xóa ảnh cũ
            category.image = '/' + req.file.path.replace(/\\/g, "/");
            deleteFile(oldImagePath);
        } else if (req.body.image === 'null') {
            // Client gửi string 'null' -> Muốn xóa ảnh hiện tại
            category.image = "";
            deleteFile(oldImagePath);
        } 
        // Nếu không có req.file và image != 'null' -> Giữ nguyên ảnh cũ

        // Cập nhật thông tin text
        category.name = name; 
        category.description = description;
        category.parentCategory = parentCategory || null;
        category.isActive = (isActive === 'true' || isActive === true); 

        const updated = await category.save();

        res.status(200).json({
            message: "Cập nhật danh mục thành công",
            category: updated,
        });
    } catch (error) {
        next(error); 
    }
};

/**
 * 🗑️ Xóa danh mục
 * @route DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res, next) => {
    console.log("--- Controller: deleteCategory (DELETE) ---");
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            const error = new Error("Không tìm thấy danh mục");
            error.statusCode = 404;
            return next(error);
        }

        const imagePath = category.image; 

        await category.deleteOne();

        // Xóa file ảnh vật lý sau khi xóa DB thành công
        deleteFile(imagePath);

        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        next(error); 
    }
};
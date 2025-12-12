import fs from 'fs';
import path from 'path';
import Category from "../models/categoryModel.js";

// ==============================================================================
// 🛠️ HELPER: XÓA FILE ẢNH
// ==============================================================================
/**
 * Hàm tiện ích giúp xóa file ảnh khỏi ổ cứng Server
 * Dùng khi: Xóa danh mục, Cập nhật ảnh mới (xóa ảnh cũ).
 */
const deleteFile = (filePath) => {
    // 1. Kiểm tra an toàn: Chỉ xóa file nằm trong thư mục uploads
    if (!filePath || !filePath.startsWith('/uploads/')) return;
    
    // 2. Chuyển đổi đường dẫn:
    // Input (DB): '/uploads/cat-1.png'
    // Substring(1): 'uploads/cat-1.png' (Relative path)
    // Resolve: 'D:\Project\uploads\cat-1.png' (Absolute System path)
    const fullPath = path.resolve(filePath.substring(1));
    
    // console.log(`[DeleteFile] Đang xóa: ${fullPath}`); // Bật để debug

    fs.unlink(fullPath, (err) => {
        if (err) {
            // Nếu lỗi không tìm thấy file (ENOENT) thì bỏ qua, còn lỗi khác thì log
            if (err.code !== 'ENOENT') console.error(`[DeleteFile Error] ${fullPath}:`, err);
        } else {
            console.log(`[DeleteFile Success] Đã xóa file: ${fullPath}`);
        }
    });
};

// ==============================================================================
// 🎮 PUBLIC CONTROLLERS (READ ONLY)
// ==============================================================================

/**
 * 🧩 Lấy danh sách tất cả danh mục (Dạng phẳng - Flat List)
 * Thường dùng cho trang Admin (Table quản lý)
 */
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
            .populate("parentCategory", "name") // Lấy tên danh mục cha thay vì chỉ ID
            .sort({ createdAt: -1 });

        res.status(200).json(categories);
    } catch (error) {
        next(error); 
    }
};

/**
 * 🍃 Lấy danh sách các danh mục lá (Leaf Nodes)
 * Logic: "Lá" là danh mục cuối cùng, KHÔNG làm cha của ai cả.
 * Dùng cho: Dropdown chọn danh mục khi thêm sản phẩm (Vì thường chỉ thêm SP vào danh mục con)
 */
export const getLeafCategories = async (req, res, next) => {
    try {
        // 1. Lấy tất cả danh mục (chỉ cần ID và ParentID để tính toán)
        const allCategories = await Category.find({ isActive: true }).select("name parentCategory").lean();

        // 2. Thuật toán tìm danh mục cha:
        // Duyệt qua tất cả, nếu ai có parentCategory -> Lưu ID đó vào Set `parentIds`
        const parentIds = new Set();
        allCategories.forEach(cat => {
            if (cat.parentCategory) {
                parentIds.add(cat.parentCategory.toString());
            }
        });

        // 3. Lọc lấy danh mục lá:
        // Giữ lại những danh mục mà ID của nó KHÔNG nằm trong tập `parentIds`
        const leafCategories = allCategories.filter(cat => 
            !parentIds.has(cat._id.toString())
        );
        
        res.status(200).json(leafCategories);
    } catch (error) {
        next(error); 
    }
};

/**
 * 🧩 Lấy thông tin chi tiết 1 danh mục theo ID (Cho trang Edit)
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

/**
 * 🔍 Lấy danh mục theo Slug (URL thân thiện)
 * Dùng cho Frontend: Khi user vào 'shop.com/collections/ao-thun'
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
// 🌳 NAVIGATION / MEGA MENU LOGIC (Recursive Tree)
// ==============================================================================

/**
 * [Helper] Thuật toán biến danh sách phẳng (Flat) thành cây (Tree)
 * Input: [{id: 1, parent: null}, {id: 2, parent: 1}]
 * Output: [{id: 1, children: [{id: 2}]}]
 */
function buildNavTree(categories) {
    const map = {};
    const roots = [];

    // Bước 1: Tạo Hash Map để truy cập nhanh O(1) và khởi tạo mảng children
    categories.forEach(doc => {
        const cat = doc.toObject();
        cat.href = `/collections/${cat.slug}`; // Tạo sẵn link cho frontend đỡ phải ghép chuỗi
        cat.children = [];
        map[cat._id] = cat;
    });

    // Bước 2: Xếp hình
    Object.values(map).forEach(cat => {
        // Nếu có cha và cha tồn tại trong map
        if (cat.parentCategory && map[cat.parentCategory]) {
            // -> Chui vào mảng children của cha
            map[cat.parentCategory].children.push(cat);
        } else {
            // Không cha (hoặc cha bị ẩn/xóa) -> Là Root (Menu cấp 1)
            roots.push(cat);
        }
    });

    return roots;
}

/**
 * 🌳 API lấy Mega Menu
 * Trả về cấu trúc cây phân cấp để Frontend render menu đa cấp
 */
export const getNavTree = async (req, res, next) => {
    try {
        // Chỉ lấy danh mục đang hoạt động (isActive: true)
        const categories = await Category.find(
            { isActive: true }, 
            "name slug parentCategory image" 
        ).sort({ name: 1 });

        // Gọi hàm helper dựng cây
        const navTree = buildNavTree(categories);

        res.status(200).json(navTree);
    } catch (error) {
        next(error); 
    }
};

// ==============================================================================
// 🔒 ADMIN CONTROLLERS (WRITE OPERATIONS)
// ==============================================================================

/**
 * 📦 Tạo danh mục mới
 */
export const createCategory = async (req, res, next) => {
    try {
        const { name, description, parentCategory } = req.body;
        
        // 1. Xử lý file upload
        let imageUrl = "";
        if (req.file) {
            // Chuẩn hóa path: Window dùng '\', Web dùng '/'
            imageUrl = '/' + req.file.path.replace(/\\/g, "/"); 
        }

        // 2. Validate dữ liệu
        if (!name) {
            const error = new Error("Tên danh mục là bắt buộc");
            error.statusCode = 400;
            return next(error);
        }
        
        // 3. Check trùng tên
        const existing = await Category.findOne({ name });
        if (existing) {
            const error = new Error("Danh mục này đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        // 4. Lưu DB
        const category = new Category({
            name,
            description,
            parentCategory: parentCategory || null,
            image: imageUrl,
            // Slug được Mongoose Middleware tự tạo từ 'name'
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
 */
export const updateCategory = async (req, res, next) => {
    try {
        const { name, description, parentCategory, isActive } = req.body;

        const category = await Category.findById(req.params.id);
        if (!category) {
            const error = new Error("Không tìm thấy danh mục");
            error.statusCode = 404;
            return next(error);
        }
        
        // Lưu đường dẫn ảnh cũ để xử lý
        const oldImagePath = category.image;
        
        // [LOGIC XỬ LÝ ẢNH]
        // Case 1: User upload ảnh mới
        if (req.file) {
            category.image = '/' + req.file.path.replace(/\\/g, "/");
            deleteFile(oldImagePath); // Xóa ảnh cũ
        } 
        // Case 2: User bấm nút xóa ảnh (không set ảnh mới)
        else if (req.body.image === 'null') {
            category.image = "";
            deleteFile(oldImagePath); // Xóa ảnh cũ
        } 
        // Case 3: Không làm gì -> Giữ nguyên ảnh cũ

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
 */
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            const error = new Error("Không tìm thấy danh mục");
            error.statusCode = 404;
            return next(error);
        }

        // Lưu đường dẫn ảnh trước khi xóa bản ghi trong DB
        const imagePath = category.image; 

        // 1. Xóa bản ghi trong DB
        await category.deleteOne();

        // 2. Xóa file ảnh vật lý (Dọn rác)
        deleteFile(imagePath);

        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        next(error); 
    }
};
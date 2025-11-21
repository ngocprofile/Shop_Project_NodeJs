import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryBySlug, // 👈 QUAN TRỌNG: Import hàm này để sửa lỗi 404
    getLeafCategories,
    getNavTree,
    updateCategory
} from "../controllers/categoryController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ==================================================================
// 🟢 PUBLIC ROUTES (Ai cũng xem được)
// ==================================================================
// ⚠️ Lưu ý: Các route cụ thể (static path) phải đặt TRƯỚC route động (/:id)

/**
 * 🌳 Lấy cây danh mục (Mega Menu)
 * @route GET /api/categories/nav-tree
 */
router.get("/nav-tree", getNavTree);

/**
 * 🍃 Lấy danh mục lá (Leaf nodes - dùng cho form thêm sản phẩm)
 * @route GET /api/categories/leaf-nodes
 */
router.get("/leaf-nodes", getLeafCategories);

/**
 * 🔍 Lấy danh mục theo Slug (URL thân thiện)
 * @route GET /api/categories/slug/:slug
 * @example /api/categories/slug/dep-le
 */
router.get("/slug/:slug", getCategoryBySlug);

/**
 * 📜 Lấy danh sách tất cả danh mục (Flat list)
 * @route GET /api/categories
 */
router.get("/", getAllCategories);

/**
 * 🆔 Lấy chi tiết danh mục theo ID
 * @route GET /api/categories/:id
 * ⚠️ Route này phải đặt CUỐI CÙNG trong nhóm GET
 */
router.get("/:id", getCategoryById);


// ==================================================================
// 🔴 PROTECTED ROUTES (Chỉ Admin được thao tác)
// ==================================================================

/**
 * 📦 Tạo danh mục mới
 * @route POST /api/categories
 */
router.post(
    "/",
    protect,                        // 1. Yêu cầu đăng nhập
    authorizeRoles("admin"),        // 2. Chỉ Admin
    upload.single('image'),         // 3. Xử lý upload ảnh (field name = 'image')
    activityLogMiddleware(['post category', 'create category']), // 4. Chuẩn bị log
    createCategory                  // 5. Controller xử lý
);

/**
 * ✏️ Cập nhật danh mục
 * @route PUT /api/categories/:id
 */
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    upload.single('image'),         // Xử lý upload ảnh mới (nếu có)
    activityLogMiddleware(['put category', 'update category']),
    postActivityLog,                // Ghi log sau khi controller chạy xong
    updateCategory
);

/**
 * 🗑️ Xóa danh mục
 * @route DELETE /api/categories/:id
 */
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    activityLogMiddleware(['delete category']),
    postActivityLog,
    deleteCategory
);

export default router;
import express from "express";
import {
    addColorVariantToProduct,
    createProduct,
    createSizeInventory,
    deleteColorVariant,
    deleteProduct,
    deleteSizeInventory,
    getAllColorVariants,
    getAllProducts,
    getColorVariantById,
    getColorVariantsByProduct,
    getHomepageStats,
    getProductById,
    getSizeInventoryById,
    getSizesByColorVariant,
    updateColorVariant,
    updateProduct,
    updateSizeInventory
} from "../controllers/productAndVariantController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import upload from '../middleware/uploadMiddleware.js';
import validate, { schemas } from "../middleware/validateMiddleware.js";

const router = express.Router();
// ngoc
// ===============================================================
// 1. 🛡️ ADMIN/STAFF ROUTES (CẦN: protect, authorizeRoles)
// Bao gồm: CRUD Product, CRUD ColorVariant, CRUD SizeInventory (trừ GET Public)
// ===============================================================

// ---------------------------------------------------------
// 1.1. PRODUCT (CRUD)
// ---------------------------------------------------------

/**
 * 📦 Tạo sản phẩm mới (Admin/Staff)
 * @route POST /api/products
 */
router.post(
    "/",
    protect,
    authorizeRoles("admin", "staff"),
    upload.single('featuredImage'), 
    validate(schemas.createProduct),
    activityLogMiddleware(['post product', 'create product']),
    postActivityLog,
    createProduct
);

/**
 * ✏️ Cập nhật thông tin sản phẩm (Admin/Staff)
 * @route PUT /api/products/:id
 */
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "staff"),
    upload.single('featuredImage'), 
    validate(schemas.updateProduct),
    activityLogMiddleware(['put product', 'update product']),
    postActivityLog,
    updateProduct
);

/**
 * 🗑️ Xóa sản phẩm (Admin Only)
 * @route DELETE /api/products/:id
 */
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    validate(schemas.mongoIdParam), 
    activityLogMiddleware(['delete product']),
    postActivityLog,
    deleteProduct
);

/**
 * 📊 Lấy thống kê trang chủ (Admin/Staff)
 * @route GET /api/products/stats/homepage
 */
router.get(
    "/stats/homepage",
    protect,
    authorizeRoles("admin", "staff"),
    getHomepageStats
);


// ---------------------------------------------------------
// 1.2. COLOR VARIANT (CRUD + Thêm vào SP)
// ---------------------------------------------------------

/**
 * 🧩 Thêm biến thể Màu sắc + Kích cỡ mới vào sản phẩm (Admin/Staff)
 * @route POST /api/products/:productId/variants
 */
router.post(
    "/:productId/variants",
    protect,
    authorizeRoles("admin", "staff"),
    validate(schemas.addVariant),
    activityLogMiddleware(['post variant', 'add color variant']),
    postActivityLog,
    addColorVariantToProduct 
);

/**
 * 📜 Admin lấy TẤT CẢ biến thể Màu sắc (Cho bảng quản lý chung)
 * @route GET /api/products/variants
 */
router.get(
    "/variants",
    protect,
    authorizeRoles("admin"),
    activityLogMiddleware(['get all color variants']),
    getAllColorVariants
);

/**
 * 🔍 Lấy chi tiết 1 biến thể Màu sắc (Admin/Staff)
 * @route GET /api/products/variants/:id
 */
router.get(
    "/variants/:id",
    protect,
    authorizeRoles("admin", "staff"),
    validate(schemas.mongoIdParam), 
    activityLogMiddleware(['get color variant by id']),
    getColorVariantById
);

/**
 * 🔄 Cập nhật thông tin biến thể Màu sắc (Color, ColorCode, Image)
 * @route PUT /api/products/variants/:id
 */
router.put(
    "/variants/:id",
    protect,
    authorizeRoles("admin", "staff"),
    upload.single('image'), 
    validate(schemas.updateColorVariant),
    activityLogMiddleware(['put variant', 'update color variant']),
    postActivityLog,
    updateColorVariant 
);

/**
 * 🗑️ Xóa biến thể Màu sắc (Xóa cả Sizes Inventory liên quan)
 * @route DELETE /api/products/variants/:id
 */
router.delete(
    "/variants/:id",
    protect,
    authorizeRoles("admin"),
    validate(schemas.mongoIdParam), 
    activityLogMiddleware(['delete color variant']),
    postActivityLog,
    deleteColorVariant 
);


// ---------------------------------------------------------
// 1.3. SIZE INVENTORY (CRUD Tồn kho - Admin/Staff)
// ---------------------------------------------------------

/**
 * ➕ Tạo Size/Tồn kho mới cho một ColorVariant (Admin/Staff)
 * @route POST /api/products/sizes
 */
router.post(
    "/sizes",
    protect,
    authorizeRoles("admin", "staff"),
    validate(schemas.createSizeInventory),
    activityLogMiddleware(['post size inventory']),
    postActivityLog,
    createSizeInventory 
);

/**
 * ✏️ Cập nhật Size/Tồn kho cụ thể (Admin/Staff)
 * @route PUT /api/products/sizes/:id
 */
router.put(
    "/sizes/:id",
    protect,
    authorizeRoles("admin", "staff"),
    validate(schemas.updateSizeInventory),
    activityLogMiddleware(['put size inventory']),
    postActivityLog,
    updateSizeInventory 
);

/**
 * 🗑️ Xóa Size/Tồn kho cụ thể
 * @route DELETE /api/products/sizes/:id
 */
router.delete(
    "/sizes/:id",
    protect,
    authorizeRoles("admin"),
    validate(schemas.mongoIdParam),
    activityLogMiddleware(['delete size inventory']),
    postActivityLog,
    deleteSizeInventory 
);

router.get(
    "/sizes/:id", 
    validate(schemas.mongoIdParam), // Validation khớp với :id
    getSizeInventoryById
);


// ===============================================================
// 2. 🌐 PUBLIC ROUTES (KHÔNG CẦN: protect, authorizeRoles)
// ===============================================================

/**
 * 📜 Lấy danh sách sản phẩm (Public)
 * @route GET /api/products
 * @desc Hỗ trợ sort, filter qua query params
 */
router.get("/", getAllProducts);

/**
 * 📦 Lấy tất cả biến thể Màu sắc của 1 sản phẩm cụ thể
 * @route GET /api/products/:productId/variants/all
 */
router.get(
    "/:productId/variants/all",
    validate(schemas.mongoIdProductIdParam), 
    getColorVariantsByProduct
);

/**
 * 📋 Lấy danh sách Sizes của một ColorVariant (Public - Dùng trên trang chi tiết)
 * @route GET /api/products/sizes/:variantId
 */
router.get(
    "/sizes/variant/:id",
    validate(schemas.mongoIdParam), 
    getSizesByColorVariant 
);

/**
 * 🔗 Lấy chi tiết sản phẩm theo Slug
 * @route GET /api/products/slug/:slug
 */
router.get(
    "/slug/:slug",
    getProductById 
);

/**
 * 🔍 Lấy chi tiết sản phẩm theo ID
 * @route GET /api/products/:id
 */
router.get(
    "/:id",
    getProductById
);


export default router;
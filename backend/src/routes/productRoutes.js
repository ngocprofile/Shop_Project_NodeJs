import express from "express";
import {
    addVariantToProduct,
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    updateVariant,
} from "../controllers/productController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

/**
 * ===============================
 * 🛍️ PRODUCT ROUTES
 * ===============================
 */

/**
 * 📦 Tạo sản phẩm mới (Admin hoặc Staff)
 * @route POST /api/products
 */
router.post("/", protect, authorizeRoles("admin", "staff"), validate(schemas.createProduct), activityLogMiddleware(['post product', 'create product']), createProduct);

/**
 * 📜 Lấy danh sách tất cả sản phẩm (Public)
 * @route GET /api/products
 */
router.get("/", getAllProducts);

/**
 * 🔍 Lấy chi tiết sản phẩm theo ID (Public)
 * @route GET /api/products/:id
 */
router.get("/:id", validate(schemas.getProductById), getProductById);

/**
 * ✏️ Cập nhật thông tin sản phẩm (Admin hoặc Staff)
 * @route PUT /api/products/:id
 */
router.put("/:id", protect, authorizeRoles("admin", "staff"), validate(schemas.updateProduct), activityLogMiddleware(['put product', 'update product']), postActivityLog, updateProduct);

/**
 * 🗑️ Xóa sản phẩm (chỉ Admin)
 * @route DELETE /api/products/:id
 */
router.delete("/:id", protect, authorizeRoles("admin"), validate(schemas.deleteProduct), activityLogMiddleware(['delete product']), postActivityLog, deleteProduct);

/**
 * 🧩 Thêm biến thể cho sản phẩm (Admin hoặc Staff)
 * @route POST /api/products/:productId/variants
 */
router.post("/:productId/variants", protect, authorizeRoles("admin", "staff"), validate(schemas.addVariant), activityLogMiddleware(['post variant', 'add variant']), addVariantToProduct);

/**
 * 🔄 Cập nhật một biến thể (Admin hoặc Staff)
 * @route PUT /api/products/variants/:id
 */
router.put("/variants/:id", protect, authorizeRoles("admin", "staff"), validate(schemas.updateVariant), activityLogMiddleware(['put variant', 'update variant']), postActivityLog, updateVariant);

export default router;
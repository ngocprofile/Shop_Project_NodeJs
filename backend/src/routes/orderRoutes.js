import express from "express";
import {
    createOrder,
    deleteOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus,
} from "../controllers/orderController.js";

import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

/**
 * 🛒 Người dùng: Tạo đơn hàng mới
 * - Bắt buộc đăng nhập
 * - Voucher được áp dụng tự động
 */
router.post("/", protect, validate(schemas.createOrder), activityLogMiddleware(['post order', 'create order']), createOrder);

/**
 * 👤 Người dùng: Xem lịch sử đơn hàng của chính mình
 */
router.get("/my-orders", protect, activityLogMiddleware(['get my orders']), getMyOrders);

/**
 * 🧾 Admin: Xem tất cả đơn hàng của hệ thống
 */
router.get("/", protect, authorizeRoles("admin"), activityLogMiddleware(['get orders']), getAllOrders);

/**
 * 🔧 Admin: Cập nhật trạng thái / thanh toán đơn hàng
 */
router.put("/:orderId", protect, authorizeRoles("admin"), validate(schemas.updateOrderStatus), activityLogMiddleware(['put order', 'update order']), postActivityLog, updateOrderStatus);

/**
 * 🗑️ Admin: Xóa đơn hàng
 */
router.delete("/:id", protect, authorizeRoles("admin"), validate(schemas.deleteOrder), activityLogMiddleware(['delete order']), postActivityLog, deleteOrder);

export default router;
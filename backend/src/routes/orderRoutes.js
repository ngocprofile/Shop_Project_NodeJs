import express from "express";
import {
    cancelOrder,
    confirmOrderReceived,
    createOrder,
    deleteOrder,
    getAllOrders,
    getMyOrders,
    getOrderById,
    previewOrder,
    updateOrderStatus
} from "../controllers/orderController.js";

import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js";

const router = express.Router();

// =================================================================
// 👤 USER ROUTES
// =================================================================

/**
 * 👁️ PREVIEW: Tính toán giá trước khi đặt
 * - Endpoint này KHÔNG cần validate(schemas.createOrder) vì createOrder yêu cầu cả địa chỉ, 
 * trong khi preview có thể chỉ cần items + shippingMethodId.
 * - Nếu muốn chặt chẽ, bạn nên tạo thêm schema 'previewOrder' riêng.
 */
router.post("/preview", protect, previewOrder);

/**
 * 🛒 CREATE: Tạo đơn hàng
 * - Validate chặt chẽ (Items, Address, Payment, Shipping...)
 * - Ghi log hoạt động
 */
router.post("/", 
    protect, 
    validate(schemas.createOrder), 
    activityLogMiddleware(['post order', 'create order']), 
    createOrder
);

/**
 * 📜 HISTORY: Xem lịch sử đơn hàng cá nhân
 */
router.get("/my-orders", protect, activityLogMiddleware(['get my orders']), getMyOrders);

/**
 * ✅ USER CONFIRM: Khách hàng xác nhận đã nhận hàng
 * - Method: PUT
 * - URL: /api/orders/:id/confirm
 * - Logic: Chỉ User sở hữu đơn hàng mới gọi được (đã check trong controller)
 * - Validate: Tái sử dụng schema 'deleteOrder' để kiểm tra :id có phải ObjectId hợp lệ không
 */
router.put("/:id/confirm", 
    protect, 
    validate(schemas.deleteOrder), // (Mẹo: Dùng schema này để validate req.params.id là ObjectId chuẩn)
    confirmOrderReceived
);

/**
 * 🔍 USER: Xem chi tiết đơn hàng
 */
router.get("/:id", protect, validate(schemas.deleteOrder), getOrderById); 
// (Mẹo: dùng schema 'deleteOrder' để validate ID là ObjectId)

/**
 * 🚫 USER: Tự hủy đơn hàng
 */
router.put("/:id/cancel", protect, validate(schemas.deleteOrder), cancelOrder);

// =================================================================
// 👮 ADMIN ROUTES
// =================================================================

/**
 * 📋 LIST: Xem tất cả đơn hàng
 */
router.get("/", protect, authorizeRoles("admin"), activityLogMiddleware(['get orders']), getAllOrders);

/**
 * 🔧 UPDATE: Cập nhật trạng thái đơn hàng
 * ⚠️ QUAN TRỌNG: Đã đổi '/:id' thành '/:orderId' để khớp với Joi Schema 'updateOrderStatus'
 */
router.put("/:orderId", 
    protect, 
    authorizeRoles("admin"), 
    validate(schemas.updateOrderStatus), 
    activityLogMiddleware(['put order', 'update order']), 
    postActivityLog, 
    updateOrderStatus
);

/**
 * 🗑️ DELETE: Xóa đơn hàng
 * - Giữ nguyên '/:id' vì Joi Schema 'deleteOrder' đang check 'id'
 */
router.delete("/:id", 
    protect, 
    authorizeRoles("admin"), 
    validate(schemas.deleteOrder), 
    activityLogMiddleware(['delete order']), 
    postActivityLog, 
    deleteOrder
);

export default router;
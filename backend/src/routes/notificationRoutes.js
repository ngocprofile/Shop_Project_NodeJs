import express from "express";
import {
    createNotification,
    deleteNotification,
    getUnreadCount,
    getUserNotifications,
    markAllAsRead,
    markAsRead
} from "../controllers/notificationController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

// POST /api/notifications - Tạo thông báo mới (chỉ admin)
router.post("/", protect, authorizeRoles('admin'), validate(schemas.createNotification), activityLogMiddleware(['post notification', 'create notification']), createNotification);

// GET /api/notifications - Lấy danh sách thông báo của user (yêu cầu auth)
router.get("/", protect, activityLogMiddleware(['get notifications']), getUserNotifications);

// GET /api/notifications/unread-count - Lấy số lượng chưa đọc (yêu cầu auth)
router.get("/unread-count", protect, activityLogMiddleware(['get unread count']), getUnreadCount);

// PUT /api/notifications/:id/read - Đánh dấu đã đọc (yêu cầu auth)
router.put("/:id/read", protect, validate(schemas.markAsRead), activityLogMiddleware(['put notification read']), postActivityLog, markAsRead);

// DELETE /api/notifications/:id - Xóa thông báo (yêu cầu auth)
router.delete("/:id", protect, validate(schemas.markAsRead), activityLogMiddleware(['delete notification']), postActivityLog, deleteNotification); // Reuse schema for params id

// PUT /api/notifications/mark-all-read - Đánh dấu tất cả đã đọc (yêu cầu auth)
router.put("/mark-all-read", protect, validate(schemas.markAllAsRead), activityLogMiddleware(['put mark all read']), postActivityLog, markAllAsRead);

export default router;
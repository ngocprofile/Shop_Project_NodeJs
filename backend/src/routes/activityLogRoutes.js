// routes/activityLogRoutes.js
import express from "express";
import {
    createActivityLog,
    deleteActivityLog,
    getAllActivityLogs,
    getUserActivityLogs
} from "../controllers/activityLogController.js";
import { activityLogMiddleware } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/activity-logs - Tạo log thủ công (auth, log chính nó)
router.post("/", protect, activityLogMiddleware(['create log']), createActivityLog);

// GET /api/activity-logs - Lấy tất cả logs (admin, hỗ trợ ?page=1&limit=20&action=update&startDate=2024-01-01)
router.get("/", protect, authorizeRoles('admin'), activityLogMiddleware(['view logs']), getAllActivityLogs);

// GET /api/activity-logs/user/:userId - Lấy logs của user (admin, hỗ trợ ?page=1&limit=20)
router.get("/user/:userId", protect, authorizeRoles('admin'), activityLogMiddleware(['view user logs']), getUserActivityLogs);

// DELETE /api/activity-logs/:id - Xóa log (admin)
router.delete("/:id", protect, authorizeRoles('admin'), activityLogMiddleware(['delete log']), deleteActivityLog);

export default router;
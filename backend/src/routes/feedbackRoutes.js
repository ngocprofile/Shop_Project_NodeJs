// feedbackRoutes.js
import express from "express";
import {
    createFeedback,
    deleteFeedback,
    getFeedbacksByProduct,
    getUserFeedbackForProduct,
    updateFeedback
} from "../controllers/feedbackController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { protect } from "../middleware/authMiddleware.js"; // Sử dụng protect từ authMiddleware
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

// POST /api/feedback - Tạo feedback mới (yêu cầu auth)
router.post("/", protect, validate(schemas.createFeedback), activityLogMiddleware(['post feedback', 'create feedback']), createFeedback);

// GET /api/feedback/product/:productId - Lấy feedbacks theo sản phẩm (không yêu cầu auth)
router.get("/product/:productId", validate(schemas.getFeedbacksByProduct), getFeedbacksByProduct);

// GET /api/feedback/user/product/:productId - Lấy feedback của user cho sản phẩm (yêu cầu auth)
router.get("/user/product/:productId", protect, validate(schemas.getUserFeedbackForProduct), activityLogMiddleware(['get user feedback']), getUserFeedbackForProduct);

// PUT /api/feedback/:id - Cập nhật feedback (yêu cầu auth)
router.put("/:id", protect, validate(schemas.updateFeedback), activityLogMiddleware(['put feedback', 'update feedback']), postActivityLog, updateFeedback);

// DELETE /api/feedback/:id - Xóa feedback (yêu cầu auth)
router.delete("/:id", protect, validate(schemas.deleteFeedback), activityLogMiddleware(['delete feedback']), postActivityLog, deleteFeedback);

export default router;
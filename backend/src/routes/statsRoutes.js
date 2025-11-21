import express from "express";
import { getHomepageStats } from "../controllers/productAndVariantController.js"; // Import từ productController
// (Nếu sau này bạn chuyển nó sang statsController, chỉ cần đổi đường dẫn import ở đây)

const router = express.Router();

/**
 * @route   GET /api/stats/homepage
 * @desc    Lấy thống kê cho trang chủ
 * @access  Public
 */
router.get("/homepage", getHomepageStats);

export default router;
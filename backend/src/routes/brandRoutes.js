import express from "express";
import {
    createBrand,
    deleteBrand,
    getBrandById,
    getBrandsWithProducts, // 👈 IMPORT HÀM TỐI ƯU
    updateBrand
} from "../controllers/brandController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import upload from '../middleware/uploadMiddleware.js'; // Import Multer

const router = express.Router();

/**
 * ===============================
 * 🏷️ BRAND ROUTES
 * ===============================
 */

// ---------------------------------------------------------
// 1. PUBLIC ROUTES (Lấy dữ liệu cho Frontend)
// ---------------------------------------------------------

/**
 * 🏷️ Lấy danh sách thương hiệu (Có thể lọc theo category)
 * @route GET /api/brands
 * @desc Nếu có query `categoryId`, trả về Brands có sản phẩm trong Category đó.
 */
router.get(
    "/", 
    getBrandsWithProducts // Hàm này sẽ kiểm tra req.query.categoryId
);

/**
 * 🔍 Lấy chi tiết thương hiệu theo ID
 * @route GET /api/brands/:id
 */
router.get(
    "/:id", 
    getBrandById
);


// ---------------------------------------------------------
// 2. PROTECTED ROUTES (Admin Management)
// ---------------------------------------------------------

/**
 * 📦 Tạo thương hiệu mới (Có upload file logo)
 * @route POST /api/brands
 * @desc Logic validation thủ công được chuyển vào Controller
 */
router.post(
    "/", 
    protect, 
    authorizeRoles("admin"), 
    upload.single('logo'), // Xử lý file logo
    activityLogMiddleware(['post brand', 'create brand']), 
    postActivityLog, // Ghi log sau khi tạo thành công
    createBrand
);

/**
 * ✏️ Cập nhật thông tin thương hiệu (Có upload file logo)
 * @route PUT /api/brands/:id
 * @desc Hỗ trợ thay thế/xóa logo cũ
 */
router.put(
    "/:id", 
    protect, 
    authorizeRoles("admin"), 
    upload.single('logo'), // Xử lý file logo
    activityLogMiddleware(['put brand', 'update brand']), 
    postActivityLog, 
    updateBrand
);

/**
 * 🗑️ Xóa thương hiệu
 * @route DELETE /api/brands/:id
 * @desc Controller đã được cập nhật để kiểm tra sản phẩm liên quan và xóa logo
 */
router.delete(
    "/:id", 
    protect, 
    authorizeRoles("admin"), 
    activityLogMiddleware(['delete brand']), 
    postActivityLog, 
    deleteBrand
);

export default router;
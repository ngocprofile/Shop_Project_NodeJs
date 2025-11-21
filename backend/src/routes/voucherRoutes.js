import express from "express";
import {
    createVoucher,
    deleteVoucher,
    getActiveVouchers,
    getAllVouchers,
    getVoucherById,
    getVoucherDashboardData,
    updateVoucher,
    validateVoucher,
} from "../controllers/voucherController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

/**
 * 🧾 Public Routes
 */

// ✅ Lấy danh sách voucher đang hoạt động (tự động áp dụng)
router.get("/active", getActiveVouchers);

// ✅ Kiểm tra hợp lệ voucher theo mã (vẫn giữ nếu cần test thủ công)
router.post("/validate", validate(schemas.validateVoucher), validateVoucher);

// --- 2. THÊM ROUTE MỚI CHO KHO VOUCHER ---
/**
 * @route   GET /api/vouchers/dashboard
 * @desc    Lấy dữ liệu 5 phần cho trang "Kho Voucher" của khách hàng
 * @access  Public
 */
router.get("/dashboard", getVoucherDashboardData);
// --- (Hết phần thêm) ---


/**
 * 🧾 Admin Routes
 */
router.get("/", protect, authorizeRoles("admin"), activityLogMiddleware(['get vouchers']), getAllVouchers);
router.get("/:id", protect, authorizeRoles("admin"), activityLogMiddleware(['get voucher by id']), getVoucherById);
router.post("/", protect, authorizeRoles("admin"), validate(schemas.createVoucher), activityLogMiddleware(['post voucher', 'create voucher']), createVoucher);
router.put("/:id", protect, authorizeRoles("admin"), validate(schemas.updateVoucher), activityLogMiddleware(['put voucher', 'update voucher']), postActivityLog, updateVoucher);
router.delete("/:id", protect, authorizeRoles("admin"), activityLogMiddleware(['delete voucher']), postActivityLog, deleteVoucher);

export default router;
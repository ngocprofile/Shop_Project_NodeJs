import express from "express";
import {
    collectVoucher,
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserProfile,
    getUserStats,
    updateUserProfile,
    updateUserRole,
    updateUserStatus,
} from "../controllers/userController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Lấy thông tin hồ sơ người dùng hiện tại
 * @access  Private (Đăng nhập)
 */
router.get("/profile", protect, activityLogMiddleware(['get profile']), getUserProfile);
/**
 * @route   PUT /api/users/profile
 * @desc    Cập nhật thông tin hồ sơ người dùng hiện tại
 * @access  Private (Đăng nhập)
 */
router.put("/profile", protect, validate(schemas.updateProfile), activityLogMiddleware(['put profile', 'update profile']), postActivityLog, updateUserProfile);


// --- 2. THÊM ROUTE MỚI CHO VÍ VOUCHER ---
/**
 * @route   POST /api/users/collect-voucher/:voucherId
 * @desc    (Khách hàng) Lưu voucher vào ví
 * @access  Private (Đăng nhập)
 */
router.post(
    "/collect-voucher/:voucherId",
    protect, // Bắt buộc đăng nhập để biết user là ai
    // (Giả sử bạn sẽ thêm 1 schema validate cho params.voucherId)
    // validate(schemas.collectVoucherParam), 
    collectVoucher
);
// --- (Hết phần thêm) ---


/**
 * @route   GET /api/users
 * @desc    Lấy danh sách tất cả người dùng
 * @access  Private (Chỉ Admin)
 */
router.get("/", protect, authorizeRoles("admin"), activityLogMiddleware(['get users']), getAllUsers);

/**
 * @route   GET /api/users/stats
 * @desc    Lấy thống kê người dùng (Dashboard)
 * @access  Private (Chỉ Admin)
 */
router.get(
    "/stats",
    protect,
    authorizeRoles("admin"),
    activityLogMiddleware(['get user stats']),
    getUserStats
);

/**
 * @route   GET /api/users/:id
 * @desc    Lấy thông tin người dùng theo ID
 * @access  Private (Chỉ Admin)
 */
router.get(
    "/:id",
    protect,
    authorizeRoles("admin"),
    validate(schemas.mongoIdParam), // <-- Validate req.params.id
    activityLogMiddleware(['get user by id']),
    getUserById
);

/**
 * @route   POST /api/users
 * @desc    Tạo người dùng mới (VD: nhân viên mới)
 * @access  Private (Chỉ Admin)
 */
router.post("/", protect, authorizeRoles("admin"), validate(schemas.createUser), activityLogMiddleware(['post user', 'create user']), createUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Xóa người dùng
 * @access  Private (Chỉ Admin)
 */
router.delete("/:id", protect, authorizeRoles("admin"), validate(schemas.deleteUser), activityLogMiddleware(['delete user']), postActivityLog, deleteUser);

/**
 * @route   PUT /api/users/:id/status
 * @desc    Cập nhật trạng thái hoạt động (Khóa/Mở khóa tài khoản)
 * @access  Private (Chỉ Admin)
 */
router.put(
    "/:id/status",
    protect,
    authorizeRoles("admin"),
    validate(schemas.updateUserStatus), 
    activityLogMiddleware(['put user status', 'lock user']),
    postActivityLog,
    updateUserStatus
);

/**
 * @route   PUT /api/users/:id/role
 * @desc    Cập nhật vai trò người dùng
 * @access  Private (Chỉ Admin)
 */
router.put("/:id/role", protect, authorizeRoles("admin"), validate(schemas.updateUserRole), activityLogMiddleware(['put user role', 'update user role']), postActivityLog, updateUserRole);

export default router;
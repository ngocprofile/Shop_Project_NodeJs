import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserProfile,
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

/**
 * @route   GET /api/users
 * @desc    Lấy danh sách tất cả người dùng
 * @access  Private (Chỉ Admin)
 */
router.get("/", protect, authorizeRoles("admin"), activityLogMiddleware(['get users']), getAllUsers);

// === 2. THÊM ROUTE MỚI Ở ĐÂY ===
// (Đặt route /:id CỤ THỂ này TRƯỚC các route /:id chung chung khác nếu có)
/**
 * @route   GET /api/users/:id
 * @desc    Lấy thông tin người dùng theo ID
 * @access  Private (Chỉ Admin)
 */
router.get(
    "/:id",
    protect,
    authorizeRoles("admin"),
    validate(schemas.mongoIdParam), // <-- Giả sử bạn có schema này để validate req.params.id
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
 * @route   PUT /api/users/:id/status
 * @desc    Cập nhật trạng thái hoạt động (Khóa/Mở khóa tài khoản)
 * @access  Private (Chỉ Admin)
 */


/**
 * @route   DELETE /api/users/:id
 * @desc    Xóa người dùng
 * @access  Private (Chỉ Admin)
 */
router.delete("/:id", protect, authorizeRoles("admin"), validate(schemas.deleteUser), activityLogMiddleware(['delete user']), postActivityLog, deleteUser);
router.put(
    "/:id/status",
    protect,
    authorizeRoles("admin"),
    validate(schemas.updateUserStatus), // <-- Giả sử bạn có schema này
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
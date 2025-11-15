import express from "express";
import {
    createStaff,
    deleteStaff,
    getAllStaff,
    getMyProfile,
    getStaffById,
    updateMyProfile,
    updateStaff,
} from "../controllers/staffController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

/**
 * ======================================================
 * 🧭 ADMIN - QUẢN LÝ DANH SÁCH NHÂN VIÊN
 * ======================================================
 */

/**
 * @route   GET /api/staff
 * @desc    Lấy danh sách toàn bộ nhân viên
 * @access  Private (Admin)
 */
router.get("/", protect, authorizeRoles("admin"), activityLogMiddleware(['get staff']), getAllStaff);

/**
 * @route   GET /api/staff/:id
 * @desc    Lấy thông tin chi tiết 1 nhân viên
 * @access  Private (Admin)
 */
router.get("/:id", protect, authorizeRoles("admin"), activityLogMiddleware(['get staff by id']), getStaffById);

/**
 * @route   POST /api/staff
 * @desc    Tạo nhân viên mới
 * @access  Private (Admin)
 */
router.post("/", protect, authorizeRoles("admin"), validate(schemas.createStaff), activityLogMiddleware(['post staff', 'create staff']), createStaff);

/**
 * @route   PUT /api/staff/:id
 * @desc    Cập nhật thông tin nhân viên
 * @access  Private (Admin)
 */
router.put("/:id", protect, authorizeRoles("admin"), validate(schemas.updateStaff), activityLogMiddleware(['put staff', 'update staff']), postActivityLog, updateStaff);

/**
 * @route   DELETE /api/staff/:id
 * @desc    Xóa nhân viên
 * @access  Private (Admin)
 */
router.delete("/:id", protect, authorizeRoles("admin"), activityLogMiddleware(['delete staff']), postActivityLog, deleteStaff);

/**
 * ======================================================
 * 👤 STAFF - QUẢN LÝ THÔNG TIN CÁ NHÂN
 * ======================================================
 */

/**
 * @route   GET /api/staff/profile
 * @desc    Nhân viên xem thông tin cá nhân
 * @access  Private (Staff)
 */
router.get("/profile/me", protect, authorizeRoles("staff"), activityLogMiddleware(['get profile']), getMyProfile);

/**
 * @route   PUT /api/staff/profile
 * @desc    Nhân viên cập nhật thông tin cá nhân
 * @access  Private (Staff)
 */
router.put("/profile/me", protect, authorizeRoles("staff"), validate(schemas.updateMyProfile), activityLogMiddleware(['put profile', 'update profile']), postActivityLog, updateMyProfile);

export default router;
// backend/src/routes/authRoutes.js
import express from "express";
import {
    changePassword,
    forgotPassword,
    login,
    logout,
    refreshToken,
    register,
    resetPassword,
} from "../controllers/authController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký tài khoản mới
 * @access  Public
 */
router.post(
    "/register",
    validate(schemas.register),
    activityLogMiddleware(["post register", "create user"]),
    register
);

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập tài khoản
 * @access  Public
 */
router.post(
    "/login",
    validate(schemas.login),
    activityLogMiddleware(["post login"]),
    login
);

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Làm mới Access Token
 * @access  Public
 */
router.post(
    "/refresh-token",
    activityLogMiddleware(["post refresh token"]),
    refreshToken
);

/**
 * @route   POST /api/auth/logout
 * @desc    Đăng xuất người dùng
 * @access  Private
 */
router.post(
    "/logout",
    protect,
    activityLogMiddleware(["post logout"]),
    logout
);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Đổi mật khẩu tài khoản hiện tại
 * @access  Private
 */
router.put(
    "/change-password",
    protect,
    validate(schemas.changePassword),
    activityLogMiddleware(["put change password"]),
    postActivityLog,
    changePassword
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Yêu cầu gửi email reset mật khẩu (link)
 * @access  Public
 */
router.post(
    "/forgot-password",
    validate(schemas.forgotPassword),
    activityLogMiddleware(["post forgot password"]),
    forgotPassword
);

/**
 * @route   PUT /api/auth/reset-password/:token
 * @desc    Đặt lại mật khẩu bằng token
 * @access  Public
 */
router.put(
    "/reset-password/:token",
    validate(schemas.resetPassword),
    activityLogMiddleware(["put reset password"]),
    resetPassword
);

// =======================================
// QUÊN MẬT KHẨU BẰNG OTP
// =======================================

/**
 * @route   POST /api/auth/forgot-password-otp
 * @desc    Gửi mã OTP về email
 * @access  Public
 */
router.post(
    "/forgot-password-otp",
    validate(schemas.forgotPassword),
    activityLogMiddleware(["post forgot password otp", "send otp"]),
    forgotPassword
);

/**
 * @route   POST /api/auth/verify-otp-reset
 * @desc    Xác nhận OTP và đặt lại mật khẩu
 * @access  Public
 */
router.post(
    "/verify-otp-reset",
    validate(schemas.resetPassword), // ĐÃ SỬA TÊN SCHEMA
    activityLogMiddleware(["post verify otp reset", "reset password by otp"]),
    postActivityLog,
    resetPassword
);

export default router;
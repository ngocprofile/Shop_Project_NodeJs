// backend/validators/authValidator.js
import { z } from "zod";

// ĐĂNG KÝ
export const registerSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  phone: z.string().optional(),
  role: z.enum(["user", "admin"]).optional().default("user"),
});

// ĐĂNG NHẬP
export const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

// ĐỔI MẬT KHẨU
export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Vui lòng nhập mật khẩu cũ"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
});

// QUÊN MẬT KHẨU (LINK)
export const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

// RESET MẬT KHẨU (LINK)
export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

// GỬI OTP – MỚI THÊM
export const forgotPasswordOTPSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

// XÁC NHẬN OTP + RESET – MỚI THÊM
export const verifyOTPAndResetPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
});
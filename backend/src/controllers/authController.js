// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Token from "../models/tokenModel.js";
import User from "../models/userModel.js";
import {
  sendOtpEmail,
  sendPasswordChangeEmail,
  sendWelcomeEmail
} from "../utils/emailUtils.js";
import {
  blacklistToken,
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
  saveRefreshToken
} from "../utils/tokenUtils.js";
import { validateEmail, validatePassword, validatePhone } from "../utils/validationUtils.js";

dotenv.config();

// ĐĂNG KÝ
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.validated.body;

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      const error = new Error(emailCheck.message);
      error.statusCode = 400;
      return next(error);
    }
    if (phone) {
      const phoneCheck = validatePhone(phone);
      if (!phoneCheck.isValid) {
        const error = new Error(phoneCheck.message);
        error.statusCode = 400;
        return next(error);
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email đã được sử dụng");
      error.statusCode = 400;
      return next(error);
    }

    const newUser = await User.create({
      name,
      email,
      password: password,
      phone,
      role
    });

    const accessToken = generateAccessToken(newUser._id);
    const refreshTokenStr = generateRefreshToken(newUser._id);
    await saveRefreshToken(newUser._id, refreshTokenStr, 'refresh');

    await sendWelcomeEmail(newUser.email, newUser.name);

    res.status(201).json({
      message: "Đăng ký thành công",
      accessToken,
      refreshToken: refreshTokenStr,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ĐĂNG NHẬP
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validated.body;

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      const error = new Error(emailCheck.message);
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Email không tồn tại");
      error.statusCode = 404;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Mật khẩu không chính xác");
      error.statusCode = 401;
      return next(error);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshTokenStr = generateRefreshToken(user._id);
    await saveRefreshToken(user._id, refreshTokenStr, 'refresh');

    res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken,
      refreshToken: refreshTokenStr,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    next(error);
  }
};

// LÀM MỚI TOKEN
export const refreshToken = async (req, res, next) => {
  try {
    const { token: refreshToken } = req.body;
    if (!refreshToken) {
      const error = new Error("Thiếu refresh token");
      error.statusCode = 401;
      return next(error);
    }

    const { accessToken, userId } = await refreshAccessToken(refreshToken);

    res.status(200).json({
      message: "Refresh token thành công",
      accessToken
    });
  } catch (error) {
    next(error);
  }
};

// ĐĂNG XUẤT
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await blacklistToken(refreshToken);
    }
    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    next(error);
  }
};

// ĐỔI MẬT KHẨU
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.validated.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Không tìm thấy người dùng");
      error.statusCode = 404;
      return next(error);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      const error = new Error("Mật khẩu cũ không đúng");
      error.statusCode = 400;
      return next(error);
    }

    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.isValid) {
      const error = new Error(passwordCheck.message);
      error.statusCode = 400;
      return next(error);
    }

    user.password = newPassword;
    await user.save();

    await Token.deleteMany({ userId });
    await sendPasswordChangeEmail(user.email, user.name);

    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    next(error);
  }
};


// 🧩 Quên mật khẩu (Gửi mã OTP)
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.validated.body;
    console.log(`[FORGOT PASSWORD] Bắt đầu xử lý yêu cầu cho email: ${email}`);

    // ✅ B1: Kiểm tra user có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`[FORGOT PASSWORD] Không tìm thấy người dùng với email: ${email}`);
      const error = new Error("Email không tồn tại trong hệ thống");
      error.statusCode = 404;
      return next(error);
    }

    console.log(`[FORGOT PASSWORD] Tìm thấy user: ${user.name} (${user.email})`);

    // ✅ B2: Tạo mã OTP ngẫu nhiên 6 chữ số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[FORGOT PASSWORD] Tạo OTP thành công: ${otp}`);

    // ✅ B3: Lưu OTP vào DB với thời hạn 3 phút
    user.otpCode = otp;
    user.otpExpire = Date.now() + 3 * 60 * 1000; // 3 phút
    await user.save();
    console.log(`[FORGOT PASSWORD] Đã lưu OTP vào database (hết hạn sau 3 phút)`);

    // ✅ B4: Gửi email chứa mã OTP
    try {
      await sendOtpEmail(user.email, otp, user.name);
      console.log(`[FORGOT PASSWORD] Đã gửi OTP tới ${user.email}`);
    } catch (emailError) {
      console.error(`[FORGOT PASSWORD] Gửi email OTP thất bại:`, emailError.message);
      const error = new Error("Không thể gửi email OTP. Vui lòng thử lại sau.");
      error.statusCode = 500;
      return next(error);
    }

    // ✅ B5: Phản hồi thành công
    res.status(200).json({
      message: "Đã gửi mã OTP đặt lại mật khẩu qua email",
    });
    console.log(`[FORGOT PASSWORD] Hoàn tất quá trình gửi OTP cho ${email}`);
  } catch (error) {
    console.error(`[FORGOT PASSWORD] Lỗi hệ thống:`, error);
    next(error);
  }
};

// 🧩 Reset mật khẩu bằng OTP (có log chi tiết)
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.validated.body;
    console.log(`[RESET PASSWORD] Bắt đầu xử lý reset cho email: ${email}`);

    // ✅ B1: Kiểm tra thông tin đầu vào
    if (!email || !otp || !newPassword) {
      console.warn(`[RESET PASSWORD] Thiếu thông tin cần thiết: email=${!!email}, otp=${!!otp}, newPassword=${!!newPassword}`);
      const error = new Error("Thiếu thông tin cần thiết (email, otp hoặc mật khẩu)");
      error.statusCode = 400;
      return next(error);
    }

    // ✅ B2: Tìm user theo email + OTP còn hạn
    const user = await User.findOne({
      email,
      otpCode: String(otp),
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.warn(`[RESET PASSWORD] OTP không hợp lệ hoặc đã hết hạn cho email: ${email}`);
      const error = new Error("OTP không hợp lệ hoặc đã hết hạn");
      error.statusCode = 400;
      return next(error);
    }
    console.log(`[RESET PASSWORD] Xác thực OTP thành công cho user: ${user.name} (${user.email})`);

    // ✅ B3: Kiểm tra độ mạnh mật khẩu
    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.isValid) {
      console.warn(`[RESET PASSWORD] Mật khẩu mới không đạt yêu cầu: ${passwordCheck.message}`);
      const error = new Error(passwordCheck.message);
      error.statusCode = 400;
      return next(error);
    }

    // ✅ B4: Gán mật khẩu mới và xóa OTP
    user.password = newPassword; // pre-save hook sẽ tự hash
    user.otpCode = undefined;
    user.otpExpire = undefined;

    await user.save();
    console.log(`[RESET PASSWORD] Đã cập nhật mật khẩu mới thành công cho ${user.email}`);

    // ✅ B5: Xóa refresh tokens cũ (bắt buộc đăng nhập lại)
    await Token.deleteMany({ userId: user._id });
    console.log(`[RESET PASSWORD] Đã xóa toàn bộ refresh tokens cũ của userId: ${user._id}`);

    // ✅ B6: Phản hồi thành công
    res.status(200).json({
      message: "Đặt lại mật khẩu thành công",
    });
    console.log(`[RESET PASSWORD] Hoàn tất quá trình đặt lại mật khẩu cho ${email}`);
  } catch (error) {
    console.error(`[RESET PASSWORD] Lỗi hệ thống:`, error);
    next(error);
  }
};
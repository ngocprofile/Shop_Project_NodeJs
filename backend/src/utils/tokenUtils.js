import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Token from '../models/tokenModel.js'; // Model lưu refresh tokens
dotenv.config();

/**
 * 🧩 Sinh Access Token (ngắn hạn, 1h)
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * 🧩 Sinh Refresh Token (dài hạn, 7 ngày)
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

/**
 * 🧩 Lưu Refresh Token vào DB
 */
export const saveRefreshToken = async (userId, refreshToken) => {
  await Token.create({
    userId,
    token: refreshToken, // ✅ đúng tên field trong schema
    type: 'refresh', // ✅ đúng enum trong model
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày
  });
};

/**
 * 🧩 Xác thực Token (access hoặc refresh)
 */
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('❌ Token verify error:', error.message);
    return null;
  }
};

/**
 * 🧩 Làm mới Access Token từ Refresh Token
 */
export const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
  if (!decoded) {
    throw new Error('Refresh token không hợp lệ hoặc hết hạn');
  }

  // ✅ Kiểm tra token còn tồn tại trong DB
  const existingToken = await Token.findOne({
    token: refreshToken, // ✅ đúng tên field
    type: 'refresh',     // ✅ đúng enum
    expiresAt: { $gt: new Date() },
  });

  if (!existingToken) {
    throw new Error('Refresh token đã bị vô hiệu hóa hoặc không tồn tại');
  }

  const accessToken = generateAccessToken(decoded.userId);
  return { accessToken, userId: decoded.userId };
};

/**
 * 🧩 Xóa Refresh Token khi logout
 */
export const blacklistToken = async (refreshToken) => {
  await Token.findOneAndDelete({
    token: refreshToken, // ✅ đúng tên field
    type: 'refresh',
  });
};

/**
 * 🧩 Kiểm tra token có bị blacklist (hết hạn)
 */
export const isTokenBlacklisted = async (refreshToken) => {
  const tokenDoc = await Token.findOne({
    token: refreshToken, // ✅ đúng tên field
    type: 'refresh',
  });
  return tokenDoc ? tokenDoc.expiresAt < new Date() : false;
};

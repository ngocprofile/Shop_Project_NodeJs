import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
dotenv.config();

/**
 * 🧩 Middleware xác thực JWT (kiểm tra người dùng đã đăng nhập hay chưa)
 */
export const protect = async (req, res, next) => {
    let token;

    try {
        // Token gửi qua header: Authorization: Bearer <token>
        if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        ) {
        token = req.headers.authorization.split(" ")[1];

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Lấy thông tin user và gán vào req
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "Không tìm thấy người dùng" });
        }

        next();
        } else {
        return res
            .status(401)
            .json({ message: "Không có token, quyền truy cập bị từ chối" });
        }
    } catch (error) {
        console.error("Lỗi xác thực token:", error);
        return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" });
    }
};

/**
 * 🧩 Middleware phân quyền (ví dụ: chỉ Admin mới được truy cập)
 */
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
        return res.status(401).json({ message: "Chưa xác thực người dùng" });
        }

        if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            message: `Tài khoản ${req.user.role} không có quyền truy cập tài nguyên này`,
        });
        }

        next();
    };
};
// middleware/errorMiddleware.js
import { validationResult } from "express-validator"; // Nếu dùng express-validator
import multer from "multer"; // Import để instanceof MulterError

/**
 * 🛡️ Middleware xử lý lỗi toàn cục (Global Error Handler)
 * - Đặt ở CUỐI app.js: app.use(errorMiddleware);
 * - Bắt tất cả lỗi: Mongoose, JWT, Validation (Joi/Express), Async, Multer, Custom, v.v.
 * - Trả response JSON thống nhất: { success: false, message: "...", errors?: [...], stack?: "..." }
 * - Log lỗi chi tiết (console hoặc logger nếu có)
 * - Hỗ trợ dev mode: Show stack trace nếu NODE_ENV=development
 */
const errorMiddleware = (err, req, res, next) => {
    // Default response
    let statusCode = err.statusCode || 500;
    let message = err.message || "Lỗi server nội bộ";
    let errors = [];

    // 1. Xử lý lỗi Validation từ Mongoose
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Dữ liệu không hợp lệ";
        errors = Object.values(err.errors).map((val) => ({
        field: val.path,
        message: val.message,
        type: val.kind,
        }));
    }

    // 2. Xử lý CastError (ID không hợp lệ, e.g., ObjectId sai format)
    if (err.name === "CastError") {
        statusCode = 404;
        message = "Tài nguyên không tồn tại (ID không hợp lệ)";
    }

    // 3. Xử lý lỗi MongoDB (Duplicate key, Connection error, etc.)
    if (err.name === "MongoError" || err.code === 11000) {
        statusCode = 400;
        if (err.code === 11000) {
        message = "Dữ liệu trùng lặp (Duplicate key error)";
        // Extract duplicate field
        const field = Object.keys(err.keyPattern)[0];
        message += `: ${field}`;
        } else if (err.name === "MongoNetworkError") {
        statusCode = 503;
        message = "Lỗi kết nối MongoDB";
        } else {
        message = "Lỗi MongoDB";
        }
    }

    // 4. Xử lý lỗi JWT
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Token không hợp lệ";
    }
    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token đã hết hạn";
    }

    // 5. Xử lý lỗi Validation từ express-validator
    if (!validationResult(req).isEmpty()) {
        statusCode = 400;
        message = "Dữ liệu đầu vào không hợp lệ";
        errors = validationResult(req).array().map((errObj) => ({
        field: errObj.param,
        message: errObj.msg,
        }));
    }

    // 6. Xử lý lỗi Joi (từ validateMiddleware)
    if (err.isJoi || err.name === 'ValidationError' && err.details) { // Joi specific
        statusCode = 400;
        message = "Dữ liệu đầu vào không hợp lệ (Joi)";
        errors = err.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
        type: detail.type,
        }));
    }

    // 7. Xử lý lỗi Multer (Upload file)
    if (err.code === "LIMIT_FILE_SIZE") {
        statusCode = 400;
        message = "File quá lớn (vượt giới hạn kích thước)";
    }
    if (err.code === "MULTIPART_INVALID") {
        statusCode = 400;
        message = "Dữ liệu upload không hợp lệ";
    }
    if (err instanceof multer.MulterError) {
        statusCode = 400;
        message = `Lỗi upload file: ${err.message}`;
    }

    // 8. Xử lý lỗi Async (Unhandled promise rejection) - Cảnh báo, fallback
    if (err.name === "UnhandledPromiseRejectionWarning") {
        statusCode = 500;
        message = "Lỗi bất đồng bộ chưa xử lý";
    }

    // 9. Xử lý lỗi Custom (nếu bạn throw custom error với statusCode)
    if (err.isOperational || err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // 10. Xử lý lỗi TypeError/ReferenceError (e.g., gọi method không tồn tại)
    if (err instanceof TypeError || err instanceof ReferenceError) {
        statusCode = 400;
        message = `Lỗi logic: ${err.message}`;
    }

    // 11. Lỗi chung (fallback) - Bao quát hầu hết cases còn lại (bcrypt, crypto, etc.)
    if (!statusCode || statusCode === 500) {
        message = "Có lỗi xảy ra. Vui lòng thử lại sau.";
    }

    // Log lỗi (sử dụng console hoặc Winston logger nếu có)
    console.error(`[${new Date().toISOString()}] Lỗi: ${err.message}`);
    console.error("Stack:", err.stack);
    console.error("Request URL:", req.originalUrl);
    console.error("Request Method:", req.method);
    console.error("User ID:", req.user?.id || "Anonymous");

    // Response thống nhất
    res.status(statusCode).json({
        success: false,
        message,
        ...(errors.length > 0 && { errors }), // Chỉ thêm nếu có
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Stack chỉ ở dev
    });
};

export default errorMiddleware;
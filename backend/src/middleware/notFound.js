// middleware/notFound.js
/**
 * 🛡️ Middleware xử lý route không tìm thấy (404 Handler)
 * - Đặt trước errorMiddleware trong app.js.
 * - Tạo lỗi 404 và chuyền cho errorMiddleware để format JSON thống nhất.
 * - Message tùy chỉnh với URL request để dễ debug.
 */
const notFound = (req, res, next) => {
    const error = new Error(`Không tìm thấy: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error); // Chuyền cho errorMiddleware để xử lý response JSON
};

export default notFound;
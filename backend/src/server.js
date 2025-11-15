// server.js 
import dotenv from "dotenv";
import http from "http";
import app from "./app.js"; // Sửa nếu app.js ở root, hoặc "./src/app.js" nếu dùng src
import connectDB from "./config/db.js"; // Đường dẫn đúng

dotenv.config();

/**
 * Lấy PORT từ biến môi trường (env) hoặc mặc định 5000
 */
const PORT = normalizePort(process.env.PORT || "5000");

/**
 * Kết nối Database (chỉ gọi một lần ở đây)
 */
connectDB();

/**
 * Tạo HTTP server
 */
const server = http.createServer(app);

/**
 * Lắng nghe cổng và xử lý sự kiện
 */
server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Bắt lỗi unhandled rejection (async errors toàn cục)
 */
process.on('unhandledRejection', (err) => {
    console.error('💥 Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

/**
 * Chuẩn hóa PORT thành số hoặc chuỗi pipe
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val; // pipe name
    }
    if (port >= 0) {
        return port; // valid port number
    }
    return false;
}

/**
 * Hàm xử lý lỗi khởi động server
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

    // Xử lý từng loại lỗi cụ thể
    switch (error.code) {
        case "EACCES":
            console.error(`❌ ${bind} yêu cầu quyền truy cập cao hơn (run as admin).`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`⚠️ ${bind} đang được sử dụng bởi tiến trình khác.`);
            process.exit(1);
            break;
        default:
            console.error(`💥 Lỗi không xác định khi khởi động server: ${error.code}`);
            throw error;
    }
}

/**
 * Khi server bắt đầu lắng nghe
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`🚀 Server đang chạy ở ${bind}`);
}
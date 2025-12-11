import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';

// Import middleware
import { activityLogMiddleware } from "./middleware/activityLogMiddleware.js"; // Chỉ cần pre-log
import errorMiddleware from "./middleware/errorMiddleware.js";
import notFound from "./middleware/notFound.js";

// Import routes
import activityLogRoutes from "./routes/activityLogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import statRoutes from "./routes/statsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import variantRoutes from "./routes/variantRoutes.js"; // ❌ ĐÃ XÓA/HỢP NHẤT
//them cartRoutes
import cartRoutes from "./routes/cartRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";

dotenv.config();

// --- 1. THIẾT LẬP __dirname CHO ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🧱 Middleware cơ bản
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 10000, standardHeaders: true, legacyHeaders: false }));

// Middleware 1: Logging
app.use('/uploads', (req, res, next) => {
    console.log(`[Static Serve] Đang cố gắng phục vụ file: ${req.originalUrl}`); 
    next();
});

// 🏆 Middleware 2: PHỤC VỤ FILE TĨNH
app.use(
    '/uploads', 
    express.static(path.join(__dirname, '../uploads'))
);

// 🧩 Global Activity Log (Chỉ PRE-log)
app.use((req, res, next) => {
    if (req.user) {
        // Chỉ chuẩn bị data log, không gọi postActivityLog ở đây
        activityLogMiddleware([])(req, res, next); 
    } else {
        next(); 
    }
});


// 🧭 Routes chính
app.get("/", (req, res) => {
    res.status(200).json({ message: "✅ API is running..." });
});

// Đăng ký các Routes
app.use("/api/auth", authRoutes);

// ✅ ĐÃ HỢP NHẤT: Tất cả biến thể, size đều nằm dưới Product Routes
app.use("/api/products", productRoutes); 

app.use("/api/vouchers", voucherRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
// app.use("/api/variants", variantRoutes); // ❌ ĐÃ HỦY ĐĂNG KÝ

// Protected routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/activity-logs", activityLogRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/cart", cartRoutes);

// 🧩 Bắt lỗi không tìm thấy route (404)
app.use(notFound);

// 🧩 Middleware xử lý lỗi chung (global error handler)
app.use(errorMiddleware);

export default app;
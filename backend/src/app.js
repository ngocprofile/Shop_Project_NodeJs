// app.js 
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

// Import middleware
import errorMiddleware from "./middleware/errorMiddleware.js"; // Global error handler
import notFound from "./middleware/notFound.js"; // 404 handler

// Import activity log middleware (global tùy chọn)
import { activityLogMiddleware, postActivityLog } from "./middleware/activityLogMiddleware.js";

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
import userRoutes from "./routes/userRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";

dotenv.config();
// Không gọi connectDB() ở đây - gọi ở server.js

const app = express();

// 🧱 Middleware cơ bản
app.use(express.json({ limit: "10kb" })); // Giới hạn kích thước body
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(helmet()); // Bảo vệ header HTTP
//app.use(xssClean()); // Ngăn tấn công XSS
app.use(morgan("dev")); // Ghi log request

// 🚨 Giới hạn request (rate limit) - JSON message
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // tối đa 100 request / 15 phút
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({ 
            success: false, 
            message: "⚠️ Too many requests, please try again later!" 
        });
    }
});
app.use(limiter);

// 🧩 Global Activity Log (di chuyển trước routes để log tất cả)
app.use((req, res, next) => {
    if (req.user) {  // Chỉ log nếu đã auth
        // Pre-log tất cả actions
        activityLogMiddleware([])(req, res, next);  // [] = log tất cả

        // Post-log chỉ cho PUT/DELETE (success/fail)
        if (req.method === 'PUT' || req.method === 'DELETE') {
            postActivityLog(req, res, next);
        } else {
            next();
        }
    } else {
        next();  // Bỏ qua anonymous
    }
});

// 🧭 Routes chính
app.get("/", (req, res) => {
    res.status(200).json({ message: "✅ API is running..." });
});

// Auth routes (public)
app.use("/api/auth", authRoutes);

// Public routes (không cần protect)
app.use("/api/products", productRoutes); // Một số public như GET
app.use("/api/vouchers", voucherRoutes); // Active vouchers public
app.use("/api/shipping", shippingRoutes); // GET methods public
app.use("/api/categories", categoryRoutes); // Public GET
app.use("/api/brands", brandRoutes); // Public GET

// Protected routes (cần protect - nhưng đã tích hợp trong routes files)
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/activity-logs", activityLogRoutes);

// 🧩 Bắt lỗi không tìm thấy route (404)
app.use(notFound);

// 🧩 Middleware xử lý lỗi chung (global error handler)
app.use(errorMiddleware);

export default app;
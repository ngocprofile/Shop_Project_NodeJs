import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Kiểm tra biến môi trường
        if (!process.env.MONGO_URI) {
        throw new Error("❌ MONGO_URI is not defined in .env file!");
        }

        // Cấu hình kết nối an toàn
        const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // autoIndex: false, // tránh leak index trong môi trường production
        serverSelectionTimeoutMS: 10000, // timeout sau 10s nếu không kết nối được
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, options);

        // Log gọn gàng, không in URI
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        // Theo dõi trạng thái
        mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB disconnected. Retrying in 5s...");
        setTimeout(connectDB, 5000); // Tự động thử lại sau 5 giây
        });

        mongoose.connection.on("error", (err) => {
        console.error(`❌ MongoDB error: ${err.message}`);
        });

        // Xử lý ngắt kết nối an toàn
        process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("🛑 MongoDB connection closed due to app termination");
        process.exit(0);
        });

    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

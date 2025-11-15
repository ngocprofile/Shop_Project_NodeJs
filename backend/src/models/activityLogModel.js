import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
    {
        // 👤 Ai thực hiện hành động
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

        // 🧭 Hành động gì (VD: “Login”, “Create Order”, “Update Product”)
        action: {
        type: String,
        required: true,
        },

        // 📍 Mô tả chi tiết
        description: {
        type: String,
        default: "",
        },

        // 🌐 Địa chỉ IP (phục vụ bảo mật)
        ipAddress: {
        type: String,
        default: "",
        },

        // 💻 Thiết bị / trình duyệt
        userAgent: {
        type: String,
        default: "",
        },
    },
    { timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        // 🧍 Người nhận thông báo
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

        // 📨 Tiêu đề thông báo
        title: {
        type: String,
        required: true,
        },

        // 📝 Nội dung chi tiết
        message: {
        type: String,
        required: true,
        },

        // 🔗 Liên kết tới hành động cụ thể (VD: orderId, voucherId,…)
        link: {
        type: String,
        default: "",
        },

        // 👀 Trạng thái đã đọc / chưa đọc
        isRead: {
        type: Boolean,
        default: false,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;

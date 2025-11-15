import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        // 🔗 Tham chiếu người dùng
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

        // 🔐 Token lưu trong DB (mã hoá)
        token: {
        type: String,
        required: true,
        },

        // 💡 Loại token (refresh / verifyEmail / resetPassword)
        type: {
        type: String,
        enum: ["refresh", "verifyEmail", "resetPassword"],
        required: true,
        },

        // ⏰ Hạn sử dụng token
        expiresAt: {
        type: Date,
        required: true,
        },
    },
    { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);
export default Token;

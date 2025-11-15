import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        // 📁 Tên file gốc
        filename: {
        type: String,
        required: true,
        },

        // 🌐 Đường dẫn lưu trữ (VD: URL S3, Cloudinary, hoặc local)
        url: {
        type: String,
        required: true,
        },

        // 🎞️ Loại media (image, video, pdf,…)
        type: {
        type: String,
        enum: ["image", "video", "document"],
        default: "image",
        },

        // 📦 Đối tượng liên kết (sản phẩm, người dùng, feedback,…)
        relatedModel: {
        type: String, // "Product", "User", "Feedback", …
        required: true,
        },

        relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        },

        // 🗑️ Đánh dấu xóa tạm thời
        isDeleted: {
        type: Boolean,
        default: false,
        },
    },
    { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
export default Media;

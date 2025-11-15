import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        // 🧍 Người đánh giá
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

        // 📦 Sản phẩm được đánh giá
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        },

        // ⭐ Điểm đánh giá (1–5)
        rating: {
        type: Number,
        required: [true, "Vui lòng chọn số sao đánh giá"],
        min: 1,
        max: 5,
        },

        // ✍️ Nội dung nhận xét
        comment: {
        type: String,
        default: "",
        },

        // 🖼️ Hình ảnh minh họa do khách tải lên
        images: [
        {
            type: String, // URL ảnh
        },
        ],
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;

import mongoose from "mongoose";
// ngoc
const brandSchema = new mongoose.Schema(
    {
        // 🏷️ Tên thương hiệu
        name: {
        type: String,
        required: [true, "Tên thương hiệu là bắt buộc"],
        unique: true,
        trim: true,
        },

        // 🧾 Mô tả ngắn gọn về thương hiệu
        description: {
        type: String,
        default: "",
        },

        // 🌍 Quốc gia hoặc khu vực thương hiệu
        origin: {
        type: String,
        default: "",
        },

        // 📸 Logo thương hiệu (URL ảnh)
        logo: {
        type: String,
        default: "",
        },

        // 🔁 Trạng thái hiển thị (ẩn / hiện thương hiệu)
        isActive: {
        type: Boolean,
        default: true,
        },
    },
    { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;

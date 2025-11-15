import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        // 🏷️ Tên danh mục (ví dụ: “Áo Thun”, “Giày Nam”)
        name: {
        type: String,
        required: [true, "Tên danh mục là bắt buộc"],
        unique: true,
        trim: true,
        },

        // 🧾 Mô tả danh mục
        description: {
        type: String,
        default: "",
        },

        // 📂 Danh mục cha (nếu có), giúp tạo danh mục con (sub-category)
        parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null, // null → là danh mục cấp cao nhất
        },

        // 🖼️ Ảnh đại diện cho danh mục (hiển thị trên giao diện)
        image: {
        type: String,
        default: "",
        },

        // 🔁 Trạng thái hoạt động của danh mục
        isActive: {
        type: Boolean,
        default: true,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;

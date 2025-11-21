import mongoose from "mongoose";
import slugify from "slugify"; // <-- 1. IMPORT SLUGIFY

const categorySchema = new mongoose.Schema(
    {
        // 🏷️ Tên danh mục (ví dụ: “Áo Thun”, “Giày Nam”)
        name: {
            type: String,
            required: [true, "Tên danh mục là bắt buộc"],
            unique: true,
            trim: true,
        },

        // --- 2. THÊM TRƯỜNG SLUG ---
        // 🔗 Slug (ví dụ: "ao-thun", "giay-nam")
        slug: {
            type: String,
            unique: true,
            index: true, // Giúp tìm kiếm/query nhanh hơn
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

// --- 3. THÊM HOOK TỰ ĐỘNG TẠO SLUG ---
// Hook này sẽ chạy TRƯỚC KHI .save() được thực thi
categorySchema.pre("save", function (next) {
    // Chỉ tạo slug nếu 'name' được thay đổi (hoặc khi tạo mới)
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { 
            lower: true,    // Chuyển thành chữ thường
            strict: true,   // Xóa các ký tự đặc biệt (như '!')
            locale: 'vi'    // Xử lý các ký tự tiếng Việt (ví dụ: 'Áo' -> 'ao')
        });
    }
    next(); // Tiếp tục quá trình .save()
});


const Category = mongoose.model("Category", categorySchema);
export default Category;
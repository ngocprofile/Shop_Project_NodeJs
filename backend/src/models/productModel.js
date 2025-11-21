import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // 🔗 URL thân thiện (SEO). VD: "ao-thun-trang"
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        
        // 💰 GIÁ CẢ
        basePrice: {
            type: Number,
            required: true,
            min: 0,
        },
        finalPrice: {
            type: Number,
            default: 0,
            min: 0,
        },
        // Voucher đang áp dụng (nếu có)
        appliedVoucher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher",
            default: null,
        },

        // 🖼️ HÌNH ẢNH
        // Ảnh đại diện (hiện ở ProductCard)
        featuredImage: {
            type: String,
            default: "",
        },
        // Ảnh chi tiết (hiện ở trang ProductDetail - Slider)
        gallery: {
            type: [String],
            default: [],
        },

        // ⭐ ĐÁNH GIÁ (Phục vụ ProductCard)
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
            index: true, // Index để sort theo rating nhanh
        },
        reviewCount: {
            type: Number,
            default: 0,
        },

        // 📈 THỐNG KÊ (Phục vụ sort "Bán chạy nhất")
        sold: {
            type: Number,
            default: 0,
            index: true,
        },

        // 🏷️ THUỘC TÍNH KHÁC
        gender: {
            type: String,
            enum: ["Nam", "Nữ", "Unisex"],
            default: "Unisex",
        },
        material: {
            type: String,
            trim: true,
        },

        // 🌟 CẬP NHẬT: Tham chiếu đến mô hình ColorVariant mới
        variants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ColorVariant", // ⬅️ ĐÃ THAY ĐỔI
            },
        ],

        // ⚙️ TRẠNG THÁI
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// --- MIDDLEWARE ---

// 1. Tự động tạo Slug từ Name trước khi lưu (nếu chưa có slug)
productSchema.pre("save", function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "") // Xóa ký tự đặc biệt
            .replace(/[\s_-]+/g, "-") // Thay khoảng trắng bằng -
            .replace(/^-+|-+$/g, ""); // Cắt - ở đầu/cuối
    }
    next();
});

// 2. Tự động set finalPrice = basePrice nếu không có giá giảm
productSchema.pre("save", function (next) {
    if (this.finalPrice === undefined || this.finalPrice === null || this.finalPrice === 0) {
        this.finalPrice = this.basePrice;
    }
    next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
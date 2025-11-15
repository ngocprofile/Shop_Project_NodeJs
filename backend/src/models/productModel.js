import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
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
        basePrice: {
        type: Number,
        required: true,
        },

        // 🖼️ Ảnh sản phẩm
        images: [
        {
            url: {
            type: String,
            required: true,
            },
            public_id: {
            type: String,
            default: null,
            },
            isMain: {
            type: Boolean,
            default: false,
            },
        },
        ],

        gender: {
        type: String,
        enum: ["Nam", "Nữ", "Unisex"],
        default: "Unisex",
        },
        material: {
        type: String,
        trim: true,
        },

        variants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Variant",
        },
        ],

        // 💰 Giá cuối cùng sau khi áp voucher (tự động tính toán)
        finalPrice: {
        type: Number,
        default: 0,
        },

        // 🏷️ Lưu voucher hiện tại nếu đang được áp dụng
        appliedVoucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
        default: null,
        },

        // ⚙️ Trạng thái hiển thị
        isActive: {
        type: Boolean,
        default: true,
        },
    },
    {
        timestamps: true,
    }
);

// 🔄 Tự động cập nhật finalPrice nếu có basePrice
productSchema.pre("save", async function (next) {
    if (!this.finalPrice || this.finalPrice === 0) {
        this.finalPrice = this.basePrice;
    }
    next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;

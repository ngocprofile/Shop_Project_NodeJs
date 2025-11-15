import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
    {
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        },
        color: {
        type: String,
        required: true,
        trim: true,
        },
        size: {
        type: String,
        required: true,
        trim: true,
        },
        price: {
        type: Number,
        required: true,
        },
        stock: {
        type: Number,
        default: 0,
        },

        // 🖼️ Ảnh biến thể
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

        // 💰 Giá cuối cùng (sau khi voucher áp vào sản phẩm cha)
        finalPrice: {
        type: Number,
        default: 0,
        },

        // 🏷️ Lưu voucher hiện tại nếu được hưởng
        appliedVoucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voucher",
        default: null,
        },
    },
    {
        timestamps: true,
    }
);

// 🔄 Nếu chưa có finalPrice, tự động đặt bằng giá gốc
variantSchema.pre("save", function (next) {
    if (!this.finalPrice || this.finalPrice === 0) {
        this.finalPrice = this.price;
    }
    next();
});

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;

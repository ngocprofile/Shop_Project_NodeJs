import mongoose from "mongoose";

const colorVariantSchema = new mongoose.Schema(
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
        colorCode: { // Mã màu (ví dụ: #FF0000)
            type: String,
            required: false,
            trim: true,
            default: null 
        },
        image: { // Ảnh đại diện cho biến thể màu này
            url: {
                type: String,
                required: false,
                default: "",
            },
            public_id: {
                type: String,
                default: null,
            },
        }, 
        
        // 🎯 Trường tham chiếu tới các Size và Tồn kho thuộc về màu này
        sizes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SizeInventory", // Liên kết đến mô hình mới
            }
        ],

        // 🏷️ Lưu voucher hiện tại (Nếu voucher áp dụng cho toàn bộ màu)
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

// 🔒 UNIQUE COMPOUND INDEX: Đảm bảo không có 2 màu trùng nhau cho cùng một sản phẩm
colorVariantSchema.index(
    { product: 1, color: 1 }, 
    { unique: true, name: 'unique_color_per_product' }
);

const ColorVariant = mongoose.model("ColorVariant", colorVariantSchema);
export default ColorVariant;
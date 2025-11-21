import mongoose from "mongoose";

const sizeInventorySchema = new mongoose.Schema(
    {
        // Liên kết ngược (Parent Reference) tới ColorVariant
        variant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ColorVariant",
            required: true,
        },
        size: { // Tên kích cỡ (ví dụ: S, 40)
            type: String,
            required: true,
            trim: true,
        },
        price: { // Giá bán cơ bản của Size cụ thể này
            type: Number,
            required: true,
            min: 0,
        },
        stock: { // Số lượng tồn kho của Size này
            type: Number,
            default: 0,
            min: 0,
        },
        finalPrice: { // Giá cuối cùng (sau khi áp dụng khuyến mãi/voucher)
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

// 🔒 UNIQUE COMPOUND INDEX: Đảm bảo không có 2 size trùng nhau cho cùng một ColorVariant
sizeInventorySchema.index(
    { variant: 1, size: 1 }, 
    { unique: true, name: 'unique_size_per_variant' }
);

// Tự động set finalPrice nếu chưa có
sizeInventorySchema.pre("save", function (next) {
    if (!this.finalPrice || this.finalPrice === 0) {
        this.finalPrice = this.price;
    }
    next();
});

const SizeInventory = mongoose.model("SizeInventory", sizeInventorySchema);
export default SizeInventory;
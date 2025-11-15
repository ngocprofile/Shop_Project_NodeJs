import mongoose from "mongoose";

// 🔹 Mỗi mục trong giỏ hàng (Cart Item)
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // liên kết tới sản phẩm trong DB
        required: true,
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant", // nếu sản phẩm có phân loại (màu, size,...)
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // ít nhất 1 sản phẩm
    },
    price: {
        type: Number,
        required: true, // giá hiện tại tại thời điểm thêm vào giỏ (đã giảm nếu có voucher)
    },
    discount: {
        type: Number,
        default: 0, // số tiền giảm trên từng sản phẩm
    },
    voucherCode: {
        type: String,
        default: null, // mã voucher tự động áp (nếu có)
    },
    finalPrice: {
        type: Number,
        required: true, // giá cuối cùng = price - discount
    },
    addedAt: {
        type: Date,
        default: Date.now, // ngày giờ thêm vào giỏ
    },
});

// 🔹 Schema giỏ hàng (Cart tổng thể)
const cartSchema = new mongoose.Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // chủ sở hữu giỏ hàng
        unique: true,   // mỗi user chỉ có 1 giỏ hàng duy nhất
        },
        items: [cartItemSchema], // danh sách sản phẩm trong giỏ
        subtotal: {
        type: Number,
        default: 0, // tổng tiền sản phẩm trước giảm
        },
        totalDiscount: {
        type: Number,
        default: 0, // tổng tiền giảm (nếu có voucher)
        },
        totalPrice: {
        type: Number,
        default: 0, // tổng tiền phải trả (đã giảm)
        },
        updatedAt: {
        type: Date,
        default: Date.now, // cập nhật mỗi khi thay đổi giỏ hàng
        },
    },
    {
        timestamps: true, // tự động thêm createdAt, updatedAt
    }
);

// Cập nhật tự động thời gian khi thay đổi giỏ hàng
cartSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Cart", cartSchema);

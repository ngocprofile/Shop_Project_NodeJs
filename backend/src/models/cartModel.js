import mongoose from "mongoose";

// 🔹 Mỗi mục trong giỏ hàng (Cart Item)
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true,
    },
    // 🎯 CẬP NHẬT: Thay thế 'variant' cũ bằng 2 trường mới
    colorVariant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ColorVariant", // Để lấy màu sắc và hình ảnh
        required: true,
    },
    sizeInventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SizeInventory", // Để lấy kích cỡ và kiểm tra tồn kho
        required: true,
    },
    // ----------------------------------------------------
    quantity: {
        type: Number,
        required: true,
        min: 1, 
    },
    price: {
        type: Number,
        required: true, // Giá bán của SizeInventory tại thời điểm thêm
    },
    discount: {
        type: Number,
        default: 0, // Số tiền giảm (nếu có flash sale/voucher sản phẩm)
    },
    finalPrice: {
        type: Number,
        required: true, // = price - discount
    },
    addedAt: {
        type: Date,
        default: Date.now, 
    },
});

// 🔹 Schema giỏ hàng (Cart tổng thể)
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true, 
            unique: true, 
        },
        items: [cartItemSchema], 
        
        // Tổng số lượng sản phẩm (để hiển thị badge trên icon giỏ hàng nhanh)
        totalQuantity: {
            type: Number,
            default: 0
        },
        
        subtotal: {
            type: Number,
            default: 0, // Tổng tiền hàng (chưa trừ voucher đơn hàng)
        },
        
        // Voucher áp dụng cho toàn bộ đơn hàng (Cart level)
        appliedVoucher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher",
            default: null
        },
        
        totalDiscount: {
            type: Number,
            default: 0, // Tổng tiền giảm giá
        },
        
        totalPrice: {
            type: Number,
            default: 0, // Tổng thanh toán cuối cùng
        },
    },
    {
        timestamps: true, 
    }
);

// Middleware: Tự động tính toán lại tổng tiền mỗi khi lưu
cartSchema.pre("save", function (next) {
    // 1. Tính tổng số lượng item
    this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);

    // 2. Tính Subtotal (Tổng tiền các món hàng sau khi đã trừ giảm giá từng món)
    this.subtotal = this.items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);

    // 3. Tính Total Price (Tạm thời = Subtotal, voucher đơn hàng sẽ tính ở Controller lúc checkout)
    // Nếu có logic voucher đơn hàng lưu trực tiếp trong DB thì trừ ở đây
    this.totalPrice = Math.max(this.subtotal - this.totalDiscount, 0);

    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Cart", cartSchema);
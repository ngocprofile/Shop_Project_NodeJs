import mongoose from "mongoose";

// ----------------------------
// 🔹 Schema con: Snapshot sản phẩm (Lưu cứng thông tin lúc mua)
// ----------------------------
const orderItemSchema = new mongoose.Schema({
    // Tham chiếu cấp 1: Product (để lấy thống kê chung)
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    // Tham chiếu cấp 2: Màu sắc
    colorVariant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ColorVariant",
        required: true,
    },
    // Tham chiếu cấp 3: Size & Kho (QUAN TRỌNG NHẤT)
    sizeInventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SizeInventory",
        required: true,
    },

    // --- SNAPSHOT (Lưu chết dữ liệu) ---
    name: { type: String, required: true }, // Tên SP gốc
    variantName: { type: String, required: true }, // VD: "Màu Đen / Size XL"
    image: { type: String }, // Ảnh của ColorVariant
    
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: { // Giá bán của SizeInventory tại thời điểm mua
        type: Number,
        required: true,
    },
    totalItemPrice: { // = price * quantity
        type: Number,
        required: true,
    }
});

// ----------------------------
// 🔹 Schema chính: Order
// ----------------------------
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [orderItemSchema],

        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
        },

        // Vận chuyển
        shippingMethod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shipping",
            required: true,
        },
        shippingMethodName: { type: String, required: true }, // Snapshot tên phương thức
        shippingFee: { type: Number, default: 0 }, // Phí ship tính toán được

        // Thanh toán
        paymentMethod: {
            type: String,
            enum: ["COD", "BankTransfer", "CreditCard", "Momo", "VNPay"],
            default: "COD",
        },

        // Voucher
        voucherCode: { type: String, default: null },
        voucherDiscount: { type: Number, default: 0 }, // Tổng tiền được giảm

        // Tài chính
        subtotal: { type: Number, required: true }, // Tổng tiền hàng
        totalPrice: { type: Number, required: true }, // Tổng thanh toán cuối cùng

        // Trạng thái
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipping", "Delivered", "Cancelled", "Returned"],
            default: "Pending",
        },
        paymentStatus: {
            type: String,
            enum: ["Unpaid", "Paid", "Refunded"],
            default: "Unpaid",
        },

        // Giao dịch Online (nếu có)
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },

        notes: { type: String, default: "" },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
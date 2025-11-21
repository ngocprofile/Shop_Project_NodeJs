import mongoose from "mongoose";
import Voucher from "./colorVariantModel.js";

// ----------------------------
// 🔹 Schema cho từng sản phẩm trong đơn hàng
// ----------------------------
const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    voucherCode: {
        type: String,
        default: null,
    },
    finalPrice: {
        type: Number,
        required: true,
    },
});

// ----------------------------
// 🔹 Schema chính cho Order
// ----------------------------
const orderSchema = new mongoose.Schema(
    {
        // 👤 Người đặt hàng
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // 🛒 Danh sách sản phẩm
        orderItems: [orderItemSchema],

        // 🏠 Địa chỉ giao hàng
        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            district: { type: String, required: true },
            ward: { type: String, required: true },
        },

        // 🚚 Phương thức giao hàng
        shippingMethod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shipping",
            required: true,
        },

        // 💰 Phí giao hàng (lưu lại tại thời điểm đặt)
        shippingFee: {
            type: Number,
            default: 0,
        },

        // 💳 Phương thức thanh toán
        paymentMethod: {
            type: String,
            enum: ["COD", "BankTransfer", "CreditCard", "Momo"],
            default: "COD",
        },

        // 💸 Tổng tiền trước giảm
        subtotal: {
            type: Number,
            required: true,
        },

        // 🎟️ Tổng giảm giá (toàn đơn)
        totalDiscount: {
            type: Number,
            default: 0,
        },

        // 💵 Tổng tiền cuối cùng (đã trừ giảm + cộng phí ship)
        totalPrice: {
            type: Number,
            required: true,
        },

        // 🧾 Trạng thái đơn hàng
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipping", "Delivered", "Cancelled"],
            default: "Pending",
        },

        // 💳 Trạng thái thanh toán
        paymentStatus: {
            type: String,
            enum: ["Unpaid", "Paid", "Refunded"],
            default: "Unpaid",
        },

        // ⏰ Ngày đặt hàng
        orderDate: {
            type: Date,
            default: Date.now,
        },

        // 📦 Thông tin vận chuyển
        shippingTracking: {
            trackingCode: { type: String, default: "" },
            status: {
                type: String,
                enum: ["Pending", "In Transit", "Delivered", "Returned"],
                default: "Pending",
            },
            estimatedDelivery: { type: String, default: "" },
            deliveredAt: { type: Date },
        },

        // 🗒️ Ghi chú
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// ----------------------------
// ⚙️ Middleware: Tự động áp voucher hợp lệ trước khi lưu đơn hàng
// ----------------------------
orderSchema.pre("save", async function (next) {
    try {
        const now = new Date();
        let totalDiscount = 0;

        // 🔍 Lấy danh sách voucher hợp lệ (đang hoạt động và trong thời gian hiệu lực)
        const activeVouchers = await Voucher.find({
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
        });

        // 🧮 Áp dụng giảm giá tự động cho từng sản phẩm
        this.orderItems = this.orderItems.map((item) => {
            let discount = 0;
            let appliedVoucher = null;

            // Duyệt qua các voucher hợp lệ
            for (const voucher of activeVouchers) {
                // Kiểm tra điều kiện giá trị tối thiểu
                if (item.price * item.quantity >= voucher.minOrderValue) {
                    if (voucher.discountType === "percentage") {
                        discount = (item.price * item.quantity * voucher.discountValue) / 100;
                        if (voucher.maxDiscountAmount > 0) {
                            discount = Math.min(discount, voucher.maxDiscountAmount);
                        }
                    } else if (voucher.discountType === "fixed") {
                        discount = voucher.discountValue;
                    }

                    appliedVoucher = voucher.code;
                    break; // Chỉ áp một voucher hợp lệ đầu tiên
                }
            }

            totalDiscount += discount;

            return {
                ...item.toObject(),
                discount,
                voucherCode: appliedVoucher,
                finalPrice: item.price * item.quantity - discount,
            };
        });

        this.totalDiscount = totalDiscount;
        this.totalPrice = this.subtotal - totalDiscount + this.shippingFee;

        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model("Order", orderSchema);

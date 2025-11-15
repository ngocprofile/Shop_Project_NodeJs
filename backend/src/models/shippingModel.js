import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
    {
        // 📦 Tên phương thức giao hàng (VD: Giao hàng nhanh, Viettel Post, Tự đến lấy)
        method: {
        type: String,
        required: [true, "Tên phương thức giao hàng là bắt buộc"],
        trim: true,
        },

        // 🏢 Đơn vị vận chuyển (nếu bạn hợp tác với hãng giao hàng cụ thể)
        provider: {
        type: String,
        default: "Nội bộ",
        },

        // 💰 Phí vận chuyển (đơn vị: VND)
        cost: {
        type: Number,
        required: [true, "Phí vận chuyển là bắt buộc"],
        min: 0,
        },

        // 🌍 Khu vực hoặc địa phương áp dụng (VD: Toàn quốc, TP.HCM, Miền Bắc...)
        region: {
        type: String,
        default: "Toàn quốc",
        trim: true,
        },

        // ⏰ Thời gian giao hàng dự kiến (VD: 2–5 ngày làm việc)
        estimatedDelivery: {
        type: String,
        default: "3–5 ngày làm việc",
        trim: true,
        },

        // 🔢 Mã vận chuyển (nếu bạn cần định danh riêng từng loại)
        code: {
        type: String,
        unique: true,
        sparse: true, // cho phép bỏ trống nhưng vẫn unique nếu có
        },

        // 🚀 Trạng thái hoạt động
        isActive: {
        type: Boolean,
        default: true,
        },

        // 📝 Ghi chú thêm (tuỳ chọn)
        note: {
        type: String,
        },
    },
    { timestamps: true }
);

const Shipping = mongoose.model("Shipping", shippingSchema);

export default Shipping;

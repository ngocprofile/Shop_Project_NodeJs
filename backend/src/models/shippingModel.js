import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
    {
        // 📦 Tên hiển thị (VD: "Giao Hàng Nhanh", "Hỏa Tốc 2H")
        name: {
            type: String,
            required: [true, "Tên phương thức vận chuyển là bắt buộc"],
            trim: true,
            unique: true // Tên không được trùng nhau
        },

        // 🏷️ Loại hình (Dùng để Frontend lọc icon hoặc xử lý logic riêng)
        type: {
            type: String,
            enum: ['standard', 'express', 'pickup'], // Tiêu chuẩn, Hỏa tốc, Tự lấy
            default: 'standard'
        },

        // 💰 Phí vận chuyển cơ bản (VND)
        cost: {
            type: Number,
            required: [true, "Phí vận chuyển là bắt buộc"],
            min: 0,
        },

        // 🎁 Đơn hàng tối thiểu để được Freeship (Nếu null hoặc 0 thì không freeship)
        freeShipOrderThreshold: {
            type: Number,
            default: null, 
        },

        // 🌍 Mã Tỉnh/TP áp dụng (Quan trọng cho Hỏa tốc)
        // Nếu mảng rỗng [] => Áp dụng toàn quốc
        // Nếu có mã (VD: ["79", "01"]) => Chỉ hiện cho khách ở HCM, HN
        allowedProvinceCodes: [{
            type: String,
            trim: true
        }],

        // ⏰ Thời gian giao hàng dự kiến (Hiển thị cho khách)
        estimatedDelivery: {
            type: String,
            default: "3–5 ngày làm việc",
            trim: true,
        },

        // 🚀 Trạng thái hoạt động
        isActive: {
            type: Boolean,
            default: true,
        },

        // 📝 Mô tả thêm (VD: "Chỉ giao trước 18h")
        description: {
            type: String,
            trim: true
        },
    },
    { timestamps: true }
);

const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
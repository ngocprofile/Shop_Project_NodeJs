import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
    {
        // 🏷️ Mã voucher (VD: TET2025, MARCH8)
        code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        },

        // Tên hiển thị
        title: {
        type: String,
        required: true,
        },

        // Mô tả chi tiết
        description: {
        type: String,
        default: "",
        },

        // Loại giảm giá: phần trăm (%) hoặc số tiền cố định
        discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true,
        },

        // Giá trị giảm
        discountValue: {
        type: Number,
        required: true,
        min: 0,
        },

        // Giới hạn mức giảm tối đa (chỉ áp dụng nếu discountType = "percentage")
        maxDiscountAmount: {
        type: Number,
        default: 0,
        },

        // Giá trị đơn hàng tối thiểu để áp dụng
        minOrderValue: {
        type: Number,
        default: 0,
        },

        // Giới hạn số lần dùng toàn hệ thống
        usageLimit: {
        type: Number,
        default: 0, // 0 = không giới hạn
        },

        // Số lần đã dùng
        usedCount: {
        type: Number,
        default: 0,
        },

        // Giới hạn mỗi user chỉ dùng được bao nhiêu lần
        perUserLimit: {
        type: Number,
        default: 1,
        },

        // Danh sách user đã sử dụng
        usersUsed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ],

        // Ngày bắt đầu & kết thúc hiệu lực
        startDate: {
        type: Date,
        required: true,
        },
        endDate: {
        type: Date,
        required: true,
        },

        // Áp dụng cho sản phẩm cụ thể
        applicableProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        ],

        // Áp dụng cho thương hiệu cụ thể
        applicableBrands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
        },
        ],

        // Áp dụng cho danh mục cụ thể
        applicableCategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        ],

        // Trạng thái bật / tắt voucher
        isActive: {
        type: Boolean,
        default: true,
        },
    },
    {
        timestamps: true,
    }
);

//
// 🧮 Virtual field: kiểm tra voucher còn hiệu lực không
//
voucherSchema.virtual("isValidNow").get(function () {
    const now = new Date();
    return (
        this.isActive &&
        now >= this.startDate &&
        now <= this.endDate &&
        (this.usageLimit === 0 || this.usedCount < this.usageLimit)
    );
});

//
// 🔄 Hook trước khi lưu: tự động hạ voucher nếu hết hạn
//
voucherSchema.pre("save", function (next) {
    const now = new Date();
    if (this.endDate < now) {
        this.isActive = false;
    }
    next();
});

//
// 📉 Phương thức tính số tiền giảm (áp dụng cho 1 sản phẩm)
//
voucherSchema.methods.calculateDiscount = function (price) {
    let discount = 0;

    if (this.discountType === "percentage") {
        discount = (price * this.discountValue) / 100;
        if (this.maxDiscountAmount > 0) {
        discount = Math.min(discount, this.maxDiscountAmount);
        }
    } else if (this.discountType === "fixed") {
        discount = this.discountValue;
    }

    return discount;
};

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;

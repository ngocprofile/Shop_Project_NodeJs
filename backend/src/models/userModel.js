import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: [true, "Tên người dùng là bắt buộc"],
        trim: true,
        },
        email: {
        type: String,
        required: [true, "Email là bắt buộc"],
        unique: true,
        lowercase: true,
        },
        password: {
        type: String,
        required: [true, "Mật khẩu là bắt buộc"],
        minlength: 6,
        },
        role: {
        type: String,
        enum: ["customer", "admin", "staff"],
        default: "customer",
        },
        avatar: {
        type: String,
        default: "",
        },
        isActive: {
        type: Boolean,
        default: true,
        },

        // 🔒 Dành cho quên mật khẩu qua link
        resetPasswordToken: String,
        resetPasswordExpire: Date,

        // 🧩 Dành cho quên mật khẩu bằng OTP
        otpCode: {
        type: String,
        default: null,
        },
        otpExpire: {
        type: Date,
        default: null,
        },

        // --- 📥 THÊM VÍ VOUCHER ---
        // (Lưu các voucher mà người dùng đã bấm 'Nhận'/'Lưu')
        collectedVouchers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher",
        },
        ],
        // --- (Hết phần thêm) ---
    },
    { timestamps: true }
);

// 🔒 Mã hoá mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🧠 So sánh mật khẩu
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

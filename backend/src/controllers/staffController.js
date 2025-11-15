import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { sendCustomEmail, sendWelcomeEmail } from "../utils/emailUtils.js"; // Import emailUtils cho welcome và custom email
import { validateEmail, validatePhone } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

// 🧭 [ADMIN] Lấy danh sách toàn bộ nhân viên
export const getAllStaff = async (req, res, next) => {
    try {
        const staffList = await User.find({ role: "staff" }).select("-password");
        res.status(200).json(staffList);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// 🧭 [ADMIN] Lấy thông tin 1 nhân viên
export const getStaffById = async (req, res, next) => {
    try {
        const staff = await User.findOne({ _id: req.params.id, role: "staff" }).select("-password");
        if (!staff) {
            const error = new Error("Không tìm thấy nhân viên");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(staff);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// 🧭 [ADMIN] Thêm mới nhân viên
export const createStaff = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, email, password, phone, address } = req.validated.body;

        // Extra check với validationUtils (bổ sung, e.g., email và phone)
        const emailCheck = validateEmail(email);
        if (!emailCheck.isValid) {
            const error = new Error(emailCheck.message);
            error.statusCode = 400;
            return next(error);
        }
        if (phone) {
            const phoneCheck = validatePhone(phone);
            if (!phoneCheck.isValid) {
                const error = new Error(phoneCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        const existing = await User.findOne({ email });
        if (existing) {
            const error = new Error("Email đã được sử dụng");
            error.statusCode = 400;
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role: "staff",
        });

        await newStaff.save();

        // Gửi email chào mừng cho nhân viên mới
        await sendWelcomeEmail(newStaff.email, newStaff.name, 'http://localhost:3000/staff/verify?token=abc'); // Optional verify link

        res.status(201).json({
            message: "Tạo nhân viên mới thành công",
            staff: {
                id: newStaff._id,
                name: newStaff.name,
                email: newStaff.email,
                role: newStaff.role,
            },
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// 🧭 [ADMIN] Cập nhật thông tin nhân viên
export const updateStaff = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, email, password, phone, address } = req.validated.body;

        // Lấy staff hiện tại để so sánh (old values)
        const currentStaff = await User.findById(req.params.id);
        if (!currentStaff) {
            const error = new Error("Không tìm thấy nhân viên để cập nhật");
            error.statusCode = 404;
            return next(error);
        }

        const oldEmail = currentStaff.email;
        const oldPhone = currentStaff.phone;

        // Extra check với validationUtils cho email và phone nếu có thay đổi
        if (email && email !== oldEmail) {
            const emailCheck = validateEmail(email);
            if (!emailCheck.isValid) {
                const error = new Error(emailCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (phone && phone !== oldPhone) {
            const phoneCheck = validatePhone(phone);
            if (!phoneCheck.isValid) {
                const error = new Error(phoneCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        const updateData = { name, email, phone, address };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedStaff = await User.findOneAndUpdate(
            { _id: req.params.id, role: "staff" },
            updateData,
            { new: true }
        ).select("-password");

        // Gửi email thông báo cập nhật nếu email thay đổi (optional)
        if (email && email !== oldEmail) {
            const htmlContent = `<h1>Xin chào ${updatedStaff.name}!</h1><p>Thông tin tài khoản của bạn đã được cập nhật (email mới: ${email}).</p>`;
            await sendCustomEmail(updatedStaff.email, 'Cập Nhật Tài Khoản - Shop API', htmlContent);
        }

        res.status(200).json({
            message: "Cập nhật nhân viên thành công",
            updatedStaff,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// 🧭 [ADMIN] Xóa nhân viên
export const deleteStaff = async (req, res, next) => {
    try {
        const deletedStaff = await User.findOneAndDelete({ _id: req.params.id, role: "staff" });
        if (!deletedStaff) {
            const error = new Error("Không tìm thấy nhân viên để xóa");
            error.statusCode = 404;
            return next(error);
        }

        // Gửi email thông báo xóa tài khoản (optional, có thể bỏ nếu nhạy cảm)
        const htmlContent = `<h1>Tài Khoản Nhân Viên Đã Bị Xóa</h1><p>Tài khoản của bạn đã bị xóa khỏi hệ thống. Nếu có thắc mắc, liên hệ quản trị viên.</p>`;
        await sendCustomEmail(deletedStaff.email, 'Tài Khoản Đã Bị Xóa - Shop API', htmlContent);

        res.status(200).json({ message: "Xóa nhân viên thành công" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// 👇 Thêm phần cho nhân viên tự quản lý thông tin

// ✅ [STAFF] Lấy thông tin cá nhân của chính mình
export const getMyProfile = async (req, res, next) => {
    try {
        const staff = await User.findById(req.user.id).select("-password");
        if (!staff || staff.role !== "staff") {
            const error = new Error("Không có quyền truy cập");
            error.statusCode = 403;
            return next(error);
        }
        res.status(200).json(staff);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// ✅ [STAFF] Cập nhật thông tin cá nhân
export const updateMyProfile = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, phone, address, password } = req.validated.body;
        const updateData = { name, phone, address };

        const oldEmail = req.user.email; // Lấy email cũ từ req.user (giả sử auth middleware set)

        // Extra check với validationUtils cho phone nếu có thay đổi
        if (phone && phone !== req.user.phone) {
            const phoneCheck = validatePhone(phone);
            if (!phoneCheck.isValid) {
                const error = new Error(phoneCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updated = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select(
            "-password"
        );

        // Gửi email thông báo cập nhật nếu cần (e.g., password change hoặc profile update)
        if (password) {
            await sendPasswordChangeEmail(updated.email, updated.name);
        }

        res.status(200).json({
            message: "Cập nhật thông tin cá nhân thành công",
            updated,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
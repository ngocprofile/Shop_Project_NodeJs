import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { sendCustomEmail, sendWelcomeEmail } from "../utils/emailUtils.js"; // Import emailUtils cho welcome và custom email
import { validateEmail, validateEnum, validatePhone } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

/**
 * 📜 [GET] /api/users/profile
 * 👉 Lấy thông tin hồ sơ người dùng hiện tại
 */
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(user);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * ✏️ [PUT] /api/users/profile
 * 👉 Cập nhật hồ sơ người dùng hiện tại
 */
export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }

        // Sử dụng req.validated.body từ middleware validate
        const { name, email, password, avatar, phone } = req.validated.body;

        const oldEmail = user.email; // Lưu email cũ để so sánh

        // Extra check với validationUtils cho email và phone nếu có thay đổi
        if (email && email !== oldEmail) {
            const emailCheck = validateEmail(email);
            if (!emailCheck.isValid) {
                const error = new Error(emailCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (phone && phone !== user.phone) {
            const phoneCheck = validatePhone(phone);
            if (!phoneCheck.isValid) {
                const error = new Error(phoneCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;

        // Nếu có thay đổi mật khẩu
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (avatar !== undefined) user.avatar = avatar;

        const updatedUser = await user.save();

        // Gửi email thông báo cập nhật profile nếu email thay đổi
        if (email && email !== oldEmail) {
            const htmlContent = `<h1>Xin chào ${user.name}!</h1><p>Email của bạn đã được cập nhật thành ${email}. Nếu không phải bạn, liên hệ hỗ trợ.</p>`;
            await sendCustomEmail(user.email, 'Cập Nhật Email - Shop API', htmlContent);
        }

        res.status(200).json({
            message: "Cập nhật thông tin thành công",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                avatar: updatedUser.avatar,
            },
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 [GET] /api/users
 * 👉 (Chỉ Admin) Lấy danh sách tất cả người dùng
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 👤 [GET] /api/users/:id
 * 👉 (Chỉ Admin) Lấy thông tin chi tiết của một người dùng theo ID
 */
export const getUserById = async (req, res, next) => {
    try {
        // Lấy ID từ req.params (đã được validate ở routes)
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error); // Chuyển cho errorMiddleware
        }

        // Trả về thông tin user
        res.status(200).json(user);

    } catch (error) {
        // Lỗi này cũng bắt các trường hợp ID không hợp lệ (ví dụ: ID sai định dạng ObjectId)
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * ➕ [POST] /api/users
 * 👉 (Chỉ Admin) Tạo người dùng mới (VD: nhân viên mới)
 */
export const createUser = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, email, password, role, avatar } = req.validated.body;

        // Extra check với validationUtils (bổ sung, e.g., role enum)
        const roleCheck = validateEnum(role || 'user', ['user', 'staff', 'admin']);
        if (!roleCheck.isValid) {
            const error = new Error(roleCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        // Kiểm tra email trùng
        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error("Email đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user", // mặc định là user
            avatar: avatar || "",
        });

        // Gửi email chào mừng cho user mới
        await sendWelcomeEmail(newUser.email, newUser.name);

        res.status(201).json({
            message: "Tạo người dùng thành công",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * ❌ [DELETE] /api/users/:id
 * 👉 (Chỉ Admin) Xóa người dùng
 */
export const deleteUser = async (req, res, next) => {
    try {
        // Sử dụng req.params.id (validated in routes)
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }

        const userEmail = user.email; // Lưu email trước khi xóa

        await user.deleteOne();

        // Gửi email thông báo xóa tài khoản (optional, có thể bỏ nếu nhạy cảm)
        const htmlContent = `<h1>Tài Khoản Đã Bị Xóa</h1><p>Tài khoản của bạn đã bị xóa khỏi hệ thống. Nếu có thắc mắc, liên hệ hỗ trợ.</p>`;
        await sendCustomEmail(userEmail, 'Tài Khoản Đã Bị Xóa - Shop API', htmlContent);

        res.status(200).json({ message: "Đã xóa người dùng thành công" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🔁 [PUT] /api/users/:id/role
 * 👉 (Chỉ Admin) Cập nhật vai trò người dùng
 */
export const updateUserRole = async (req, res, next) => {
    try {
        // Vai trò đã được kiểm tra bởi Joi middleware
        const { role } = req.validated.body; 

        // BỎ QUA: Không cần kiểm tra validateEnum ở đây nữa.

        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }
        
        // --- Logic Cập nhật ---
        const oldRole = user.role;
        user.role = role;
        await user.save();

        // Gửi email thông báo thay đổi role
        if (role !== oldRole) {
            const message = role === 'staff' ? 'Bạn đã được thăng chức thành nhân viên!' : `Vai trò của bạn đã được cập nhật thành ${role}.`;
            const htmlContent = `<h1>Thông Báo Thay Đổi Vai Trò</h1><p>${message}</p>`;
            // Lưu ý: Kiểm tra lại tham số của hàm sendCustomEmail trong file emailUtils của bạn
            await sendCustomEmail(user.email, user.name, 'Thay Đổi Vai Trò - Shop API', htmlContent); 
        }

        res.status(200).json({
            message: `Đã cập nhật vai trò thành '${role}'`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                // Có thể thêm isActive nếu cần
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 🔒 [PUT] /api/users/:id/status
 * 👉 (Chỉ Admin) Khóa hoặc mở khóa tài khoản người dùng
 */
export const updateUserStatus = async (req, res, next) => {
    try {
        const userId = req.params.id;
        // Trạng thái đã được kiểm tra bởi Joi middleware
        const { isActive } = req.validated.body; 

        // BỎ QUA: Không cần kiểm tra typeof boolean ở đây nữa.

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }

        // Không cho phép Admin tự khóa tài khoản của mình
        if (user._id.toString() === req.user._id.toString() && isActive === false) {
            const error = new Error("Admin không thể tự khóa tài khoản của mình");
            error.statusCode = 403;
            return next(error);
        }
        
        // --- Logic Cập nhật ---
        user.isActive = isActive;
        await user.save();

        // Gửi email thông báo
        const statusMessage = isActive ? 'Đã được mở khóa' : 'Đã bị khóa';
        const htmlContent = `<h1>Thông Báo Cập Nhật Tài Khoản</h1><p>Tài khoản của bạn đã được cập nhật trạng thái: ${statusMessage}.</p>`;
        // Lưu ý: Kiểm tra lại tham số của hàm sendCustomEmail trong file emailUtils của bạn
        await sendCustomEmail(user.email, user.name, 'Cập Nhật Trạng Thái Tài Khoản', htmlContent);

        res.status(200).json({
            message: `Đã ${isActive ? 'mở khóa' : 'khóa'} tài khoản thành công`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            },
        });
    } catch (error) {
        next(error);
    }
};
import User from "../models/userModel.js";
import { sendCustomEmail, sendWelcomeEmail } from "../utils/emailUtils.js";
import { validateEmail, validateEnum, validatePhone } from "../utils/validationUtils.js";

// --- 1. IMPORT THÊM ĐỂ DÙNG CHO VÍ VOUCHER ---
import Voucher from "../models/voucherModel.js";

/**
 * 📜 [GET] /api/users/profile
 * 👉 Lấy thông tin hồ sơ người dùng hiện tại
 */
export const getUserProfile = async (req, res, next) => {
    try {
        // Đã thêm populate để lấy chi tiết voucher trong ví
        const user = await User.findById(req.user._id)
            .select("-password")
            .populate("collectedVouchers"); // <-- Populate ví voucher

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
 * 📊 [GET] /api/users/stats
 * 👉 (Chỉ Admin) Lấy thống kê người dùng
 */
export const getUserStats = async (req, res, next) => {
    try {
        // 1. Lấy ngày bắt đầu của hôm nay (00:00:00)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 2. Tạo các promise để chạy song song
        const totalUsersPromise = User.countDocuments({});
        const newUsersTodayPromise = User.countDocuments({
            createdAt: { $gte: today }
        });

        // 3. Chạy song song 2 câu lệnh đếm
        const [totalUsers, newUsersToday] = await Promise.all([
            totalUsersPromise,
            newUsersTodayPromise
        ]);

        // 4. Trả về kết quả
        res.status(200).json({
            totalUsers,
            newUsersToday
        });

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
            // (Lưu ý: hook pre-save trong userModel sẽ tự hash)
            user.password = password; 
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


// --- 2. THÊM HÀM MỚI ĐỂ XỬ LÝ "NHẬN VOUCHER" ---

/**
 * 📥 [POST] /api/users/collect-voucher/:voucherId
 * 👉 Lưu voucher vào 'ví' của người dùng
 * @access Private (Khách hàng)
 */
export const collectVoucher = async (req, res, next) => {
    try {
        const { voucherId } = req.params;
        const userId = req.user._id; // Lấy từ middleware 'protect'

        // 1. Kiểm tra voucher có thật và hợp lệ không
        const voucher = await Voucher.findById(voucherId);
        if (!voucher) {
            const error = new Error("Không tìm thấy voucher này.");
            error.statusCode = 404;
            return next(error);
        }

        // 2. Kiểm tra xem voucher còn hoạt động không (dùng virtual field 'isValidNow')
        // (Giả sử voucherModel có virtual 'isValidNow' như đã bàn)
        if (!voucher.isValidNow) {
             const error = new Error("Voucher này đã hết hạn hoặc hết lượt.");
             error.statusCode = 400;
             return next(error);
        }

        // 3. Tìm người dùng
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("Không tìm thấy người dùng.");
            error.statusCode = 404;
            return next(error);
        }

        // 4. Kiểm tra xem họ đã nhận voucher này chưa
        const alreadyCollected = user.collectedVouchers.some(
            (vId) => vId.toString() === voucherId
        );

        if (alreadyCollected) {
            const error = new Error("Bạn đã lưu voucher này rồi.");
            error.statusCode = 400;
            return next(error);
        }

        // 5. Thêm voucher vào 'ví' và lưu lại
        user.collectedVouchers.push(voucherId);
        await user.save();

        res.status(200).json({ 
            message: "Đã lưu voucher thành công!",
            collectedVouchers: user.collectedVouchers // Gửi lại danh sách mới
        });

    } catch (error) {
        next(error);
    }
};


// --- CÁC HÀM CỦA ADMIN (Giữ nguyên) ---

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
        const user = await User.findById(req.params.id).select("-password");

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
 * ➕ [POST] /api/users
 * 👉 (Chỉ Admin) Tạo người dùng mới (VD: nhân viên mới)
 */
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role, avatar } = req.validated.body;

        const roleCheck = validateEnum(role || 'customer', ['customer', 'staff', 'admin']);
        if (!roleCheck.isValid) {
            const error = new Error(roleCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error("Email đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        // Hook pre-save trong Model sẽ tự hash mật khẩu
        const newUser = await User.create({
            name,
            email,
            password: password, 
            role: role || "customer", 
            avatar: avatar || "",
        });

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
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }

        const userEmail = user.email; // Lưu email trước khi xóa
        await user.deleteOne();

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
        const { role } = req.validated.body; 
        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }
        
        const oldRole = user.role;
        user.role = role;
        await user.save();

        if (role !== oldRole) {
            const message = role === 'staff' ? 'Bạn đã được thăng chức thành nhân viên!' : `Vai trò của bạn đã được cập nhật thành ${role}.`;
            const htmlContent = `<h1>Thông Báo Thay Đổi Vai Trò</h1><p>${message}</p>`;
            await sendCustomEmail(user.email, user.name, 'Thay Đổi Vai Trò - Shop API', htmlContent); 
        }

        res.status(200).json({
            message: `Đã cập nhật vai trò thành '${role}'`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
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
        const { isActive } = req.validated.body; 

        const user = await User.findById(userId);

        if (!user) {
            const error = new Error("Không tìm thấy người dùng");
            error.statusCode = 404;
            return next(error);
        }

        if (user._id.toString() === req.user._id.toString() && isActive === false) {
            const error = new Error("Admin không thể tự khóa tài khoản của mình");
            error.statusCode = 403;
            return next(error);
        }
        
        user.isActive = isActive;
        await user.save();

        const statusMessage = isActive ? 'Đã được mở khóa' : 'Đã bị khóa';
        const htmlContent = `<h1>Thông Báo Cập Nhật Tài Khoản</h1><p>Tài khoản của bạn đã được cập nhật trạng thái: ${statusMessage}.</p>`;
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
import User from "../models/userModel.js"; // Import User để lấy danh sách users
import Voucher from "../models/voucherModel.js";
import { sendNotificationEmail } from "../utils/emailUtils.js"; // Import emailUtils cho notification email
import { validateEnum, validateFutureDate, validatePositiveNumber } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

/**
 * 🧾 Lấy tất cả voucher (Admin hoặc Public)
 */
export const getAllVouchers = async (req, res, next) => {
    try {
        const vouchers = await Voucher.find().sort({ createdAt: -1 });
        res.status(200).json(vouchers);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧾 Lấy chi tiết voucher theo ID
 */
export const getVoucherById = async (req, res, next) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            const error = new Error("Không tìm thấy voucher");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(voucher);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Tạo mới voucher (Admin)
 */
export const createVoucher = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate Joi
        const {
            code,
            title,
            description,
            discountType,
            discountValue,
            maxDiscountAmount,
            minOrderValue,
            usageLimit,
            perUserLimit,
            startDate,
            endDate,
            applicableProducts,
            applicableBrands,
            applicableCategories
        } = req.validated.body;

        // --- (PHẦN VALIDATIONUTILS) ---
        const discountCheck = validatePositiveNumber(discountValue);
        // (Cho phép discountValue = 0 nếu là 'freeship')
        if (!discountCheck.isValid && discountType !== 'freeship') { 
            const error = new Error(discountCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const minOrderCheck = validatePositiveNumber(minOrderValue || 0);
        if (!minOrderCheck.isValid) {
            const error = new Error(minOrderCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const usageLimitCheck = validatePositiveNumber(usageLimit || 0);
        if (!usageLimitCheck.isValid) {
            const error = new Error(usageLimitCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        // CẬP NHẬT: Cho phép 'freeship'
        const typeCheck = validateEnum(discountType || 'percentage', ['percentage', 'fixed', 'freeship']);
        if (!typeCheck.isValid) {
            const error = new Error(typeCheck.message);
            error.statusCode = 400;
            return next(error);
        }
        
        const endDateCheck = validateFutureDate(endDate);
        if (!endDateCheck.isValid) {
            const error = new Error(endDateCheck.message);
            error.statusCode = 400;
            return next(error);
        }
        // --- (Hết phần validationUtils) ---

        const existing = await Voucher.findOne({ code });
        if (existing) {
            const error = new Error("Mã voucher đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        if (new Date(startDate) >= new Date(endDate)) {
            const error = new Error("Ngày kết thúc phải sau ngày bắt đầu");
            error.statusCode = 400;
            return next(error);
        }

        const voucher = new Voucher({
            code,
            title,
            description,
            discountType,
            discountValue,
            maxDiscountAmount,
            minOrderValue,
            usageLimit,
            perUserLimit,
            startDate,
            endDate,
            applicableProducts,
            applicableBrands,
            applicableCategories
        });

        const created = await voucher.save(); // Hook pre-save sẽ xử lý freeship

        // --- (PHẦN GỬI EMAIL) ---
        const users = await User.find({}); 
        const notificationMessage = `Voucher mới "${title}" đã được tạo! Mã ${code}. Áp dụng ngay tại cửa hàng!`;
        const voucherLink = `${process.env.CLIENT_URL}/vouchers/${created._id}`; 

        await Promise.all(
            users.map(async (user) => {
                await sendNotificationEmail(user.email, user.name, 'Voucher Mới Đã Có!', notificationMessage, voucherLink);
            })
        );
        // --- (Hết phần gửi email) ---

        res.status(201).json({
            message: "Tạo voucher thành công (đã gửi thông báo email cho tất cả users)",
            voucher: created,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Cập nhật voucher (Admin)
 */
export const updateVoucher = async (req, res, next) => {
    try {
        const updates = req.validated.body;
        const voucher = await Voucher.findById(req.params.id);

        if (!voucher) {
            const error = new Error("Không tìm thấy voucher");
            error.statusCode = 404;
            return next(error);
        }

        // --- (PHẦN VALIDATIONUTILS) ---
        if (updates.discountValue !== undefined) {
            const discountCheck = validatePositiveNumber(updates.discountValue);
             if (!discountCheck.isValid && (updates.discountType || voucher.discountType) !== 'freeship') {
                const error = new Error(discountCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (updates.minOrderValue !== undefined) {
            const minOrderCheck = validatePositiveNumber(updates.minOrderValue);
            if (!minOrderCheck.isValid) {
                const error = new Error(minOrderCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (updates.usageLimit !== undefined) {
             const usageCheck = validatePositiveNumber(updates.usageLimit);
            if (!usageCheck.isValid) {
                const error = new Error(usageCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (updates.endDate !== undefined) {
             const endDateCheck = validateFutureDate(updates.endDate);
            if (!endDateCheck.isValid) {
                const error = new Error(endDateCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        
        // CẬP NHẬT: Cho phép 'freeship'
        if (updates.discountType !== undefined) {
            const typeCheck = validateEnum(updates.discountType, ['percentage', 'fixed', 'freeship']);
            if (!typeCheck.isValid) {
                const error = new Error(typeCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        // --- (Hết phần validationUtils) ---

        Object.assign(voucher, updates); 
        const updated = await voucher.save(); // Hook pre-save sẽ xử lý

        res.status(200).json({
            message: "Cập nhật voucher thành công",
            voucher: updated,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Xóa voucher (Admin)
 */
export const deleteVoucher = async (req, res, next) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            const error = new Error("Không tìm thấy voucher");
            error.statusCode = 404;
            return next(error);
        }

        await voucher.deleteOne();
        res.status(200).json({ message: "Xóa voucher thành công" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧮 API hỗ trợ frontend: Lấy danh sách voucher đang hoạt động
 */
export const getActiveVouchers = async (req, res, next) => {
    try {
        const now = new Date();
        const activeVouchers = await Voucher.find({
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
            $or: [
                { usageLimit: 0 },
                { $expr: { $lt: ["$usedCount", "$usageLimit"] } }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json(activeVouchers);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};


/**
 * 📇 [GET] /api/vouchers/dashboard
 * 👉 Lấy dữ liệu 5 phần cho trang "Kho Voucher" của khách hàng
 * @access Public
 */
export const getVoucherDashboardData = async (req, res, next) => {
    try {
        const now = new Date();
        
        const baseActiveVouchers = await Voucher.find({
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
            $or: [
                { usageLimit: 0 },
                { $expr: { $lt: ["$usedCount", "$usageLimit"] } }
            ]
        }).lean(); // .lean() để tăng tốc độ

        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        const newVouchers = baseActiveVouchers
            .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) 
            .slice(0, 5); 

        const expiringSoon = baseActiveVouchers
            .filter(v => new Date(v.endDate) <= threeDaysFromNow) 
            .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

        const freeshipVouchers = baseActiveVouchers
            .filter(v => v.discountType === 'freeship');

        const sitewideVouchers = baseActiveVouchers
            .filter(v => 
                v.discountType !== 'freeship' && 
                (!v.applicableProducts || v.applicableProducts.length === 0) &&
                (!v.applicableBrands || v.applicableBrands.length === 0) &&
                (!v.applicableCategories || v.applicableCategories.length === 0)
            );

        const otherVouchers = baseActiveVouchers
            .filter(v => 
                v.discountType !== 'freeship' && 
                ((v.applicableProducts && v.applicableProducts.length > 0) ||
                 (v.applicableBrands && v.applicableBrands.length > 0) ||
                 (v.applicableCategories && v.applicableCategories.length > 0))
            );

        res.status(200).json({
            newVouchers,
            expiringSoon,
            freeshipVouchers,
            sitewideVouchers,
            otherVouchers
        });
        
    } catch (error) {
        next(error);
    }
};


/**
 * 🧮 Kiểm tra voucher hợp lệ (Admin test / Client checkout)
 */
export const validateVoucher = async (req, res, next) => {
    try {
        const { code, userId, orderValue } = req.validated.body;

        const orderValueCheck = validatePositiveNumber(orderValue);
        if (!orderValueCheck.isValid) {
            const error = new Error(orderValueCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const voucher = await Voucher.findOne({ code });

        if (!voucher || !voucher.isActive) {
            const error = new Error("Voucher không tồn tại hoặc không hoạt động");
            error.statusCode = 400;
            return next(error);
        }

        const now = new Date();
        if (now < new Date(voucher.startDate) || now > new Date(voucher.endDate)) {
            const error = new Error("Voucher đã hết hạn hoặc chưa bắt đầu");
            error.statusCode = 400;
            return next(error);
        }

        if (orderValue < voucher.minOrderValue) {
            const error = new Error(`Đơn hàng cần tối thiểu ${voucher.minOrderValue.toLocaleString()}đ để áp dụng voucher`);
            error.statusCode = 400;
            return next(error);
        }

        if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
            const error = new Error("Voucher đã đạt giới hạn sử dụng");
            error.statusCode = 400;
            return next(error);
        }

        // Check giới hạn mỗi user
        const userUsage = voucher.usersUsed.filter(id => id.toString() === userId).length;
        if (userUsage >= voucher.perUserLimit) {
             const error = new Error("Bạn đã sử dụng voucher này rồi");
             error.statusCode = 400;
             return next(error);
        }

        res.status(200).json({
            valid: true,
            discountType: voucher.discountType,
            discountValue: voucher.discountValue,
            maxDiscountAmount: voucher.maxDiscountAmount, // CẬP NHẬT: Rất quan trọng cho Freeship
            message: "Voucher hợp lệ",
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
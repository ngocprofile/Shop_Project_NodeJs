import mongoose from "mongoose";
import User from "../models/userModel.js"; // Import User để lấy danh sách users
import Voucher from "../models/voucherModel.js";
import { sendNotificationEmail } from "../utils/emailUtils.js"; // Import emailUtils cho notification email
import { validateEnum, validateFutureDate, validatePositiveNumber } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

/**
 * 🧾 Lấy tất cả voucher (Admin hoặc Public)
 * @route GET /api/vouchers
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
 * @route GET /api/vouchers/:id
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
 * @route POST /api/vouchers
 */
export const createVoucher = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
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
        } = req.validated.body;

        // Extra check với validationUtils cho discountValue, minOrderValue, usageLimit
        const discountCheck = validatePositiveNumber(discountValue);
        if (!discountCheck.isValid) {
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

        // Extra check enum cho discountType
        const typeCheck = validateEnum(discountType || 'percentage', ['percentage', 'fixed']);
        if (!typeCheck.isValid) {
            const error = new Error(typeCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        // Extra check future date cho endDate
        const endDateCheck = validateFutureDate(endDate);
        if (!endDateCheck.isValid) {
            const error = new Error(endDateCheck.message);
            error.statusCode = 400;
            return next(error);
        }

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
        });

        const created = await voucher.save();

        // Gửi email thông báo voucher mới cho tất cả người dùng
        const users = await User.find({}); // Lấy tất cả users (có thể filter role nếu cần)
        const notificationMessage = `Voucher mới "${title}" đã được tạo! Giảm ${discountValue}% với mã ${code}. Áp dụng ngay tại cửa hàng!`;
        const voucherLink = `${process.env.CLIENT_URL}/vouchers/${created._id}`; // Link đến voucher page

        // Gửi email song song cho tất cả users (Promise.all để nhanh)
        await Promise.all(
            users.map(async (user) => {
                await sendNotificationEmail(user.email, user.name, 'Voucher Mới Đã Có!', notificationMessage, voucherLink);
            })
        );

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
 * @route PUT /api/vouchers/:id
 */
export const updateVoucher = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const updates = req.validated.body;
        const voucher = await Voucher.findById(req.params.id);

        if (!voucher) {
            const error = new Error("Không tìm thấy voucher");
            error.statusCode = 404;
            return next(error);
        }

        // Extra check với validationUtils cho updates nếu có thay đổi
        if (updates.discountValue !== undefined) {
            const discountCheck = validatePositiveNumber(updates.discountValue);
            if (!discountCheck.isValid) {
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
        if (updates.discountType !== undefined) {
            const typeCheck = validateEnum(updates.discountType, ['percentage', 'fixed']);
            if (!typeCheck.isValid) {
                const error = new Error(typeCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        Object.assign(voucher, updates);
        const updated = await voucher.save();

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
 * @route DELETE /api/vouchers/:id
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
 * 🧮 API hỗ trợ frontend: Lấy danh sách voucher đang hoạt động (tự động áp dụng)
 * @route GET /api/vouchers/active
 * @access Public
 */
export const getActiveVouchers = async (req, res, next) => {
    try {
        const now = new Date();
        const activeVouchers = await Voucher.find({
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
            $expr: { $lt: ["$usedCount", "$usageLimit"] },
        }).sort({ discountValue: -1 });

        res.status(200).json(activeVouchers);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧮 Kiểm tra voucher hợp lệ (vẫn giữ API cho admin kiểm tra nhanh)
 * @route POST /api/vouchers/validate
 */
export const validateVoucher = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { code, userId, orderValue } = req.validated.body;

        // Extra check với validationUtils cho orderValue
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

        if (voucher.usersUsed.includes(new mongoose.Types.ObjectId(userId))) {
            const error = new Error("Bạn đã sử dụng voucher này rồi");
            error.statusCode = 400;
            return next(error);
        }

        res.status(200).json({
            valid: true,
            discountType: voucher.discountType,
            discountValue: voucher.discountValue,
            message: "Voucher hợp lệ",
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
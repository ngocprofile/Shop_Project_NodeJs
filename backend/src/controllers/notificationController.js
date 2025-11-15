// notificationController.js
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js"; // Import User để lấy email/name
import { sendNotificationEmail } from "../utils/emailUtils.js"; // Import emailUtils cho notification email
import { validateObjectId, validateURL } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

/**
 * 📤 Tạo thông báo mới (thường do admin hoặc hệ thống gửi)
 */
export const createNotification = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { user: userId, title, message, link } = req.validated.body;

        // Extra check với validationUtils cho userId (ObjectId)
        const userIdCheck = validateObjectId(userId);
        if (!userIdCheck.isValid) {
            const error = new Error(userIdCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        // Extra check cho link nếu có (URL valid)
        if (link) {
            const linkCheck = validateURL(link);
            if (!linkCheck.isValid) {
                const error = new Error(linkCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        const newNotification = new Notification({
            user: userId,
            title,
            message,
            link: link || "",
        });

        const savedNotification = await newNotification.save();

        // Lấy thông tin user để gửi email
        const user = await User.findById(userId).select('name email');
        if (user) {
            // Gửi email thông báo cho user
            await sendNotificationEmail(user.email, user.name, title, message, link);
        }

        res.status(201).json(savedNotification);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 📋 Lấy danh sách thông báo của user (chưa đọc trước)
 */
export const getUserNotifications = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const notifications = await Notification.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(50); // Giới hạn số lượng để tránh tải quá nhiều

        res.json(notifications);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🔢 Lấy số lượng thông báo chưa đọc của user
 */
export const getUnreadCount = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });
        res.json({ unreadCount });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 👁️ Đánh dấu thông báo là đã đọc
 */
export const markAsRead = async (req, res, next) => {
    try {
        // Sử dụng req.params.id từ middleware validate (nếu có)
        const { id } = req.params;
        const userId = req.user.id;

        // Extra check với validationUtils cho id (ObjectId)
        const idCheck = validateObjectId(id);
        if (!idCheck.isValid) {
            const error = new Error(idCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const notification = await Notification.findOneAndUpdate(
            { _id: id, user: userId },
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            const error = new Error("Thông báo không tồn tại hoặc không phải của bạn!");
            error.statusCode = 404;
            return next(error);
        }

        res.json(notification);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🗑️ Xóa thông báo
 */
export const deleteNotification = async (req, res, next) => {
    try {
        // Sử dụng req.params.id từ middleware validate (nếu có)
        const { id } = req.params;
        const userId = req.user.id;

        // Extra check với validationUtils cho id (ObjectId)
        const idCheck = validateObjectId(id);
        if (!idCheck.isValid) {
            const error = new Error(idCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const notification = await Notification.findOneAndDelete({ _id: id, user: userId });
        if (!notification) {
            const error = new Error("Thông báo không tồn tại hoặc không phải của bạn!");
            error.statusCode = 404;
            return next(error);
        }

        res.json({ message: "Xóa thông báo thành công!" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 👁️ Đánh dấu tất cả thông báo là đã đọc
 */
export const markAllAsRead = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await Notification.updateMany(
            { user: userId, isRead: false },
            { isRead: true }
        );

        res.json({ message: `Đã đánh dấu ${result.modifiedCount} thông báo là đã đọc.` });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
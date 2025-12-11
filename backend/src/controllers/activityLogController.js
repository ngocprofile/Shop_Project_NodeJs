import ActivityLog from "../models/activityLogModel.js";

/**
 * 📝 Tạo log hoạt động mới (gọi từ middleware hoặc API thủ công)
 */
export const createActivityLog = async (req, res) => {
    try {
        const { action, description } = req.body;
        const userId = req.user.id;

        if (!action) {
        return res.status(400).json({ message: "Thiếu thông tin bắt buộc: action" });
        }

        const ipAddress = req.ip || req.connection.remoteAddress || "";
        const userAgent = req.get('User-Agent') || "";

        const newLog = new ActivityLog({
        user: userId,
        action,
        description: description || "",
        ipAddress,
        userAgent,
        });

        const savedLog = await newLog.save();
        res.status(201).json(savedLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 📋 Lấy tất cả logs hoạt động (chỉ admin, hỗ trợ phân trang và filter)
 */
export const getAllActivityLogs = async (req, res) => {
    try {
        const { page = 1, limit = 20, action, startDate, endDate } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        let filter = {};
        if (action) filter.action = { $regex: action, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
        if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const logs = await ActivityLog.find(filter)
        .populate("user", "name email role") // Populate thông tin user đầy đủ hơn
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

        const total = await ActivityLog.countDocuments(filter);

        res.json({
        logs,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 📋 Lấy logs hoạt động của user cụ thể (chỉ admin, hỗ trợ phân trang)
 */
export const getUserActivityLogs = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const logs = await ActivityLog.find({ user: userId })
        .populate("user", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

        const total = await ActivityLog.countDocuments({ user: userId });

        res.json({
        logs,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 🗑️ Xóa log cụ thể (chỉ admin)
 */
export const deleteActivityLog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLog = await ActivityLog.findByIdAndDelete(id);
        if (!deletedLog) {
        return res.status(404).json({ message: "Log không tồn tại!" });
        }

        res.json({ message: "Xóa log thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Shipping from "../models/shippingModel.js";

/**
 * 🚚 Tạo phương thức vận chuyển mới (Admin)
 */
export const createShippingMethod = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, description, price, estimatedDelivery, isActive } = req.validated.body;

        const existing = await Shipping.findOne({ name });
        if (existing) {
            const error = new Error("Phương thức vận chuyển đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        const shipping = await Shipping.create({
            name,
            description,
            price,
            estimatedDelivery,
            isActive,
        });

        res.status(201).json({
            message: "Tạo phương thức vận chuyển thành công",
            shipping,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 📋 Lấy danh sách tất cả phương thức vận chuyển
 * (Người dùng cũng cần dùng để chọn khi thanh toán)
 */
export const getAllShippingMethods = async (req, res, next) => {
    try {
        const shippingMethods = await Shipping.find().sort({ price: 1 });
        res.status(200).json(shippingMethods);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🔍 Lấy chi tiết 1 phương thức vận chuyển theo ID
 */
export const getShippingById = async (req, res, next) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            const error = new Error("Không tìm thấy phương thức vận chuyển");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(shipping);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * ✏️ Cập nhật phương thức vận chuyển (Admin)
 */
export const updateShippingMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Sử dụng req.validated.body từ middleware validate
        const { name, description, price, estimatedDelivery, isActive } = req.validated.body;

        const shipping = await Shipping.findById(id);
        if (!shipping) {
            const error = new Error("Không tìm thấy phương thức vận chuyển");
            error.statusCode = 404;
            return next(error);
        }

        // Cập nhật chỉ nếu field được cung cấp (từ validated body)
        if (name !== undefined) shipping.name = name;
        if (description !== undefined) shipping.description = description;
        if (price !== undefined) shipping.price = price;
        if (estimatedDelivery !== undefined) shipping.estimatedDelivery = estimatedDelivery;
        if (isActive !== undefined) shipping.isActive = isActive;

        const updated = await shipping.save();
        res.status(200).json({
            message: "Cập nhật phương thức vận chuyển thành công",
            shipping: updated,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🗑️ Xóa phương thức vận chuyển (Admin)
 */
export const deleteShippingMethod = async (req, res, next) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            const error = new Error("Không tìm thấy phương thức vận chuyển");
            error.statusCode = 404;
            return next(error);
        }

        await shipping.deleteOne();
        res.status(200).json({ message: "Đã xóa phương thức vận chuyển" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
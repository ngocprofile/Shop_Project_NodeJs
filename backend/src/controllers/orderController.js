import mongoose from "mongoose";
import Variant from "../models/colorVariantModel.js"; // Import Variant để kiểm tra tồn kho
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js"; // Import User để lấy thông tin user
import { sendCustomEmail, sendOrderConfirmationEmail } from "../utils/emailUtils.js"; // Import emailUtils cho confirmation email
import { validateEnum, validatePositiveNumber, validateQuantity } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

/**
 * 🛍️ Tạo đơn hàng mới (voucher tự động áp dụng)
 */
export const createOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Sử dụng req.validated.body từ middleware validate
        const { orderItems, shippingAddress, shippingMethod, shippingFee, paymentMethod, notes } = req.validated.body;

        if (!orderItems || orderItems.length === 0) {
            const error = new Error("Đơn hàng không có sản phẩm.");
            error.statusCode = 400;
            throw error;
        }

        // Extra check với validationUtils cho shippingFee nếu có
        if (shippingFee !== undefined) {
            const feeCheck = validatePositiveNumber(shippingFee);
            if (!feeCheck.isValid) {
                const error = new Error(feeCheck.message);
                error.statusCode = 400;
                throw error;
            }
        }

        let subtotal = 0;

        // ✅ Kiểm tra tồn kho từng sản phẩm / biến thể
        for (const item of orderItems) {
            // Extra check quantity với validationUtils
            const quantityCheck = validateQuantity(item.quantity);
            if (!quantityCheck.isValid) {
                const error = new Error(quantityCheck.message);
                error.statusCode = 400;
                throw error;
            }

            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                const error = new Error(`ID sản phẩm không hợp lệ: ${item.product}`);
                error.statusCode = 400;
                throw error;
            }

            const product = await Product.findById(item.product).session(session);
            if (!product) {
                const error = new Error("Sản phẩm không tồn tại");
                error.statusCode = 404;
                throw error;
            }

            if (item.variant) {
                if (!mongoose.Types.ObjectId.isValid(item.variant)) {
                    const error = new Error(`ID biến thể không hợp lệ: ${item.variant}`);
                    error.statusCode = 400;
                    throw error;
                }

                const variant = await Variant.findById(item.variant).session(session);
                if (!variant) {
                    const error = new Error("Biến thể không tồn tại");
                    error.statusCode = 404;
                    throw error;
                }
                if (variant.stock < item.quantity) {
                    const error = new Error(`Biến thể ${variant.color} - ${variant.size} không đủ hàng`);
                    error.statusCode = 400;
                    throw error;
                }

                // Trừ tồn kho
                variant.stock -= item.quantity;
                await variant.save({ session });

                // Extra check variant price với validationUtils
                const priceCheck = validatePositiveNumber(variant.price);
                if (!priceCheck.isValid) {
                    const error = new Error(priceCheck.message);
                    error.statusCode = 400;
                    throw error;
                }

                subtotal += variant.price * item.quantity;
            } else {
                if (product.stock < item.quantity) {
                    const error = new Error(`Sản phẩm ${product.name} không đủ hàng`);
                    error.statusCode = 400;
                    throw error;
                }
                product.stock -= item.quantity;
                await product.save({ session });

                // Extra check product price với validationUtils
                const priceCheck = validatePositiveNumber(product.price);
                if (!priceCheck.isValid) {
                    const error = new Error(priceCheck.message);
                    error.statusCode = 400;
                    throw error;
                }

                subtotal += product.price * item.quantity;
            }
        }

        // 💵 Tổng tiền (voucher tự động tính trong middleware pre('save'))
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            shippingMethod,
            shippingFee,
            paymentMethod,
            subtotal,
            notes,
        });

        const createdOrder = await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        // Lấy thông tin user để gửi email
        const user = await User.findById(req.user._id).select('name email');

        // Gửi email xác nhận đơn hàng
        await sendOrderConfirmationEmail(user.email, user.name, {
            _id: createdOrder._id,
            total: createdOrder.finalAmount || subtotal, // Sử dụng finalAmount nếu có voucher
            items: orderItems.map(item => ({ name: item.name || 'Product', quantity: item.quantity, price: item.price || 0 })),
            status: createdOrder.status
        });

        res.status(201).json({
            message: "✅ Tạo đơn hàng thành công (voucher tự động áp dụng)",
            order: createdOrder,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 📦 Lấy tất cả đơn hàng (Admin)
 */
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("orderItems.product", "name price")
            .populate("orderItems.variant", "color size")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 👤 Lấy đơn hàng của người dùng hiện tại
 */
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("orderItems.product", "name price")
            .populate("orderItems.variant", "color size")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧾 Cập nhật trạng thái đơn hàng (Admin)
 */
export const updateOrderStatus = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body và req.validated.params từ middleware validate
        const { orderStatus, paymentStatus } = req.validated.body;
        const { orderId } = req.validated.params;

        // Extra check với validationUtils cho orderStatus enum
        if (orderStatus) {
            const statusCheck = validateEnum(orderStatus, ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']);
            if (!statusCheck.isValid) {
                const error = new Error(statusCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        const order = await Order.findById(orderId).populate('user', 'name email');
        if (!order) {
            const error = new Error("Không tìm thấy đơn hàng");
            error.statusCode = 404;
            return next(error);
        }

        const oldStatus = order.orderStatus;
        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        const updatedOrder = await order.save();

        // Gửi email thông báo cập nhật trạng thái nếu thay đổi (e.g., shipped/delivered)
        if (orderStatus && orderStatus !== oldStatus) {
            const statusMessage = orderStatus === 'delivered' ? 'Đã giao hàng thành công!' : `Đơn hàng đã được cập nhật: ${orderStatus}`;
            await sendCustomEmail(order.user.email, order.user.name, `Cập Nhật Đơn Hàng #${order._id}`, statusMessage, `Chi tiết: ${process.env.CLIENT_URL}/order/${order._id}`);
        }

        res.status(200).json({ message: "Cập nhật đơn hàng thành công", order: updatedOrder });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🗑️ Xóa đơn hàng (Admin)
 */
export const deleteOrder = async (req, res, next) => {
    try {
        // Sử dụng req.validated.params từ middleware validate
        const { id } = req.validated.params;

        const order = await Order.findById(id).populate('user', 'name email');
        if (!order) {
            const error = new Error("Không tìm thấy đơn hàng");
            error.statusCode = 404;
            return next(error);
        }

        await order.deleteOne();

        // Gửi email thông báo xóa đơn hàng (optional, nếu cần)
        await sendCustomEmail(order.user.email, order.user.name, 'Đơn Hàng Đã Bị Hủy', `Đơn hàng #${order._id} đã bị xóa. Nếu có thắc mắc, liên hệ hỗ trợ.`, '');

        res.status(200).json({ message: "Đã xóa đơn hàng thành công" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
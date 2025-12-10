import Cart from "../models/cartModel.js";
import ColorVariant from "../models/colorVariantModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Shipping from "../models/shippingModel.js";
import SizeInventory from "../models/sizeInventoryModel.js";
import User from "../models/userModel.js";
import Voucher from "../models/voucherModel.js";
import { sendOrderConfirmationEmail } from "../utils/emailUtils.js";

/**
 * 🛠️ CORE LOGIC: Tính toán chi tiết & Validate tồn kho (3 Cấp)
 * Hàm này dùng chung cho cả Preview (Xem giá) và Create (Tạo đơn)
 */
const calculateOrderDetails = async (itemsInput, shippingMethodId, voucherCode) => {
    let subtotal = 0;
    const processedItems = [];

    // ======================================================
    // 1. TÍNH TIỀN HÀNG & KIỂM TRA TỒN KHO
    // ======================================================
    for (const item of itemsInput) {
        // Lấy dữ liệu từ 3 bảng liên kết
        const sizeInv = await SizeInventory.findById(item.sizeInventoryId);
        if (!sizeInv) throw new Error(`Kích cỡ (Size) ID ${item.sizeInventoryId} không tồn tại.`);

        const colorVar = await ColorVariant.findById(item.colorVariantId);
        if (!colorVar) throw new Error(`Biến thể màu ID ${item.colorVariantId} không tồn tại.`);

        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Sản phẩm ID ${item.product} không tồn tại.`);

        // Validate tính toàn vẹn dữ liệu
        if (sizeInv.variant.toString() !== colorVar._id.toString()) 
            throw new Error(`Dữ liệu sai: Size ${sizeInv.size} không thuộc màu ${colorVar.color}.`);
        
        if (colorVar.product.toString() !== product._id.toString()) 
            throw new Error(`Dữ liệu sai: Màu ${colorVar.color} không thuộc sản phẩm ${product.name}.`);

        // Validate tồn kho
        if (sizeInv.stock < item.quantity) {
            throw new Error(`Sản phẩm "${product.name} (${colorVar.color} / ${sizeInv.size})" không đủ hàng. Hiện còn: ${sizeInv.stock}.`);
        }

        // Lấy giá bán (Ưu tiên giá giảm finalPrice nếu có)
        const unitPrice = (sizeInv.finalPrice && sizeInv.finalPrice > 0) ? sizeInv.finalPrice : sizeInv.price;
        const totalItemPrice = unitPrice * item.quantity;
        
        subtotal += totalItemPrice;

        // Tạo Snapshot Item để lưu vào Order
        processedItems.push({
            product: product._id,
            colorVariant: colorVar._id,
            sizeInventory: sizeInv._id, // ID này dùng để trừ kho sau này
            
            name: product.name,
            variantName: `${colorVar.color} / ${sizeInv.size}`,
            image: colorVar.image?.url || product.featuredImage,
            
            quantity: item.quantity,
            price: unitPrice,
            totalItemPrice: totalItemPrice
        });
    }

    // ======================================================
    // 2. TÍNH PHÍ VẬN CHUYỂN
    // ======================================================
    const shippingMethod = await Shipping.findById(shippingMethodId);
    if (!shippingMethod) throw new Error("Phương thức vận chuyển không hợp lệ.");
    
    let shippingFee = shippingMethod.cost;

    // ✅ LOGIC MỚI: Kiểm tra Freeship tự động của Shipping Method
    // Ví dụ: Ship 30k, nhưng đơn > 500k thì free.
    if (shippingMethod.freeShipOrderThreshold && subtotal >= shippingMethod.freeShipOrderThreshold) {
        shippingFee = 0;
    }

    // ======================================================
    // 3. TÍNH VOUCHER GIẢM GIÁ
    // ======================================================
    let voucherDiscount = 0;
    let validVoucherCode = null;

    if (voucherCode) {
        const voucher = await Voucher.findOne({
            code: voucherCode,
            isActive: true,
            startDate: { $lte: new Date() },
            endDate: { $gte: new Date() }
        });

        if (voucher) {
            // Kiểm tra điều kiện giá trị đơn hàng tối thiểu
            if (subtotal >= voucher.minOrderValue) {
                validVoucherCode = voucher.code;

                if (voucher.discountType === 'freeship') {
                    // ✅ LOGIC MỚI CHO FREESHIP VOUCHER
                    // Nếu maxDiscountAmount > 0 thì lấy nó làm trần, nếu không thì bao trọn phí ship
                    const maxSupport = voucher.maxDiscountAmount > 0 ? voucher.maxDiscountAmount : shippingFee;
                    
                    // Giảm tối đa bằng phí ship hiện tại (không giảm âm tiền)
                    voucherDiscount = Math.min(shippingFee, maxSupport);

                } else if (voucher.discountType === 'percentage') {
                    // Giảm theo % (Tính trên tiền hàng subtotal)
                    const calc = (subtotal * voucher.discountValue) / 100;
                    // Nếu có maxDiscountAmount thì áp trần
                    voucherDiscount = voucher.maxDiscountAmount > 0 ? Math.min(calc, voucher.maxDiscountAmount) : calc;

                } else if (voucher.discountType === 'fixed') {
                    // Giảm tiền mặt trực tiếp
                    voucherDiscount = voucher.discountValue;
                }
            }
        }
    }

    // ======================================================
    // 4. TỔNG KẾT
    // ======================================================
    const totalPrice = subtotal + shippingFee - voucherDiscount;

    return {
        processedItems,
        subtotal,
        shippingMethod,
        shippingFee,
        validVoucherCode,
        voucherDiscount,
        totalPrice: totalPrice > 0 ? totalPrice : 0
    };
};

/**
 * 👁️ API: Xem trước giá (Preview)
 * POST /api/orders/preview
 */
export const previewOrder = async (req, res, next) => {
    try {
        const { orderItems, shippingMethodId, voucherCode } = req.body;
        const result = await calculateOrderDetails(orderItems, shippingMethodId, voucherCode);

        res.status(200).json({
            success: true,
            data: {
                subtotal: result.subtotal,
                shippingFee: result.shippingFee,
                voucherDiscount: result.voucherDiscount,
                totalPrice: result.totalPrice,
                appliedVoucher: result.validVoucherCode
            }
        });
    } catch (error) {
        // Trả về lỗi 400 để frontend hiển thị (VD: Hết hàng, Voucher sai)
        res.status(400).json({ message: error.message });
    }
};

export const createOrder = async (req, res, next) => {
    try {
        const { orderItems, shippingMethodId, voucherCode, shippingAddress, paymentMethod, notes } = req.body;

        // 1. Tính toán lại (Server side)
        const calc = await calculateOrderDetails(orderItems, shippingMethodId, voucherCode);

        // 2. Trừ tồn kho (SizeInventory & Product)
        for (const item of calc.processedItems) {
            await SizeInventory.findByIdAndUpdate(item.sizeInventory, { $inc: { stock: -item.quantity } });
            await Product.findByIdAndUpdate(item.product, { $inc: { sold: item.quantity } });
        }

        // 🔥 3. TRỪ LƯỢT DÙNG VOUCHER (MỚI)
        if (calc.validVoucherCode) {
            await Voucher.findOneAndUpdate(
                { code: calc.validVoucherCode },
                { 
                    $inc: { usedCount: 1 }, // Tăng số lần đã dùng
                    $push: { usersUsed: req.user._id } // Ghi nhận user đã dùng
                }
            );
        }

        // 4. Tạo đơn hàng
        const newOrder = new Order({
            user: req.user._id,
            orderItems: calc.processedItems,
            shippingAddress,
            shippingMethod: calc.shippingMethod._id,
            shippingMethodName: calc.shippingMethod.name,
            shippingFee: calc.shippingFee,
            paymentMethod,
            notes,
            voucherCode: calc.validVoucherCode,
            voucherDiscount: calc.voucherDiscount,
            subtotal: calc.subtotal,
            totalPrice: calc.totalPrice
        });

        const savedOrder = await newOrder.save();

        // 5. Xóa giỏ hàng
        const userCart = await Cart.findOne({ user: req.user._id });
        if (userCart) {
            const remainingItems = userCart.items.filter(cartItem => {
                const isPurchased = orderItems.some(orderItem => 
                    orderItem.product === cartItem.product.toString() &&
                    orderItem.colorVariantId === cartItem.colorVariant.toString() &&
                    orderItem.sizeInventoryId === cartItem.sizeInventory.toString()
                );
                return !isPurchased;
            });
            userCart.items = remainingItems;
            await userCart.save();
        }

        // 6. Gửi email
        const user = await User.findById(req.user._id);
        if(user) {
            sendOrderConfirmationEmail(user.email, user.name, savedOrder).catch(err => console.error("Lỗi gửi email:", err));
        }

        // 7. Trả về
        res.status(201).json({
            success: true,
            message: "Đặt hàng thành công",
            orderId: newOrder._id.toString(),
            order: newOrder // Dùng newOrder cho chắc chắn
        });

    } catch (error) {
        next(error);
    }
};

// ============================================================
// CÁC HÀM QUẢN LÝ ĐƠN HÀNG KHÁC
// ============================================================

export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        const order = await Order.findById(req.params.orderId); // Lưu ý: params khớp với routes
        if (!order) throw new Error("Đơn hàng không tồn tại");

        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        // Nếu cập nhật thành đã thanh toán, lưu thời gian
        if (paymentStatus === 'Paid' && !order.paidAt) {
            order.paidAt = Date.now();
        }
        
        // Nếu cập nhật thành đã giao, lưu thời gian
        if (orderStatus === 'Delivered' && !order.deliveredAt) {
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.status(200).json({ message: "Cập nhật thành công", order: updatedOrder });
    } catch (error) {
        next(error);
    }
};

/**
 * 📦 USER: Xác nhận đã nhận hàng
 * PUT /api/orders/:id/confirm
 */
export const confirmOrderReceived = async (req, res, next) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
        if (!order) return res.status(404).json({message: "Không tìm thấy đơn hàng"});
        
        if (order.orderStatus !== 'Shipping') {
            return res.status(400).json({message: "Chỉ xác nhận được khi đơn đang giao"});
        }

        order.orderStatus = 'Delivered';
        order.paymentStatus = 'Paid';
        order.deliveredAt = Date.now();
        if(!order.paidAt) order.paidAt = Date.now();

        await order.save();
        res.json({message: "Xác nhận thành công", order});
    } catch (error) {
        next(error);
    }
};

/**
 * 🔍 USER: Xem chi tiết 1 đơn hàng
 * GET /api/orders/:id
 */
export const getOrderById = async (req, res, next) => {
    try {
        // Tìm đơn hàng theo ID và phải thuộc về User đang đăng nhập
        const order = await Order.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        }).populate("user", "name email");

        if (!order) {
            const error = new Error("Không tìm thấy đơn hàng");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

/**
 * 🚫 USER: Tự hủy đơn hàng (Phiên bản Localhost - Đã bỏ Transaction)
 * PUT /api/orders/:id/cancel
 */
export const cancelOrder = async (req, res, next) => {
    // ❌ BỎ: const session = await mongoose.startSession();
    // ❌ BỎ: session.startTransaction();

    try {
        // 1. Tìm đơn hàng (Bỏ .session(session))
        const order = await Order.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!order) {
            const error = new Error("Không tìm thấy đơn hàng");
            error.statusCode = 404;
            throw error;
        }

        // Chỉ cho hủy nếu đơn chưa được xử lý (Pending)
        if (order.orderStatus !== 'Pending') {
            const error = new Error("Không thể hủy đơn hàng đã được xử lý hoặc đang giao.");
            error.statusCode = 400;
            throw error;
        }

        // 2. Cập nhật trạng thái
        order.orderStatus = 'Cancelled';
        // (Optional) Thêm thời gian hủy nếu muốn
        // order.cancelledAt = Date.now(); 
        
        // Lưu (Bỏ { session })
        await order.save();

        // 3. Hoàn lại tồn kho (Restock)
        for (const item of order.orderItems) {
            // Cộng lại kho cho SizeInventory (Bỏ session)
            await SizeInventory.findByIdAndUpdate(
                item.sizeInventory, 
                { $inc: { stock: item.quantity } }
            );
            
            // Giảm số lượng đã bán ở Product (Bỏ session)
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { sold: -item.quantity } }
            );
        }

        // ❌ BỎ: await session.commitTransaction();
        // ❌ BỎ: session.endSession();

        res.status(200).json({ 
            message: "Đã hủy đơn hàng thành công", 
            order 
        });

    } catch (error) {
        // ❌ BỎ: await session.abortTransaction();
        // ❌ BỎ: session.endSession();
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) throw new Error("Đơn hàng không tồn tại");
        
        // (Tùy chọn) Có thể hoàn lại kho nếu xóa đơn hàng
        // Nhưng thường admin xóa đơn rác nên không cần hoàn kho tự động, 
        // hoặc phải viết logic hoàn kho phức tạp hơn ở đây.

        await order.deleteOne();
        res.status(200).json({ message: "Đã xóa đơn hàng" });
    } catch (error) {
        next(error);
    }
};
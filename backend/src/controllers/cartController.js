// cart controller
import Cart from "../models/cartModel.js";
import SizeInventory from "../models/sizeInventoryModel.js"; // Model tồn kho mới
import Voucher from "../models/voucherModel.js";

// Helper: Tính toán lại tổng tiền giỏ hàng (nếu cần xử lý phức tạp hơn pre-save hook)
// Hiện tại pre-save hook trong model đã lo phần cơ bản, nhưng ta có thể cần logic voucher ở đây.
const calculateCartTotals = async (cart) => {
    // 1. Tính tổng tiền hàng (Subtotal)
    let subtotal = 0;
    cart.items.forEach(item => {
        subtotal += item.finalPrice * item.quantity;
    });
    cart.subtotal = subtotal;

    // 2. Tính giảm giá đơn hàng (Voucher)
    let orderDiscount = 0;
    if (cart.appliedVoucher) {
        const voucher = await Voucher.findById(cart.appliedVoucher);
        if (voucher && voucher.isActive) {
            // Kiểm tra điều kiện tối thiểu
            if (!voucher.minOrderValue || subtotal >= voucher.minOrderValue) {
                if (voucher.discountType === 'percentage') {
                    orderDiscount = (subtotal * voucher.discountValue) / 100;
                    if (voucher.maxDiscountAmount) {
                        orderDiscount = Math.min(orderDiscount, voucher.maxDiscountAmount);
                    }
                } else if (voucher.discountType === 'fixed') {
                    orderDiscount = voucher.discountValue;
                }
            } else {
                // Nếu không đủ điều kiện nữa thì gỡ voucher
                cart.appliedVoucher = null; 
            }
        } else {
            cart.appliedVoucher = null; // Voucher hết hạn hoặc bị khóa
        }
    }
    
    cart.totalDiscount = orderDiscount;
    cart.totalPrice = Math.max(subtotal - orderDiscount, 0);
    
    return cart;
};

//  CART CONTROLLERS

/**
 * 1. 🛒 LẤY GIỎ HÀNG CỦA USER HIỆN TẠI
 * @route GET /api/cart
 */
export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id })
            .populate('items.product', 'name slug featuredImage') // Lấy thông tin cơ bản SP
            .populate('items.colorVariant', 'color colorCode image') // Lấy thông tin màu/ảnh
            .populate('items.sizeInventory', 'size stock price') // Lấy thông tin size/kho
            .populate('appliedVoucher', 'code discountType discountValue minOrderValue');

        if (!cart) {
            // Nếu chưa có giỏ, tạo mới rỗng
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        // Tính toán lại để đảm bảo data mới nhất (ví dụ voucher hết hạn)
        cart = await calculateCartTotals(cart);
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

/**
 * 2. ➕ THÊM SẢN PHẨM VÀO GIỎ (LOGIC ĐÃ FIX & DEBUG)
 */
export const addToCart = async (req, res, next) => {
    try {
        console.log("📥 AddToCart Payload:", req.body); // 1. Kiểm tra dữ liệu Frontend gửi lên

        const { productId, colorVariantId, sizeId, quantity } = req.body;
        const userId = req.user._id;

        // 1. Validate dữ liệu đầu vào
        if (!productId || !colorVariantId || !sizeId || !quantity) {
            throw new Error("Thiếu thông tin sản phẩm (ID, Color, Size, Qty).");
        }

        // 2. Kiểm tra tồn kho & Lấy giá
        const sizeInventory = await SizeInventory.findById(sizeId);
        if (!sizeInventory) {
            throw new Error("Kích cỡ sản phẩm không tồn tại trong hệ thống.");
        }

        if (sizeInventory.stock < quantity) {
            throw new Error(`Kho chỉ còn ${sizeInventory.stock} sản phẩm, bạn mua ${quantity}.`);
        }

        console.log("✅ Size Inventory Found:", sizeInventory); // 2. Kiểm tra tìm thấy size

        // 3. Lấy hoặc tạo giỏ hàng
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // 4. Tìm xem sản phẩm đã có trong giỏ chưa
        // ⚠️ QUAN TRỌNG: Dùng .toString() để so sánh chính xác ObjectId và String
        const existingItemIndex = cart.items.findIndex(item => 
            item.product.toString() === productId && 
            item.colorVariant.toString() === colorVariantId &&
            item.sizeInventory.toString() === sizeId
        );

        console.log("🔍 Existing Item Index:", existingItemIndex);

        if (existingItemIndex > -1) {
            // A. CẬP NHẬT SỐ LƯỢNG
            const newQuantity = cart.items[existingItemIndex].quantity + Number(quantity);
            
            if (sizeInventory.stock < newQuantity) {
                throw new Error(`Kho không đủ. Tổng số lượng sẽ là ${newQuantity}, kho chỉ có ${sizeInventory.stock}.`);
            }

            cart.items[existingItemIndex].quantity = newQuantity;
            console.log("🔄 Updated Quantity for existing item.");
        } else {
            // B. THÊM MỚI ITEM
            // Lấy giá bán thực tế (nếu finalPrice không có thì dùng price)
            const unitPrice = sizeInventory.finalPrice !== undefined ? sizeInventory.finalPrice : sizeInventory.price;
            const originalPrice = sizeInventory.price;

            const newItem = {
                product: productId,
                colorVariant: colorVariantId,
                sizeInventory: sizeId,
                quantity: Number(quantity),
                price: originalPrice,     // Giá gốc (Required)
                finalPrice: unitPrice,    // Giá bán (Required)
                discount: originalPrice - unitPrice,
            };

            console.log("➕ Pushing New Item:", newItem); // 3. Kiểm tra item trước khi push
            cart.items.push(newItem);
        }

        // 5. Lưu
        await cart.save(); 
        console.log("💾 Cart Saved Successfully. Items count:", cart.items.length);

        // 6. Populate để trả về
        const populatedCart = await Cart.findById(cart._id)
            .populate('items.product', 'name slug featuredImage')
            .populate('items.colorVariant', 'color colorCode image')
            .populate('items.sizeInventory', 'size stock price finalPrice');

        res.status(200).json({ message: "Đã thêm vào giỏ hàng", cart: populatedCart });

    } catch (error) {
        console.error("❌ Error in addToCart:", error);
        next(error);
    }
};

/**
 * 3. 🔄 CẬP NHẬT SỐ LƯỢNG ITEM
 * @route PUT /api/cart/update
 * @body { itemId, quantity }
 */
export const updateCartItem = async (req, res, next) => {
    try {
        const { itemId, quantity } = req.body;
        const userId = req.user._id;

        if (quantity < 1) {
            const error = new Error("Số lượng phải tối thiểu là 1.");
            error.statusCode = 400;
            throw error;
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) { throw new Error("Giỏ hàng không tồn tại."); }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) { throw new Error("Sản phẩm không có trong giỏ."); }

        // Kiểm tra tồn kho real-time
        const sizeInventory = await SizeInventory.findById(cart.items[itemIndex].sizeInventory);
        if (sizeInventory.stock < quantity) {
            const error = new Error(`Kho chỉ còn ${sizeInventory.stock} sản phẩm.`);
            error.statusCode = 400;
            throw error;
        }

        // Cập nhật số lượng
        cart.items[itemIndex].quantity = quantity;
        
        await cart.save();

        // Trả về giỏ hàng mới
        const updatedCart = await Cart.findById(cart._id)
            .populate('items.product', 'name slug')
            .populate('items.colorVariant', 'color image')
            .populate('items.sizeInventory', 'size stock');

        res.status(200).json({ message: "Đã cập nhật số lượng", cart: updatedCart });

    } catch (error) {
        next(error);
    }
};

/**
 * 4. ❌ XÓA SẢN PHẨM KHỎI GIỎ
 * @route DELETE /api/cart/item/:itemId
 */
export const removeCartItem = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) { throw new Error("Giỏ hàng không tồn tại."); }

        // Filter bỏ item cần xóa
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        await cart.save();

        res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ", cart });

    } catch (error) {
        next(error);
    }
};

/**
 * 5. 🧹 XÓA TOÀN BỘ GIỎ HÀNG
 * @route DELETE /api/cart/clear
 */
export const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            cart.appliedVoucher = null;
            cart.totalDiscount = 0;
            await cart.save();
        }
        res.status(200).json({ message: "Đã làm trống giỏ hàng", cart });
    } catch (error) {
        next(error);
    }
};

/**
 * 6. 🎟️ ÁP DỤNG VOUCHER
 * @route POST /api/cart/apply-voucher
 * @body { code }
 */
export const applyVoucher = async (req, res, next) => {
    try {
        const { code } = req.body;
        const userId = req.user._id;

        // 1. Tìm giỏ hàng
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            throw new Error("Giỏ hàng trống, không thể áp dụng voucher.");
        }

        // 2. Tìm Voucher
        const voucher = await Voucher.findOne({ code, isActive: true });
        if (!voucher) {
            const error = new Error("Voucher không hợp lệ hoặc đã hết hạn.");
            error.statusCode = 404;
            throw error;
        }

        // 3. Kiểm tra điều kiện Voucher (Thời gian, Số lượng, Giá trị đơn hàng)
        const now = new Date();
        if (now < voucher.startDate || now > voucher.endDate) {
            throw new Error("Voucher chưa bắt đầu hoặc đã hết hạn.");
        }
        if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
            throw new Error("Voucher đã hết lượt sử dụng.");
        }
        if (voucher.minOrderValue && cart.subtotal < voucher.minOrderValue) {
            throw new Error(`Đơn hàng phải từ ${voucher.minOrderValue.toLocaleString()}đ để dùng voucher này.`);
        }

        // 4. Gán Voucher vào giỏ và Lưu (để kích hoạt tính toán lại)
        cart.appliedVoucher = voucher._id;
        
        // Hàm calculateCartTotals hoặc pre-save hook sẽ tính lại totalDiscount & totalPrice
        const updatedCart = await calculateCartTotals(cart); 
        await updatedCart.save();

        res.status(200).json({ 
            message: `Áp dụng mã ${code} thành công!`, 
            cart: updatedCart 
        });

    } catch (error) {
        next(error);
    }
};

/**
 * 7. 🚫 GỠ VOUCHER
 * @route DELETE /api/cart/remove-voucher
 */
export const removeVoucher = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.appliedVoucher = null;
            cart.totalDiscount = 0;
            
            // Tính lại tổng tiền (bỏ giảm giá)
            cart.totalPrice = cart.subtotal;
            
            await cart.save();
        }
        res.status(200).json({ message: "Đã gỡ voucher", cart });
    } catch (error) {
        next(error);
    }
};

// Lấy số lượng item trong giỏ hàng
export const getCartItemCount = async (req, res) => {
    try {
        // Tìm giỏ hàng của user hiện tại (req.user._id lấy từ middleware xác thực)
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            // Nếu chưa có giỏ hàng, trả về 0
            return res.status(200).json({ count: 0 });
        }

        // Tính tổng số lượng (quantity) của từng item
        // Ví dụ: [ {qty: 2}, {qty: 1} ] => Tổng là 3
        const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        res.status(200).json({ count: totalItems });

    } catch (error) {
        console.error("Lỗi đếm giỏ hàng:", error);
        res.status(500).json({ message: "Lỗi server khi lấy số lượng giỏ hàng" });
    }
};
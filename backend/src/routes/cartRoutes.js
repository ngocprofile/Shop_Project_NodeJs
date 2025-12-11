//cart router
import express from "express";
import {
    addToCart,
    applyVoucher,
    clearCart,
    getCart,
    getCartItemCount,
    removeCartItem,
    removeVoucher,
    updateCartItem
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware xác thực người dùng
// import validate from "../middleware/validateMiddleware.js"; // (Tùy chọn: Nếu bạn muốn validate input chặt chẽ hơn)

const router = express.Router();

// Tất cả các route giỏ hàng đều yêu cầu đăng nhập
router.use(protect);

// ===============================================================
// 🛒 CART ROUTES
// ===============================================================
// Route lấy số lượng item (GET /api/cart/count)
router.get('/count', getCartItemCount);
/**
 * @route   GET /api/cart
 * @desc    Lấy thông tin giỏ hàng của user hiện tại
 * @access  Private
 */
router.get("/", getCart);

/**
 * @route   POST /api/cart/add
 * @desc    Thêm sản phẩm vào giỏ (Cần productId, colorVariantId, sizeId, quantity)
 * @access  Private
 */
router.post("/add", addToCart);

/**
 * @route   PUT /api/cart/update
 * @desc    Cập nhật số lượng sản phẩm trong giỏ (Cần itemId, quantity)
 * @access  Private
 */
router.put("/update", updateCartItem);

/**
 * @route   DELETE /api/cart/item/:itemId
 * @desc    Xóa một sản phẩm khỏi giỏ hàng
 * @access  Private
 */
router.delete("/item/:itemId", removeCartItem);

/**
 * @route   DELETE /api/cart/clear
 * @desc    Xóa toàn bộ giỏ hàng
 * @access  Private
 */
router.delete("/clear", clearCart);

// ===============================================================
// 🎟️ VOUCHER ROUTES (TRONG GIỎ HÀNG)
// ===============================================================

/**
 * @route   POST /api/cart/apply-voucher
 * @desc    Áp dụng mã giảm giá cho đơn hàng
 * @access  Private
 */
router.post("/apply-voucher", applyVoucher);

/**
 * @route   DELETE /api/cart/remove-voucher
 * @desc    Hủy áp dụng mã giảm giá
 * @access  Private
 */
router.delete("/remove-voucher", removeVoucher);



export default router;
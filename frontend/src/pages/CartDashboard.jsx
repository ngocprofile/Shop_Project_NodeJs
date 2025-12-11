//cartDashboard.jsx
import { ArrowRight, Calendar, ShoppingBag, Tag, Ticket, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import api from '../api'; // Import cấu hình axios của dự án
import styles from './CartDashboard.module.css'; // Import CSS Module

// URL Gốc của Backend (Dùng để hiển thị ảnh)
const BACKEND_URL = 'http://localhost:5000';

// Helper: Format tiền tệ
const formatCurrency = (val) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(val) || 0);

// Helper: Lấy ảnh sản phẩm
const getProductImage = (item) => {
    const variantImage = item.colorVariant?.image?.url;
    const productImage = item.product?.featuredImage;
    
    const path = variantImage || productImage;
    if (!path) return "https://via.placeholder.com/80?text=No+Img";
    if (path.startsWith('http')) return path;
    return BACKEND_URL + path;
};

const CartDashboard = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingItemId, setUpdatingItemId] = useState(null);
    
    // State cho Voucher
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherLoading, setVoucherLoading] = useState(false);
    
    // 🎯 STATE MỚI: Danh sách voucher trong ví người dùng
    const [myVouchers, setMyVouchers] = useState([]); 
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const Navigate = useNavigate([])

    // const navigate = useNavigate();

    // 1. Tải dữ liệu (Giỏ hàng + Profile User để lấy Voucher)
    const fetchData = async () => {
        try {
            // Gọi song song 2 API
            const [cartRes, userRes] = await Promise.all([
                api.get('/cart'),
                api.get('/users/profile') // 🎯 Lấy profile để truy cập 'collectedVouchers'
            ]);
            
            setCart(cartRes.data);
            
            // 🎯 Lưu danh sách voucher từ ví user
            // Kiểm tra kỹ để tránh lỗi nếu user chưa có voucher nào
            if (userRes.data && Array.isArray(userRes.data.collectedVouchers)) {
                setMyVouchers(userRes.data.collectedVouchers);
            }

        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 2. Cập nhật số lượng
    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setUpdatingItemId(itemId); 
        try {
            const res = await api.put('/cart/update', { itemId, quantity: newQuantity });
            setCart(res.data.cart);
        } catch (error) {
            alert(error.response?.data?.message || "Không thể cập nhật số lượng.");
        } finally {
            setUpdatingItemId(null);
        }
    };

    // 3. Xóa sản phẩm
    const handleRemoveItem = async (itemId) => {
        if (!window.confirm("Bạn muốn xóa sản phẩm này khỏi giỏ?")) return;
        try {
            const res = await api.delete(`/cart/item/${itemId}`);
            setCart(res.data.cart);
        } catch (error) {
            console.error("Lỗi xóa sản phẩm:", error);
        }
    };

    const toggleSelectItem = (itemId) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === cart.items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.items.map(item => item._id));
        }
    };

    const selectedTotal = (cart?.items ?? [])
    .filter(item => selectedItems.includes(item._id))
    .reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);





    // 4. Áp dụng Voucher
    const applyVoucherCode = async (code) => {
        if (!code) return;
        setVoucherLoading(true);
        try {
            const res = await api.post('/cart/apply-voucher', { code });
            setCart(res.data.cart);
            alert(res.data.message);
            setVoucherCode(''); 
            setShowVoucherModal(false); // Đóng modal sau khi chọn
        } catch (error) {
            alert(error.response?.data?.message || "Voucher không hợp lệ hoặc không đủ điều kiện.");
        } finally {
            setVoucherLoading(false);
        }
    };

    const handleApplyVoucherSubmit = (e) => {
        e.preventDefault();
        applyVoucherCode(voucherCode);
    }

    // 5. Gỡ Voucher
    const handleRemoveVoucher = async () => {
        try {
            const res = await api.delete('/cart/remove-voucher');
            setCart(res.data.cart);
        } catch (error) {
            console.error("Lỗi gỡ voucher:", error);
        }
    };

    // 6. Làm trống giỏ
    const handleClearCart = async () => {
        if (!window.confirm("Bạn chắc chắn muốn xóa toàn bộ giỏ hàng?")) return;
        try {
            const res = await api.delete('/cart/clear');
            setCart(res.data.cart);
        } catch (error) {
            console.error("Lỗi làm trống giỏ:", error);
        }
    };

    // 🎯 HELPER: Lọc voucher hợp lệ để hiển thị trong Modal
    const getValidVouchers = () => {
        const now = new Date();
        return myVouchers.filter(voucher => 
            voucher !== null && 
            voucher.isActive === true &&
            new Date(voucher.endDate) > now
        );
    };

    // --- RENDER ---
    if (loading) return <div className={styles.loadingContainer}>Đang tải giỏ hàng...</div>;

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyCart}>
                    <ShoppingBag size={64} className={styles.emptyIcon} />
                    <p className={styles.emptyText}>Giỏ hàng của bạn đang trống.</p>
                    <Link to="/" className={styles.btnSecondary}>
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        );
    }

    const validVouchersList = getValidVouchers();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Giỏ hàng của bạn ({cart.totalQuantity} sản phẩm)</h1>
            
            <div className={styles.cartGrid}>
                {/* --- CỘT TRÁI: DANH SÁCH SẢN PHẨM --- */}
                <div className={styles.leftColumn}>
                    <div className={styles.cartItemsList}>
                        <div className={styles.cartHeader}>
                            <input 
                                type="checkbox" 
                                className={styles.cartcheckbox}
                                checked={selectedItems.length === cart.items.length}
                                onChange={toggleSelectAll}
                                style={{ marginRight: 8 }}
                            />
                            <span>Sản phẩm</span>
                            <span style={{textAlign: 'center'}}>Số lượng</span>
                            <span style={{textAlign: 'right'}}>Thành tiền</span>
                            <span></span>
                        </div>

                        {cart.items.map((item) => (
                            <div key={item._id} className={styles.cartItem}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item._id)}
                                    onChange={() => toggleSelectItem(item._id)}
                                    className={styles.itemCheckbox}
                                />

                                <div className={styles.productInfo}>
                                    <img 
                                        src={getProductImage(item)} 
                                        alt={item.product?.name} 
                                        className={styles.productImage} 
                                    />
                                    <div className={styles.productDetails}>
                                        <h3>{item.product?.name}</h3>
                                        <span className={styles.variantBadge}>
                                            {item.colorVariant?.color} / Size {item.sizeInventory?.size}
                                        </span>
                                    </div>
                                </div>

                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className={styles.quantityControl}>
                                        <button 
                                            className={styles.qtyBtn}
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                            disabled={updatingItemId === item._id || item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input 
                                            type="text" 
                                            value={item.quantity} 
                                            readOnly 
                                            className={styles.qtyInput}
                                        />
                                        <button 
                                            className={styles.qtyBtn}
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                            disabled={updatingItemId === item._id}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.priceColumn} style={{textAlign: 'right'}}>
                                    <span className={styles.finalPrice}>
                                        {formatCurrency(item.finalPrice * item.quantity)}
                                    </span>
                                    {item.discount > 0 && (
                                        <span className={styles.originalPrice}>
                                            {formatCurrency(item.price * item.quantity)}
                                        </span>
                                    )}
                                </div>

                                <div style={{textAlign: 'right'}}>
                                    <button 
                                        className={styles.removeBtn}
                                        onClick={() => handleRemoveItem(item._id)}
                                        title="Xóa sản phẩm"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className={styles.clearCartBtn} onClick={handleClearCart}>
                        Xóa tất cả sản phẩm
                    </button>
                </div>

                {/* --- CỘT PHẢI: TỔNG ĐƠN & VOUCHER --- */}
                <div className={styles.rightColumn}>
                    <div className={styles.summaryCard}>
                        <h2>Tóm tắt đơn hàng</h2>
                        
                        <div className={styles.summaryRow}>
                            <span>Tạm tính:</span>
                            <span>{formatCurrency(cart.subtotal)}</span>
                        </div>

                        {/* Voucher Section */}
                        <div className={styles.voucherSection}>
                            {!cart.appliedVoucher ? (
                                <>
                                    {/* Nút mở Modal chọn voucher từ Ví */}
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                                        <span style={{fontSize: '0.9rem', fontWeight: '600', color: '#4a5568'}}>Mã ưu đãi</span>
                                        <button 
                                            className={styles.openVoucherModalBtn}
                                            onClick={() => setShowVoucherModal(true)}
                                        >
                                            Chọn mã
                                        </button>
                                    </div>

                                    <form onSubmit={handleApplyVoucherSubmit} className={styles.voucherInputGroup}>
                                        <input 
                                            type="text" 
                                            placeholder="Nhập mã giảm giá"
                                            className={styles.voucherInput}
                                            value={voucherCode}
                                            onChange={(e) => setVoucherCode(e.target.value)}
                                        />
                                        <button 
                                            type="submit" 
                                            className={styles.applyBtn}
                                            disabled={voucherLoading || !voucherCode}
                                        >
                                            {voucherLoading ? '...' : 'Áp dụng'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className={styles.appliedVoucher}>
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <span style={{display:'flex', alignItems:'center', gap:'5px', color: '#2f855a', fontWeight: 'bold'}}>
                                            <Tag size={16} /> {cart.appliedVoucher.code}
                                        </span>
                                        <span style={{fontSize: '0.8rem', color: '#2f855a'}}>
                                            Đã giảm {formatCurrency(cart.totalDiscount)}
                                        </span>
                                    </div>
                                    <button onClick={handleRemoveVoucher} className={styles.removeVoucher}>Gỡ</button>
                                </div>
                            )}
                        </div>

                        {cart.totalDiscount > 0 && (
                            <div className={`${styles.summaryRow} ${styles.discountText}`}>
                                <span>Giảm giá:</span>
                                <span>- {formatCurrency(cart.totalDiscount)}</span>
                            </div>
                        )}

                        <div className={styles.summaryRow}>
                            <span>Tổng sản phẩm đã chọn:</span>
                            <span>{formatCurrency(selectedTotal)}</span>
                        </div>


                        <div className={styles.summaryTotal}>
                            <span>Tổng cộng:</span>
                            <span>{formatCurrency(cart.totalPrice)}</span>
                        </div>
                        
                        <button className={styles.checkoutBtn} 
                            disabled={selectedItems.length === 0}
                            onClick={() => Navigate('/checkout', { state: { selectedItems } })}>
                            Thanh toán ngay <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- VOUCHER MODAL (Popup chọn mã từ Ví) --- */}
            {showVoucherModal && (
                <div className={styles.modalOverlay} onClick={() => setShowVoucherModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Chọn Voucher từ Ví</h3>
                            <button className={styles.closeModalBtn} onClick={() => setShowVoucherModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className={styles.voucherList}>
                            {validVouchersList.length === 0 ? (
                                <div className={styles.emptyVoucherList}>
                                    <Ticket size={48} style={{margin: '0 auto 10px', color: '#cbd5e0'}} />
                                    <p>Ví của bạn chưa có mã giảm giá nào khả dụng.</p>
                                    <Link to="/vouchers" className={styles.btnSecondary} style={{marginTop: '10px', fontSize: '0.85rem'}}>
                                        Săn mã ngay
                                    </Link>
                                </div>
                            ) : (
                                validVouchersList.map(v => {
                                    // Kiểm tra điều kiện đơn hàng tối thiểu
                                    const isEligible = !v.minOrderValue || cart.subtotal >= v.minOrderValue;
                                    
                                    return (
                                        <div key={v._id} className={`${styles.voucherItem} ${!isEligible ? styles.disabled : ''}`}>
                                            <div className={styles.voucherInfo}>
                                                <h4>
                                                    <span className={styles.codeTag}>{v.code}</span>
                                                </h4>
                                                <p className={styles.voucherDesc}>
                                                    Giảm {v.discountType === 'percentage' ? `${v.discountValue}%` : formatCurrency(v.discountValue)} 
                                                    {v.maxDiscountAmount ? ` (Tối đa ${formatCurrency(v.maxDiscountAmount)})` : ''}
                                                </p>
                                                
                                                <div style={{fontSize: '0.8rem', color: '#718096', marginTop: '4px'}}>
                                                    {v.minOrderValue && (
                                                        <p style={{margin: 0}}>
                                                            • Đơn tối thiểu: {formatCurrency(v.minOrderValue)}
                                                        </p>
                                                    )}
                                                    <p style={{margin: 0, display: 'flex', alignItems: 'center', gap: '4px'}}>
                                                        <Calendar size={12} /> HSD: {new Date(v.endDate).toLocaleDateString('vi-VN')}
                                                    </p>
                                                </div>

                                                {!isEligible && (
                                                    <p className={styles.voucherCondition} style={{color: '#e53e3e', fontWeight: 'bold'}}>
                                                        Chưa đủ điều kiện đơn hàng
                                                    </p>
                                                )}
                                            </div>
                                            <button 
                                                className={styles.selectVoucherBtn}
                                                onClick={() => applyVoucherCode(v.code)}
                                                disabled={!isEligible}
                                            >
                                                Áp dụng
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CartDashboard;
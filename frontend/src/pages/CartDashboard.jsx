import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; // Import axios config
import styles from './CartDashboard.module.css';

const BACKEND_URL = 'http://localhost:5000';

// Helper: Format tiền
const formatCurrency = (val) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(val) || 0);

// Helper: Lấy ảnh
const getProductImage = (item) => {
    const variantImage = item.colorVariant?.image?.url;
    const productImage = item.product?.featuredImage;
    const path = variantImage || productImage;
    
    if (!path) return "https://via.placeholder.com/80?text=No+Img";
    if (path.startsWith('http')) return path;
    return BACKEND_URL + path;
};

const CartDashboard = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingItemId, setUpdatingItemId] = useState(null);

    // --- STATE QUẢN LÝ CHECKBOX ---
    // Lưu mảng các _id của item được chọn
    const [selectedItems, setSelectedItems] = useState([]);

    // State Voucher
    // const [voucherCode, setVoucherCode] = useState('');
    // const [voucherLoading, setVoucherLoading] = useState(false);
    // const [myVouchers, setMyVouchers] = useState([]); 
    // const [showVoucherModal, setShowVoucherModal] = useState(false);

    // 1. Tải dữ liệu
    const fetchData = async () => {
        try {
            const [cartRes] = await Promise.all([
                api.get('/cart'),
                api.get('/users/profile')
            ]);
            setCart(cartRes.data);
            
            // if (userRes.data && Array.isArray(userRes.data.collectedVouchers)) {
            //     setMyVouchers(userRes.data.collectedVouchers);
            // }
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ============================================================
    // 🧠 LOGIC CHECKBOX & TÍNH TIỀN
    // ============================================================

    // 1. Chọn/Bỏ chọn 1 sản phẩm
    const handleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    // 2. Chọn tất cả
    const handleSelectAll = () => {
        if (cart && cart.items) {
            if (selectedItems.length === cart.items.length) {
                setSelectedItems([]); // Bỏ chọn hết
            } else {
                setSelectedItems(cart.items.map(item => item._id)); // Chọn hết
            }
        }
    };

    // 3. Tính tổng tiền (Client-side) dựa trên các món ĐƯỢC CHỌN
    const selectedTotal = useMemo(() => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((sum, item) => {
            if (selectedItems.includes(item._id)) {
                // Ưu tiên giá finalPrice (nếu sản phẩm đang giảm giá)
                const price = item.finalPrice > 0 ? item.finalPrice : item.price;
                return sum + (price * item.quantity);
            }
            return sum;
        }, 0);
    }, [cart, selectedItems]);

    // 4. Xử lý khi bấm nút THANH TOÁN
    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!");
            return;
        }
        // Chuyển hướng sang trang Checkout và gửi kèm danh sách ID
        navigate('/checkout', { state: { selectedItemIds: selectedItems } });
    };

    // ============================================================
    // CÁC HAM LOGIC CŨ (Update, Remove, Voucher...)
    // ============================================================

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setUpdatingItemId(itemId); 
        try {
            const res = await api.put('/cart/update', { itemId, quantity: newQuantity });
            setCart(res.data.cart);
        } catch (error) {
            alert(error.response?.data?.message || "Lỗi cập nhật.");
        } finally {
            setUpdatingItemId(null);
        }
    };

    const handleRemoveItem = async (itemId) => {
        if (!window.confirm("Xóa sản phẩm này?")) return;
        try {
            const res = await api.delete(`/cart/item/${itemId}`);
            setCart(res.data.cart);
            // Xóa khỏi danh sách đã chọn nếu có
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } catch (error) {
            console.error("Lỗi xóa:", error);
        }
    };

    // const handleApplyVoucherSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!voucherCode) return;
    //     setVoucherLoading(true);
    //     try {
    //         // Lưu ý: API này áp dụng cho toàn bộ giỏ hàng trên DB
    //         const res = await api.post('/cart/apply-voucher', { code: voucherCode });
    //         setCart(res.data.cart);
    //         alert(res.data.message);
    //         setVoucherCode(''); 
    //         setShowVoucherModal(false);
    //     } catch (error) {
    //         alert(error.response?.data?.message || "Voucher lỗi.");
    //     } finally {
    //         setVoucherLoading(false);
    //     }
    // };

    // const handleRemoveVoucher = async () => {
    //     try {
    //         const res = await api.delete('/cart/remove-voucher');
    //         setCart(res.data.cart);
    //     } catch (error) {
    //         console.error("Lỗi gỡ voucher:", error);
    //     }
    // };

    const handleClearCart = async () => {
        if (!window.confirm("Xóa toàn bộ giỏ hàng?")) return;
        try {
            const res = await api.delete('/cart/clear');
            setCart(res.data.cart);
            setSelectedItems([]);
        } catch (error) {
            console.error("Lỗi làm trống giỏ:", error);
        }
    };

    // const getValidVouchers = () => {
    //     const now = new Date();
    //     return myVouchers.filter(v => 
    //         v && 
    //         v.isActive && 
    //         new Date(v.endDate) > now &&
    //         // 👇 THÊM ĐIỀU KIỆN: Loại bỏ voucher freeship (để dành cho trang Checkout)
    //         v.discountType !== 'freeship'
    //     );
    // };

    // --- RENDER ---
    if (loading) return <div className={styles.loadingContainer}>Đang tải giỏ hàng...</div>;

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyCart}>
                    <ShoppingBag size={64} className={styles.emptyIcon} />
                    <p className={styles.emptyText}>Giỏ hàng trống</p>
                    <Link to="/" className={styles.btnSecondary}>Mua sắm ngay</Link>
                </div>
            </div>
        );
    }

    // const validVouchersList = getValidVouchers();
    const isAllSelected = cart.items.length > 0 && selectedItems.length === cart.items.length;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Giỏ hàng ({cart.totalQuantity} sản phẩm)</h1>
            
            <div className={styles.cartGrid}>
                {/* --- CỘT TRÁI: LIST SẢN PHẨM --- */}
                <div className={styles.leftColumn}>
                    <div className={styles.cartItemsList}>
                        
                        {/* Header Bảng + Checkbox All */}
                        <div className={styles.cartHeader}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <input 
                                    type="checkbox" 
                                    className={styles.checkbox}
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                    style={{width: '18px', height: '18px', cursor: 'pointer'}}
                                />
                                <span>Sản phẩm</span>
                            </div>
                            <span style={{textAlign: 'center'}}>Số lượng</span>
                            <span style={{textAlign: 'right'}}>Thành tiền</span>
                            <span></span>
                        </div>

                        {cart.items.map((item) => (
                            <div key={item._id} className={styles.cartItem}>
                                {/* Checkbox Item */}
                                <div style={{display: 'flex', alignItems: 'center', marginRight: '15px'}}>
                                    <input 
                                        type="checkbox" 
                                        className={styles.checkbox}
                                        checked={selectedItems.includes(item._id)}
                                        onChange={() => handleSelectItem(item._id)}
                                        style={{width: '18px', height: '18px', cursor: 'pointer'}}
                                    />
                                </div>

                                <div className={styles.productInfo}>
                                    <img 
                                        src={getProductImage(item)} 
                                        alt={item.product?.name} 
                                        className={styles.productImage} 
                                    />
                                    <div className={styles.productDetails}>
                                        <Link to={`/products/${item.product?.slug}`} className={styles.productNameLink}>
                                            <h3>{item.product?.name}</h3>
                                        </Link>
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
                                        >-</button>
                                        <input type="text" value={item.quantity} readOnly className={styles.qtyInput} />
                                        <button 
                                            className={styles.qtyBtn}
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                            disabled={updatingItemId === item._id}
                                        >+</button>
                                    </div>
                                </div>

                                <div className={styles.priceColumn} style={{textAlign: 'right'}}>
                                    <span className={styles.finalPrice}>
                                        {formatCurrency((item.finalPrice || item.price) * item.quantity)}
                                    </span>
                                    {item.discount > 0 && (
                                        <span className={styles.originalPrice}>
                                            {formatCurrency(item.price * item.quantity)}
                                        </span>
                                    )}
                                </div>

                                <div style={{textAlign: 'right'}}>
                                    <button className={styles.removeBtn} onClick={() => handleRemoveItem(item._id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className={styles.clearCartBtn} onClick={handleClearCart}>Xóa tất cả</button>
                </div>

                {/* --- CỘT PHẢI: TỔNG KẾT --- */}
                <div className={styles.rightColumn}>
                    <div className={styles.summaryCard}>
                        <h2>Tạm tính</h2>
                        
                        <div className={styles.summaryRow}>
                            <span>Đã chọn:</span>
                            <span>{selectedItems.length} sản phẩm</span>
                        </div>

                        {/* Voucher Section
                        <div className={styles.voucherSection}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                                <span style={{fontSize: '0.9rem', fontWeight: '600', color: '#4a5568'}}>Mã ưu đãi</span>
                                <button className={styles.openVoucherModalBtn} onClick={() => setShowVoucherModal(true)}>Chọn mã</button>
                            </div>
                            
                            {cart.appliedVoucher ? (
                                <div className={styles.appliedVoucher}>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px', color: '#2f855a', fontWeight: 'bold'}}>
                                        <Tag size={16} /> {cart.appliedVoucher.code}
                                    </span>
                                    <button onClick={handleRemoveVoucher} className={styles.removeVoucher}>Gỡ</button>
                                </div>
                            ) : (
                                <form onSubmit={handleApplyVoucherSubmit} className={styles.voucherInputGroup}>
                                    <input 
                                        type="text" 
                                        placeholder="Nhập mã"
                                        className={styles.voucherInput}
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                    />
                                    <button type="submit" className={styles.applyBtn} disabled={voucherLoading || !voucherCode}>
                                        {voucherLoading ? '...' : 'Áp dụng'}
                                    </button>
                                </form>
                            )}
                        </div> */}

                        <div className={styles.divider}></div>

                        {/* HIỂN THỊ TỔNG TIỀN CỦA CÁC MÓN ĐƯỢC CHỌN */}
                        <div className={styles.summaryTotal}>
                            <span>Tổng cộng:</span>
                            <span style={{fontSize: '1.5rem', color: '#000'}}>
                                {formatCurrency(selectedTotal)}
                            </span>
                        </div>
                        
                        <button 
                            className={styles.checkoutBtn} 
                            onClick={handleCheckout}
                            disabled={selectedItems.length === 0}
                            style={{
                                opacity: selectedItems.length === 0 ? 0.6 : 1,
                                cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Mua Hàng ({selectedItems.length}) <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MODAL VOUCHER (GIỮ NGUYÊN) --- */}
            {/* {showVoucherModal && (
                <div className={styles.modalOverlay} onClick={() => setShowVoucherModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Chọn Voucher</h3>
                            <button className={styles.closeModalBtn} onClick={() => setShowVoucherModal(false)}><X size={24} /></button>
                        </div>
                        <div className={styles.voucherList}>
                            {validVouchersList.length === 0 ? <p style={{textAlign: 'center', color: '#999'}}>Không có mã nào.</p> : 
                                validVouchersList.map(v => (
                                    <div key={v._id} className={styles.voucherItem}>
                                        <div className={styles.voucherInfo}>
                                            <h4><span className={styles.codeTag}>{v.code}</span></h4>
                                            <p>Giảm {v.discountValue}%</p>
                                        </div>
                                        <button 
                                            className={styles.selectVoucherBtn} 
                                            onClick={() => { setVoucherCode(v.code); handleApplyVoucherSubmit({preventDefault:()=>{}}); }}
                                        >Dùng ngay</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default CartDashboard;
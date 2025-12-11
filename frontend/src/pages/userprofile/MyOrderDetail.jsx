import { ArrowLeft, Box, Check, CheckCircle, Clock, CreditCard, MapPin, Package, Truck, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import styles from './MyOrderDetail.module.css';

const BACKEND_URL = 'http://localhost:5000';

// Helper lấy ảnh
const getProductImage = (item) => {
    // Vì item là snapshot trong order, nó đã có link ảnh trực tiếp
    const path = item.image; 
    if (!path) return "https://via.placeholder.com/80?text=No+Img";
    if (path.startsWith('http')) return path;
    return BACKEND_URL + path;
};

const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);

// Cấu hình Timeline (Các bước)
const STEPS = [
    { status: 'Pending', label: 'Đã đặt hàng', icon: <Clock size={16} /> },
    { status: 'Processing', label: 'Đã xác nhận', icon: <Check size={16} /> },
    { status: 'Shipping', label: 'Đang giao', icon: <Truck size={16} /> },
    { status: 'Delivered', label: 'Đã nhận hàng', icon: <Package size={16} /> }
];

const MyOrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // State cho Modal hủy đơn
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const fetchOrder = async () => {
        setLoading(true);
        try {
            // Gọi API getOrderById (đã viết ở backend)
            const res = await api.get(`/orders/${id}`);
            setOrder(res.data);
        } catch (error) {
            console.error("Lỗi tải đơn hàng:", error);
            alert("Không tìm thấy đơn hàng");
            navigate('/profile'); // Quay về nếu lỗi
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchOrder();
    }, [id]);

    // Xử lý "Đã nhận hàng"
    const handleConfirmReceived = async () => {
        if (!window.confirm("Bạn xác nhận đã nhận được hàng đầy đủ và nguyên vẹn?")) return;
        setActionLoading(true);
        try {
            await api.put(`/orders/${id}/confirm`);
            alert("Cảm ơn bạn! Đơn hàng đã hoàn tất.");
            fetchOrder(); // Reload lại để cập nhật trạng thái
        } catch (error) {
            alert(error.response?.data?.message || "Lỗi xác nhận.");
        } finally {
            setActionLoading(false);
        }
    };

    // Xử lý "Hủy đơn hàng"
    const handleCancelOrder = async (id) => {
        if (!cancelReason.trim()) return alert("Vui lòng nhập lý do hủy.");
        setActionLoading(true);
        try {
            await api.put(`/orders/${id}/cancel`, { reason: cancelReason });
            alert("Đã hủy đơn hàng thành công.");
            setShowCancelModal(false);
            fetchOrder();
        } catch (error) {
            alert(error.response?.data?.message || "Không thể hủy đơn hàng này.");
        } finally {
            setActionLoading(false);
        }
    };

    // Tính toán bước hiện tại cho Timeline
    const getCurrentStepIndex = (status) => {
        if (status === 'Cancelled' || status === 'Returned') return -1; // Trường hợp đặc biệt
        return STEPS.findIndex(s => s.status === status);
    };

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;
    if (!order) return null;

    const currentStepIdx = getCurrentStepIndex(order.orderStatus);
    const isCancelled = order.orderStatus === 'Cancelled';

    return (
        <div className={styles.container}>
            {/* --- HEADER --- */}
            <div className={styles.header}>
                <Link to="/profile" className={styles.backButton}>
                    <ArrowLeft size={18} /> Trở lại
                </Link>
                <div className={styles.headerRight}>
                    <h3 className={styles.orderId}>ĐƠN HÀNG #{order._id.slice(-6).toUpperCase()}</h3>
                    <p className={styles.orderDate}>Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                </div>
            </div>

            {/* --- TIMELINE --- */}
            <div className={styles.timelineContainer}>
                {isCancelled ? (
                    <div style={{textAlign: 'center', color: '#dc2626', fontWeight: 'bold'}}>
                        <XCircle size={40} style={{marginBottom: 10}} />
                        <p>ĐƠN HÀNG ĐÃ HỦY</p>
                        <p style={{fontSize: '13px', color: '#666', fontWeight: 'normal'}}>
                            Vào lúc: {order.updatedAt ? new Date(order.updatedAt).toLocaleString('vi-VN') : ''}
                        </p>
                    </div>
                ) : (
                    <div className={styles.timeline}>
                        {STEPS.map((step, index) => {
                            const isActive = index <= currentStepIdx;
                            return (
                                <div key={step.status} className={`${styles.stepItem} ${isActive ? styles.active : ''}`}>
                                    <div className={styles.stepIcon}>
                                        {isActive ? <CheckCircle size={18} /> : step.icon}
                                    </div>
                                    <span className={styles.stepLabel}>{step.label}</span>
                                    {/* Hiển thị ngày giờ tương ứng nếu có (ví dụ paidAt, deliveredAt...) */}
                                    {index === currentStepIdx && (
                                        <span className={styles.stepDate}>
                                            {new Date(order.updatedAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* --- ĐỊA CHỈ & THANH TOÁN --- */}
            <div className={styles.section}>
                <div className={styles.addressGrid}>
                    <div className={styles.infoColumn}>
                        <h4 className={styles.sectionTitle}><MapPin size={18} /> Địa chỉ nhận hàng</h4>
                        <div className={styles.infoGroup}>
                            <label>Người nhận</label>
                            <p>{order.shippingAddress.fullName}</p>
                        </div>
                        <div className={styles.infoGroup} style={{marginTop: 10}}>
                            <label>Điện thoại</label>
                            <p>{order.shippingAddress.phone}</p>
                        </div>
                        <div className={styles.infoGroup} style={{marginTop: 10}}>
                            <label>Địa chỉ</label>
                            <p>{order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}</p>
                        </div>
                    </div>

                    <div className={styles.infoColumn}>
                        <h4 className={styles.sectionTitle}><CreditCard size={18} /> Thanh toán & Vận chuyển</h4>
                        <div className={styles.infoGroup}>
                            <label>Phương thức thanh toán</label>
                            <p>{order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
                        </div>
                        <div className={styles.infoGroup} style={{marginTop: 10}}>
                            <label>Đơn vị vận chuyển</label>
                            <p>{order.shippingMethodName || "Giao hàng tiêu chuẩn"}</p>
                        </div>
                        <div className={styles.infoGroup} style={{marginTop: 10}}>
                            <label>Trạng thái thanh toán</label>
                            <p style={{color: order.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b', fontWeight: 'bold'}}>
                                {order.paymentStatus === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DANH SÁCH SẢN PHẨM --- */}
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}><Box size={18} /> Sản phẩm</h4>
                <div className={styles.productList}>
                    {order.orderItems.map((item, idx) => (
                        <div key={idx} className={styles.productItem}>
                            <img src={getProductImage(item)} alt={item.name} className={styles.productImage} />
                            <div className={styles.productInfo}>
                                <p className={styles.productName}>{item.name}</p>
                                <div className={styles.productMeta}>
                                    <span className={styles.metaBadge}>{item.variantName}</span>
                                    {/* (Có thể thêm Mã SKU nếu lưu trong snapshot) */}
                                </div>
                            </div>
                            <div className={styles.productPrice}>
                                <span className={styles.price}>{formatCurrency(item.price)}</span>
                                <span className={styles.qty}>x{item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- TỔNG KẾT CHI PHÍ --- */}
            <div className={styles.paymentSummary}>
                <div className={styles.costRow}>
                    <span>Tổng tiền hàng</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className={styles.costRow}>
                    <span>Phí vận chuyển</span>
                    <span>{formatCurrency(order.shippingFee)}</span>
                </div>
                {order.voucherDiscount > 0 && (
                    <div className={styles.costRow} style={{color: '#10b981'}}>
                        <span>Voucher giảm giá</span>
                        <span>-{formatCurrency(order.voucherDiscount)}</span>
                    </div>
                )}
                <div className={`${styles.costRow} ${styles.total}`}>
                    <span>Thành tiền</span>
                    <span className={styles.totalPrice}>{formatCurrency(order.totalPrice)}</span>
                </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            {/* Chỉ hiện nút nếu đơn chưa hủy và chưa hoàn thành (trừ nút Mua lại) */}
            <div className={styles.actionFooter}>
                
                {/* Nút Hủy: Chỉ hiện khi Pending */}
                {order.orderStatus === 'Pending' && (
                    <button 
                        className={`${styles.btn} ${styles.btnCancel}`}
                        onClick={() => setShowCancelModal(true)}
                        disabled={actionLoading}
                    >
                        Hủy đơn hàng
                    </button>
                )}

                {/* Nút Đã Nhận: Chỉ hiện khi Shipping */}
                {order.orderStatus === 'Shipping' && (
                    <button 
                        className={`${styles.btn} ${styles.btnConfirm}`}
                        onClick={handleConfirmReceived}
                        disabled={actionLoading}
                    >
                        Đã nhận được hàng
                    </button>
                )}

                {/* Nút Mua Lại: Hiện khi đã giao hoặc đã hủy */}
                {(order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled') && (
                    <Link to={`/product/${order.orderItems[0].product}`} className={`${styles.btn} ${styles.btnConfirm}`} style={{textDecoration:'none'}}>
                        Mua lại
                    </Link>
                )}
            </div>

            {/* --- MODAL HỦY ĐƠN --- */}
            {showCancelModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div style={{display:'flex', justifyContent:'space-between', marginBottom: 15}}>
                            <h3 className={styles.modalTitle}>Lý do hủy đơn?</h3>
                            <X size={20} style={{cursor:'pointer'}} onClick={() => setShowCancelModal(false)} />
                        </div>
                        <p style={{fontSize: '13px', color: '#666'}}>Bạn có chắc muốn hủy đơn hàng này không? Thao tác này không thể hoàn tác.</p>
                        
                        <select 
                            className={styles.reasonInput} 
                            value={cancelReason} 
                            onChange={(e) => setCancelReason(e.target.value)}
                        >
                            <option value="">-- Chọn lý do --</option>
                            <option value="Muốn thay đổi địa chỉ/sđt">Muốn thay đổi địa chỉ/sđt</option>
                            <option value="Muốn thay đổi sản phẩm">Muốn thay đổi sản phẩm (size/màu)</option>
                            <option value="Thấy chỗ khác rẻ hơn">Thấy chỗ khác rẻ hơn</option>
                            <option value="Đổi ý không muốn mua nữa">Đổi ý không muốn mua nữa</option>
                            <option value="Khác">Khác</option>
                        </select>

                        <div className={styles.modalActions}>
                            <button className={`${styles.btn} ${styles.btnCancel}`} onClick={() => setShowCancelModal(false)}>Đóng</button>
                            <button className={`${styles.btn} ${styles.btnConfirm}`} style={{backgroundColor: '#dc2626'}} onClick={() => handleCancelOrder(order._id)}>Xác nhận hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrderDetail;
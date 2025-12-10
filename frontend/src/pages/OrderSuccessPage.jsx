import {
    CheckCircle,
    CreditCard,
    MapPin, Package,
    Truck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api';
import styles from './OrderSuccessPage.module.css';

const BACKEND_URL = 'http://localhost:5000';

const BANK_INFO = {
    BANK_ID: 'MB',
    ACCOUNT_NO: '0868966437',
    ACCOUNT_NAME: 'DANG THO NGOC',
    TEMPLATE: 'compact'
};

const OrderSuccessPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id || id === 'undefined') {
                setError("Mã đơn hàng không hợp lệ");
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`/orders/${id}`);
                setOrder(res.data);
            } catch (error) {
                console.error("Lỗi tải đơn hàng:", error);
                setError("Không tìm thấy đơn hàng hoặc bạn không có quyền truy cập.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert("Đã sao chép!");
    };

    const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);

    // Helper lấy ảnh (giống Cart)
    const getProductImage = (item) => {
        // Vì item trong order là snapshot đã lưu link ảnh, có thể dùng trực tiếp
        const path = item.image; 
        if (!path) return "https://via.placeholder.com/80?text=No+Img";
        if (path.startsWith('http')) return path;
        return BACKEND_URL + path;
    };

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

    if (error) return (
        <div className={styles.container}>
            <div className={styles.errorCard}>
                <h2 style={{ color: '#e53e3e' }}>Đã xảy ra lỗi</h2>
                <p>{error}</p>
                <Link to="/" className={styles.btnPrimary}>Về trang chủ</Link>
            </div>
        </div>
    );

    const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-${BANK_INFO.TEMPLATE}.png?amount=${order.totalPrice}&addInfo=${order._id}&accountName=${encodeURIComponent(BANK_INFO.ACCOUNT_NAME)}`;

    return (
        <div className={styles.container}>
            {/* --- PHẦN 1: HEADER THÔNG BÁO --- */}
            <div className={styles.successHeader}>
                <div className={styles.iconWrapper}>
                    <CheckCircle size={48} color="#ffffff" />
                </div>
                <div>
                    <h1 className={styles.pageTitle}>Đặt hàng thành công!</h1>
                    <p className={styles.pageSubtitle}>Mã đơn hàng: <strong>#{order._id.slice(-6).toUpperCase()}</strong></p>
                </div>
                <div className={styles.headerActions}>
                    <Link to="/" className={styles.btnOutlineWhite}>Tiếp tục mua sắm</Link>
                    <Link to="/profile" className={styles.btnWhite}>Xem đơn mua</Link>
                </div>
            </div>

            <div className={styles.contentLayout}>
                {/* --- CỘT TRÁI: CHI TIẾT ĐƠN HÀNG --- */}
                <div className={styles.leftColumn}>
                    
                    {/* Block: Thông tin nhận hàng */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}><MapPin size={18} /> Thông tin nhận hàng</h3>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Người nhận:</span>
                                <span className={styles.value}>{order.shippingAddress.fullName}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Số điện thoại:</span>
                                <span className={styles.value}>{order.shippingAddress.phone}</span>
                            </div>
                            <div className={`${styles.infoItem} ${styles.fullWidth}`}>
                                <span className={styles.label}>Địa chỉ:</span>
                                <span className={styles.value}>
                                    {order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
                                </span>
                            </div>
                            {order.notes && (
                                <div className={`${styles.infoItem} ${styles.fullWidth}`}>
                                    <span className={styles.label}>Ghi chú:</span>
                                    <span className={styles.value} style={{fontStyle: 'italic'}}>{order.notes}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Block: Danh sách sản phẩm */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}><Package size={18} /> Chi tiết sản phẩm</h3>
                        <div className={styles.productList}>
                            {order.orderItems.map((item, index) => (
                                <div key={index} className={styles.productItem}>
                                    <div className={styles.productImgBox}>
                                        <img src={getProductImage(item)} alt={item.name} />
                                        <span className={styles.qtyBadge}>x{item.quantity}</span>
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h4 className={styles.productName}>{item.name}</h4>
                                        <p className={styles.productVariant}>{item.variantName}</p>
                                    </div>
                                    <div className={styles.productPrice}>
                                        {formatCurrency(item.price)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- CỘT PHẢI: THANH TOÁN & TỔNG KẾT --- */}
                <div className={styles.rightColumn}>
                    
                    {/* Block: Hướng dẫn thanh toán */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>
                            {order.paymentMethod === 'COD' ? <Truck size={18} /> : <CreditCard size={18} />}
                            Thanh toán
                        </h3>
                        
                        {order.paymentMethod === 'COD' ? (
                            <div className={styles.codBox}>
                                <p><strong>Thu hộ (COD):</strong> Bạn vui lòng thanh toán cho shipper khi nhận hàng.</p>
                                <p className={styles.codAmount}>Cần thanh toán: {formatCurrency(order.totalPrice)}</p>
                            </div>
                        ) : (
                            /* Bank Transfer UI */
                            <div className={styles.bankBox}>
                                <p className={styles.bankStatus}>
                                    Trạng thái: 
                                    <span className={order.paymentStatus === 'Paid' ? styles.paid : styles.unpaid}>
                                        {order.paymentStatus === 'Paid' ? ' Đã thanh toán' : ' Chờ thanh toán'}
                                    </span>
                                </p>
                                
                                {order.paymentStatus === 'Unpaid' && (
                                    <>
                                        <div className={styles.qrWrapper}>
                                            <img src={qrUrl} alt="QR Code" />
                                        </div>
                                        <div className={styles.bankInfoList}>
                                            <div className={styles.bankRow}>
                                                <span>Ngân hàng:</span> <strong>MB Bank</strong>
                                            </div>
                                            <div className={styles.bankRow}>
                                                <span>Số TK:</span> 
                                                <strong onClick={() => handleCopy(BANK_INFO.ACCOUNT_NO)} style={{cursor:'pointer', color:'#2563eb'}}>
                                                    {BANK_INFO.ACCOUNT_NO} ❐
                                                </strong>
                                            </div>
                                            <div className={styles.bankRow}>
                                                <span>Nội dung:</span> 
                                                <strong onClick={() => handleCopy(order._id)} style={{cursor:'pointer', color:'#d97706'}}>
                                                    {order._id} ❐
                                                </strong>
                                            </div>
                                        </div>
                                        <p className={styles.autoCheckNote}>* Hệ thống tự động xác nhận sau 5 phút.</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Block: Tổng kết chi phí */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Tổng kết chi phí</h3>
                        <div className={styles.costSummary}>
                            <div className={styles.costRow}>
                                <span>Tạm tính</span>
                                <span>{formatCurrency(order.subtotal)}</span>
                            </div>
                            <div className={styles.costRow}>
                                <span>Phí vận chuyển</span>
                                <span>{formatCurrency(order.shippingFee)}</span>
                            </div>
                            {order.voucherDiscount > 0 && (
                                <div className={`${styles.costRow} ${styles.discountText}`}>
                                    <span>Giảm giá</span>
                                    <span>-{formatCurrency(order.voucherDiscount)}</span>
                                </div>
                            )}
                            <div className={styles.divider}></div>
                            <div className={`${styles.costRow} ${styles.totalRow}`}>
                                <span>Tổng cộng</span>
                                <span>{formatCurrency(order.totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
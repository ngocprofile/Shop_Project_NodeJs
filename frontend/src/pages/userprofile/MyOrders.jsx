import { Box } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import styles from './UserProfile.module.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await api.get('/orders/my-orders');
            setOrders(res.data);
            console.log("Đơn hàng đã lấy:", res.data);
        } catch (error) {
            console.error("Lỗi tải đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleGetItemImage = (item) => {
        const SERVEURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/';
        return SERVEURL + item.image || "https://via.placeholder.com/60";
    };

    const handleConfirmReceived = async (orderId) => {
        if (!window.confirm("Bạn xác nhận đã nhận được hàng?")) return;
        try {
            await api.put(`/orders/${orderId}/confirm`);
            alert("Đã cập nhật trạng thái đơn hàng!");
            fetchOrders();
        } catch (error) {
            alert(error.response?.data?.message || "Lỗi xác nhận.");
        }
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'active') return ['Pending', 'Processing', 'Shipping'].includes(order.orderStatus);
        return ['Delivered', 'Cancelled', 'Returned'].includes(order.orderStatus);
    });

    const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
    
    const getStatusConfig = (status) => {
        switch(status) {
            case 'Pending': return { label: 'Chờ xác nhận', style: styles.statusPending };
            case 'Processing': return { label: 'Đang xử lý', style: styles.statusProcessing };
            case 'Shipping': return { label: 'Đang giao hàng', style: styles.statusShipping };
            case 'Delivered': return { label: 'Hoàn thành', style: styles.statusDelivered };
            case 'Cancelled': return { label: 'Đã hủy', style: styles.statusCancelled };
            default: return { label: status, style: '' };
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Đơn Mua Của Tôi</h3>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.tabsContainer}>
                    <button className={`${styles.tabBtn} ${activeTab === 'active' ? styles.active : ''}`} onClick={() => setActiveTab('active')}>Đang thực hiện</button>
                    <button className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.active : ''}`} onClick={() => setActiveTab('completed')}>Lịch sử đơn hàng</button>
                </div>

                {loading ? <p>Đang tải...</p> : filteredOrders.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Box size={48} color="#cbd5e0" />
                        <p>Chưa có đơn hàng nào.</p>
                        <Link to="/" className={`${styles.button} ${styles.buttonPrimary}`} style={{marginTop:'10px'}}>Mua sắm ngay</Link>
                    </div>
                ) : (
                    <div className={styles.orderList}>
                        {filteredOrders.map(order => {
                            const statusConfig = getStatusConfig(order.orderStatus);
                            return (
                                <div key={order._id} className={styles.orderCard}>
                                    <div className={styles.orderHeader}>
                                        <div>
                                            <span className={styles.orderId}>#{order._id.slice(-6).toUpperCase()}</span>
                                            <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <span className={`${styles.statusBadge} ${statusConfig.style}`}>{statusConfig.label}</span>
                                    </div>
                                    <div className={styles.orderItems}>
                                        {order.orderItems.map((item, i) => (
                                            <div key={i} className={styles.itemRow}>
                                                <img src={handleGetItemImage(item)} alt={item.name} className={styles.itemImage} />
                                                <div className={styles.itemInfo}>
                                                    <h4>{item.name}</h4>
                                                    <div className={styles.itemVariant}>{item.variantName} x{item.quantity}</div>
                                                </div>
                                                <div style={{fontWeight:'600', fontSize:'14px'}}>{formatCurrency(item.totalItemPrice)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.orderFooter}>
                                        <div><span className={styles.totalLabel}>Thành tiền: </span><span className={styles.totalPrice}>{formatCurrency(order.totalPrice)}</span></div>
                                        <div className={styles.actionGroup}>
                                            {order.orderStatus === 'Shipping' && (
                                                <button className={styles.btnConfirm} onClick={() => handleConfirmReceived(order._id)}>Đã nhận hàng</button>
                                            )}
                                            <Link to={`/order-detail/${order._id}`} className={styles.btnDetail}>Chi tiết</Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
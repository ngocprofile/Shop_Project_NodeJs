import { Eye, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import styles from './AdminOrders.module.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

  // Hàm lấy dữ liệu
    useEffect(() => {
    const fetchOrders = async () => {
        try {
        const response = await api.get('/orders/'); 
        setOrders(response.data.orders || response.data);
        } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
        } finally {
        setLoading(false);
        }
    };
    fetchOrders();
    }, []);

    // Hàm lấy màu sắc cho trạng thái
    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
            return styles.statusPending;
            case "Processing":
            return styles.statusProcessing;
            case "Shipping":
            return styles.statusShipping;
            case "Delivered":
            return styles.statusDelivered;
            case "Cancelled":
            return styles.statusCancelled;
            case "Returned":
            return styles.statusReturned;
            default:
            return styles.statusPending;
        }
    };

    return (
    <div className={styles.container}>
        <h2 className={styles.title}>
        <Package size={28} color="#444" /> Quản lý Đơn hàng
        </h2>

        {loading ? (
        <p>Đang tải dữ liệu...</p>
        ) : (
        <div className={styles.card}>
            <table className={styles.table}>
            <thead>
                <tr>
                <th>Mã Đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'center' }}>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? (
                orders.map((order) => (
                    <tr key={order._id}>
                    <td>
                        <span className={styles.orderId}>#{order._id?.slice(-6).toUpperCase()}</span>
                    </td>
                    <td style={{ fontWeight: '500' }}>
                        {order.shippingAddress?.fullName || order.user?.name || 'Khách lẻ'}
                    </td>
                    <td>
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className={styles.price}>
                        {order.totalPrice?.toLocaleString()} đ
                    </td>
                    <td>
                        <span className={`${styles.status} ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus || 'Chờ xử lý'}
                        </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <button className={styles.actionBtn} title="Xem chi tiết" onClick={() => navigate(`/admin/orders/${order._id}`)}>
                            <Eye size={20} />
                        </button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="6" className={styles.emptyState}>
                    Chưa có đơn hàng nào.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        )}
    </div>
    );
};

export default AdminOrders;
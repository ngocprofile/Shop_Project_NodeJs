import { ArrowLeft, Calendar, MapPin, Package, Save, Truck, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Cần cài react-router-dom
import api from '../../api'; // Đảm bảo đường dẫn api đúng
import styles from './AdminOrderView.module.css';

const AdminOrderView = () => {
    const { orderId } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(''); // State lưu trạng thái đang chọn
    const [updating, setUpdating] = useState(false);

    // server url 
    const SERVE_URL = "http://localhost:5000"

    // Danh sách trạng thái chuẩn
    const orderStatuses = ["Pending", "Processing", "Shipping", "Delivered", "Cancelled", "Returned"];

    // 1. Lấy chi tiết đơn hàng
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Giả định API lấy chi tiết là GET /orders/:id
                const response = await api.get(`/orders/${orderId}`);
                const data = response.data.order || response.data;
                setOrder(data);
                setStatus(data.orderStatus); // Set trạng thái hiện tại vào select
            } catch (error) {
                console.error("Lỗi tải chi tiết đơn hàng:", error);
                alert("Không tìm thấy đơn hàng!");
            } finally {
                setLoading(false);
            }
        };
        if (orderId) fetchOrderDetails();
    }, [orderId]);

    const getUrlImage = (item) => {
        const urlImage = SERVE_URL+item.image ;
        return urlImage
    }

    // 2. Hàm xử lý cập nhật trạng thái
    const handleUpdateStatus = async () => {
        if (!window.confirm(`Bạn có chắc muốn đổi trạng thái thành "${status}"?`)) return;

        setUpdating(true);
        try {
            // Giả định API cập nhật là PUT /orders/:id
            // Body gửi lên thường là { status: "NewStatus" }
            await api.put(`/orders/${orderId}`, { orderStatus: status });
            
            alert("Cập nhật trạng thái thành công!");
            
            // Cập nhật lại data local để giao diện đồng bộ
            setOrder(prev => ({ ...prev, orderStatus: status }));
        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            alert("Cập nhật thất bại. Vui lòng thử lại.");
        } finally {
            setUpdating(false);
        }
    };

    // Helper class màu sắc (dùng lại logic cũ hoặc css modules mới)
    const getStatusColor = (st) => {
        if (st === 'Delivered') return '#d1e7dd'; // Xanh lá nhạt
        if (st === 'Cancelled') return '#f8d7da'; // Đỏ nhạt
        if (st === 'Shipping') return '#cff4fc';  // Xanh dương nhạt
        return '#fff3cd'; // Vàng nhạt (mặc định)
    };

    if (loading) return <div className={styles.loading}>Đang tải thông tin đơn hàng...</div>;
    if (!order) return <div className={styles.error}>Đơn hàng không tồn tại.</div>;

    return (
        <div className={styles.container}>
            {/* Header: Nút back và Tiêu đề */}
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className={styles.backBtn}>
                    <ArrowLeft size={20} /> Quay lại
                </button>
                <h2 className={styles.title}>Chi tiết đơn hàng #{order._id?.slice(-6).toUpperCase()}</h2>
            </div>

            <div className={styles.grid}>
                {/* Cột Trái: Thông tin sản phẩm */}
                <div className={styles.leftColumn}>
                    <div className={styles.card}>
                        <h3><Package size={20} /> Sản phẩm</h3>
                        <table className={styles.itemTable}>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>SL</th>
                                    <th>Tổng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.orderItems?.map((item, index) => (
                                    <tr key={index}>
                                        <td className={styles.productInfo}>
                                            <img 
                                                src={getUrlImage(item) || 'https://via.placeholder.com/50'} 
                                                alt={item.name} 
                                                className={styles.productImg} 
                                            />
                                            <span>{item.name}</span>
                                        </td>
                                        <td>{item.price?.toLocaleString()} đ</td>
                                        <td>x{item.quantity}</td>
                                        <td>{(item.price * item.quantity)?.toLocaleString()} đ</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className={styles.totalSection}>
                            <div className={styles.row}>
                                <span>Phí vận chuyển:</span>
                                <span>{order.shippingPrice?.toLocaleString() || 0} đ</span>
                            </div>
                            <div className={`${styles.row} ${styles.finalTotal}`}>
                                <span>Tổng cộng:</span>
                                <span>{order.totalPrice?.toLocaleString()} đ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cột Phải: Thông tin Khách & Cập nhật trạng thái */}
                <div className={styles.rightColumn}>
                    
                    {/* KHU VỰC CẬP NHẬT TRẠNG THÁI */}
                    <div className={styles.card} style={{ borderTop: `4px solid ${getStatusColor(status)}` }}>
                        <h3><Truck size={20} /> Trạng thái đơn hàng</h3>
                        
                        <div className={styles.statusControl}>
                            <label>Trạng thái hiện tại:</label>
                            <select 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)}
                                className={styles.selectStatus}
                                disabled={updating}
                            >
                                {orderStatuses.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>

                        <button 
                            className={styles.updateBtn} 
                            onClick={handleUpdateStatus}
                            disabled={updating || status === order.orderStatus}
                        >
                            {updating ? 'Đang lưu...' : <><Save size={18} /> Cập nhật trạng thái</>}
                        </button>
                    </div>

                    {/* Thông tin khách hàng */}
                    <div className={styles.card}>
                        <h3><User size={20} /> Khách hàng</h3>
                        <p><strong>Tên:</strong> {order.user?.name || order.shippingAddress?.fullName}</p>
                        <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
                        <p><strong>SĐT:</strong> {order.shippingAddress?.phone || 'N/A'}</p>
                    </div>

                    {/* Thông tin giao hàng */}
                    <div className={styles.card}>
                        <h3><MapPin size={20} /> Địa chỉ giao hàng</h3>
                        <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                        <p>{order.shippingAddress?.country}</p>
                        <div className={styles.divider}></div>
                        <p><Calendar size={16} /> Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderView;
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api'; // Axios config của bạn
import styles from './AdminShipping.module.css';

const ShippingDashboard = () => {
    const [shippingMethods, setShippingMethods] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchShipping = async () => {
        try {
            const res = await api.get('/shipping');
            setShippingMethods(res.data);
        } catch (error) {
            console.error("Lỗi tải shipping:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipping();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa phương thức này?")) return;
        try {
            await api.delete(`/shipping/${id}`);
            setShippingMethods(prev => prev.filter(item => item._id !== id));
            alert("Đã xóa thành công!");
        } catch (error) {
            alert(error.response?.data?.message || "Lỗi khi xóa");
        }
    };

    const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

    // Helper để hiển thị loại hình đẹp hơn
    const getTypeBadge = (type) => {
        switch (type) {
            case 'express': return <span className={`${styles.badge} ${styles.badgeExpress}`}>Hỏa tốc</span>;
            case 'pickup': return <span className={`${styles.badge} ${styles.badgePickup}`}>Tự lấy</span>;
            default: return <span className={`${styles.badge} ${styles.badgeStandard}`}>Tiêu chuẩn</span>;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Quản Lý Vận Chuyển</h1>
                <Link to="/admin/shipping/add" className={styles.btnAdd}>
                    <Plus size={18} /> Thêm mới
                </Link>
            </div>

            {loading ? <p>Đang tải...</p> : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Tên phương thức</th>
                                <th>Loại hình</th>
                                <th>Phí vận chuyển</th>
                                <th>Mức Freeship</th>
                                <th>Khu vực áp dụng</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shippingMethods.length === 0 ? (
                                <tr><td colSpan="7" style={{textAlign: 'center'}}>Chưa có dữ liệu</td></tr>
                            ) : shippingMethods.map(item => (
                                <tr key={item._id}>
                                    <td style={{fontWeight: '600'}}>{item.name}</td>
                                    <td>{getTypeBadge(item.type)}</td>
                                    <td style={{color: '#d97706', fontWeight: 'bold'}}>{formatCurrency(item.cost)}</td>
                                    <td>
                                        {item.freeShipOrderThreshold 
                                            ? formatCurrency(item.freeShipOrderThreshold) 
                                            : <span style={{color: '#999'}}>---</span>
                                        }
                                    </td>
                                    <td>
                                        {item.allowedProvinceCodes && item.allowedProvinceCodes.length > 0 
                                            ? item.allowedProvinceCodes.join(', ') 
                                            : <span style={{color: '#2f855a'}}>Toàn quốc</span>
                                        }
                                    </td>
                                    <td>
                                        {item.isActive 
                                            ? <span className={styles.statusActive}>Hoạt động</span> 
                                            : <span className={styles.statusInactive}>Ẩn</span>
                                        }
                                    </td>
                                    <td>
                                        {/* Bạn có thể làm trang Edit sau, giờ dùng tạm nút Delete */}
                                        <button className={`${styles.actionBtn} ${styles.btnEdit}`} title="Sửa (Coming soon)">
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            className={`${styles.actionBtn} ${styles.btnDelete}`} 
                                            onClick={() => handleDelete(item._id)}
                                            title="Xóa"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ShippingDashboard;
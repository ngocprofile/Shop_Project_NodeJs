import { Package, ShoppingCart, Users } from 'lucide-react'; // Import icons
import { useEffect, useState } from 'react'; // <-- 1. IMPORT HOOKS
import { Link } from 'react-router-dom'; // Import Link để điều hướng
import api from '../../api'; // <-- 2. IMPORT API CLIENT

// Chúng ta sẽ dùng chung file CSS của ProductAdmin
import styles from './DashboardAdmin.module.css';

const DashboardAdmin = () => {
    // 3. THÊM STATE ĐỂ LƯU DỮ LIỆU
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        newUsersToday: 0,
    });
    const [orderStats , setOrderStats] = useState({
        newOrderToday: 0
    });
    const [loading, setLoading] = useState(true);

    // 4. GỌI API KHI COMPONENT Mở RA
    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                setLoading(true);
                const res = await api.get('/users/stats'); // Gọi API stats
                setUserStats(res.data);
            } catch (error) {
                console.error("Lỗi khi tải thống kê user:", error);
            } finally {
                setLoading(false);
            }
        };
        

        fetchUserStats();
        
    }, []); // Mảng rỗng [] đảm bảo chỉ chạy 1 lần

    useEffect(() => {
        const fetchOrderStats = async () => {
            try {
                setLoading(true);
                const res = await api.get('/orders/stats'); // Gọi API stats
                setOrderStats(res.data);
                console.log("setOrderStats",setOrderStats)
            } catch (error) {
                console.error("Lỗi khi tải thống kê newOrders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderStats();
    },[])

    return (
        <div className={styles.productPage}> {/* Dùng class chung cho layout trang */}
            
            {/* Header của trang */}
            <div className={styles.pageHeader}>
                <h1>Tổng quan</h1>
            </div>

            {/* Thống kê nhanh */}
            <div className={styles.statsGrid}>
                {/* Các thẻ thống kê khác (placeholder) */}
                <div className={styles.statCard}>
                    <h4>Doanh thu hôm nay</h4>
                    <p>0 ₫</p>
                </div>
                <div className={styles.statCard}>
                    <h4>Đơn hàng mới</h4>
                    <p>{loading ? '...' : orderStats.newOrderToday}</p>
                </div>

                {/* === 5. CẬP NHẬT THẺ THỐNG KÊ USER === */}
                
                {/* Thẻ Khách hàng mới hôm nay */}
                <div className={styles.statCard}>
                    <h4>Khách hàng mới hôm nay</h4>
                    <p>{loading ? '...' : userStats.newUsersToday}</p>
                </div>

                {/* Thẻ Tổng số người dùng */}
                <div className={styles.statCard}>
                    <h4>Tổng số người dùng</h4>
                    <p>{loading ? '...' : userStats.totalUsers}</p>
                </div>
            </div>

            {/* Lối tắt (Quick Actions) - Giữ nguyên */}
            <div className={styles.card} style={{ marginTop: '2rem' }}>
                <div className={styles.cardHeader}>
                <h3>Lối tắt</h3>
                </div>
                <div className={styles.cardBody}>
                <div className={styles.quickActions}>
                    <Link
                        to="/admin/products"
                        className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                        <Package size={18} />
                        Quản lý Sản phẩm
                    </Link>

                    <Link
                        to="/admin/orders"
                        className={`${styles.button} ${styles.buttonSecondary}`}
                    >
                        <ShoppingCart size={18} />
                        Quản lý Đơn hàng
                    </Link>

                    <Link
                        to="/admin/users"
                        className={`${styles.button} ${styles.buttonSecondary}`}
                    >
                        <Users size={18} />
                        Quản lý Khách hàng
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
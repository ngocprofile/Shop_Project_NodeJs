import { Package, ShoppingCart, Users } from 'lucide-react'; // Import icons
import { Link } from 'react-router-dom'; // Import Link để điều hướng

// Chúng ta sẽ dùng chung file CSS của ProductAdmin để lấy style cho .card, .button
import styles from './AdminProduct.module.css';

const DashboardAdmin = () => {
    return (
        <div className={styles.productPage}> {/* Dùng class chung cho layout trang */}
        
        {/* Header của trang */}
        <div className={styles.pageHeader}>
            <h1>Tổng quan</h1>
            {/* Bạn có thể thêm nút "Báo cáo" ở đây sau */}
        </div>

        {/* Thống kê nhanh (Placeholder) */}
        <div className={styles.statsGrid}>
            <div className={styles.statCard}>
            <h4>Doanh thu hôm nay</h4>
            <p>0 ₫</p>
            </div>
            <div className={styles.statCard}>
            <h4>Đơn hàng mới</h4>
            <p>0</p>
            </div>
            <div className={styles.statCard}>
            <h4>Khách hàng mới</h4>
            <p>0</p>
            </div>
        </div>

        {/* Lối tắt (Quick Actions) */}
        <div className={styles.card} style={{ marginTop: '2rem' }}>
            <div className={styles.cardHeader}>
            <h3>Lối tắt</h3>
            </div>
            <div className={styles.cardBody}>
            <div className={styles.quickActions}>
                
                {/* === NÚT ĐI ĐẾN PRODUCTADMIN === */}
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
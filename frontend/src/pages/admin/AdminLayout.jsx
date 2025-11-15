import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import styles from './AdminSidebar.module.css'; // Dùng chung file CSS với Sidebar

const AdminLayout = () => {
    return (
        <div className={styles.adminLayout}>
        <AdminSidebar />
        <main className={styles.adminContent}>
            <Outlet /> {/* Các trang con (như ProductAdmin) sẽ render ở đây */}
        </main>
        </div>
    );
};

export default AdminLayout;
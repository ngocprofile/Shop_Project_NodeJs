import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Ticket,
    Users
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
    return (
        <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
            <NavLink to="/admin" className={styles.logo}>
            ADMIN
            </NavLink>
        </div>
        <nav className={styles.sidebarNav}>
            <ul>
            <li>
                <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                >
                <LayoutDashboard size={20} />
                <span>Tổng quan</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                >
                <Package size={20} />
                <span>Sản phẩm</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                >
                <ShoppingCart size={20} />
                <span>Đơn hàng</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                >
                <Users size={20} />
                <span>Khách hàng</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/admin/vouchers"
                    className={({ isActive }) =>
                        `${styles.navLink} ${isActive ? styles.active : ''}`
                    }
                >
                    <Ticket size={20} />
                    <span>Voucher</span>
                </NavLink>
            </li>
            </ul>
        </nav>
        </aside>
    );
};

export default AdminSidebar;
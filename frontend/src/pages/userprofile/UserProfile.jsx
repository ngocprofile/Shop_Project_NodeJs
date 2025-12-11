import { Box, LogOut, ShieldCheck, Ticket, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import useAuth from '../../hooks/CheckToken';
import styles from './UserProfile.module.css';

// Import các component con
import ChangePassword from './ChangePassword';
import MyOrders from './MyOrders';
import ProfileInfo from './ProfileInfo';
import VoucherWallet from './VoucherWallet';

const UserProfile = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState('profile');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/users/profile');
                setUser(response.data); 
            } catch (error) {
                console.error("Lỗi lấy thông tin:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchUserProfile();
    }, []);

    const handleCountCollectedVouchers = () => {
        // đếm só lượng voucher đã thu thập của user , trừ ra những voucher đã sử dụng , hoặc hết hạn
        const now = new Date();
        return user.collectedVouchers.filter(voucher => {
            const expiryDate = new Date(voucher.endDate);
            return !voucher.isUsed && expiryDate >= now;
        }).length;
    };

    const handleLogout = () => {
        if (window.confirm('Đăng xuất?')) {
            logout();
            navigate('/login');
        }
    };

    if (loading) return <div className={styles.loadingContainer}><div className={styles.spinner}></div></div>;
    if (!user) return <div className={styles.loadingContainer}><p>Lỗi tải thông tin.</p></div>;

    const avatarSrc = user.avatar || `https://placehold.co/100x100/E2E8F0/4A5568?text=${user.name ? user.name.charAt(0) : 'A'}`;

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileContainer}>
                {/* SIDEBAR */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarProfile}>
                        <img src={avatarSrc} alt="Avatar" className={styles.sidebarAvatar} />
                        <h4 className={styles.sidebarName}>{user.name}</h4>
                        <p className={styles.sidebarEmail}>{user.email}</p>
                    </div>
                    <nav className={styles.profileNav}>
                        <ul>
                            <li>
                                <button className={activeView === 'profile' ? styles.active : ''} onClick={() => setActiveView('profile')}>
                                    <User size={18} /> Thông tin cá nhân
                                </button>
                            </li>
                            <li>
                                <button className={activeView === 'orders' ? styles.active : ''} onClick={() => setActiveView('orders')}>
                                    <Box size={18} /> Đơn mua
                                </button>
                            </li>
                            <li>
                                <button className={activeView === 'vouchers' ? styles.active : ''} onClick={() => setActiveView('vouchers')}>
                                    <Ticket size={18} /> Ví Voucher
                                    {user.collectedVouchers?.length > 0 && <span className={styles.navBadge}>{handleCountCollectedVouchers()}</span>}
                                </button>
                            </li>
                            <li>
                                <button className={activeView === 'password' ? styles.active : ''} onClick={() => setActiveView('password')}>
                                    <ShieldCheck size={18} /> Đổi mật khẩu
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.sidebarFooter}>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            <LogOut size={18} /> Đăng xuất
                        </button>
                    </div>
                </aside>

                {/* CONTENT AREA */}
                <main className={styles.content}>
                    {activeView === 'profile' && <ProfileInfo user={user} />}
                    {activeView === 'orders' && <MyOrders />}
                    {activeView === 'vouchers' && <VoucherWallet vouchers={user.collectedVouchers} />}
                    {activeView === 'password' && <ChangePassword />}
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
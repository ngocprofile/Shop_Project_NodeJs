import {
    Box,
    Calendar,
    Camera,
    CheckCircle,
    Edit3,
    LogOut,
    Mail,
    Shield,
    ShieldCheck,
    User,
    XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react'; // SỬA 1: Thêm useEffect
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/CheckToken';

import api from '../api'; // SỬA 2: Import file api (giả sử nằm ở /src/utils/api.js)
import styles from './UserProfile.module.css';

// ===========================================
// (Các component con giữ nguyên, không đổi)
// ===========================================

// 2. Tách phần hiển thị thông tin ra component con
const ProfileInfoView = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const avatarSrc = user.avatar || `https://placehold.co/150x150/E2E8F0/4A5568?text=${user.name ? user.name.charAt(0) : 'A'}`;

    return (
        <div className={styles.card}>
            {/* Header của Card */}
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Thông tin cá nhân</h3>
                <button 
                    className={`${styles.button} ${isEditing ? styles.buttonSecondary : styles.buttonPrimary}`}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <Edit3 size={16} /> {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </button>
            </div>

            {/* Body của Card */}
            <div className={styles.cardBody}>
                {/* Avatar */}
                <div className={styles.avatarSection}>
                    <img
                        src={avatarSrc}
                        alt={`${user.name}'s avatar`}
                        className={styles.avatar}
                    />
                    {isEditing && (
                        <button className={`${styles.button} ${styles.buttonSecondary} ${styles.avatarButton}`}>
                            <Camera size={16} /> Thay đổi ảnh
                        </button>
                    )}
                </div>

                {/* Lưới thông tin */}
                <div className={styles.infoGrid}>
                    {/* Tên */}
                    <div className={styles.infoItem}>
                        <label className={styles.label}><User size={16} /> Tên:</label>
                        <p className={styles.infoText}>{user.name || 'Chưa cập nhật'}</p>
                    </div>

                    {/* Email */}
                    <div className={styles.infoItem}>
                        <label className={styles.label}><Mail size={16} /> Email:</label>
                        <p className={styles.infoText}>{user.email}</p>
                    </div>

                    {/* Vai trò */}
                    <div className={styles.infoItem}>
                        <label className={styles.label}><Shield size={16} /> Vai trò:</label>
                        <p className={styles.infoText}>
                            {user.role === 'customer' && 'Khách hàng'}
                            {user.role === 'admin' && 'Quản trị viên'}
                            {user.role === 'staff' && 'Nhân viên'}
                        </p>
                    </div>

                    {/* Trạng thái */}
                    <div className={styles.infoItem}>
                        <label className={styles.label}>Trạng thái:</label>
                        <p className={styles.infoText}>
                            {user.isActive ? (
                                <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                                    <CheckCircle size={16} /> Hoạt động
                                </span>
                            ) : (
                                <span className={`${styles.badge} ${styles.badgeDanger}`}>
                                    <XCircle size={16} /> Không hoạt động
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Ngày tham gia */}
                    <div className={styles.infoItem}>
                        <label className={styles.label}><Calendar size={16} /> Ngày tham gia:</label>
                        <p className={styles.infoText}>
                            {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                    </div>

                    {/* Cập nhật cuối */}
                    <div className={styles.infoItem}>
                        <label className={styles.label}><Calendar size={16} /> Cập nhật lần cuối:</label>
                        <p className={styles.infoText}>
                            {new Date(user.updatedAt).toLocaleDateString('vi-VN')}
                        </p>
                    </div>
                </div>

                {/* Thông báo khi chỉnh sửa */}
                {isEditing && (
                    <div className={styles.alertInfo}>
                        <p><strong>Chỉnh sửa profile:</strong></p>
                        <ul>
                            <li>Bạn có thể thay đổi tên, avatar, hoặc mật khẩu ở phần chỉnh sửa.</li>
                            <li>Email không thể thay đổi để đảm bảo bảo mật.</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// 3. Component cho Lịch sử mua hàng
const OrderHistoryView = () => (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Lịch sử mua hàng</h3>
        </div>
        <div className={styles.cardBody}>
            <p>Bạn chưa có đơn hàng nào.</p>
            {/* (Trong tương lai, bạn sẽ lặp qua danh sách đơn hàng ở đây) */}
        </div>
    </div>
);

// 4. Component cho Đổi mật khẩu
const ChangePasswordView = () => (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Đổi mật khẩu</h3>
        </div>
        <div className={styles.cardBody}>
            <form className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="currentPassword" className={styles.formLabel}>Mật khẩu hiện tại</label>
                    <input type="password" id="currentPassword" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="newPassword" className={styles.formLabel}>Mật khẩu mới</label>
                    <input type="password" id="newPassword" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.formLabel}>Xác nhận mật khẩu mới</label>
                    <input type="password" id="confirmPassword" className={styles.formInput} />
                </div>
                <div className={styles.formGroupFull}>
                    <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
                        Cập nhật mật khẩu
                    </button>
                </div>
            </form>
        </div>
    </div>
);


// ===========================================
// (Component chính - ĐÃ CẬP NHẬT LOGIC)
// ===========================================
const UserProfile = () => {
    // SỬA 3: Chỉ lấy `logout` từ useAuth
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    // SỬA 4: Component tự quản lý state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState('profile');

    // SỬA 5: Gọi API khi component được tải
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Gọi API endpoint của bạn
                const response = await api.get('/users/profile');
                
                setUser(response.data); // Lưu data từ backend vào state
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
                // (Tùy chọn) Nếu lỗi 401 (token hỏng), có thể logout:
                // if (error.response && error.response.status === 401) {
                //     logout();
                //     navigate('/login');
                // }
            } finally {
                setLoading(false); // Dừng loading sau khi xong
            }
        };

        fetchUserProfile();
    }, []); // Mảng rỗng [] = chỉ chạy 1 lần

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            logout();
            navigate('/login');
        }
    };

    // SỬA 6: Cập nhật lại logic loading
    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Đang tải thông tin...</p>
            </div>
        );
    }

    // SỬA 7: Xử lý trường hợp API lỗi và không có user
    if (!user) {
        return (
            <div className={styles.loadingContainer}>
                <p>Không thể tải thông tin tài khoản. Vui lòng thử lại.</p>
            </div>
        );
    }

    // Từ đây trở xuống giữ nguyên, vì `user` đã có data
    const avatarSrc = user.avatar || `https://placehold.co/100x100/E2E8F0/4A5568?text=${user.name ? user.name.charAt(0) : 'A'}`;

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileContainer}>
                
                {/* === SIDEBAR TÁC VỤ === */}
                <aside className={styles.sidebar}>
                    {/* Tóm tắt profile */}
                    <div className={styles.sidebarProfile}>
                        <img src={avatarSrc} alt="Avatar" className={styles.sidebarAvatar} />
                        <h4 className={styles.sidebarName}>{user.name || 'Người dùng'}</h4>
                        <p className={styles.sidebarEmail}>{user.email}</p>
                    </div>

                    {/* Menu tác vụ */}
                    <nav className={styles.profileNav}>
                        <ul>
                            <li>
                                <button
                                    className={activeView === 'profile' ? styles.active : ''}
                                    onClick={() => setActiveView('profile')}
                                >
                                    <User size={18} /> Thông tin cá nhân
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeView === 'orders' ? styles.active : ''}
                                    onClick={() => setActiveView('orders')}
                                >
                                    <Box size={18} /> Lịch sử mua hàng
                                </button>
                            </li>
                            <li>
                                <button
                                    className={activeView === 'password' ? styles.active : ''}
                                    onClick={() => setActiveView('password')}
                                >
                                    <ShieldCheck size={18} /> Đổi mật khẩu
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Nút Đăng xuất */}
                    <div className={styles.sidebarFooter}>
                        <button className={styles.logoutButton} onClick={handleLogout}>
                            <LogOut size={18} /> Đăng xuất
                        </button>
                    </div>
                </aside>

                {/* === VÙNG NỘI DUNG CHÍNH === */}
                <main className={styles.content}>
                    {activeView === 'profile' && <ProfileInfoView user={user} />}
                    {activeView === 'orders' && <OrderHistoryView />}
                    {activeView === 'password' && <ChangePasswordView />}
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
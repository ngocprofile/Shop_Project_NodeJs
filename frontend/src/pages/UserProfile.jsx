import {
    Box,
    Calendar,
    Camera,
    CheckCircle,
    Edit3,
    Info,
    LogOut,
    Mail,
    Shield,
    ShieldCheck,
    Ticket,
    User,
    X,
    XCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- 3. THÊM Link
import useAuth from '../hooks/CheckToken';

import api from '../api';
import styles from './UserProfile.module.css';

// ===========================================
// (Component con 1: ProfileInfoView)
// ===========================================
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

// ===========================================
// (Component con 2: OrderHistoryView)
// ===========================================
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

// ===========================================
// (Component con 3: ChangePasswordView)
// ===========================================
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
// 4. THÊM COMPONENT VOUCHER MODAL
// (Copy component này từ VoucherDashboard.jsx qua)
// ===========================================
const VoucherModal = ({ voucher, onClose }) => {
    if (!voucher) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Chi tiết Ưu đãi</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <h4>{voucher.title}</h4>
                    <p>{voucher.description || "Không có mô tả chi tiết."}</p>
                    <ul className={styles.detailList}>
                        <li>
                            <strong>Hạn sử dụng:</strong> 
                            {new Date(voucher.endDate).toLocaleString('vi-VN')}
                        </li>
                        <li>
                            <strong>Đơn hàng tối thiểu:</strong> 
                            {voucher.minOrderValue.toLocaleString()} VND
                        </li>
                        <li>
                            <strong>Giới hạn/người:</strong> 
                            {voucher.perUserLimit} lần
                        </li>
                    </ul>
                    <p className={styles.modalNote}>
                        Mã voucher (nếu có) sẽ được tự động áp dụng tại trang thanh toán.
                    </p>
                </div>
            </div>
        </div>
    );
};


// ===========================================
// 5. CẬP NHẬT COMPONENT WALLET VOUCHER CARD
// (Thêm prop 'onViewDetails' và link "Điều kiện")
// ===========================================
const WalletVoucherCard = ({ voucher, onViewDetails }) => {
    
    // (Hàm formatVoucherType... giữ nguyên)
    const formatVoucherType = () => {
        const { discountType, discountValue, maxDiscountAmount } = voucher;
        if (discountType === 'freeship') {
            if (maxDiscountAmount > 0) return `Miễn phí vận chuyển (Tối đa ${maxDiscountAmount.toLocaleString()}đ)`;
            return "Miễn phí vận chuyển";
        }
        if (discountType === 'fixed') return `Giảm ${discountValue.toLocaleString()} VND`;
        if (discountType === 'percentage') {
            if (maxDiscountAmount > 0) return `Giảm ${discountValue}% (Tối đa ${maxDiscountAmount.toLocaleString()} VND)`;
            return `Giảm ${discountValue}%`;
        }
        return "Ưu đãi";
    };

    const formatEndDate = () => {
        return new Date(voucher.endDate).toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };
    
    return (
        <div className={styles.walletVoucherCard}>
            <div className={styles.walletCardLogo}>
                <span>{voucher.discountType === 'freeship' ? 'SHIP' : 'SALE'}</span>
            </div>
            <div className={styles.walletCardContent}>
                <h4 className={styles.walletCardTitle}>{voucher.title}</h4>
                <p className={styles.walletCardType}>{formatVoucherType()}</p>
                <p className={styles.walletCardExpiry}>HSD: {formatEndDate()}</p>
                
                {/* --- 1. THÊM LINK "ĐIỀU KIỆN" --- */}
                <a 
                    href="#" 
                    className={styles.detailsLink} 
                    onClick={(e) => { e.preventDefault(); onViewDetails(voucher); }}
                >
                    <Info size={14} /> Điều kiện
                </a>
                {/* --- (Hết phần thêm) --- */}
            </div>
        </div>
    );
};

// ===========================================
// 6. CẬP NHẬT COMPONENT MY VOUCHERS VIEW
// (Thêm logic filter, state modal, và render modal)
// ===========================================
const MyVouchersView = ({ vouchers }) => {
    
    // --- 1. THÊM STATE CHO MODAL ---
    const [modalVoucher, setModalVoucher] = useState(null);
    const openModal = (voucher) => setModalVoucher(voucher);
    const closeModal = () => setModalVoucher(null);

    // --- 2. THÊM LOGIC LỌC VOUCHER (RẤT QUAN TRỌNG) ---
    // (Lọc voucher 'null' (đã bị xóa) và voucher hết hạn)
    const now = new Date();
    const validVouchers = vouchers
        .filter(voucher => 
            voucher !== null && 
            new Date(voucher.endDate) > now &&
            voucher.isActive === true
        );
    // --- (Hết phần lọc) ---

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Ví Voucher của tôi</h3>
            </div>
            <div className={styles.cardBody}>
                {/* 3. SỬ DỤNG 'validVouchers' */}
                {validVouchers.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Bạn chưa lưu voucher nào còn hạn sử dụng.</p>
                        <Link to="/vouchers" className={`${styles.button} ${styles.buttonPrimary}`}>
                            Đến Kho Voucher ngay
                        </Link>
                    </div>
                ) : (
                    <div className={styles.walletGrid}>
                        {/* 4. MAP 'validVouchers' VÀ TRUYỀN PROP 'onViewDetails' */}
                        {validVouchers.map(voucher => (
                            <WalletVoucherCard 
                                key={voucher._id} 
                                voucher={voucher} 
                                onViewDetails={openModal} // <-- Truyền prop
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* --- 5. RENDER MODAL --- */}
            <VoucherModal voucher={modalVoucher} onClose={closeModal} />
        </div>
    );
};


// ===========================================
// (Component chính - ĐÃ CẬP NHẬT)
// ===========================================
const UserProfile = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState('profile');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // API này CẦN PHẢI populate('collectedVouchers') ở backend
                const response = await api.get('/users/profile');
                setUser(response.data); 
            } catch (error) {
                console.error("Lỗi khi lấy thông tin user:", error);
            } finally {
                setLoading(false); 
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

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Đang tải thông tin...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.loadingContainer}>
                <p>Không thể tải thông tin tài khoản. Vui lòng thử lại.</p>
            </div>
        );
    }

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
                            
                            {/* --- 5. THÊM NÚT VÍ VOUCHER --- */}
                            <li>
                                <button
                                    className={activeView === 'vouchers' ? styles.active : ''}
                                    onClick={() => setActiveView('vouchers')}
                                >
                                    <Ticket size={18} /> Ví Voucher
                                    {user.collectedVouchers && user.collectedVouchers.length > 0 && (
                                        <span className={styles.navBadge}>{user.collectedVouchers.length}</span>
                                    )}
                                </button>
                            </li>
                            {/* --- (Hết phần thêm) --- */}
                            
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
                    
                    {/* --- 6. RENDER VIEW MỚI --- */}
                    {activeView === 'vouchers' && <MyVouchersView vouchers={user.collectedVouchers} />}
                    
                    {activeView === 'password' && <ChangePasswordView />}
                </main>
            </div>
        </div>
    );
};

export default UserProfile;
import { Camera, CheckCircle, Edit3, Mail, Shield, User, XCircle } from 'lucide-react';
import { useState } from 'react';
import styles from './UserProfile.module.css';

const ProfileInfo = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const avatarSrc = user.avatar || `https://placehold.co/150x150/E2E8F0/4A5568?text=${user.name ? user.name.charAt(0) : 'A'}`;

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Thông tin cá nhân</h3>
                <button 
                    className={`${styles.button} ${isEditing ? styles.buttonSecondary : styles.buttonPrimary}`}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <Edit3 size={16} /> {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </button>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.avatarSection}>
                    <img src={avatarSrc} alt="Avatar" className={styles.avatar} />
                    {isEditing && (
                        <button className={`${styles.button} ${styles.buttonSecondary} ${styles.avatarButton}`}>
                            <Camera size={16} /> Thay đổi ảnh
                        </button>
                    )}
                </div>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <label className={styles.label}><User size={16} /> Tên:</label>
                        <p className={styles.infoText}>{user.name || 'Chưa cập nhật'}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.label}><Mail size={16} /> Email:</label>
                        <p className={styles.infoText}>{user.email}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.label}><Shield size={16} /> Vai trò:</label>
                        <p className={styles.infoText}>
                            {user.role === 'customer' && 'Khách hàng'}
                            {user.role === 'admin' && 'Quản trị viên'}
                            {user.role === 'staff' && 'Nhân viên'}
                        </p>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.label}>Trạng thái:</label>
                        <p className={styles.infoText}>
                            {user.isActive ? (
                                <span className={`${styles.badge} ${styles.badgeSuccess}`}><CheckCircle size={16} /> Hoạt động</span>
                            ) : (
                                <span className={`${styles.badge} ${styles.badgeDanger}`}><XCircle size={16} /> Khóa</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
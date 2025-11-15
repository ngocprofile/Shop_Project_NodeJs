import { ArrowLeft, Save, Shield, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import styles from './AdminUser.module.css'; // Dùng chung file CSS

const UserCreateForm = () => {
    const navigate = useNavigate();

    // State chính của form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'staff', // Mặc định là 'staff' như bạn yêu cầu
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Xử lý khi thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(''); // Xóa lỗi cũ

        try {
        // Gọi API POST /api/users (controller 'createUser' của bạn)
        await api.post('/users', formData);
        alert(`Đã tạo tài khoản ${formData.role} thành công!`);
        navigate('/admin/users'); // Quay về trang danh sách

        } catch (err) {
        console.error("Lỗi khi tạo user:", err);
        setError(err.response?.data?.message || 'Tạo tài khoản thất bại.');
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.productPage}>
        <div className={styles.pageHeader}>
            <h1>Tạo tài khoản mới</h1>
            <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={() => navigate('/admin/users')}
            >
            <ArrowLeft size={18} />
            Quay lại danh sách
            </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className={styles.card} style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className={styles.cardHeader}>
                <h3>
                <User size={20} />
                Thông tin tài khoản
                </h3>
            </div>
            <div className={styles.cardBody}>
                {/* Hiển thị lỗi nếu có */}
                {error && (
                <div className={`${styles.badge} ${styles.badgeDanger}`} style={{ marginBottom: '1rem', width: '100%', borderRadius: '4px' }}>
                    {error}
                </div>
                )}
                
                <div className={styles.formGroup}>
                <label htmlFor="name">Tên hiển thị *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                />
                </div>
                
                <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                />
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="password">Mật khẩu *</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    minLength={6} // Thêm validation cơ bản
                />
                </div>
                
                <hr className={styles.divider} /> 

                <div className={styles.formGroup}>
                <label htmlFor="role">
                    <Shield size={16} style={{ marginRight: '0.25rem' }}/>
                    Vai trò *
                </label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                    required
                >
                    <option value="staff">Staff (Nhân viên)</option>
                    <option value="admin">Admin (Quản trị)</option>
                    <option value="customer">Customer (Khách hàng)</option>
                </select>
                </div>
            </div>
            </div>

            {/* Nút Submit */}
            <div className={styles.formActions} style={{ justifyContent: 'center' }}>
            <button
                type="submit"
                className={`${styles.button} ${styles.buttonPrimary}`}
                disabled={isSubmitting}
            >
                <Save size={18} />
                {isSubmitting ? 'Đang tạo...' : 'Tạo tài khoản'}
            </button>
            </div>
        </form>
        </div>
    );
};

export default UserCreateForm;
import { ArrowLeft, Save, Shield, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import styles from './AdminUser.module.css'; // Dùng chung file CSS

const UserForm = () => {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    // State cho dữ liệu form (chỉ những gì có thể sửa)
    const [formData, setFormData] = useState({
        role: '',
        isActive: false,
    });

    // State cho dữ liệu không sửa (để hiển thị)
    const [user, setUser] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tải dữ liệu của user cần sửa
    useEffect(() => {
        const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/users/${id}`);
            
            // Cập nhật thông tin hiển thị
            setUser(res.data);
            
            // Cập nhật thông tin cho form
            setFormData({
            role: res.data.role,
            isActive: res.data.isActive,
            });

        } catch (error) {
            console.error("Lỗi khi tải thông tin user:", error);
            alert('Không thể tìm thấy user này.');
            navigate('/admin/users');
        } finally {
            setLoading(false);
        }
        };

        fetchUser();
    }, [id, navigate]); // Thêm navigate vào dependency array

    // Xử lý khi thay đổi input
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || !user) return;
        setIsSubmitting(true);

        const updatePromises = [];
        
        // Khai báo biến ở phạm vi ngoài để catch/finally có thể truy cập
        let updateSuccess = true; 

        try {
            // 1. CẬP NHẬT VAI TRÒ (ROLE)
            if (formData.role !== user.role) {
                console.log("Đang cập nhật Role...");
                // CHỈ gửi trường 'role' đến API /role
                const roleUpdatePromise = api.put(`/users/${id}/role`, {
                    role: formData.role
                });
                updatePromises.push(roleUpdatePromise);
            }

            // 2. CẬP NHẬT TRẠNG THÁI (STATUS)
            if (formData.isActive !== user.isActive) {
                console.log("Đang cập nhật Status...");
                // CHỈ gửi trường 'isActive' đến API /status
                const statusUpdatePromise = api.put(`/users/${id}/status`, {
                    isActive: formData.isActive
                });
                updatePromises.push(statusUpdatePromise);
            }

            if (updatePromises.length === 0) {
                alert('Không có thay đổi nào để lưu.');
                updateSuccess = false; // Đặt false vì không có gì được thực hiện
                return;
            }

            // Chạy tất cả các yêu cầu API đồng thời (PUT /role và/hoặc PUT /status)
            await Promise.all(updatePromises);

            // Nếu tất cả Promise thành công, updateSuccess vẫn là true

        } catch (error) {
            // Nếu có bất kỳ API nào lỗi, khối catch sẽ chạy
            updateSuccess = false; 
            console.error("Lỗi khi cập nhật user:", error);
            
            // Hiển thị thông báo lỗi chi tiết từ server
            const errorMessage = error.response?.data?.message || 'Cập nhật thất bại. Vui lòng kiểm tra console.';
            alert(`Cập nhật thất bại: ${errorMessage}`);
            
        } finally {
            setIsSubmitting(false);

            // Chỉ điều hướng nếu không có lỗi nào xảy ra
            if (updateSuccess) {
                alert('Đã cập nhật người dùng thành công!');
                navigate('/admin/users'); 
            }
        }
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải thông tin...</div>;
    }

    if (!user) {
        return <div className={styles.loading}>Không tìm thấy người dùng.</div>;
    }

    return (
        <div className={styles.productPage}>
        <div className={styles.pageHeader}>
            <h1>Cập nhật Người dùng</h1>
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
                Thông tin: {user.name}
                </h3>
            </div>
            <div className={styles.cardBody}>
                {/* Thông tin không thể sửa */}
                <div className={styles.formGroup}>
                <label htmlFor="name">Tên</label>
                <input
                    type="text"
                    id="name"
                    value={user.name || ''}
                    className={styles.formInput}
                    disabled
                />
                </div>
                <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={user.email || ''}
                    className={styles.formInput}
                    disabled
                />
                </div>
                
                <hr className={styles.divider} /> 

                {/* Thông tin có thể sửa */}
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
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                </select>
                </div>

                <div className={styles.formGroup}>
                <label>Trạng thái *</label>
                <div className={styles.formToggle} style={{ justifyContent: 'flex-start' }}>
                    <label className={styles.switch}>
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                    </label>
                    <p style={{ marginLeft: '-0.5rem' }}>
                    {formData.isActive ? "Đang hoạt động" : "Đã khóa"}
                    </p>
                </div>
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
                {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            </div>
        </form>
        </div>
    );
};

export default UserForm;
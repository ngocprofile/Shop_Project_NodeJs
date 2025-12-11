import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import styles from './AdminShipping.module.css';

const AddShipping = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        type: 'standard',
        cost: 0,
        freeShipOrderThreshold: '', // Để rỗng ban đầu cho dễ nhập
        estimatedDelivery: '3-5 ngày',
        allowedProvinceCodes: '', // Nhập chuỗi "79, 01"
        description: '',
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Chuẩn bị dữ liệu gửi lên Backend
            const payload = {
                ...formData,
                cost: Number(formData.cost),
                freeShipOrderThreshold: formData.freeShipOrderThreshold ? Number(formData.freeShipOrderThreshold) : null,
                
                // 2. Xử lý chuỗi Province Code thành Mảng
                allowedProvinceCodes: formData.allowedProvinceCodes
                    ? formData.allowedProvinceCodes.split(',').map(code => code.trim()).filter(code => code !== '')
                    : [] // Nếu rỗng thì gửi mảng rỗng (Toàn quốc)
            };

            await api.post('/shipping', payload);
            alert("Thêm phương thức vận chuyển thành công!");
            navigate('/admin/shipping'); // Quay về dashboard
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Có lỗi xảy ra.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <Link to="/admin/shipping" style={{color: '#333'}}><ArrowLeft /></Link>
                    <h1 className={styles.title}>Thêm Phương Thức Vận Chuyển</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formCard}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Tên hiển thị <span style={{color:'red'}}>*</span></label>
                    <input 
                        type="text" 
                        name="name" 
                        className={styles.input} 
                        value={formData.name} 
                        onChange={handleChange}
                        placeholder="VD: Giao hàng nhanh, Hỏa tốc 2H..." 
                        required 
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Loại hình</label>
                        <select name="type" className={styles.select} value={formData.type} onChange={handleChange}>
                            <option value="standard">Tiêu chuẩn (Toàn quốc)</option>
                            <option value="express">Hỏa tốc (Nội thành)</option>
                            <option value="pickup">Khách tự lấy</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Thời gian dự kiến</label>
                        <input 
                            type="text" 
                            name="estimatedDelivery" 
                            className={styles.input} 
                            value={formData.estimatedDelivery} 
                            onChange={handleChange}
                            placeholder="VD: 3-5 ngày, Trong ngày..." 
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Phí vận chuyển (VNĐ) <span style={{color:'red'}}>*</span></label>
                        <input 
                            type="number" 
                            name="cost" 
                            className={styles.input} 
                            value={formData.cost} 
                            onChange={handleChange}
                            min="0"
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Freeship cho đơn từ (VNĐ)</label>
                        <input 
                            type="number" 
                            name="freeShipOrderThreshold" 
                            className={styles.input} 
                            value={formData.freeShipOrderThreshold} 
                            onChange={handleChange}
                            min="0"
                            placeholder="Bỏ trống nếu không freeship" 
                        />
                        <p className={styles.helperText}>Ví dụ: Nhập 500000 để freeship cho đơn trên 500k.</p>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Mã Tỉnh/Thành áp dụng (Chỉ dành cho Hỏa tốc)</label>
                    <input 
                        type="text" 
                        name="allowedProvinceCodes" 
                        className={styles.input} 
                        value={formData.allowedProvinceCodes} 
                        onChange={handleChange}
                        placeholder="VD: 79, 01 (79 là HCM, 01 là HN)" 
                    />
                    <p className={styles.helperText}>
                        Nhập mã tỉnh cách nhau bằng dấu phẩy. Để trống nếu áp dụng <strong>Toàn Quốc</strong>.
                    </p>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Mô tả ngắn (Tùy chọn)</label>
                    <textarea 
                        name="description" 
                        className={styles.textarea} 
                        rows="3" 
                        value={formData.description} 
                        onChange={handleChange}
                        placeholder="VD: Chỉ giao trong giờ hành chính..."
                    ></textarea>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.checkboxWrapper}>
                        <input 
                            type="checkbox" 
                            name="isActive" 
                            className={styles.checkbox} 
                            checked={formData.isActive} 
                            onChange={handleChange} 
                        />
                        <span className={styles.label} style={{marginBottom: 0}}>Kích hoạt ngay</span>
                    </label>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Đang lưu...' : 'Lưu Phương Thức'}
                </button>
            </form>
        </div>
    );
};

export default AddShipping;
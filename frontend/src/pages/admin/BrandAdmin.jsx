import { Edit3, Plus, Save, Trash, Trash2, UploadCloud, X } from 'lucide-react'; // 1. THÊM ICON
import { useEffect, useState } from 'react';
import api from '../../api';
import styles from './AdminProduct.module.css'; // Dùng chung CSS
// ngoc
// 2. URL GỐC CỦA SERVER (ĐỂ HIỂN THỊ ẢNH)
const serverRootUrl = 'http://localhost:5000'; // <-- Thay port backend của bạn

// 3. BỎ 'logo' KHỎI INITIAL STATE
const initialState = {
    name: '',
    description: '',
    origin: '',
    isActive: true,
    };

    const BrandAdmin = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State cho form
    const [formData, setFormData] = useState(initialState);
    const [editingId, setEditingId] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- 4. THÊM STATE CHO ẢNH ---
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState('');

    // --- API Functions ---

    // 1. Tải tất cả thương hiệu
    const fetchBrands = async () => {
        setLoading(true);
        try {
        const res = await api.get('/brands');
        setBrands(res.data);
        } catch (err) {
        setError('Lỗi khi tải thương hiệu.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    // 2. Tải danh sách khi component mount
    useEffect(() => {
        fetchBrands();
    }, []);

    // --- 5. CẬP NHẬT HANDLESUBMIT (DÙNG FORMDATA) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || !formData.name) return;
        setIsSubmitting(true);
        setError('');

        // 1. Tạo FormData
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('origin', formData.origin);
        data.append('isActive', formData.isActive);

        // 2. Thêm logic ảnh (giả sử field tên là 'logo')
        if (imageFile) {
        data.append('logo', imageFile); // File mới
        } else if (!existingImageUrl && editingId) {
        // Chỉ gửi 'null' khi Sửa và người dùng đã Xóa ảnh
        data.append('logo', 'null'); // Báo backend xóa ảnh
        }
        // (Nếu không làm gì, ảnh cũ sẽ được giữ nguyên)

        try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        if (editingId) {
            // Cập nhật (PUT)
            await api.put(`/brands/${editingId}`, data, config);
            alert('Cập nhật thương hiệu thành công!');
        } else {
            // Thêm mới (POST)
            await api.post('/brands', data, config);
        }
        // Reset form và tải lại danh sách
        handleCancel();
        fetchBrands();

        } catch (err) {
        setError(err.response?.data?.message || (editingId ? 'Cập nhật thất bại.' : 'Thêm thất bại.'));
        console.error(err);
        } finally {
        setIsSubmitting(false);
        }
    };

    // 4. Xử lý Xóa
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa thương hiệu này?')) {
        try {
            await api.delete(`/brands/${id}`);
            alert('Xóa thành công!');
            fetchBrands(); // Tải lại danh sách
        } catch (err) {
            setError('Xóa thất bại.');
            console.error(err);
        }
        }
    };

    // --- Helper Functions ---

    // Xử lý thay đổi input (Text, Checkbox)
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // --- 6. HÀM XỬ LÝ ẢNH MỚI ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setExistingImageUrl('');
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl('');
    };

    // --- 7. CẬP NHẬT HANDLEEDITCLICK ---
    const handleEditClick = (brand) => {
        setEditingId(brand._id);
        setFormData({
        name: brand.name,
        description: brand.description || '',
        origin: brand.origin || '',
        isActive: brand.isActive,
        // Bỏ 'logo' khỏi formData
        });

        // Xử lý state ảnh riêng
        setImageFile(null);
        setImagePreview(null);
        if (brand.logo) {
        // Dùng serverRootUrl để hiển thị ảnh
        setExistingImageUrl(serverRootUrl + brand.logo);
        } else {
        setExistingImageUrl('');
        }

        setError('');
        window.scrollTo(0, 0); // Cuộn lên đầu trang để thấy form
    };

    // --- 8. CẬP NHẬT HANDLECANCEL ---
    const handleCancel = () => {
        setEditingId(null);
        setFormData(initialState); // Reset về trạng thái rỗng
        setError('');
        
        // Reset state ảnh
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl('');
    };

    return (
        <div className={styles.productPage}>
        {/* Header */}
        <div className={styles.pageHeader}>
            <h1>Quản lý Thương hiệu</h1>
        </div>

        {/* 1. Form Thêm/Sửa */}
        <div className={styles.card} style={{ marginBottom: '2rem' }}>
            <div className={styles.cardHeader}>
            <h3>{editingId ? 'Sửa thương hiệu' : 'Thêm thương hiệu mới'}</h3>
            </div>
            <div className={styles.cardBody}>
            <form onSubmit={handleSubmit}>
                {error && (
                <div className={`${styles.badge} ${styles.badgeDanger}`} style={{ marginBottom: '1rem', width: '100%', borderRadius: '4px' }}>
                    {error}
                </div>
                )}
                
                <div className={styles.formGroup}>
                <label htmlFor="name">Tên thương hiệu *</label>
                <input
                    type="text" id="name" name="name"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="description">Mô tả</label>
                <textarea
                    id="description" name="description"
                    className={styles.formTextarea}
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                ></textarea>
                </div>
                
                {/* Chia 2 cột cho Xuất xứ và Logo */}
                <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="origin">Xuất xứ</label>
                    <input
                    type="text" id="origin" name="origin"
                    className={styles.formInput}
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Việt Nam, Hàn Quốc..."
                    />
                </div>
                
                {/* --- 9. CẬP NHẬT Ô UPLOAD LOGO --- */}
                <div className={styles.formGroup}>
                    <label htmlFor="logo">Logo thương hiệu</label>
                    {/* Dùng chung CSS với các form khác */}
                    <div className={styles.imageUploadContainer} style={{ height: 'auto', minHeight: '120px' }}>
                    {/* Vùng xem trước ảnh */}
                    <div className={styles.imagePreview}>
                        {imagePreview ? (
                        <img src={imagePreview} alt="Xem trước" />
                        ) : existingImageUrl ? (
                        <img src={existingImageUrl} alt="Ảnh hiện tại" />
                        ) : (
                        <div className={styles.imagePlaceholder}>
                            <UploadCloud size={24} />
                            <p>Chọn ảnh</p>
                        </div>
                        )}
                    </div>

                    {/* Input file (được ẩn đi) */}
                    <input 
                        type="file" 
                        id="logo" // Đổi tên id/name thành 'logo'
                        name="logo" 
                        accept="image/png, image/jpeg, image/gif, image/webp"
                        onChange={handleImageChange}
                        className={styles.fileInputHidden}
                    />
                    
                    {/* Nút bấm (dùng label trỏ vào input) */}
                    <label htmlFor="logo" className={`${styles.button} ${styles.buttonSecondary}`} style={{ marginRight: '0.Srem' }}>
                        Chọn ảnh
                    </label>

                    {/* Nút Xóa ảnh */}
                    {(imagePreview || existingImageUrl) && (
                        <button 
                        type="button" 
                        className={`${styles.button} ${styles.buttonDangerOutline}`}
                        onClick={removeImage}
                        >
                        <Trash size={16} /> Xóa
                        </button>
                    )}
                    </div>
                </div>
                </div>

                <div className={styles.formGroup}>
                <label>Trạng thái</label>
                <div className={styles.formToggle}>
                    <label className={styles.switch}>
                    <input
                        type="checkbox" id="isActive" name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                    </label>
                    <p>{formData.isActive ? "Đang hoạt động" : "Đã ẩn"}</p>
                </div>
                </div>

                {/* Nút bấm */}
                <div className={styles.formActions} style={{ justifyContent: 'flex-start' }}>
                <button
                    type="submit"
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    disabled={isSubmitting}
                >
                    {editingId ? <Save size={18} /> : <Plus size={18} />}
                    {isSubmitting ? 'Đang lưu...' : (editingId ? 'Cập nhật' : 'Thêm')}
                </button>
                {editingId && (
                    <button
                    type="button"
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={handleCancel}
                    >
                    <X size={18} />
                    Hủy
                    </button>
                )}
                </div>
            </form>
            </div>
        </div>

        {/* 2. Bảng Liệt kê */}
        <div className={styles.card}>
            <div className={styles.cardHeader}>
            <h3>Danh sách Thương hiệu ({brands.length})</h3>
            </div>
            <div className={styles.cardBody}>
            <table className={styles.productTable}>
                <thead>
                <tr>
                    <th style={{ width: '80px' }}>Logo</th>
                    <th>Tên Thương hiệu</th>
                    <th>Xuất xứ</th>
                    <th>Trạng thái</th>
                    <th style={{ width: '150px' }}>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center' }}>Đang tải...</td></tr>
                ) : brands.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center' }}>Chưa có thương hiệu nào.</td></tr>
                ) : (
                    brands.map((brand) => (
                    <tr key={brand._id}>
                        <td>
                        {/* --- 10. CẬP NHẬT SRC ẢNH --- */}
                        {brand.logo ? (
                            <img 
                            src={serverRootUrl + brand.logo} // Thêm serverRootUrl
                            alt={brand.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '4px' }} 
                            />
                        ) : (
                            // Dùng placeholder chung
                            <span className={styles.categoryImagePlaceholder} style={{width: '50px', height: '50px'}}></span>
                        )}
                        </td>
                        <td>{brand.name}</td>
                        <td>{brand.origin || '—'}</td>
                        <td>
                        <span
                            className={`${styles.badge} ${
                            brand.isActive ? styles.badgeSuccess : styles.badgeWarning
                            }`}
                        >
                            {brand.isActive ? 'Hoạt động' : 'Đã ẩn'}
                        </span>
                        </td>
                        <td className={styles.actionCell}>
                        <button
                            className={`${styles.actionButton} ${styles.editButton}`}
                            onClick={() => handleEditClick(brand)}
                        >
                            <Edit3 size={16} />
                        </button>
                        <button
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            onClick={() => handleDelete(brand._id)}
                        >
                            <Trash2 size={16} />
                        </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default BrandAdmin;
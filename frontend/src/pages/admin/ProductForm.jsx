import { ArrowLeft, Image, Package, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api'; // Giả sử file api.js của bạn nằm ở src/api.js
import styles from './AdminProduct.module.css'; // Dùng chung file CSS

const ProductForm = () => {
    const { id } = useParams(); // Lấy id từ URL (nếu là 'edit')
    const navigate = useNavigate();
    const isNew = !id; // 'isNew' là hằng số suy luận, không phải state

    // State cho dropdowns
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    
    // State chính của form
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        basePrice: 0,
        gender: 'Unisex',
        material: '',
        isActive: true,
    });
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tải dữ liệu (categories, brands) và (nếu là edit) product data
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            // Luôn tải categories và brands
            const [catRes, brandRes] = await Promise.all([
            api.get('/categories'),
            api.get('/brands'),
            ]);
            setCategories(catRes.data);
            setBrands(brandRes.data);

            // Nếu là trang Sửa (có id), tải thông tin sản phẩm
            if (!isNew) {
            const productRes = await api.get(`/products/${id}`);
            const product = productRes.data;
            setFormData({
                name: product.name,
                description: product.description,
                brand: product.brand?._id || '', // Lấy ID của brand
                category: product.category?._id || '', // Lấy ID của category
                basePrice: product.basePrice,
                gender: product.gender,
                material: product.material || '',
                isActive: product.isActive,
            });
            }
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu form:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    // === CẬP NHẬT ===
    // Chỉ phụ thuộc vào 'id', vì 'isNew' được suy luận từ 'id'
    }, [id]); 

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Dữ liệu sẽ được gửi
        const submitData = { ...formData };
        
        // Đảm bảo brand và category là null nếu không chọn
        if (submitData.brand === '') submitData.brand = null;
        if (submitData.category === '') submitData.category = null;

        try {
        if (isNew) {
            // API Thêm mới
            await api.post('/products', submitData);
            alert('Đã thêm sản phẩm thành công!');
        } else {
            // API Cập nhật
            await api.put(`/products/${id}`, submitData);
            alert('Đã cập nhật sản phẩm thành công!');
        }
        navigate('/admin/products'); // Quay về trang danh sách
        } catch (error) {
        console.error("Lỗi khi lưu sản phẩm:", error);
        alert('Lưu thất bại. Vui lòng kiểm tra lại thông tin.');
        } finally {
        setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải form...</div>;
    }

    return (
        <div className={styles.productPage}>
        <div className={styles.pageHeader}>
            <h1>{isNew ? 'Thêm Sản phẩm mới' : 'Cập nhật Sản phẩm'}</h1>
            <button
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={() => navigate('/admin/products')}
            >
            <ArrowLeft size={18} />
            Quay lại
            </button>
        </div>

        <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
            {/* Cột trái: Thông tin chính */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                <h3><Package size={20} /> Thông tin chung</h3>
                </div>
                <div className={styles.cardBody}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Tên sản phẩm *</label>
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
                    <label htmlFor="description">Mô tả *</label>
                    <textarea
                    id="description"
                    name="description"
                    rows="6"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    required
                    ></textarea>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                    <label htmlFor="basePrice">Giá gốc (VND) *</label>
                    <input
                        type="number"
                        id="basePrice"
                        name="basePrice"
                        value={formData.basePrice}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        required
                    />
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="material">Chất liệu</label>
                    <input
                        type="text"
                        id="material"
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        className={styles.formInput}
                    />
                    </div>
                </div>
                </div>
            </div>
            
            {/* Cột phải: Phân loại, Trạng thái, Ảnh */}
            <div className={styles.columnRight}>
                <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>Phân loại</h3>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.formGroup}>
                    <label htmlFor="category">Danh mục *</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                        required
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="brand">Thương hiệu</label>
                    <select
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                    >
                        <option value="">-- Chọn thương hiệu --</option>
                        {brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>{brand.name}</option>
                        ))}
                    </select>
                    </div>
                    <div className={styles.formGroup}>
                    <label htmlFor="gender">Giới tính *</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={styles.formSelect}
                        required
                    >
                        <option value="Unisex">Unisex</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    </div>
                </div>
                </div>

                <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3><Image size={20} /> Hình ảnh</h3>
                </div>
                <div className={styles.cardBody}>
                    <p className={styles.note}>
                    <strong>Ghi chú:</strong> Chức năng tải ảnh (images) và quản lý biến thể (variants) rất phức tạp. Chúng nên được xử lý trong các component chuyên biệt (vd: Uploader, VariantManager) và API riêng biệt, thường là sau khi sản phẩm đã được tạo.
                    </p>
                    {/* Nơi đây sẽ là component Uploader:
                    <ImageUploader existingImages={formData.images} onChange={...} />
                    */}
                </div>
                </div>

                <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>Trạng thái</h3>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.formToggle}>
                    <label htmlFor="isActive">Hiển thị sản phẩm</label>
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
                    <p>
                        {formData.isActive ? "Sản phẩm sẽ được hiển thị" : "Sản phẩm sẽ bị ẩn"}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Nút Submit */}
            <div className={styles.formActions}>
            <button
                type="submit"
                className={`${styles.button} ${styles.buttonPrimary}`}
                disabled={isSubmitting}
            >
                <Save size={18} />
                {isSubmitting ? 'Đang lưu...' : 'Lưu Sản phẩm'}
            </button>
            </div>
        </form>
        </div>
    );
};

export default ProductForm;
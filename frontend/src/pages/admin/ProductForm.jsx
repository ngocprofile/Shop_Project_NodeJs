import { ArrowLeft, Image, Package, Save, Trash, UploadCloud } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import api from '../../api';
import styles from './AdminProduct.module.css';
// ngoc
// URL Gốc của server (để hiển thị ảnh)
const serverRootUrl = 'http://localhost:5000'; 

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id; 

    // State cho dropdowns (dữ liệu gốc)
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    
    // State chính của form (Đồng bộ với Product Model)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        basePrice: 0,
        gender: 'Unisex',
        material: '',
        isActive: true, // Trạng thái hoạt động
    });
    
    // State cho ảnh
    const [imageFile, setImageFile] = useState(null); 
    const [imagePreview, setImagePreview] = useState(null); 
    const [existingImageUrl, setExistingImageUrl] = useState(''); 

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- 1. CHUYỂN ĐỔI DỮ LIỆU CHO REACT-SELECT ---
    const categoryOptions = useMemo(() => 
        categories.map(cat => ({
            value: cat._id,
            label: cat.name
        })), [categories]
    );

    const brandOptions = useMemo(() =>
        brands.map(brand => ({
            value: brand._id,
            label: brand.name
        })), [brands]
    );

    // Tải dữ liệu (categories, brands) và (nếu là edit) product data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Tải categories (leaf-nodes) và brands
                const [catRes, brandRes] = await Promise.all([
                    api.get('/categories/leaf-nodes'),
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
                        brand: product.brand?._id || '', 
                        category: product.category?._id || '', 
                        basePrice: product.basePrice,
                        gender: product.gender,
                        material: product.material || '',
                        isActive: product.isActive,
                    });

                    if (product.featuredImage) {
                        setExistingImageUrl(serverRootUrl + product.featuredImage);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu form:", error);
                alert("Lỗi tải dữ liệu. Vui lòng kiểm tra console.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, isNew]); 

    // --- 2. HÀM XỬ LÝ ẢNH ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setExistingImageUrl(''); // Xóa ảnh cũ
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl('');
    };

    // --- 3. HÀM XỬ LÝ INPUT ---
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCategoryChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            category: selectedOption ? selectedOption.value : '' // Lưu ID
        }));
    };

    const handleBrandChange = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            brand: selectedOption ? selectedOption.value : '' // Lưu ID
        }));
    };

    // --- 4. HÀM SUBMIT (GỬI MULTIPART/FORM-DATA) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // 1. Tạo FormData (Cần thiết cho file upload)
        const data = new FormData();
        
        // 2. Thêm tất cả dữ liệu text (Chuyển number/boolean sang string)
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('brand', formData.brand || ''); // Nếu null/undefined, gửi string rỗng
        data.append('category', formData.category || ''); 
        data.append('basePrice', String(formData.basePrice)); // Quan trọng: Chuyển Number sang String
        data.append('gender', formData.gender);
        data.append('material', formData.material);
        data.append('isActive', String(formData.isActive)); // Quan trọng: Chuyển Boolean sang String

        // 3. Thêm dữ liệu ảnh (Field name phải khớp với Multer: 'featuredImage')
        if (imageFile) {
            data.append('featuredImage', imageFile); // Gửi file mới
        } else if (existingImageUrl) {
             // Nếu là edit và giữ ảnh cũ, ta KHÔNG làm gì (Backend sẽ hiểu là giữ nguyên)
        } else if (!isNew) {
            // Nếu là edit và người dùng đã Xóa ảnh (existingImageUrl rỗng)
            data.append('featuredImage', 'null'); // Báo backend xóa ảnh cũ
        }

        // in console.log("FormData chuẩn bị gửi:", ...data); // Debug FormData
        console.log("Submitting form data..." , formData);
        // kèm theo ảnh: ", imageFile);
        console.log("Existing Image URL:", imageFile);

        try {
            // Header: Bắt buộc phải là 'multipart/form-data'
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

            if (isNew) {
                await api.post('/products', data, config);
                alert('Đã thêm sản phẩm thành công!');
            } else {
                await api.put(`/products/${id}`, data, config);
                alert('Đã cập nhật sản phẩm thành công!');
            }
            navigate('/admin/products');
        } catch (error) {
            console.error("Lỗi khi lưu sản phẩm:", error.response?.data || error.message);
            alert(`Lưu thất bại. ${error.response?.data?.message || 'Vui lòng kiểm tra console.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- 5. JSX Render ---
    if (loading) {
        return <div className={styles.loading}>Đang tải form...</div>;
    }

    const selectedCategory = categoryOptions.find(opt => opt.value === formData.category);
    const selectedBrand = brandOptions.find(opt => opt.value === formData.brand);

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
                                    type="text" id="name" name="name" 
                                    value={formData.name} onChange={handleInputChange} 
                                    className={styles.formInput} required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="description">Mô tả *</label>
                                <textarea
                                    id="description" name="description" rows="6" 
                                    value={formData.description} onChange={handleInputChange} 
                                    className={styles.formTextarea} required
                                ></textarea>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                <label htmlFor="basePrice">Giá gốc (VND) *</label>
                                <input
                                    type="number" id="basePrice" name="basePrice"
                                    value={formData.basePrice} onChange={handleInputChange}
                                    className={styles.formInput} required
                                />
                                </div>
                                <div className={styles.formGroup}>
                                <label htmlFor="material">Chất liệu</label>
                                <input
                                    type="text" id="material" name="material"
                                    value={formData.material} onChange={handleInputChange}
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
                                
                                {/* SELECT CHO DANH MỤC */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Danh mục *</label>
                                    <Select
                                        id="category" name="category" options={categoryOptions}
                                        value={selectedCategory} onChange={handleCategoryChange}
                                        placeholder="-- Chọn hoặc tìm danh mục --"
                                        isClearable classNamePrefix="react-select"
                                    />
                                </div>
                                
                                {/* SELECT CHO THƯƠNG HIỆU */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="brand">Thương hiệu</label>
                                    <Select
                                        id="brand" name="brand" options={brandOptions}
                                        value={selectedBrand} onChange={handleBrandChange}
                                        placeholder="-- Chọn hoặc tìm thương hiệu --"
                                        isClearable classNamePrefix="react-select"
                                    />
                                </div>
                                
                                {/* SELECT CHO GIỚI TÍNH */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="gender">Giới tính *</label>
                                    <select
                                        id="gender" name="gender"
                                        value={formData.gender} onChange={handleInputChange}
                                        className={styles.formSelect} required
                                    >
                                        <option value="Unisex">Unisex</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Card Hình ảnh */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3><Image size={20} /> Ảnh đại diện</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.imageUploadContainer}>
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

                                    <input 
                                        type="file" id="featuredImage" name="featuredImage" 
                                        accept="image/png, image/jpeg, image/gif, image/webp"
                                        onChange={handleImageChange}
                                        className={styles.fileInputHidden}
                                    />
                                    
                                    <label htmlFor="featuredImage" className={`${styles.button} ${styles.buttonSecondary}`} style={{ marginRight: '0.5rem' }}>
                                        Chọn ảnh
                                    </label>

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
                                <p className={styles.note} style={{marginTop: '1rem'}}>
                                    <strong>Ghi chú:</strong> Ảnh chi tiết cho từng màu sắc, kích cỡ sẽ được quản lý trong trang **Quản lý Biến thể**.
                                </p>
                            </div>
                        </div>

                        {/* Card Trạng thái */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3>Trạng thái</h3>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.formToggle}>
                                    <label htmlFor="isActive">Hiển thị sản phẩm</label>
                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox" id="isActive" name="isActive"
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
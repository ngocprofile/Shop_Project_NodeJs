import { ArrowLeft, Save, Trash, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import styles from './AdminProduct.module.css';
// ngoc
// URL Gốc của server (để hiển thị ảnh cũ)
const serverRootUrl = 'http://localhost:5000'; 

// State khởi tạo - CHỈ CHỨA THUỘC TÍNH COLOR VARIANT
const initialState = {
    product: '', 
    color: '',
    colorCode: '#000000',
};

const VariantForm = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [products, setProducts] = useState([]);

    // Quản lý file
    const [imageFile, setImageFile] = useState(null); 
    const [imagePreview, setImagePreview] = useState(null); 
    const [existingImageUrl, setExistingImageUrl] = useState(''); 

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // --- 1. Tải dữ liệu ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            let productList = [];
            
            try {
                // 1. Lấy danh sách sản phẩm cha (cho dropdown)
                const productRes = await api.get('/products');
                productList = productRes.data;
                setProducts(productList);

                if (isEditMode) {
                    // 2. Lấy chi tiết ColorVariant (Gây lỗi 500)
                    const variantRes = await api.get(`/products/variants/${id}`); 
                    const v = variantRes.data;
                    
                    let productId = '';
                    if (v.product) {
                        // FIX: Kiểm tra nếu đã populate (object) hoặc chỉ là chuỗi ID
                        productId = v.product._id || v.product; 
                    } 

                    if (!productId) {
                        throw new Error("Product cha bị thiếu hoặc bị xóa khỏi cơ sở dữ liệu.");
                    }
                    
                    setFormData({
                        product: productId, 
                        color: v.color, 
                        colorCode: v.colorCode || '#000000', 
                    });
                    
                    if (v.image && v.image.url) {
                        const imageUrl = v.image.url.startsWith('http') ? v.image.url : serverRootUrl + v.image.url;
                        setExistingImageUrl(imageUrl);
                    }
                }
            } catch (err) {
                console.error(`Lỗi tải dữ liệu (${isEditMode ? 'EDIT' : 'NEW'}):`, err);
                // Hiển thị thông báo rõ ràng nếu là lỗi 500
                const errorMsg = err.response?.status === 500 
                                 ? "LỖI HỆ THỐNG: Không thể tải chi tiết biến thể. (Lỗi 500 Backend - Kiểm tra Joi Schema)"
                                 : err.response?.data?.message || err.message || 'Lỗi không xác định.';
                setError(errorMsg);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, isEditMode]);

    // --- 2. HÀM XỬ LÝ INPUTS VÀ FILES ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setExistingImageUrl(''); 
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl('');
    };

    // Xử lý input color picker (đảm bảo luôn là uppercase)
    const handleColorCodeChange = (e) => {
        const value = e.target.value.toUpperCase();
        setFormData(prev => ({ ...prev, colorCode: value }));
    };
    
    // --- 3. HÀM SUBMIT ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting || !formData.product) {
            setError('Vui lòng chọn sản phẩm cha.');
            return;
        }
        setIsSubmitting(true);
        setError('');

        try {
            if (isEditMode) {
                // EDIT MODE (PUT)
                const data = new FormData();
                data.append('color', formData.color.toUpperCase().trim());
                data.append('colorCode', formData.colorCode.toUpperCase().trim());
                
                if (imageFile) {
                    data.append('image', imageFile); 
                } else if (!existingImageUrl) {
                    data.append('image', 'null'); 
                }

                const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                await api.put(`/products/variants/${id}`, data, config); 
                alert('Cập nhật biến thể màu thành công!');

            } else {
                // NEW MODE (POST - Gửi JSON)
                if (imageFile) {
                    setError("Vui lòng thêm biến thể màu trước (không kèm ảnh), sau đó chỉnh sửa để thêm ảnh.");
                    setIsSubmitting(false);
                    return;
                }
                
                // 1. Tạo Payload JSON (Cần 1 size mặc định để pass validation)
                const payload = {
                    variants: [{
                        color: formData.color.toUpperCase().trim(),
                        colorCode: formData.colorCode.toUpperCase().trim(),
                        sizes: [{ size: 'OS', price: 0, stock: 0 }] 
                    }]
                };

                // 2. Gọi API POST với JSON
                const config = { headers: { 'Content-Type': 'application/json' } };
                await api.post(`/products/${formData.product}/variants`, payload, config);
                
                alert('Đã thêm Biến thể màu thành công! Vui lòng thêm Kích cỡ & Tồn kho chi tiết.');
            }
            
            navigate('/admin/variants'); 
            
        } catch (err) {
            console.error("Lỗi khi gửi form:", err.response?.data || err.message);
            setError(err.response?.data?.message || 'Thao tác thất bại. Kiểm tra trùng lặp Màu sắc.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;

    // --- 4. JSX Render ---
    return (
        <div className={styles.productPage}>
            <div className={styles.pageHeader}>
                <h1>{isEditMode ? 'Sửa Biến thể Màu' : 'Thêm Biến thể Màu mới'}</h1>
                <button
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={() => navigate('/admin/variants')}
                >
                    <ArrowLeft size={18} />
                    Quay lại danh sách
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className={styles.cardBody}>
                        {error && (
                        <div className={`${styles.badge} ${styles.badgeDanger}`} style={{ marginBottom: '1rem', width: '100%', borderRadius: '4px' }}>
                            {error}
                        </div>
                        )}
                        
                        {/* TRƯỜNG SẢN PHẨM CHA (Select) */}
                        <div className={styles.formGroup}>
                        <label htmlFor="product">Sản phẩm cha *</label>
                        <select
                            id="product" name="product" className={styles.formSelect}
                            value={formData.product} onChange={handleInputChange} required
                            disabled={isEditMode}
                        >
                            <option value="">-- Chọn một sản phẩm --</option>
                            {products.map(p => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </select>
                        {isEditMode && <small>Không thể thay đổi sản phẩm cha sau khi tạo.</small>}
                        </div>

                        <hr className={styles.divider} />

                        {/* TRƯỜNG COLOR VÀ COLOR CODE */}
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="color">Tên màu sắc *</label>
                                <input type="text" id="color" name="color" className={styles.formInput} value={formData.color} onChange={handleInputChange} required />
                            </div>
                            
                            {/* 🌟 INPUT MÃ MÀU (HEX CODE) 🌟 */}
                            <div className={styles.formGroup} style={{ maxWidth: '150px' }}>
                                <label htmlFor="colorCode">Mã màu *</label>
                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                    <input
                                        type="color" 
                                        id="colorCodePicker"
                                        value={formData.colorCode} 
                                        onChange={handleColorCodeChange} 
                                        style={{ width: '30px', height: '30px', padding: '0', border: '1px solid #ccc', cursor: 'pointer' }}
                                    />
                                    <input 
                                        type="text" 
                                        id="colorCode" 
                                        name="colorCode"
                                        placeholder="#RRGGBB"
                                        value={formData.colorCode} 
                                        onChange={handleColorCodeChange} 
                                        className={styles.formInput} 
                                        required
                                        maxLength={7}
                                    />
                                </div>
                                <small style={{ color: '#666' }}>Ví dụ: #FF0000</small>
                            </div>
                        </div>

                        {/* ❌ GHI CHÚ: Loại bỏ trường Size/Stock cũ */}
                        <p style={{ marginTop: '20px', color: '#999', fontStyle: 'italic' }}>
                            *Giá, Tồn kho và Kích cỡ hiện được quản lý riêng trong trang quản lý Kích cỡ.*
                        </p>
                    </div>
                    
                    {/* --- QUẢN LÝ ẢNH ĐƠN (Single File Upload) --- */}
                    <div className={styles.cardHeader} style={{borderTop: '1px solid #e2e8f0'}}>
                        <h3>Hình ảnh Biến thể Màu</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.imageUploadContainer}>
                            
                            {/* Vùng xem trước ảnh (Mới hoặc Cũ) */}
                            <div className={styles.imagePreview} style={{marginBottom: '10px'}}>
                                {imagePreview ? <img src={imagePreview} alt="Preview" /> : 
                                existingImageUrl ? <img src={existingImageUrl} alt="Existing" /> : 
                                <div className={styles.imagePlaceholder}>
                                    <UploadCloud size={24}/>
                                    <p>Chọn ảnh</p>
                                </div>}
                            </div>

                            {/* Input File (Tên field: image) */}
                            <input type="file" id="variantImage" name="image" accept="image/*" className={styles.fileInputHidden} onChange={handleFileChange} />
                            
                            <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                <label htmlFor="variantImage" className={`${styles.button} ${styles.buttonSecondary}`}>Chọn ảnh</label>
                                {(imagePreview || existingImageUrl) && (
                                    <button type="button" className={`${styles.button} ${styles.buttonDangerOutline}`} onClick={handleRemoveImage}>
                                        <Trash size={16}/> Xóa ảnh
                                    </button>
                                )}
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
                        <Save size={18} /> {isSubmitting ? 'Đang lưu...' : (isEditMode ? 'Lưu Cập nhật' : 'Thêm Biến thể')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VariantForm;
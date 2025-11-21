import { ArrowLeft, Package, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import styles from './AdminProduct.module.css';

const initialState = {
    variantId: '', // ID của ColorVariant cha
    size: '',
    price: 0,
    stock: 0,
};

const SizeForm = () => {
    // id: ID của SizeInventory (khi Edit)
    // variantId: ID của ColorVariant (khi New). Nếu là 'select' thì phải chọn từ list.
    const { id, variantId } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [colorVariant, setColorVariant] = useState(null); // Dữ liệu ColorVariant cha (để hiển thị)
    const [variantsList, setVariantsList] = useState([]); // Danh sách chọn (cho mode 'select')
    
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // --- 1. Tải dữ liệu ---
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError('');
            try {
                // A. Chế độ SỬA (Edit Size)
                if (isEditMode) {
                    // Lấy chi tiết SizeInventory
                    const sizeRes = await api.get(`/products/sizes/${id}`);
                    const s = sizeRes.data;
                    
                    // Lấy thông tin ColorVariant cha
                    const variantRes = await api.get(`/products/variants/${s.variant}`);
                    
                    setFormData({
                        variantId: s.variant,
                        size: s.size,
                        price: s.price,
                        stock: s.stock,
                    });
                    setColorVariant(variantRes.data);
                } 
                // B. Chế độ THÊM MỚI (New Size)
                else {
                    if (variantId && variantId !== 'select') {
                        // Trường hợp 1: Đã biết ID cha từ URL (Click "Thêm Size" ở dòng biến thể)
                        const variantRes = await api.get(`/products/variants/${variantId}`);
                        setFormData(prev => ({ ...prev, variantId: variantId }));
                        setColorVariant(variantRes.data);
                    } else {
                        // Trường hợp 2: Chưa biết ID cha (Click "Thêm Kích cỡ" ở Header) -> Tải list để chọn
                        const listRes = await api.get('/products/variants'); 
                        // Map dữ liệu để hiển thị đẹp hơn trong dropdown
                        const formattedList = listRes.data.map(v => ({
                            _id: v._id,
                            name: `${v.product?.name || 'N/A'} - Màu: ${v.color}`
                        }));
                        setVariantsList(formattedList);
                    }
                }
            } catch (err) {
                console.error("Lỗi tải dữ liệu:", err);
                setError(err.response?.data?.message || 'Lỗi khi tải dữ liệu size/variant.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id, variantId, isEditMode]);

    // --- 2. HÀM XỬ LÝ INPUTS ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý khi chọn biến thể từ dropdown (Mode 'select')
    const handleVariantSelect = async (e) => {
        const selectedId = e.target.value;
        setFormData(prev => ({ ...prev, variantId: selectedId }));
        
        if (selectedId) {
            // Tải chi tiết biến thể vừa chọn để hiển thị thông tin preview
            try {
                const res = await api.get(`/products/variants/${selectedId}`);
                setColorVariant(res.data);
            } catch (err) {
                console.error("Không thể tải thông tin biến thể:", err);
            }
        } else {
            setColorVariant(null);
        }
    };
    
    // --- 3. HÀM SUBMIT ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // Validate cơ bản
        if (!formData.variantId) {
            setError("Vui lòng chọn Biến thể Màu cha.");
            setIsSubmitting(false);
            return;
        }

        const payload = {
            size: formData.size.toUpperCase().trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            // Chỉ gửi variant ID khi TẠO mới
            ...(isEditMode ? {} : { variant: formData.variantId }), 
        };

        try {
            if (isEditMode) {
                // PUT /api/products/sizes/:id
                await api.put(`/products/sizes/${id}`, payload); 
                alert('Cập nhật kích cỡ thành công!');
            } else {
                // POST /api/products/sizes
                await api.post('/products/sizes', payload);
                alert('Thêm kích cỡ thành công!');
            }
            navigate('/admin/variants'); 
            
        } catch (err) {
            console.error("Lỗi submit:", err);
            const msg = err.response?.data?.message || 'Thao tác thất bại.';
            // Kiểm tra lỗi trùng lặp
            if (msg.includes('E11000') || msg.includes('exist')) {
                setError(`Kích cỡ "${formData.size}" đã tồn tại cho màu này. Vui lòng chọn sửa hoặc nhập size khác.`);
            } else {
                setError(msg);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;

    // Check xem có đang ở chế độ cần chọn variant không
    const isSelectingVariant = !isEditMode && (!variantId || variantId === 'select');

    // --- 4. JSX Render ---
    return (
        <div className={styles.productPage}>
            <div className={styles.pageHeader}>
                <h1>{isEditMode ? `Sửa Kích cỡ: ${formData.size}` : 'Thêm Kích cỡ & Kho'}</h1>
                <button
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={() => navigate('/admin/variants')}
                >
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.card} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className={styles.cardHeader}>
                        <h3><Package size={20} /> Thông tin Kích cỡ</h3>
                    </div>
                    <div className={styles.cardBody}>
                        {error && (
                        <div className={`${styles.badge} ${styles.badgeDanger}`} style={{ marginBottom: '1rem', width: '100%', borderRadius: '4px' }}>
                            {error}
                        </div>
                        )}
                        
                        {/* 1. CHỌN BIẾN THỂ CHA (Chỉ hiện nếu cần chọn) */}
                        {isSelectingVariant && (
                            <div className={styles.formGroup}>
                                <label htmlFor="variantSelect">Chọn Biến thể Màu *</label>
                                <select 
                                    id="variantSelect"
                                    className={styles.formSelect}
                                    value={formData.variantId}
                                    onChange={handleVariantSelect}
                                    required
                                >
                                    <option value="">-- Chọn biến thể --</option>
                                    {variantsList.map(v => (
                                        <option key={v._id} value={v._id}>
                                            {v.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* 2. HIỂN THỊ THÔNG TIN CHA (Read-only Preview) */}
                        {colorVariant && (
                             <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f8f9fa' }}>
                                <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '4px' }}>Đang thêm cho sản phẩm:</div>
                                <div style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#333' }}>
                                    {colorVariant.product?.name || 'Sản phẩm không xác định'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                                    <span>Màu: <strong>{colorVariant.color}</strong></span>
                                    {colorVariant.colorCode && (
                                        <div 
                                            style={{ width: '16px', height: '16px', backgroundColor: colorVariant.colorCode, borderRadius: '50%', border: '1px solid #ccc' }} 
                                            title={colorVariant.colorCode}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                        
                        <hr className={styles.divider} />

                        {/* 3. FORM NHẬP LIỆU */}
                        <div className={styles.formGroup}>
                            <label htmlFor="size">Kích cỡ (Size) *</label>
                            <input 
                                type="text" id="size" name="size" 
                                className={styles.formInput} 
                                value={formData.size} 
                                onChange={handleInputChange} 
                                placeholder="VD: S, M, 39, 40..."
                                required 
                                disabled={isEditMode} // Không cho sửa size khi edit (Unique Key)
                            />
                            {isEditMode && <small style={{color: '#888'}}>Không thể thay đổi tên kích cỡ sau khi tạo. Hãy tạo mới nếu cần size khác.</small>}
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="price">Giá bán (VND) *</label>
                                <input 
                                    type="number" id="price" name="price" 
                                    className={styles.formInput} 
                                    value={formData.price} 
                                    onChange={handleInputChange} 
                                    required min="0" 
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="stock">Tồn kho (Stock) *</label>
                                <input 
                                    type="number" id="stock" name="stock" 
                                    className={styles.formInput} 
                                    value={formData.stock} 
                                    onChange={handleInputChange} 
                                    required min="0" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nút Submit */}
                <div className={styles.formActions} style={{ justifyContent: 'center', marginTop: '20px' }}>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.buttonPrimary}`}
                        disabled={isSubmitting}
                    >
                        <Save size={18} /> {isSubmitting ? 'Đang lưu...' : 'Lưu Kích cỡ'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SizeForm;
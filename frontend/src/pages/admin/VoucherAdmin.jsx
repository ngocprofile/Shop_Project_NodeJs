import { PackagePlus, Save, Ticket, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select'; // Import react-select
import api from '../../api';
// Dùng chung CSS với các trang admin khác
import styles from './VoucherAdmin.module.css';

// Hàm helper định dạng ngày cho input
const formatDateTimeForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().substring(0, 16); // Format YYYY-MM-DDTHH:mm
};

// Hàm helper định dạng ngày cho bảng
const formatDateTimeForDisplay = (dateStr) => {
    if (!dateStr) return 'N/A';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateStr).toLocaleString('vi-VN', options);
};

const VoucherAdmin = () => {
    // State cho danh sách
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State cho Form
    const [formData, setFormData] = useState({
        code: '',
        title: '',
        description: '',
        discountType: 'percentage',
        discountValue: 0,
        maxDiscountAmount: 0,
        minOrderValue: 0,
        usageLimit: 0,
        perUserLimit: 1,
        startDate: '',
        endDate: '',
        isActive: true,
        applicableProducts: [],
        applicableBrands: [],
        applicableCategories: [],
    });
    
    // State riêng cho logic UI (không gửi đi)
    const [applyScope, setApplyScope] = useState('all'); // 'all' or 'custom'
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State cho dữ liệu các ô react-select
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // --- Tải Dữ Liệu ---
    const fetchData = async () => {
        setLoading(true);
        try {
            // Promise.all để tải tất cả dữ liệu song song
            const [vouchersRes, productsRes, brandsRes, categoriesRes] = await Promise.all([
                api.get('/vouchers'),
                api.get('/products'), 
                api.get('/brands'),
                api.get('/categories/leaf-nodes') 
            ]);
            
            setVouchers(vouchersRes.data);
            setProducts(productsRes.data);
            setBrands(brandsRes.data);
            setCategories(categoriesRes.data);

        } catch (err) {
            setError('Lỗi khi tải dữ liệu.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Định dạng options cho react-select ---
    const productOptions = useMemo(() => products.map(p => ({ value: p._id, label: p.name })), [products]);
    const brandOptions = useMemo(() => brands.map(b => ({ value: b._id, label: b.name })), [brands]);
    const categoryOptions = useMemo(() => categories.map(c => ({ value: c._id, label: c.name })), [categories]);

    // --- Xử lý Form ---

    // Input text, number, checkbox
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // (CẬP NHẬT: Thêm logic 'freeship')
    // Khi đổi "Loại giảm giá" (Radio)
    const handleTypeChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // 1. Nếu là 'freeship', set discountValue = 0 (vì model tự xử lý)
            discountValue: value === 'freeship' ? 0 : prev.discountValue,
            // 2. Reset maxDiscountAmount CHỈ KHI là 'fixed'
            maxDiscountAmount: value === 'fixed' ? 0 : prev.maxDiscountAmount,
        }));
    };
    
    // Khi đổi "Phạm vi" (Radio)
    const handleScopeChange = (e) => {
        setApplyScope(e.target.value);
    };
    
    // Xử lý chung cho 3 ô react-select (isMulti)
    const handleSelectChange = (selectedOptions, fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: selectedOptions ? selectedOptions.map(opt => opt.value) : [],
        }));
    };

    // Khi bấm "Sửa"
    const handleEditClick = (voucher) => {
        setEditingId(voucher._id);
        setError('');
        window.scrollTo(0, 0);

        // Map data từ voucher vào formData
        setFormData({
            code: voucher.code,
            title: voucher.title,
            description: voucher.description || '',
            discountType: voucher.discountType,
            discountValue: voucher.discountValue,
            maxDiscountAmount: voucher.maxDiscountAmount || 0,
            minOrderValue: voucher.minOrderValue || 0,
            usageLimit: voucher.usageLimit || 0,
            perUserLimit: voucher.perUserLimit || 1,
            startDate: formatDateTimeForInput(voucher.startDate),
            endDate: formatDateTimeForInput(voucher.endDate),
            isActive: voucher.isActive,
            applicableProducts: voucher.applicableProducts || [],
            applicableBrands: voucher.applicableBrands || [],
            applicableCategories: voucher.applicableCategories || [],
        });

        // (Logic này vẫn đúng)
        if (
            (voucher.applicableProducts && voucher.applicableProducts.length > 0) ||
            (voucher.applicableBrands && voucher.applicableBrands.length > 0) ||
            (voucher.applicableCategories && voucher.applicableCategories.length > 0)
        ) {
            setApplyScope('custom');
        } else {
            setApplyScope('all');
        }
    };

    // Khi bấm "Hủy"
    const handleCancel = () => {
        setEditingId(null);
        setError('');
        setApplyScope('all');
        setFormData({
            code: '', title: '', description: '',
            discountType: 'percentage', discountValue: 0, maxDiscountAmount: 0,
            minOrderValue: 0, usageLimit: 0, perUserLimit: 1,
            startDate: '', endDate: '', isActive: true,
            applicableProducts: [], applicableBrands: [], applicableCategories: [],
        });
    };

    // (CẬP NHẬT: Thêm logic 'freeship')
    // Khi Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        let dataToSend = { ...formData };

        // Xử lý logic "Phạm vi"
        if (applyScope === 'all') {
            dataToSend.applicableProducts = [];
            dataToSend.applicableBrands = [];
            dataToSend.applicableCategories = [];
        }
        
        // Xử lý logic "Loại giảm giá"
        if (dataToSend.discountType === 'fixed') {
            dataToSend.maxDiscountAmount = 0; // Reset khi là 'fixed'
        }
        // THÊM: Nếu là 'freeship', ép discountValue = 0
        if (dataToSend.discountType === 'freeship') {
            dataToSend.discountValue = 0; 
        }

        try {
            if (editingId) {
                await api.put(`/vouchers/${editingId}`, dataToSend);
                alert('Cập nhật voucher thành công!');
            } else {
                await api.post('/vouchers', dataToSend);
                alert('Tạo voucher thành công!');
            }
            handleCancel();
            fetchData(); // Tải lại danh sách
        } catch (err) {
            setError(err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Khi Xóa
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa voucher này?')) {
            try {
                await api.delete(`/vouchers/${id}`);
                alert('Xóa thành công!');
                fetchData();
            } catch (err) {
                setError('Xóa thất bại.');
                console.error(err);
            }
        }
    };

    // --- Helper tìm value cho react-select ---
    const getSelectValue = (options, ids) => {
        if (!ids) return [];
        return options.filter(opt => ids.includes(opt.value));
    };

    return (
        <div className={styles.productPage}>
            {/* Header */}
            <div className={styles.pageHeader}>
                <h1><Ticket size={28} /> Quản lý Voucher</h1>
                <button
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={handleCancel}
                    disabled={editingId === null}
                >
                    <PackagePlus size={18} /> Thêm voucher mới
                </button>
            </div>

            {/* 1. Form Thêm/Sửa */}
            <form onSubmit={handleSubmit}>
                <div className={styles.card} style={{ marginBottom: '2rem' }}>
                    <div className={styles.cardHeader}>
                        <h3>{editingId ? 'Chỉnh sửa Voucher' : 'Tạo Voucher Mới'}</h3>
                    </div>
                </div>

                {error && (
                    <div className={`${styles.badge} ${styles.badgeDanger}`} style={{ marginBottom: '1rem', width: '100%', borderRadius: '4px' }}>
                        {error}
                    </div>
                )}

                {/* Bố cục 2 cột */}
                <div className={styles.formGrid}>
                    {/* CỘT TRÁI */}
                    <div className={styles.columnLeft}>
                        {/* --- Card 1: Thông tin chung --- */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}><h4>Thông tin cơ bản</h4></div>
                            <div className={styles.cardBody}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="title">Tên voucher (Hiển thị) *</label>
                                    <input
                                        type="text" id="title" name="title"
                                        className={styles.formInput}
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Vd: Mừng 8/3 Giảm 50K"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="code">Mã voucher *</label>
                                    <input
                                        type="text" id="code" name="code"
                                        className={styles.formInput}
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        placeholder="Vd: 8M3SALE (Viết liền, không dấu)"
                                        required
                                        disabled={editingId !== null} // Không cho sửa code
                                    />
                                    {editingId && <p className={styles.note}>Không thể sửa Mã voucher sau khi tạo.</p>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="description">Mô tả</label>
                                    <textarea
                                        id="description" name="description"
                                        className={styles.formTextarea}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Mô tả ngắn gọn điều kiện"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* --- Card 2: Loại giảm giá (CẬP NHẬT) --- */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}><h4>Thiết lập giảm giá</h4></div>
                            <div className={styles.cardBody}>
                                <div className={styles.formGroup}>
                                    <label>Loại giảm giá *</label>
                                    <div className={styles.radioGroup}>
                                        <label className={styles.radioLabel}>
                                            <input
                                                type="radio" name="discountType"
                                                value="percentage"
                                                checked={formData.discountType === 'percentage'}
                                                onChange={handleTypeChange}
                                            /> Giảm theo %
                                        </label>
                                        <label className={styles.radioLabel}>
                                            <input
                                                type="radio" name="discountType"
                                                value="fixed"
                                                checked={formData.discountType === 'fixed'}
                                                onChange={handleTypeChange}
                                            /> Giảm số tiền cố định (VND)
                                        </label>
                                        {/* --- THÊM RADIO FREESHIP --- */}
                                        <label className={styles.radioLabel}>
                                            <input
                                                type="radio" name="discountType"
                                                value="freeship"
                                                checked={formData.discountType === 'freeship'}
                                                onChange={handleTypeChange}
                                            /> Miễn phí vận chuyển
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    {/* --- ẨN KHI LÀ FREESHIP --- */}
                                    {formData.discountType !== 'freeship' && (
                                        <div className={styles.formGroup}>
                                            <label htmlFor="discountValue">
                                                Giá trị giảm * ({formData.discountType === 'percentage' ? '%' : 'VND'})
                                            </label>
                                            <input
                                                type="number" id="discountValue" name="discountValue"
                                                className={styles.formInput}
                                                value={formData.discountValue}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    {/* --- HIỂN THỊ CHO % VÀ FREESHIP --- */}
                                    {(formData.discountType === 'percentage' || formData.discountType === 'freeship') && (
                                        <div className={styles.formGroup}>
                                            <label htmlFor="maxDiscountAmount">
                                                {/* Đổi label cho Freeship */}
                                                {formData.discountType === 'freeship' 
                                                    ? 'Trợ giá tối đa (VND)' 
                                                    : 'Giảm tối đa (VND)'}
                                            </label>
                                            <input
                                                type="number" id="maxDiscountAmount" name="maxDiscountAmount"
                                                className={styles.formInput}
                                                value={formData.maxDiscountAmount}
                                                onChange={handleInputChange}
                                                placeholder="0 = Không giới hạn"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- Card 3: Điều kiện --- */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}><h4>Thời gian & Điều kiện</h4></div>
                            <div className={styles.cardBody}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="minOrderValue">Đơn hàng tối thiểu (VND)</label>
                                    <input
                                        type="number" id="minOrderValue" name="minOrderValue"
                                        className={styles.formInput}
                                        value={formData.minOrderValue}
                                        onChange={handleInputChange}
                                        placeholder="0 = Không yêu cầu"
                                    />
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="startDate">Ngày bắt đầu *</label>
                                        <input
                                            type="datetime-local" id="startDate" name="startDate"
                                            className={styles.formInput}
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="endDate">Ngày kết thúc *</label>
                                        <input
                                            type="datetime-local" id="endDate" name="endDate"
                                            className={styles.formInput}
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI (Giữ nguyên) */}
                    <div className={styles.columnRight}>
                        {/* --- Card 4: Giới hạn --- */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}><h4>Giới hạn sử dụng</h4></div>
                            <div className={styles.cardBody}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="usageLimit">Tổng lượt sử dụng</label>
                                        <input
                                            type="number" id="usageLimit" name="usageLimit"
                                            className={styles.formInput}
                                            value={formData.usageLimit}
                                            onChange={handleInputChange}
                                            placeholder="0 = Không giới hạn"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="perUserLimit">Lượt/Người dùng</label>
                                        <input
                                            type="number" id="perUserLimit" name="perUserLimit"
                                            className={styles.formInput}
                                            value={formData.perUserLimit}
                                            onChange={handleInputChange}
                                            placeholder="Vd: 1"
                                        />
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
                                        <p>{formData.isActive ? "Đang hoạt động" : "Đã tắt"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Card 5: Phạm vi --- */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}><h4>Phạm vi áp dụng</h4></div>
                            <div className={styles.cardBody}>
                                <div className={styles.formGroup}>
                                    <div className={styles.radioGroup}>
                                        <label className={styles.radioLabel}>
                                            <input
                                                type="radio" name="applyScope"
                                                value="all"
                                                checked={applyScope === 'all'}
                                                onChange={handleScopeChange}
                                            /> Toàn bộ cửa hàng
                                        </label>
                                        <label className={styles.radioLabel}>
                                            <input
                                                type="radio" name="applyScope"
                                                value="custom"
                                                checked={applyScope === 'custom'}
                                                onChange={handleScopeChange}
                                            /> Tùy chỉnh
                                        </label>
                                    </div>
                                </div>

                                {applyScope === 'custom' && (
                                    <>
                                        <div className={styles.formGroup}>
                                            <label>Áp dụng cho Danh mục</label>
                                            <Select
                                                isMulti
                                                options={categoryOptions}
                                                classNamePrefix="react-select"
                                                placeholder="Tìm kiếm danh mục..."
                                                value={getSelectValue(categoryOptions, formData.applicableCategories)}
                                                onChange={(options) => handleSelectChange(options, 'applicableCategories')}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Áp dụng cho Thương hiệu</label>
                                            <Select
                                                isMulti
                                                options={brandOptions}
                                                classNamePrefix="react-select"
                                                placeholder="Tìm kiếm thương hiệu..."
                                                value={getSelectValue(brandOptions, formData.applicableBrands)}
                                                onChange={(options) => handleSelectChange(options, 'applicableBrands')}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Áp dụng cho Sản phẩm</label>
                                            <Select
                                                isMulti
                                                options={productOptions}
                                                classNamePrefix="react-select"
                                                placeholder="Tìm kiếm sản phẩm..."
                                                value={getSelectValue(productOptions, formData.applicableProducts)}
                                                onChange={(options) => handleSelectChange(options, 'applicableProducts')}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nút Submit */}
                <div className={styles.formActions}>
                    {editingId && (
                        <button
                            type="button"
                            className={`${styles.button} ${styles.buttonSecondary}`}
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            <X size={18} /> Hủy
                        </button>
                    )}
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.buttonPrimary}`}
                        disabled={isSubmitting}
                    >
                        <Save size={18} />
                        {isSubmitting ? 'Đang lưu...' : (editingId ? 'Lưu thay đổi' : 'Tạo Voucher')}
                    </button>
                </div>
            </form>

            {/* 2. Bảng Liệt kê (CẬP NHẬT) */}
            <div className={styles.card} style={{ marginTop: '2rem' }}>
                <div className={styles.cardHeader}>
                    <h3>Danh sách Voucher ({vouchers.length})</h3>
                </div>
                <div className={styles.cardBody}>
                    <table className={styles.productTable}>
                        <thead>
                            <tr>
                                <th>Mã Voucher</th>
                                <th>Tên</th>
                                <th>Giảm giá</th>
                                <th>Đã dùng</th>
                                <th>Thời hạn</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center' }}>Đang tải...</td></tr>
                            ) : vouchers.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center' }}>Chưa có voucher nào.</td></tr>
                            ) : (
                                vouchers.map((v) => (
                                    <tr key={v._id}>
                                        <td>
                                            <strong style={{fontFamily: 'monospace'}}>{v.code}</strong>
                                        </td>
                                        <td>{v.title}</td>
                                        <td>
                                            {/* --- CẬP NHẬT HIỂN THỊ CHO FREESHIP --- */}
                                            {v.discountType === 'percentage'
                                                ? `${v.discountValue}%`
                                                : v.discountType === 'fixed'
                                                    ? `${v.discountValue.toLocaleString()} VND`
                                                    : (v.maxDiscountAmount > 0 
                                                        ? `Freeship (Max ${v.maxDiscountAmount.toLocaleString()}đ)` 
                                                        : 'Freeship 100%')
                                            }
                                        </td>
                                        <td>
                                            {v.usedCount} / {v.usageLimit === 0 ? '∞' : v.usageLimit}
                                        </td>
                                        <td>{formatDateTimeForDisplay(v.startDate)} - {formatDateTimeForDisplay(v.endDate)}</td>
                                        <td>
                                            <span
                                                className={`${styles.badge} ${
                                                    v.isActive ? styles.badgeSuccess : styles.badgeWarning
                                                }`}
                                            >
                                                {v.isActive ? 'Hoạt động' : 'Đã tắt'}
                                            </span>
                                        </td>
                                        <td className={styles.actionCell}>
                                            <button
                                                className={`${styles.actionButton} ${styles.editButton}`}
                                                onClick={() => handleEditClick(v)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                                onClick={() => handleDelete(v._id)}
                                            >
                                                Xóa
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

export default VoucherAdmin;
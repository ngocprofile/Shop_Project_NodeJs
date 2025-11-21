import { Edit, Edit3, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import styles from './AdminProduct.module.css';

// URL Gốc của server
const SERVER_ROOT_URL = 'http://localhost:5000'; 

// Helper Function: Xử lý đường dẫn ảnh 
const getAbsoluteUrl = (relativePath) => {
    if (!relativePath) return 'https://via.placeholder.com/40?text=No+Img';
    if (relativePath.startsWith('http')) return relativePath;
    return SERVER_ROOT_URL + relativePath; 
};

// Helper Component: Hiển thị ô màu dựa trên ColorCode
const ColorSwatch = ({ code }) => {
    const color = code && code.startsWith('#') ? code : '#ccc'; 
    
    return (
        <div 
            style={{ 
                width: '24px', height: '24px', backgroundColor: color, borderRadius: '50%',
                border: '1px solid #ddd', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            title={`Mã: ${code || 'N/A'}`}
        ></div>
    );
};

const VariantAdmin = () => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 1. Tải dữ liệu (ColorVariant + Sizes Populated)
    const fetchVariants = async () => {
        setLoading(true);
        try {
            // ✅ ROUTE: GET /api/products/variants (Backend trả về deep populated sizes)
            const res = await api.get('/products/variants'); 
            setVariants(res.data);
        } catch (err) {
            setError('Lỗi khi tải dữ liệu. Vui lòng kiểm tra console.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVariants();
    }, []);

    // 2. Xử lý Xóa Biến thể Màu (Xóa cả Size Inventory)
    const handleDeleteColorVariant = async (id) => {
        if (window.confirm('CẢNH BÁO: Xóa biến thể này sẽ xóa tất cả các SIZE và TỒN KHO bên trong. Bạn có chắc chắn?')) {
            try {
                // ✅ ROUTE: DELETE /api/products/variants/:id
                await api.delete(`/products/variants/${id}`); 
                fetchVariants(); 
                alert('Đã xóa biến thể màu.');
            } catch (err) {
                setError('Lỗi khi xóa biến thể. Vui lòng thử lại.');
                console.error(err);
            }
        }
    };
    
    // 3. Xử lý Xóa Size Inventory (Xóa Kích cỡ lẻ)
    const handleDeleteSize = async (sizeId) => {
        if (window.confirm('Bạn muốn xóa kích cỡ này?')) {
            try {
                // ✅ ROUTE: DELETE /api/products/sizes/:id
                await api.delete(`/products/sizes/${sizeId}`);
                fetchVariants(); 
                alert('Đã xóa kích cỡ thành công!');
            } catch (err) {
                setError('Lỗi khi xóa kích cỡ.');
                console.error(err);
            }
        }
    }

    // 4. Tính toán tổng tồn kho
    const getTotalStock = (sizes) => sizes?.reduce((acc, s) => acc + (s.stock || 0), 0) || 0;

    return (
        <div className={styles.productPage}>
            
            {/* --- HEADER: CÁC NÚT THÊM MỚI --- */}
            <div className={styles.pageHeader}>
                <h1>Quản lý Biến thể Màu ({variants.length})</h1>
                <div className={styles.headerActions}>
                    {/* Nút Thêm Size (Link tới Form chọn SP) */}
                    <button 
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        onClick={() => navigate('/admin/sizes/new/select')} 
                        title="Thêm Kích cỡ/Tồn kho cho một Biến thể Màu đã có"
                    >
                        <Plus size={18} /> Thêm Kích cỡ / Tồn kho
                    </button>

                    {/* Nút Thêm Màu */}
                    <button
                        className={`${styles.button} ${styles.buttonPrimary}`}
                        onClick={() => navigate('/admin/variants/new')} 
                    >
                        <Plus size={18} /> Thêm Biến thể Màu
                    </button>
                </div>
            </div>
            
            {error && <div className={`${styles.badge} ${styles.badgeDanger}`}>{error}</div>}

            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <table className={styles.productTable}>
                        <thead>
                            <tr>
                                <th style={{width: '80px'}}>Ảnh</th>
                                <th style={{width: '20%'}}>Sản phẩm</th>
                                <th style={{width: '15%'}}>Màu sắc</th> 
                                <th style={{width: '10%'}}>Tổng Tồn</th>
                                <th>Danh sách Kích cỡ (Size - Giá - Kho)</th>
                                <th style={{width: '120px', textAlign: 'center'}}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="text-center">Đang tải dữ liệu...</td></tr>
                            ) : variants.length === 0 ? (
                                <tr><td colSpan="6" className="text-center">Chưa có dữ liệu.</td></tr>
                            ) : (
                                variants.map((v) => (
                                    <tr key={v._id}>
                                        {/* 1. Ảnh */}
                                        <td>
                                            <img 
                                                src={getAbsoluteUrl(v.image?.url)} 
                                                alt="img" 
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} 
                                            />
                                        </td>
                                        
                                        {/* 2. Tên SP */}
                                        <td>
                                            <strong>{v.product?.name || '---'}</strong>
                                            <div style={{fontSize: '0.85em', color: '#666'}}>ID: {v.product?._id?.slice(-6)}</div>
                                        </td>

                                        {/* 3. Màu */}
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <ColorSwatch code={v.colorCode} />
                                                <div>
                                                    <div style={{fontWeight: '600'}}>{v.color}</div>
                                                    <div style={{fontSize: '0.8em', color: '#888'}}>{v.colorCode}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 4. Tổng Tồn kho */}
                                        <td>
                                            <span className={getTotalStock(v.sizes) > 0 ? styles.statusActive : styles.statusInactive}>
                                                {getTotalStock(v.sizes)} sản phẩm
                                            </span>
                                        </td>

                                        {/* 5. Chi tiết Size (Nested List) */}
                                        <td>
                                            <div className={styles.sizeGrid}>
                                                {v.sizes && v.sizes.length > 0 ? (
                                                    v.sizes.map((s) => (
                                                        <div key={s._id} className={styles.sizeTag}>
                                                            <span className={styles.sizeLabel}>{s.size}</span>
                                                            <span className={styles.sizeInfo}>
                                                                Kho: <b>{s.stock}</b> | 
                                                                <span style={{color: '#d32f2f'}}> {Number(s.price).toLocaleString()}₫</span>
                                                            </span>
                                                            
                                                            <div className={styles.sizeActions}>
                                                                <button 
                                                                    title="Sửa Size"
                                                                    onClick={() => navigate(`/admin/sizes/edit/${s._id}`)}
                                                                    className={styles.iconButton}
                                                                >
                                                                    <Edit3 size={14}/>
                                                                </button>
                                                                <button 
                                                                    title="Xóa Size"
                                                                    onClick={() => handleDeleteSize(s._id)}
                                                                    className={`${styles.iconButton} ${styles.iconDanger}`}
                                                                >
                                                                    <Trash2 size={14}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span style={{color: '#999', fontStyle: 'italic'}}>Chưa có kích cỡ nào.</span>
                                                )}
                                                {/* Nút thêm nhanh size cho dòng này */}
                                                <button 
                                                    className={styles.addSizeLink}
                                                    onClick={() => navigate(`/admin/sizes/new/${v._id}`)}
                                                >
                                                    + Thêm Size
                                                </button>
                                            </div>
                                        </td>

                                        {/* 6. Hành động (Cột Color Variant Actions) */}
                                        <td className={styles.actionCell}>
                                            <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'}}>
                                                <button
                                                    className={`${styles.button} ${styles.buttonSecondary}`}
                                                    onClick={() => navigate(`/admin/variants/edit/${v._id}`)}
                                                    title="Sửa thông tin Màu/Ảnh"
                                                >
                                                    <Edit size={16} /> Sửa Màu
                                                </button>
                                                <button
                                                    className={`${styles.button} ${styles.buttonDanger}`}
                                                    onClick={() => handleDeleteColorVariant(v._id)}
                                                    title="Xóa Biến thể Màu (Bao gồm tất cả Sizes)"
                                                >
                                                    <Trash2 size={16} /> Xóa Màu
                                                </button>
                                            </div>
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

export default VariantAdmin;
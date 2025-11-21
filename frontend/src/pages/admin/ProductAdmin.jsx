import { Copy, Edit3, LayoutList, Plus, Tag, Trash2 } from 'lucide-react'; // <-- 1. THÊM ICON MỚI
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import styles from './AdminProduct.module.css';

const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook để điều hướng

    // (Hàm fetchProducts giữ nguyên)
    const fetchProducts = async () => {
        setLoading(true);
        try {
        const response = await api.get('/products/');
        setProducts(response.data);
        } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
        } finally {
        setLoading(false);
        }
    };

    // (useEffect giữ nguyên)
    useEffect(() => {
        fetchProducts();
    }, []);

    // (Hàm handleDeleteProduct giữ nguyên)
    const handleDeleteProduct = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        try {
            await api.delete(`/products/${id}`);
            alert('Đã xóa sản phẩm thành công!');
            fetchProducts(); 
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert('Xóa thất bại. Vui lòng thử lại.');
        }
        }
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải...</div>;
    }

    return (
        <div className={styles.productPage}>
            
            {/* === 2. CẬP NHẬT HEADER VỚI NHIỀU NÚT === */}
            <div className={styles.pageHeader}>
                <h1>Quản lý Sản phẩm ({products.length})</h1>
                
                {/* Chúng ta dùng .filtersContainer (từ file CSS) 
                  để nhóm các nút lại cho đẹp 
                */}
                <div className={styles.filtersContainer}> 
                    <button
                        className={`${styles.button} ${styles.buttonPrimary}`}
                        onClick={() => navigate('/admin/products/new')} 
                    >
                        <Plus size={18} />
                        Thêm Sản phẩm
                    </button>

                    <button
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        onClick={() => navigate('/admin/categories')} // Tới trang quản lý Danh mục
                    >
                        <LayoutList size={18} />
                        Quản lý Danh mục
                    </button>

                    <button
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        onClick={() => navigate('/admin/brands')} // Tới trang quản lý Thương hiệu
                    >
                        <Tag size={18} />
                        Quản lý Thương hiệu
                    </button>

                    <button
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        onClick={() => navigate('/admin/variants')} // Tới trang quản lý Biến thể
                    >
                        <Copy size={18} />
                        Quản lý Biến thể
                    </button>
                </div>
            </div>

            {/* Card chứa bảng (Giữ nguyên) */}
            <div className={styles.card}>
                <div className={styles.cardBody}>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Tên Sản phẩm</th>
                            <th>Danh mục</th>
                            <th>Giá gốc</th>
                            <th>Giới tính</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.length === 0 ? (
                        <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>Chưa có sản phẩm nào.</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>
                            {product.category ? product.category.name : 'N/A'}
                            </td>
                            <td>
                            {product.basePrice.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                            </td>
                            <td>{product.gender}</td>
                            <td>
                            <span
                                className={`${styles.badge} ${
                                product.isActive
                                    ? styles.badgeSuccess
                                    : styles.badgeWarning
                                }`}
                            >
                                {product.isActive ? 'Đang hiển thị' : 'Đã ẩn'}
                            </span>
                            </td>
                            <td className={styles.actionCell}>
                            <button
                                className={`${styles.actionButton} ${styles.editButton}`}
                                onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                            >
                                <Edit3 size={16} />
                            </button>
                            <button
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                onClick={() => handleDeleteProduct(product._id)}
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

export default ProductAdmin;
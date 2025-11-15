import { Edit3, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../api'; // Import file api.js
import styles from './AdminProduct.module.css'; // Đổi tên file CSS cho thống nhất

const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook để điều hướng

    // Hàm gọi API để lấy danh sách sản phẩm
    const fetchProducts = async () => {
        setLoading(true);
        try {
        // Backend của bạn CẦN populate 'category' để lấy được 'category.name'
        const response = await api.get('/products/');
        setProducts(response.data);
        } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
        } finally {
        setLoading(false);
        }
    };

    // Gọi API khi component được tải
    useEffect(() => {
        fetchProducts();
    }, []);

    // Xử lý Xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        try {
            await api.delete(`/products/${id}`);
            alert('Đã xóa sản phẩm thành công!');
            fetchProducts(); // Tải lại danh sách sau khi xóa
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
        {/* Header của trang */}
        <div className={styles.pageHeader}>
            <h1>Quản lý Sản phẩm ({products.length})</h1>
            <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={() => navigate('/admin/products/new')} // Chuyển đến trang Form
            >
            <Plus size={18} />
            Thêm Sản phẩm
            </button>
        </div>

        {/* Card chứa bảng */}
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
                        {/* Backend cần .populate('category') */}
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
                                : styles.badgeWarning // Đổi sang warning
                            }`}
                        >
                            {product.isActive ? 'Đang hiển thị' : 'Đã ẩn'}
                        </span>
                        </td>
                        <td className={styles.actionCell}>
                        <button
                            className={`${styles.actionButton} ${styles.editButton}`}
                            onClick={() => navigate(`/admin/products/edit/${product._id}`)} // Chuyển đến trang Sửa
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
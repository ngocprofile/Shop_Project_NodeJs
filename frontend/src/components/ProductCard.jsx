import { Eye, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

// ⚠️ QUAN TRỌNG: Thay đổi địa chỉ này thành port Backend Node.js của bạn
const BACKEND_URL = 'http://localhost:5000'; 

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // 1. Kiểm tra dữ liệu đầu vào
    if (!product) return null;

    // 2. Logic Giá và Giảm giá
    const hasDiscount = product.basePrice > product.finalPrice;
    const discountPercent = hasDiscount 
        ? Math.round(((product.basePrice - product.finalPrice) / product.basePrice) * 100) 
        : 0;

    // 3. Format tiền tệ VND
    const formatCurrency = (price) => {
        // Đảm bảo giá trị là số và không null
        const numericPrice = Number(price) || 0;
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numericPrice);
    };

    // 4. Logic Xây dựng URL Ảnh
    const getImageUrl = (path) => {
        // if (!path) return "https://via.placeholder.com/300x300?text=No+Image";
        // Nếu đường dẫn là tuyệt đối (VD: từ Cloudinary), giữ nguyên
        if (path.startsWith('http')) return path; 
        // Nối URL gốc + đường dẫn tương đối (Ví dụ: http://localhost:5000/uploads/image.png)
        return BACKEND_URL + path; 
    };

    // 5. Điều hướng tới trang chi tiết
    const handleViewDetails = () => {
        const linkIdentifier = product.slug || product._id;
        navigate(`/product/${linkIdentifier}`);
    };

    return (
        <div className={styles.card} onClick={handleViewDetails}>
        {/* --- ẢNH SẢN PHẨM --- */}
        <div className={styles.imageWrapper}>
            {/* Badge giảm giá */}
            {hasDiscount && discountPercent > 0 && (
            <span className={styles.badge}>-{discountPercent}%</span>
            )}
            
            <img 
            // ✅ Dùng hàm xử lý URL mới
            src={getImageUrl(product.featuredImage)} 
            alt={product.name} 
            className={styles.image}
            onError={(e) => { 
                // Fallback nếu ảnh bị lỗi
                e.target.src = "https://via.placeholder.com/300x300?text=Error"; 
            }}
            />

            {/* Overlay Button (Hiện khi hover) */}
            <div className={styles.overlay}>
            <button 
                className={styles.actionBtn} 
                onClick={(e) => {
                e.stopPropagation(); // Ngăn click xuyên qua card
                handleViewDetails();
                }}
            >
                <Eye size={18} /> Xem chi tiết
            </button>
            </div>
        </div>

        {/* --- THÔNG TIN --- */}
        <div className={styles.content}>
            {/* Thương hiệu */}
            <div className={styles.brand}>
                {product.brand?.name || "No Brand"}
            </div>

            {/* Tên sản phẩm */}
            <h3 className={styles.title} title={product.name}>
                {product.name}
            </h3>

            {/* Đánh giá Sao & Lượt xem */}
            <div className={styles.ratingRow}>
            <div className={styles.stars}>
                {[...Array(5)].map((_, index) => {
                    // Logic tô màu sao (dùng Math.round để xử lý 4.5, 4.2...)
                    const isActive = index < Math.round(product.averageRating || 0);
                    return (
                    <Star 
                        key={index} 
                        size={14} 
                        fill={isActive ? "#FFD700" : "none"} 
                        color={isActive ? "#FFD700" : "#D1D5DB"}
                    />
                    );
                })}
            </div>
            <span className={styles.reviewCount}>
                ({product.reviewCount || 0} đánh giá)
            </span>
            </div>

            {/* Giá cả */}
            <div className={styles.priceSection}>
            <span className={styles.finalPrice}>
                {formatCurrency(product.finalPrice || 0)}
            </span>
            {hasDiscount && (
                <span className={styles.basePrice}>
                    {formatCurrency(product.basePrice)}
                </span>
            )}
            </div>

            {/* Số lượng đã bán */}
            {product.sold > 0 && (
            <div className={styles.soldCount}>Đã bán {product.sold}</div>
            )}
        </div>
        </div>
    );
};

export default ProductCard;
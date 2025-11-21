import { AlertCircle, Check, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Import axios instance đã cấu hình
import { useCart } from '../context/CartContext'; // Import Context để cập nhật Header
import styles from './ProductViewDetail.module.css'; // Import CSS Modules

// Cấu hình URL ảnh (Nên đưa vào biến môi trường trong thực tế)
const BACKEND_URL = 'http://localhost:5000';

// Helper: Xử lý đường dẫn ảnh
const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/600x600?text=No+Image";
    if (path.startsWith('http')) return path;
    return `${BACKEND_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Helper: Định dạng tiền tệ
const formatCurrency = (val) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(val) || 0);

const ProductViewDetail = () => {
    const { identifier } = useParams(); 
    
    // --- CONTEXT ---
    // Lấy hàm cập nhật số lượng giỏ hàng ngay lập tức
    const { updateCountImmediately } = useCart();

    // --- STATE ---
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State lựa chọn
    const [selectedColorVariantId, setSelectedColorVariantId] = useState(null);
    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    
    // State hiển thị ảnh (đổi khi chọn màu)
    const [currentDisplayImage, setCurrentDisplayImage] = useState('');

    // --- 1. TẢI DỮ LIỆU ---
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Gọi API lấy chi tiết sản phẩm
                const res = await api.get(`/products/${identifier}`);
                const productData = res.data;
                
                if (!productData) throw new Error("Không tìm thấy dữ liệu sản phẩm.");

                setProduct(productData);
                
                // Khởi tạo ảnh mặc định
                setCurrentDisplayImage(getImageUrl(productData.featuredImage));

                // Logic: Tự động chọn biến thể đầu tiên (nếu có)
                if (productData.variants && productData.variants.length > 0) {
                    const firstVariant = productData.variants[0];
                    setSelectedColorVariantId(firstVariant._id);

                    // Nếu biến thể có ảnh riêng, hiển thị nó
                    if (firstVariant.image?.url) {
                        setCurrentDisplayImage(getImageUrl(firstVariant.image.url));
                    }

                    // Chọn size đầu tiên của biến thể này
                    if (firstVariant.sizes && firstVariant.sizes.length > 0) {
                        setSelectedSizeId(firstVariant.sizes[0]._id);
                    }
                }

            } catch (err) {
                console.error("Error fetching product:", err);
                setError(err.response?.data?.message || "Có lỗi xảy ra khi tải sản phẩm.");
            } finally {
                setLoading(false);
            }
        };

        if (identifier) fetchProduct();
    }, [identifier]);

    // --- 2. XÁC ĐỊNH BIẾN THỂ ĐANG CHỌN ---
    const activeColorVariant = product?.variants?.find(v => v._id === selectedColorVariantId);
    const activeSizeInventory = activeColorVariant?.sizes?.find(s => s._id === selectedSizeId);

    // Tính toán giá và tồn kho hiển thị
    const displayPrice = activeSizeInventory ? activeSizeInventory.finalPrice : product?.finalPrice;
    const displayOriginalPrice = activeSizeInventory ? activeSizeInventory.price : product?.basePrice;
    const isDiscounted = displayOriginalPrice > displayPrice;
    const currentStock = activeSizeInventory ? activeSizeInventory.stock : 0;

    // --- 3. XỬ LÝ SỰ KIỆN ---

    // Chọn màu
    const handleColorSelect = (variantId) => {
        if (variantId === selectedColorVariantId) return;

        const newVariant = product.variants.find(v => v._id === variantId);
        setSelectedColorVariantId(variantId);
        
        // Cập nhật ảnh
        if (newVariant?.image?.url) {
            setCurrentDisplayImage(getImageUrl(newVariant.image.url));
        } else {
            setCurrentDisplayImage(getImageUrl(product.featuredImage));
        }

        // Reset Size: Chọn size đầu tiên của màu mới (để tránh chọn size không tồn tại ở màu này)
        if (newVariant?.sizes?.length > 0) {
            setSelectedSizeId(newVariant.sizes[0]._id);
        } else {
            setSelectedSizeId(null);
        }
        // Reset số lượng về 1
        setQuantity(1);
    };

    // Chọn size
    const handleSizeSelect = (sizeId) => {
        setSelectedSizeId(sizeId);
        setQuantity(1);
    };

    // Tăng giảm số lượng
    const handleQuantityUpdate = (val) => {
        // Đảm bảo số lượng từ 1 đến max tồn kho
        const newQty = Math.max(1, Math.min(currentStock, val));
        setQuantity(newQty);
    };

    // Thêm vào giỏ hàng
    const handleAddToCart = async () => {
        // Validate
        if (!activeColorVariant || !activeSizeInventory) {
            alert("Vui lòng chọn đầy đủ Màu sắc và Kích cỡ.");
            return;
        }
        if (currentStock <= 0) {
            alert("Sản phẩm này đang tạm hết hàng.");
            return;
        }
        if (quantity > currentStock) {
            alert(`Chỉ còn ${currentStock} sản phẩm trong kho.`);
            return;
        }

        const payload = {
            productId: product._id,
            colorVariantId: activeColorVariant._id,
            sizeId: activeSizeInventory._id,
            quantity: Number(quantity)
        };

        try {
            // Gọi API
            const res = await api.post('/cart/add', payload);

            // --- CẬP NHẬT CONTEXT ---
            // Lấy totalQuantity mới từ response và cập nhật Header ngay lập tức
            if (res.data.cart && typeof res.data.cart.totalQuantity === 'number') {
                updateCountImmediately(res.data.cart.totalQuantity);
            }

            alert(`Đã thêm "${product.name}" vào giỏ hàng!`);

        } catch (err) {
            console.error("Add to cart error:", err);
            const msg = err.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng.";
            alert(msg);
        }
    };

    // --- 4. RENDER ---

    if (loading) return <div className={styles.centerMessage}>Đang tải chi tiết sản phẩm...</div>;
    if (error || !product) return <div className={`${styles.centerMessage} ${styles.errorText}`}>{error || "Sản phẩm không tồn tại."}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.productWrapper}>
                
                {/* --- CỘT TRÁI: ẢNH --- */}
                <div className={styles.gallerySection}>
                    <div className={styles.mainImageContainer}>
                        <img 
                            src={currentDisplayImage} 
                            alt={product.name} 
                            className={styles.mainImage} 
                        />
                    </div>
                    {/* (Có thể thêm list ảnh nhỏ ở đây nếu muốn) */}
                </div>

                {/* --- CỘT PHẢI: THÔNG TIN --- */}
                <div className={styles.infoSection}>
                    {/* Meta info */}
                    <div className={styles.metaInfo}>
                        <span className={styles.brand}>{product.brand?.name || "No Brand"}</span>
                        {product.isActive 
                            ? <span className={styles.stockStatus}>Còn hàng</span>
                            : <span className={styles.stockStatusOut}>Ngừng kinh doanh</span>
                        }
                    </div>

                    <h1 className={styles.productTitle}>{product.name}</h1>

                    {/* Rating & Sold */}
                    <div className={styles.ratingRow}>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={16} 
                                    className={i < Math.round(product.averageRating || 0) ? styles.starFilled : styles.starEmpty} 
                                />
                            ))}
                        </div>
                        <span className={styles.reviewCount}>({product.reviewCount || 0} đánh giá)</span>
                        <span className={styles.divider}>|</span>
                        <span className={styles.soldCount}>Đã bán {product.sold || 0}</span>
                    </div>

                    {/* Price */}
                    <div className={styles.priceRow}>
                        <span className={styles.currentPrice}>{formatCurrency(displayPrice)}</span>
                        {isDiscounted && (
                            <>
                                <span className={styles.originalPrice}>{formatCurrency(displayOriginalPrice)}</span>
                                <span className={styles.discountLabel}>Giảm giá</span>
                            </>
                        )}
                    </div>

                    {/* Mô tả ngắn */}
                    <div className={styles.shortDescription} dangerouslySetInnerHTML={{ __html: product.description?.substring(0, 200) + '...' }} />

                    <div className={styles.separator}></div>

                    {/* --- CHỌN BIẾN THỂ --- */}
                    <div className={styles.variantsContainer}>
                        
                        {/* 1. Màu sắc */}
                        {product.variants?.length > 0 && (
                            <div className={styles.variantGroup}>
                                <span className={styles.variantLabel}>Màu sắc: <span className={styles.variantValue}>{activeColorVariant?.color}</span></span>
                                <div className={styles.colorList}>
                                    {product.variants.map((v) => (
                                        <button
                                            key={v._id}
                                            className={`${styles.colorBtn} ${selectedColorVariantId === v._id ? styles.active : ''}`}
                                            style={{ backgroundColor: v.colorCode || '#eee' }}
                                            onClick={() => handleColorSelect(v._id)}
                                            title={v.color}
                                        >
                                            {selectedColorVariantId === v._id && <Check size={14} color={v.colorCode?.toUpperCase() === '#FFFFFF' ? '#000' : '#fff'} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. Kích cỡ */}
                        {activeColorVariant?.sizes?.length > 0 ? (
                            <div className={styles.variantGroup}>
                                <div className={styles.sizeHeader}>
                                    <span className={styles.variantLabel}>Kích cỡ: <span className={styles.variantValue}>{activeSizeInventory?.size}</span></span>
                                    <button className={styles.sizeGuideBtn}>Bảng quy đổi kích cỡ</button>
                                </div>
                                <div className={styles.sizeList}>
                                    {activeColorVariant.sizes.map((s) => {
                                        const isOutOfStock = s.stock <= 0;
                                        return (
                                            <button
                                                key={s._id}
                                                className={`${styles.sizeBtn} ${selectedSizeId === s._id ? styles.active : ''} ${isOutOfStock ? styles.disabled : ''}`}
                                                onClick={() => !isOutOfStock && handleSizeSelect(s._id)}
                                                disabled={isOutOfStock}
                                            >
                                                {s.size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className={styles.noSizeMsg}>Vui lòng chọn màu sắc để xem kích cỡ.</p>
                        )}

                        {/* 3. Số lượng & Button */}
                        <div className={styles.actionGroup}>
                            <div className={styles.quantityBox}>
                                <button onClick={() => handleQuantityUpdate(quantity - 1)} disabled={quantity <= 1}>
                                    <Minus size={16} />
                                </button>
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={(e) => handleQuantityUpdate(parseInt(e.target.value) || 1)}
                                    min="1"
                                    max={currentStock}
                                />
                                <button onClick={() => handleQuantityUpdate(quantity + 1)} disabled={quantity >= currentStock}>
                                    <Plus size={16} />
                                </button>
                            </div>
                            
                            <div className={styles.stockInfo}>
                                {currentStock > 0 ? (
                                    currentStock <= 5 ? (
                                        <span className={styles.lowStock}><AlertCircle size={14} /> Chỉ còn {currentStock} sản phẩm</span>
                                    ) : (
                                        <span className={styles.inStock}>Còn hàng</span>
                                    )
                                ) : (
                                    <span className={styles.outStock}>Hết hàng</span>
                                )}
                            </div>
                        </div>

                        <button 
                            className={styles.addToCartBtn}
                            onClick={handleAddToCart}
                            disabled={!activeSizeInventory || currentStock <= 0}
                        >
                            <ShoppingCart size={20} />
                            {currentStock <= 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MÔ TẢ CHI TIẾT & ĐÁNH GIÁ --- */}
            <div className={styles.bottomSection}>
                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.activeTab}`}>Mô tả sản phẩm</button>
                    <button className={styles.tab}>Đánh giá ({product.reviewCount})</button>
                    <button className={styles.tab}>Chính sách đổi trả</button>
                </div>
                <div className={styles.tabContent}>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </div>
            </div>
        </div>
    );
};

export default ProductViewDetail;
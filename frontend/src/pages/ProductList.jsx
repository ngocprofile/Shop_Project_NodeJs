import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';
import styles from './ProductList.module.css';

const ProductList = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    
    // --- 1. Dữ liệu API ---
    const [products, setProducts] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [brands, setBrands] = useState([]);

    // --- 2. State UI (Đơn chọn Brand) ---
    // Lưu ID Brand được chọn hoặc chuỗi 'all'
    const [selectedBrandId, setSelectedBrandId] = useState('all'); // 👈 FIX: Thay thế selectedBrands (array)
    const [priceRange, setPriceRange] = useState([0, 5000000]); // [min, max]

    // --- 3. State Logic (Dùng để gọi API) ---
    const [appliedFilters, setAppliedFilters] = useState({
        brandId: 'all', // 👈 FIX: Thay thế brands (array)
        price: [0, 5000000]
    });

    const [sortOption, setSortOption] = useState('newest');
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // --- 4. Hàm gọi API (Fix logic gửi Brand) ---
    const fetchProducts = useCallback(async (catId, brandId, price, sort) => { // 👈 brandId là chuỗi ID
        setLoading(true);
        try {
            const params = {
                category: catId,
                minPrice: price[0],
                maxPrice: price[1],
                sort: sort
            };
            
            // ✅ FIX LỌC BRAND: Chỉ thêm params.brand nếu ID không phải là 'all'
            if (brandId && brandId !== 'all') {
                params.brand = brandId; 
            }
            // Backend Controller cần được cập nhật để xử lý single brand ID ở đây.

            const res = await api.get('/products', { params });
            setProducts(Array.isArray(res.data) ? res.data : res.data.products || []); 

        } catch (error) {
            console.error("Lỗi tải sản phẩm:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // --- 5. Khởi tạo trang (Fix lỗi ReferenceError và luồng tải dữ liệu) ---
    useEffect(() => {
        const initPage = async () => {
            setLoading(true);
            const defaultPrice = [0, 5000000];

            // 🏆 FIX LỖI SCOPE: Khai báo biến category ở scope này
            let category; 
            
            try {
                // A. Reset toàn bộ bộ lọc về mặc định
                setSelectedBrandId('all'); // 👈 FIX: Reset state mới
                setPriceRange(defaultPrice);
                setAppliedFilters({ brandId: 'all', price: defaultPrice }); // 👈 FIX: Reset state logic
                setSortOption('newest');

                // 1. Tải thông tin Category trước để lấy ID
                const catRes = await api.get(`/categories/slug/${slug}`);
                
                category = catRes.data; // Gán giá trị, KHÔNG DÙNG const/let ở đây
                setCategoryInfo(category);

                // 2. Tải Brands: Truyền ID Category đã có để lọc Brands có sản phẩm
                const brandRes = await api.get(`/brands?categoryId=${category._id}`); 
                setBrands(brandRes.data);

                // 3. Gọi sản phẩm lần đầu (dùng ID Category và Brand mặc định 'all')
                if (category && category._id) {
                    await fetchProducts(category._id, 'all', defaultPrice, 'newest'); // 👈 FIX: Truyền 'all'
                }

            } catch (error) {
                console.error("Lỗi tải trang danh mục:", error);
                setLoading(false); 
            }
        };

        if (slug) initPage();
    }, [slug, fetchProducts]);

    // --- 6. Xử lý sự kiện UI (Đơn chọn Brand) ---
    const handleBrandChange = (brandId) => {
        // ✅ FIX: Chỉ cần set ID mới (radio button)
        setSelectedBrandId(brandId);
    };

    const handlePriceChange = (e) => {
        setPriceRange([0, Number(e.target.value)]);
    };

    // --- 7. Các hành động kích hoạt API ---

    // Nút "Áp dụng lọc"
    const applyFilters = () => {
        if (categoryInfo) {
            // Lưu trạng thái mới vào "Applied"
            setAppliedFilters({
                brandId: selectedBrandId, // 👈 Cập nhật
                price: priceRange
            });
            
            // Gọi API với bộ lọc mới
            fetchProducts(categoryInfo._id, selectedBrandId, priceRange, sortOption); // 👈 Cập nhật
            
            setShowMobileFilter(false);
        }
    };

    // Thay đổi Sắp xếp
    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setSortOption(newSort);
        
        if (categoryInfo) {
            // Dùng appliedFilters.brandId (chuỗi ID)
            fetchProducts(
                categoryInfo._id, 
                appliedFilters.brandId, // 👈 Cập nhật
                appliedFilters.price, 
                newSort
            );
        }
        
    };

    // --- 8. JSX Render ---
    return (
        <div className={styles.productListContainer}>
            
            {/* HEADER */}
            <div className={styles.pageHeader}>
                <h1 className={styles.categoryTitle}>{categoryInfo?.name || 'Đang tải...'}</h1>
                <p className={styles.productCount}>
                    {products.length} sản phẩm
                </p>
                
                <button 
                    className={styles.mobileFilterBtn} 
                    onClick={() => setShowMobileFilter(true)}
                >
                    <Filter size={18} /> Bộ lọc
                </button>
            </div>

            <div className={styles.layoutGrid}>
                
                {/* SIDEBAR FILTER */}
                <aside className={`${styles.sidebar} ${showMobileFilter ? styles.showMobile : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>Bộ lọc</h3>
                        <button onClick={() => setShowMobileFilter(false)} className={styles.closeFilterBtn}>
                            <X size={24} />
                        </button>
                    </div>

                    {/* Brand Filter */}
                    <div className={styles.filterGroup}>
                        <h4>Thương hiệu</h4>
                        <div className={styles.checkboxList}>
                            
                            {/* 🏆 FIX GIAO DIỆN: OPTION MẶC ĐỊNH 'TẤT CẢ' */}
                            <label className={styles.checkboxLabel}>
                                <input 
                                    type="radio" 
                                    name="brandFilter"
                                    checked={selectedBrandId === 'all'}
                                    onChange={() => handleBrandChange('all')}
                                />
                                <span>Tất cả</span>
                            </label>

                            {/* CÁC OPTION THƯƠNG HIỆU */}
                            {brands.length > 0 ? brands.map(brand => (
                                <label key={brand._id} className={styles.checkboxLabel}>
                                    <input 
                                        type="radio" // 👈 Thay đổi từ checkbox thành radio
                                        name="brandFilter" 
                                        checked={selectedBrandId === brand._id} // Kiểm tra ID Brand
                                        onChange={() => handleBrandChange(brand._id)}
                                    />
                                    <span>{brand.name}</span>
                                </label>
                            )) : <p>Đang cập nhật...</p>}
                        </div>
                    </div>

                    {/* Price Filter (Giữ nguyên) */}
                    <div className={styles.filterGroup}>
                        <h4>Khoảng giá</h4>
                        <p className={styles.priceDisplay}>
                            0đ - {priceRange[1].toLocaleString('vi-VN')}đ
                        </p>
                        <input 
                            type="range" 
                            min="0" max="10000000" step="100000"
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                            className={styles.rangeInput}
                        />
                    </div>

                    <button className={styles.applyBtn} onClick={applyFilters}>
                        Áp dụng
                    </button>
                </aside>

                {/* MAIN CONTENT */}
                <main className={styles.mainContent}>
                    
                    {/* Sort Toolbar */}
                    <div className={styles.toolbar}>
                        <div className={styles.sortWrapper}>
                            <SlidersHorizontal size={18} />
                            <select value={sortOption} onChange={handleSortChange} className={styles.sortSelect}>
                                <option value="newest">Mới nhất</option>
                                <option value="price_asc">Giá: Thấp đến Cao</option>
                                <option value="price_desc">Giá: Cao đến Thấp</option>
                                <option value="best_selling">Bán chạy nhất</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className={styles.loadingState}>Đang tải sản phẩm...</div>
                    ) : products.length === 0 ? (
                        <div className={styles.emptyState}>Không tìm thấy sản phẩm nào phù hợp.</div>
                    ) : (
                        <div className={styles.productGrid}>
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
            
            {/* Mobile Overlay */}
            {showMobileFilter && (
                <div className={styles.overlay} onClick={() => setShowMobileFilter(false)}></div>
            )}
        </div>
    );
};

export default ProductList;
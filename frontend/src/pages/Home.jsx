import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import api from "../api"; // Đảm bảo đường dẫn này đúng

// Import CSS Modules
import styles from './Home.module.css';

// Import Icons
import {
  ArchiveRestore, // <-- Icon mới cho Stats
  Award, // <-- Icon mới cho Stats
  LayoutGrid,
  Package,
  ShieldCheck, // <-- Icon mới cho Stats
  ShoppingBag // <-- Icon mới cho Stats
  ,

  Truck
} from "lucide-react";

// Import CSS cho Slick Slider
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// 1. LẤY DOMAIN BACKEND TỪ BIẾN MÔI TRƯỜNG (Để hiển thị ảnh)
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Cài đặt slider
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
};

// === COMPONENT CON CHO CÁC PHẦN ===

// 1. Hero Slider
function HeroSlider() {
    const promotions = [
        {
            id: 1,
            title: "GIẢM 50% TOÀN BỘ",
            subtitle: "Chỉ từ 07-09/11/2025",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop",
            link: "/collections/sale"
        },
        {
            id: 2,
            title: "BỘ SƯU TẬP MÙA ĐÔNG",
            subtitle: "Khám phá phong cách mới",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop",
            link: "/collections/winter-2025"
        },
    ];

    return (
        <section className={styles.heroSlider}>
            <Slider {...sliderSettings}>
                {promotions.map((p) => (
                    <div key={p.id} className={styles.slide}>
                        <img src={p.image} alt={p.title} className={styles.slideImage} />
                        <div className={styles.slideContent}>
                            <h1 className={styles.slideTitle}>{p.title}</h1>
                            <p className={styles.slideSubtitle}>{p.subtitle}</p>
                            <Link to={p.link} className={styles.ctaButton}>
                                Mua ngay
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}

// 2. PHẦN MỚI: Thanh Thống Kê (StatsBar)
function StatsBar({ stats }) {
    // Chỉ hiển thị nếu có dữ liệu stats
    if (!stats) return null;

    return (
        <section className={styles.statsBarContainer}>
            <div className={styles.statsBar}>
                <div className={styles.statItem}>
                    <Package size={32} />
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.totalProducts}+</span>
                        <span className={styles.statLabel}>Sản Phẩm</span>
                    </div>
                </div>
                <div className={styles.statItem}>
                    <LayoutGrid size={32} />
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.totalCategories}+</span>
                        <span className={styles.statLabel}>Danh Mục</span>
                    </div>
                </div>
                <div className={styles.statItem}>
                    <Award size={32} />
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.totalBrands}+</span>
                        <span className={styles.statLabel}>Thương Hiệu</span>
                    </div>
                </div>
                <div className={styles.statItem}>
                    <ShoppingBag size={32} />
                    <div className={styles.statContent}>
                        <span className={styles.statNumber}>{stats.totalSold}+</span>
                        <span className={styles.statLabel}>Đã Bán</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 3. Thanh Cam Kết (Trust Bar)
function TrustBar() {
    return (
        <section className={styles.trustBar}>
            <div className={styles.trustItem}>
                <Truck size={24} />
                <span>Miễn phí vận chuyển từ 300K</span>
            </div>
            <div className={styles.trustItem}>
                <ShieldCheck size={24} />
                <span>Hàng chính hãng 100%</span>
            </div>
            <div className={styles.trustItem}>
                <ArchiveRestore size={24} />
                <span>Đổi trả miễn phí 30 ngày</span>
            </div>
        </section>
    );
}

// 4. Danh mục Nổi bật
function FeaturedCategories({ categories }) {
    return (
        <section className={styles.container}>
            <h2 className={styles.sectionTitle}>Danh Mục Nổi Bật</h2>
            <div className={styles.categoryGrid}>
                {categories.map((cat) => (
                    <Link to={`/category/${cat.slug}`} key={cat._id} className={styles.categoryCard}>
                        <img
                            src={cat.image ? `${BACKEND_URL}${cat.image}` : "/placeholder.jpg"}
                            alt={cat.name}
                            className={styles.categoryImage}
                        />
                        <h3 className={styles.categoryName}>{cat.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}

// 5. Bộ Sưu Tập / Phong cách (Shop The Look)
function ShopTheLook() {
    return (
        <section className={styles.container}>
            <h2 className={styles.sectionTitle}>Mua Theo Phong Cách</h2>
            <div className={styles.collectionGrid}>
                <Link to="/collections/streetwear" className={styles.collectionCard}>
                    <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1000&fit=crop" alt="Streetwear" />
                    <div className={styles.collectionOverlay}>
                        <h3>Thời Trang Dạo Phố</h3>
                        <span>Xem ngay</span>
                    </div>
                </Link>
                <Link to="/collections/office" className={styles.collectionCard}>
                    <img src="https://img.lazcdn.com/g/p/ef6200d5d07466db1193ec7c0323316f.jpg_720x720q80.jpg" alt="Office Wear" />
                    <div className={styles.collectionOverlay}>
                        <h3>Thanh Lịch Công Sở</h3>
                        <span>Xem ngay</span>
                    </div>
                </Link>
            </div>
        </section>
    );
}

// 6. Đăng ký nhận tin (Newsletter)
function Newsletter() {
    return (
        <section className={styles.newsletter}>
            <div className={styles.newsletterInner}>
                <h2 className={styles.sectionTitle}>Đăng Ký Nhận Tin</h2>
                <p>Nhận ngay voucher 10% cho đơn hàng đầu tiên và cập nhật các khuyến mãi mới nhất.</p>
                <form className={styles.newsletterForm}>
                    <input type="email" placeholder="Nhập email của bạn..." className={styles.newsletterInput} />
                    <button type="submit" className={styles.ctaButton}>Đăng ký</button>
                </form>
            </div>
        </section>
    );
}


// === COMPONENT TRANG HOME CHÍNH ===
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [stats, setStats] = useState(null); // State lưu thống kê

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Gọi song song 2 API: Categories và Stats
                const [catRes, statsRes] = await Promise.all([
                    api.get("/categories"),
                    api.get("/stats/homepage")
                ]);
                
                setCategories(catRes.data.slice(0, 6)); // Lấy 6 danh mục đầu
                setStats(statsRes.data);

            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
                // Nếu lỗi API stats, code vẫn chạy tiếp (stats là null -> không render bar)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); 

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.homePage}>
            <HeroSlider />
            <StatsBar stats={stats} /> {/* <-- Hiển thị StatsBar */}
            <TrustBar />
            <FeaturedCategories categories={categories} />
            <ShopTheLook />
            <Newsletter />
        </div>
    );
};

export default Home;
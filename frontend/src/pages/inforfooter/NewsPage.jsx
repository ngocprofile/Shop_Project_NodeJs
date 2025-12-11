import { ArrowRight, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './InfoPage.module.css';

const NewsPage = () => {
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    // Dữ liệu bài viết mẫu
    const articles = [
        { 
            id: 1, 
            title: "Xu hướng Thu Đông 2025: Sự lên ngôi của Layering", 
            category: "Xu hướng",
            date: "20/11/2025",
            author: "Minh Anh",
            image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop",
            desc: "Khám phá nghệ thuật phối đồ nhiều lớp (layering) để vừa giữ ấm, vừa thời thượng trong mùa lạnh năm nay." 
        },
        { 
            id: 2, 
            title: "Minimalism: Tối giản nhưng không đơn điệu", 
            category: "Phối đồ",
            date: "18/11/2025",
            author: "Style Code Team",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
            desc: "5 nguyên tắc vàng giúp bạn xây dựng tủ đồ tối giản (capsule wardrobe) mà vẫn luôn mới mẻ mỗi ngày." 
        },
        { 
            id: 3, 
            title: "Cách chọn quần Jeans phù hợp với dáng người", 
            category: "Tips",
            date: "15/11/2025",
            author: "Hồng Hạnh",
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
            desc: "Dáng quả lê, dáng thước kẻ hay đồng hồ cát? Hãy để chúng tôi giúp bạn tìm ra chiếc quần chân ái." 
        },
        { 
            id: 4, 
            title: "Thời trang bền vững: Xu hướng hay trách nhiệm?", 
            category: "Lifestyle",
            date: "10/11/2025",
            author: "Tuấn Kiệt",
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
            desc: "Tìm hiểu về các chất liệu thân thiện môi trường mà Style Code đang áp dụng vào bộ sưu tập mới." 
        },
        { 
            id: 5, 
            title: "Gợi ý outfit đi làm cho dân công sở", 
            category: "Phối đồ",
            date: "05/11/2025",
            author: "Minh Anh",
            image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop",
            desc: "Biến hóa trang phục công sở nhàm chán trở nên thanh lịch và cuốn hút hơn với các items cơ bản." 
        },
        { 
            id: 6, 
            title: "Phụ kiện: Điểm nhấn nhỏ, thay đổi lớn", 
            category: "Tips",
            date: "01/11/2025",
            author: "Style Code Team",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
            desc: "Đồng hồ, kính mát hay túi xách? Cách kết hợp phụ kiện để nâng tầm set đồ của bạn." 
        }
    ];

    const categories = ['Tất cả', 'Xu hướng', 'Phối đồ', 'Tips', 'Lifestyle'];

    // Logic lọc bài viết
    const filteredArticles = activeCategory === 'Tất cả' 
        ? articles 
        : articles.filter(item => item.category === activeCategory);

    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 className={styles.title}>Tin Tức & Phong Cách</h1>
                <p className={styles.subtitle}>Cập nhật những xu hướng thời trang mới nhất cùng Style Code</p>

                {/* Bộ lọc Categories */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '20px',
                                border: activeCategory === cat ? '1px solid #000' : '1px solid #ddd',
                                background: activeCategory === cat ? '#000' : '#fff',
                                color: activeCategory === cat ? '#fff' : '#555',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>
                {filteredArticles.map((item) => (
                    <div key={item.id} className={styles.card} style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Hình ảnh có hiệu ứng zoom nhẹ khi hover (nếu CSS hỗ trợ) */}
                        <Link to={`/news/${item.id}`} style={{ display: 'block', overflow: 'hidden', height: '200px', position: 'relative' }}>
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            {/* Nhãn Category trên ảnh */}
                            <span style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                background: '#fff',
                                padding: '4px 10px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                borderRadius: '4px',
                                textTransform: 'uppercase'
                            }}>
                                {item.category}
                            </span>
                        </Link>

                        <div className={styles.cardContent} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {/* Metadata: Ngày & Tác giả */}
                            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={12} /> {item.date}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <User size={12} /> {item.author}
                                </span>
                            </div>

                            <h3 className={styles.cardTitle}>
                                <Link to={`/news/${item.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {item.title}
                                </Link>
                            </h3>
                            
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', lineHeight: '1.5' }}>
                                {item.desc}
                            </p>

                            <Link 
                                to={`/news/${item.id}`} 
                                style={{ 
                                    marginTop: 'auto', 
                                    color: '#000', 
                                    fontWeight: 'bold', 
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontSize: '14px'
                                }}
                            >
                                Đọc tiếp <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
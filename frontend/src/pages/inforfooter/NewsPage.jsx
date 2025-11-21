import { Link } from 'react-router-dom';
import styles from './InfoPage.module.css';

const NewsPage = () => {
    const news = [
        { id: 1, title: "Xu hướng thời trang Thu Đông 2025", desc: "Những items không thể thiếu trong tủ đồ mùa lạnh..." },
        { id: 2, title: "Cách phối đồ Minimalist", desc: "Tối giản nhưng không đơn điệu với 5 mẹo nhỏ..." },
    ];

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Tin Tức Thời Trang</h1>
        <div className={styles.grid}>
            {news.map((item) => (
            <div key={item.id} className={styles.card}>
                <div style={{ height: '150px', background: '#eee' }}></div> {/* Placeholder ảnh */}
                <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>{item.desc}</p>
                <Link to={`/news/${item.id}`} style={{ color: '#000', fontWeight: 'bold', textDecoration: 'none' }}>Đọc thêm &rarr;</Link>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};
export default NewsPage;
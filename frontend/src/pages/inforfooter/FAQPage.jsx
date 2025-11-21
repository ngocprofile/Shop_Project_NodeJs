import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import styles from './InfoPage.module.css';

const FAQPage = () => {
    const [open, setOpen] = useState(null);
    const faqs = [
        { q: "Tôi có thể hủy đơn hàng không?", a: "Bạn có thể hủy đơn hàng khi trạng thái là 'Đang xử lý'. Nếu đã vận chuyển, vui lòng nhận hàng và làm thủ tục hoàn trả." },
        { q: "Bao lâu tôi nhận được hàng?", a: "Thông thường từ 2-4 ngày tùy khu vực." },
    ];

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Hỏi Đáp Thường Gặp</h1>
        <div style={{ marginTop: '30px' }}>
            {faqs.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <button 
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                {item.q}
                {open === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {open === i && <p style={{ marginTop: '10px', color: '#555' }}>{item.a}</p>}
            </div>
            ))}
        </div>
        </div>
    );
};
export default FAQPage;
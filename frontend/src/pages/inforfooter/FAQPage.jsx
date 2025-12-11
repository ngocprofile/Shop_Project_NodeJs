import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import styles from './InfoPage.module.css';

const FAQPage = () => {
    // State quản lý câu hỏi đang mở
    const [openIndex, setOpenIndex] = useState(null);
    // State quản lý Tab đang chọn
    const [activeTab, setActiveTab] = useState('Đơn hàng & Thanh toán');

    const categories = [
        'Đơn hàng & Thanh toán',
        'Vận chuyển & Giao nhận',
        'Đổi trả & Hoàn tiền',
        'Sản phẩm'
    ];

    // Dữ liệu FAQ chi tiết
    const faqData = [
        // Nhóm 1: Đơn hàng
        {
            category: 'Đơn hàng & Thanh toán',
            q: "Tôi có thể hủy đơn hàng đã đặt không?",
            a: "Bạn có thể hủy đơn hàng khi trạng thái là 'Đang xử lý' bằng cách liên hệ Hotline hoặc nhắn tin qua Fanpage. Nếu đơn hàng đã chuyển sang trạng thái 'Đang vận chuyển', chúng tôi rất tiếc không thể hỗ trợ hủy ngay lập tức."
        },
        {
            category: 'Đơn hàng & Thanh toán',
            q: "Style Code hỗ trợ những phương thức thanh toán nào?",
            a: "Chúng tôi hỗ trợ đa dạng phương thức: Thanh toán khi nhận hàng (COD), Chuyển khoản ngân hàng (QR Code), Ví điện tử (Momo, ZaloPay) và Thẻ tín dụng/Ghi nợ quốc tế."
        },
        {
            category: 'Đơn hàng & Thanh toán',
            q: "Làm sao để biết đơn hàng của tôi đã được xác nhận?",
            a: "Sau khi đặt hàng thành công, hệ thống sẽ gửi email xác nhận đến địa chỉ email bạn cung cấp. Ngoài ra, nhân viên CSKH có thể gọi điện để xác nhận lại thông tin với các đơn hàng giá trị cao."
        },

        // Nhóm 2: Vận chuyển
        {
            category: 'Vận chuyển & Giao nhận',
            q: "Thời gian giao hàng là bao lâu?",
            a: "Nội thành TP.HCM & Hà Nội: 1-2 ngày. Các tỉnh thành khác: 3-5 ngày làm việc. Thời gian có thể thay đổi vào các dịp Lễ, Tết hoặc sale lớn."
        },
        {
            category: 'Vận chuyển & Giao nhận',
            q: "Phí vận chuyển được tính như thế nào?",
            a: "Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Đơn hàng dưới 500.000đ áp dụng mức phí đồng giá 30.000đ toàn quốc."
        },
        {
            category: 'Vận chuyển & Giao nhận',
            q: "Tôi có được kiểm tra hàng trước khi nhận không?",
            a: "Có. Style Code hỗ trợ chính sách đồng kiểm. Bạn được quyền mở gói hàng kiểm tra số lượng, màu sắc, kích cỡ (không hỗ trợ mặc thử) trước khi thanh toán cho shipper."
        },

        // Nhóm 3: Đổi trả
        {
            category: 'Đổi trả & Hoàn tiền',
            q: "Chính sách đổi trả của Style Code như thế nào?",
            a: "Chúng tôi hỗ trợ đổi hàng trong vòng 30 ngày kể từ ngày nhận. Sản phẩm phải còn nguyên tem mác, chưa qua sử dụng, giặt ủi và không có mùi lạ."
        },
        {
            category: 'Đổi trả & Hoàn tiền',
            q: "Tôi mua Online nhưng đổi tại cửa hàng được không?",
            a: "Được. Bạn có thể mang sản phẩm kèm hóa đơn điện tử/tin nhắn xác nhận đơn hàng đến bất kỳ chi nhánh nào của Style Code để được hỗ trợ đổi size/mẫu."
        },

        // Nhóm 4: Sản phẩm
        {
            category: 'Sản phẩm',
            q: "Làm sao để chọn đúng size quần áo?",
            a: "Mỗi sản phẩm trên website đều có 'Bảng quy đổi kích cỡ' chi tiết. Bạn cũng có thể nhắn tin chiều cao, cân nặng cho fanpage để được tư vấn size chuẩn nhất."
        },
        {
            category: 'Sản phẩm',
            q: "Sản phẩm hết hàng có về thêm không?",
            a: "Các mẫu Best-seller thường sẽ được restock sau 2-3 tuần. Bạn hãy nhấn nút 'Thông báo khi có hàng' trên trang sản phẩm để nhận email ngay khi hàng về nhé."
        }
    ];

    // Lọc dữ liệu theo Tab
    const filteredFaqs = faqData.filter(item => item.category === activeTab);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Hỏi Đáp Thường Gặp</h1>
                <p className={styles.subtitle}>Chúng tôi có thể giúp gì cho bạn?</p>

                {/* Tabs chọn danh mục */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveTab(cat); setOpenIndex(null); }}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '30px',
                                border: activeTab === cat ? '1px solid #000' : '1px solid #ddd',
                                background: activeTab === cat ? '#000' : '#fff',
                                color: activeTab === cat ? '#fff' : '#555',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.3s',
                                fontSize: '14px'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Danh sách câu hỏi (Accordion) */}
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {filteredFaqs.map((item, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            border: '1px solid #eee', 
                            borderRadius: '8px',
                            marginBottom: '15px',
                            overflow: 'hidden',
                            background: '#fff',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                        }}
                    >
                        <button 
                            onClick={() => toggleFAQ(i)}
                            style={{ 
                                width: '100%', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                background: openIndex === i ? '#f9f9f9' : '#fff', 
                                border: 'none', 
                                padding: '20px',
                                fontSize: '16px', 
                                fontWeight: '600', 
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: '#333',
                                transition: 'background 0.3s'
                            }}
                        >
                            <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <HelpCircle size={18} color="#666" />
                                {item.q}
                            </span>
                            {openIndex === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        
                        {/* Nội dung trả lời (Animation đơn giản bằng JS logic) */}
                        {openIndex === i && (
                            <div style={{ 
                                padding: '0 20px 20px 20px', 
                                color: '#555', 
                                lineHeight: '1.6',
                                borderTop: '1px solid #eee',
                                background: '#f9f9f9',
                                animation: 'fadeIn 0.3s ease-in'
                            }}>
                                <div style={{ paddingTop: '15px' }}>{item.a}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer hỗ trợ thêm */}
            <div style={{ 
                marginTop: '60px', 
                padding: '40px', 
                background: '#f0f0f0', 
                borderRadius: '8px', 
                textAlign: 'center' 
            }}>
                <h3 style={{ marginBottom: '15px' }}>Bạn vẫn còn thắc mắc?</h3>
                <p style={{ color: '#666', marginBottom: '25px' }}>Đội ngũ CSKH của Style Code luôn sẵn sàng hỗ trợ bạn.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <a href="tel:19001234" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000', fontWeight: 'bold', background: '#fff', padding: '10px 20px', borderRadius: '6px' }}>
                        <Phone size={18} /> Hotline: 1900 1234
                    </a>
                    <a href="https://m.me/stylecode" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000', fontWeight: 'bold', background: '#fff', padding: '10px 20px', borderRadius: '6px' }}>
                        <MessageCircle size={18} /> Chat Messenger
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
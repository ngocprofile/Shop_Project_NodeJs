import { Clock, Facebook, Instagram, Mail, MapPin, MessageSquare, Phone, Send, Youtube } from 'lucide-react';
import { useState } from 'react';
import styles from './InfoPage.module.css';

const ContactPage = () => {
    // State quản lý form
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success'

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Giả lập gửi API (2 giây)
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
        }, 2000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 className={styles.title}>Liên Hệ Style Code</h1>
                <p className={styles.subtitle}>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
            </div>

            <div className={styles.grid}>
                {/* CỘT 1: THÔNG TIN LIÊN HỆ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Card 1: Văn phòng chính */}
                    <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                                Văn Phòng Chính
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#555', fontSize: '15px' }}>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <MapPin size={20} style={{ flexShrink: 0, color: '#000' }} />
                                    <span>123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <Clock size={20} style={{ flexShrink: 0, color: '#000' }} />
                                    <div>
                                        <strong>Giờ làm việc:</strong><br/>
                                        Thứ 2 - Thứ 6: 08:30 - 17:30<br/>
                                        Thứ 7: 08:30 - 12:00
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <Mail size={20} style={{ flexShrink: 0, color: '#000' }} />
                                    <a href="mailto:contact@stylecode.vn" style={{ color: '#555', textDecoration: 'none' }}>contact@stylecode.vn</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: CSKH & Social */}
                    <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Hỗ Trợ Khách Hàng</h3>
                            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                                Bạn có thắc mắc về đơn hàng, đổi trả hoặc sản phẩm?
                            </p>
                            <a href="tel:19001234" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: 'bold', color: '#000', textDecoration: 'none', marginBottom: '20px' }}>
                                <Phone size={24} /> 1900 1234
                            </a>

                            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '10px' }}>Kết nối với chúng tôi</h4>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <a href="#" style={{ color: '#333' }}><Facebook /></a>
                                <a href="#" style={{ color: '#333' }}><Instagram /></a>
                                <a href="#" style={{ color: '#333' }}><Youtube /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CỘT 2: FORM LIÊN HỆ */}
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MessageSquare size={24} /> Gửi tin nhắn
                        </h3>

                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f0fff4', borderRadius: '8px', color: '#27ae60' }}>
                                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
                                <h3>Đã gửi thành công!</h3>
                                <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24h.</p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    style={{ marginTop: '20px', padding: '8px 20px', border: '1px solid #27ae60', background: 'transparent', color: '#27ae60', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Gửi tin nhắn khác
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Họ và tên <span style={{color: 'red'}}>*</span></label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nhập tên của bạn"
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }} 
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Email <span style={{color: 'red'}}>*</span></label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="example@email.com"
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }} 
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Số điện thoại</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="090..."
                                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }} 
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Nội dung cần hỗ trợ <span style={{color: 'red'}}>*</span></label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5" 
                                        placeholder="Bạn cần chúng tôi giúp gì?"
                                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={status === 'submitting'}
                                    style={{ 
                                        width: '100%', 
                                        background: status === 'submitting' ? '#999' : '#000', 
                                        color: '#fff', 
                                        border: 'none', 
                                        padding: '14px', 
                                        borderRadius: '4px', 
                                        fontWeight: 'bold', 
                                        fontSize: '16px', 
                                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        transition: 'background 0.3s'
                                    }}
                                >
                                    {status === 'submitting' ? 'Đang gửi...' : <><Send size={18} /> Gửi Tin Nhắn</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* CỘT 3: BẢN ĐỒ (Google Maps Embed) */}
            <div style={{ marginTop: '40px' }}>
                <iframe 
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.513124896021!2d106.69902727465875!3d10.771962659275538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zQ2jhu6MgQuG6v24gVGjDoW5o!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
                    width="100%" 
                    height="400" 
                    style={{ border: 0, borderRadius: '8px' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    );
};

export default ContactPage;
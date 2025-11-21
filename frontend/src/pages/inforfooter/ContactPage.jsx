import styles from './InfoPage.module.css';

const ContactPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Liên Hệ Hợp Tác</h1>
        <div className={styles.grid} style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
            <div className={styles.section}>
                <h2>Văn phòng chính</h2>
                <p>123 Đường Lê Lợi, Quận 1, TP.HCM</p>
                <p>Hotline: 1900 1234</p>
                <p>Email: contact@stylecode.vn</p>
            </div>
            </div>
            <form className={styles.card} style={{ padding: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Họ tên</label>
                <input type="text" style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                <input type="email" style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Nội dung</label>
                <textarea rows="4" style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}></textarea>
            </div>
            <button style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Gửi tin nhắn</button>
            </form>
        </div>
        </div>
    );
};
export default ContactPage;
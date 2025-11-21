import styles from './InfoPage.module.css';

const CareersPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Cơ Hội Nghề Nghiệp</h1>
        <p className={styles.subtitle}>Gia nhập đội ngũ Style Code ngay hôm nay</p>
        
        <div className={styles.grid}>
            <div className={styles.card}>
                <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Nhân viên bán hàng</h3>
                <p><strong>Địa điểm:</strong> Quận 1, TP.HCM</p>
                <p><strong>Lương:</strong> 7.000.000đ + Hoa hồng</p>
                <button style={{ marginTop: '15px', padding: '8px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Ứng tuyển ngay</button>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Content Marketing</h3>
                <p><strong>Địa điểm:</strong> Cầu Giấy, Hà Nội</p>
                <p><strong>Lương:</strong> 10.000.000đ - 15.000.000đ</p>
                <button style={{ marginTop: '15px', padding: '8px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Ứng tuyển ngay</button>
                </div>
            </div>
        </div>
        </div>
    );
};
export default CareersPage;
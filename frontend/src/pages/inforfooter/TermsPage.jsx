import styles from './InfoPage.module.css';

const TermsPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Điều Khoản Sử Dụng</h1>
        <div className={styles.section}>
            <h2>1. Tài khoản</h2>
            <p>Khi đăng ký tài khoản, bạn cần cung cấp thông tin chính xác. Bạn chịu trách nhiệm bảo mật mật khẩu của mình.</p>
        </div>
        <div className={styles.section}>
            <h2>2. Quyền sở hữu trí tuệ</h2>
            <p>Tất cả nội dung trên website (hình ảnh, logo, văn bản) đều thuộc sở hữu của Style Code.</p>
        </div>
        </div>
    );
};
export default TermsPage;
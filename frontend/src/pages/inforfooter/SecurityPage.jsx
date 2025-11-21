import styles from './InfoPage.module.css';

const SecurityPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Chính Sách Bảo Mật</h1>
        <div className={styles.section}>
            <h2>Cam kết bảo mật</h2>
            <p>Style Code cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó.</p>
        </div>
        </div>
    );
};
export default SecurityPage;
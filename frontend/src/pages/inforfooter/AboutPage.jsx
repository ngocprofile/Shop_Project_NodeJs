import styles from './InfoPage.module.css';

const AboutPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Về Style Code</h1>
        <p className={styles.subtitle}>Định hình phong cách - Khẳng định bản thân</p>
        
        <div className={styles.section}>
            <h2>Khởi nguồn</h2>
            <p>Thành lập năm 2024, Style Code ra đời với sứ mệnh mang đến những thiết kế thời trang tối giản nhưng đậm chất cá tính.</p>
        </div>
        <div className={styles.section}>
            <h2>Tầm nhìn</h2>
            <p>Trở thành thương hiệu thời trang hàng đầu Việt Nam về phong cách Lifestyle hiện đại.</p>
        </div>
        </div>
    );
};
export default AboutPage;
import styles from './InfoPage.module.css';

const SizeGuidePage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Hướng Dẫn Chọn Size</h1>
        <p className={styles.subtitle}>Bảng thông số tham khảo cho Nam và Nữ</p>

        <div className={styles.section}>
            <h2>Áo Thun / Áo Khoác Nam</h2>
            <table className={styles.table}>
            <thead>
                <tr>
                <th>Size</th>
                <th>Chiều cao (cm)</th>
                <th>Cân nặng (kg)</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>S</td><td>160 - 165</td><td>50 - 55</td></tr>
                <tr><td>M</td><td>165 - 170</td><td>55 - 65</td></tr>
                <tr><td>L</td><td>170 - 175</td><td>65 - 75</td></tr>
                <tr><td>XL</td><td>175 - 180</td><td>75 - 85</td></tr>
            </tbody>
            </table>
        </div>
        </div>
    );
};
export default SizeGuidePage;
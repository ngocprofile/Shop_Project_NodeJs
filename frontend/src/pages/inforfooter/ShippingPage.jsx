import styles from './InfoPage.module.css';

const ShippingPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Chính Sách Vận Chuyển</h1>
        
        <div className={styles.section}>
            <h2>1. Phí vận chuyển</h2>
            <ul>
            <li>Miễn phí vận chuyển cho đơn hàng từ 500.000đ.</li>
            <li>Đồng giá 30.000đ cho các đơn hàng dưới 500.000đ.</li>
            </ul>
        </div>
        <div className={styles.section}>
            <h2>2. Thời gian giao hàng</h2>
            <ul>
            <li>Nội thành (HCM, HN): 1-2 ngày làm việc.</li>
            <li>Ngoại thành & Tỉnh: 3-5 ngày làm việc.</li>
            </ul>
        </div>
        </div>
    );
};
export default ShippingPage;
import styles from './InfoPage.module.css';

const ReturnsPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Chính Sách Đổi Trả</h1>
        
        <div className={styles.section}>
            <h2>Điều kiện đổi trả</h2>
            <p>Sản phẩm được đổi trả trong vòng 30 ngày kể từ ngày nhận hàng nếu:</p>
            <ul>
            <li>Sản phẩm còn nguyên tem mác, chưa qua sử dụng.</li>
            <li>Sản phẩm bị lỗi do nhà sản xuất hoặc hư hỏng khi vận chuyển.</li>
            </ul>
        </div>
        <div className={styles.section}>
            <h2>Quy trình hoàn tiền</h2>
            <p>Tiền sẽ được hoàn về tài khoản ngân hàng của quý khách trong vòng 3-5 ngày làm việc sau khi chúng tôi nhận được hàng trả.</p>
        </div>
        </div>
    );
};
export default ReturnsPage;
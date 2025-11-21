import styles from './InfoPage.module.css';

const PaymentPage = () => {
    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Phương Thức Thanh Toán</h1>
        <div className={styles.section}>
            <h2>Các hình thức hỗ trợ</h2>
            <ul>
            <li><strong>COD:</strong> Thanh toán tiền mặt khi nhận hàng.</li>
            <li><strong>Chuyển khoản ngân hàng:</strong> QR Code, Internet Banking.</li>
            <li><strong>Ví điện tử:</strong> Momo, ZaloPay, VNPay.</li>
            <li><strong>Thẻ quốc tế:</strong> Visa, Mastercard.</li>
            </ul>
        </div>
        </div>
    );
};
export default PaymentPage;
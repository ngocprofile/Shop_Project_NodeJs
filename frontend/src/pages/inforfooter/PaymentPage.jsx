import { Banknote, CreditCard, QrCode, ShieldCheck, Smartphone } from 'lucide-react';
import styles from './InfoPage.module.css';

const PaymentPage = () => {
    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Phương Thức Thanh Toán</h1>
                <p className={styles.subtitle}>Đa dạng, An toàn và Tiện lợi</p>
            </div>

            <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
                
                {/* 1. COD */}
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Banknote size={24} color="#27ae60" /> 1. Thanh toán tiền mặt khi nhận hàng (COD)
                        </h3>
                        <p>Đây là phương thức thanh toán phổ biến và dễ dàng nhất:</p>
                        <ul style={{ paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
                            <li>Quý khách đặt hàng trên website và chọn phương thức <strong>"Thanh toán khi nhận hàng (COD)"</strong>.</li>
                            <li>Nhân viên vận chuyển sẽ giao hàng đến địa chỉ của quý khách.</li>
                            <li>Quý khách được quyền <strong>mở hàng kiểm tra</strong> (đồng kiểm) số lượng, mẫu mã, chất lượng.</li>
                            <li>Thanh toán tiền mặt trực tiếp cho nhân viên vận chuyển sau khi đã hài lòng với sản phẩm.</li>
                        </ul>
                    </div>
                </div>

                {/* 2. Chuyển khoản ngân hàng */}
                <div className={styles.card}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <QrCode size={24} color="#2980b9" /> 2. Chuyển khoản ngân hàng (QR Code)
                        </h3>
                        <p>Quý khách có thể chuyển khoản qua Internet Banking hoặc Mobile Banking. Đơn hàng sẽ được xác nhận ngay sau khi hệ thống nhận được tiền.</p>
                        
                        <div style={{ background: '#f0f7ff', border: '1px solid #cce5ff', borderRadius: '8px', padding: '20px', marginTop: '15px' }}>
                            <p style={{ fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>Thông tin tài khoản:</p>
                            <div style={{ display: 'grid', gap: '10px', fontSize: '15px' }}>
                                <div><strong>Ngân hàng:</strong> Techcombank (Chi nhánh TP.HCM)</div>
                                <div><strong>Số tài khoản:</strong> <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>1903 1234 567 890</span></div>
                                <div><strong>Chủ tài khoản:</strong> CONG TY TNHH STYLE CODE</div>
                                <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#c0392b' }}>
                                    * Nội dung chuyển khoản: <strong>[Mã đơn hàng] + [Số điện thoại]</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Ví điện tử & Thẻ quốc tế */}
                <div className={styles.grid} style={{ marginTop: '0', gap: '20px' }}>
                    <div className={styles.card} style={{ margin: 0 }}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Smartphone size={24} color="#8e44ad" /> 3. Ví điện tử
                            </h3>
                            <p>Hỗ trợ thanh toán siêu tốc qua các ứng dụng ví điện tử:</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                <span style={{ padding: '5px 10px', background: '#a50064', color: '#fff', borderRadius: '4px', fontSize: '13px' }}>Momo</span>
                                <span style={{ padding: '5px 10px', background: '#0068ff', color: '#fff', borderRadius: '4px', fontSize: '13px' }}>ZaloPay</span>
                                <span style={{ padding: '5px 10px', background: '#005baa', color: '#fff', borderRadius: '4px', fontSize: '13px' }}>VNPay QR</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card} style={{ margin: 0 }}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CreditCard size={24} color="#e67e22" /> 4. Thẻ Quốc tế
                            </h3>
                            <p>Chấp nhận thanh toán thẻ tín dụng/ghi nợ quốc tế:</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <span style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: '4px', fontWeight: 'bold' }}>VISA</span>
                                <span style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: '4px', fontWeight: 'bold' }}>Mastercard</span>
                                <span style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: '4px', fontWeight: 'bold' }}>JCB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cam kết bảo mật */}
            <div style={{ marginTop: '40px', textAlign: 'center', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                <ShieldCheck size={32} style={{ marginBottom: '10px', color: '#27ae60' }} />
                <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>Cam Kết Bảo Mật Thanh Toán</h3>
                <p style={{ fontSize: '14px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Mọi giao dịch thanh toán trực tuyến tại Style Code đều được bảo mật bằng mã hóa SSL. 
                    Chúng tôi tuyệt đối không lưu trữ thông tin thẻ của khách hàng. 
                    Quá trình thanh toán được thực hiện qua cổng thanh toán uy tín được Ngân hàng Nhà nước cấp phép.
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;
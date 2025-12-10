import { Cookie, Database, Eye, FileText, Lock, Shield, UserCheck } from 'lucide-react';
import styles from './InfoPage.module.css';

const SecurityPage = () => {
    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Chính Sách Bảo Mật Thông Tin</h1>
                <p className={styles.subtitle}>Style Code cam kết bảo vệ sự riêng tư và thông tin cá nhân của bạn</p>
            </div>

            {/* 1. Mục đích thu thập */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Database size={24} /> 1. Mục Đích Thu Thập Thông Tin
                </h2>
                <p>Việc thu thập dữ liệu trên website Style Code bao gồm: Họ tên, Email, Số điện thoại, Địa chỉ nhận hàng. Đây là các thông tin bắt buộc để chúng tôi:</p>
                <ul>
                    <li>Xử lý đơn hàng và giao hàng đến đúng địa chỉ.</li>
                    <li>Thông báo về việc giao hàng và hỗ trợ khách hàng.</li>
                    <li>Cung cấp thông tin liên quan đến sản phẩm (nếu khách hàng đăng ký nhận tin).</li>
                    <li>Xử lý các yêu cầu đổi trả, bảo hành hoặc giải quyết khiếu nại.</li>
                </ul>
            </div>

            {/* 2. Phạm vi sử dụng */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Eye size={24} /> 2. Phạm Vi Sử Dụng Thông Tin
                </h2>
                <p>Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong nội bộ Style Code. Chúng tôi có thể chia sẻ tên, số điện thoại và địa chỉ của quý khách cho <strong>dịch vụ chuyển phát nhanh</strong> (như GHTK, GHN, Viettel Post) để có thể giao hàng cho quý khách.</p>
            </div>

            {/* 3. Thời gian lưu trữ */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={24} /> 3. Thời Gian Lưu Trữ
                </h2>
                <p>Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của Style Code.</p>
            </div>

            {/* 4. Cam kết bảo mật */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Lock size={24} /> 4. Cam Kết Bảo Mật
                </h2>
                <p>Chúng tôi áp dụng các biện pháp kỹ thuật và an ninh để ngăn chặn truy cập trái phép hoặc trái pháp luật:</p>
                <ul>
                    <li>Website được bảo mật bằng chứng chỉ <strong>SSL (Secure Sockets Layer)</strong> giúp mã hóa dữ liệu truyền tải.</li>
                    <li>Chúng tôi <strong>tuyệt đối không lưu trữ thông tin thẻ tín dụng/thẻ ngân hàng</strong> của khách hàng. Mọi giao dịch thanh toán trực tuyến đều được xử lý qua các cổng thanh toán uy tín (như VNPay, Momo, ZaloPay) được Ngân hàng Nhà nước cấp phép.</li>
                    <li>Chúng tôi cam kết không bán, trao đổi hay chia sẻ thông tin dẫn đến việc làm lộ thông tin cá nhân của khách hàng vì mục đích thương mại.</li>
                </ul>
            </div>

            {/* 5. Quyền lợi khách hàng */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <UserCheck size={24} /> 5. Quyền Lợi Của Khách Hàng
                </h2>
                <p>Bạn có quyền yêu cầu truy cập vào dữ liệu cá nhân của mình, có quyền yêu cầu chúng tôi sửa lại những sai sót trong dữ liệu của bạn mà không mất phí. Bất cứ lúc nào bạn cũng có quyền yêu cầu chúng tôi ngưng sử dụng dữ liệu cá nhân của bạn cho mục đích tiếp thị.</p>
            </div>

            {/* 6. Cookies */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Cookie size={24} /> 6. Sử Dụng Cookie
                </h2>
                <p>Style Code cung cấp các tập tin cookie hoặc các công nghệ tương tự, nhằm thu thập các thông tin như: lịch sử truy cập, các lựa chọn của khách hàng khi truy cập và sử dụng tính năng của website... nhằm tăng trải nghiệm bảo mật và giúp chúng tôi hiểu rõ nhu cầu người dùng hơn.</p>
            </div>

            {/* Footer liên hệ */}
            <div style={{ marginTop: '40px', padding: '20px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', gap: '15px' }}>
                <Shield size={40} color="#333" />
                <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>Đơn vị thu thập và quản lý thông tin</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
                        <strong>Công ty TNHH Style Code Việt Nam</strong><br/>
                        Địa chỉ: 123 Lê Lợi, Quận 1, TP.HCM<br/>
                        Email: privacy@stylecode.vn<br/>
                        Hotline: 1900 1234
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
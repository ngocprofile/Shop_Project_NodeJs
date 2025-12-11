import { AlertTriangle, Copyright, Gavel, ShoppingCart, User } from 'lucide-react';
import styles from './InfoPage.module.css';

const TermsPage = () => {
    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Điều Khoản Sử Dụng</h1>
                <p className={styles.subtitle}>Cập nhật lần cuối: 01/01/2025</p>
                <p style={{ fontSize: '14px', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                    Chào mừng bạn đến với website Style Code. Khi bạn truy cập vào trang web của chúng tôi, có nghĩa là bạn đồng ý với các điều khoản này. 
                    Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào.
                </p>
            </div>

            {/* 1. Tài khoản & Bảo mật */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={24} /> 1. Tài Khoản & Đăng Ký
                </h2>
                <p>Khi sử dụng dịch vụ tại Style Code, bạn cần đảm bảo:</p>
                <ul>
                    <li>Cung cấp thông tin cá nhân (Họ tên, SĐT, Email, Địa chỉ) chính xác và đầy đủ để phục vụ quá trình xử lý đơn hàng.</li>
                    <li>Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu của mình. Style Code không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh do việc lộ mật khẩu từ phía người dùng.</li>
                    <li>Thông báo ngay cho chúng tôi nếu phát hiện tài khoản bị truy cập trái phép.</li>
                </ul>
            </div>

            {/* 2. Quy định về đặt hàng & Giá cả */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShoppingCart size={24} /> 2. Đặt Hàng & Giá Cả
                </h2>
                <ul>
                    <li><strong>Giá sản phẩm:</strong> Giá niêm yết trên website là giá bán cuối cùng đã bao gồm thuế GTGT (VAT). Giá chưa bao gồm phí vận chuyển (được tính ở bước thanh toán).</li>
                    <li><strong>Xác nhận đơn hàng:</strong> Chúng tôi có quyền từ chối hoặc hủy đơn hàng của bạn vì bất kỳ lý do gì liên quan đến lỗi kỹ thuật, hệ thống một cách khách quan vào bất kỳ lúc nào (ví dụ: lỗi hiển thị giá 0đ, hết hàng nhưng hệ thống chưa cập nhật).</li>
                    <li><strong>Giới hạn số lượng:</strong> Để đảm bảo công bằng trong các đợt Sale lớn, Style Code có quyền giới hạn số lượng sản phẩm tối đa mà một khách hàng được mua.</li>
                </ul>
            </div>

            {/* 3. Quyền sở hữu trí tuệ */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Copyright size={24} /> 3. Quyền Sở Hữu Trí Tuệ
                </h2>
                <p>Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung thông tin và tất cả các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch phần mềm, mã nguồn và phần mềm cơ bản đều là tài sản của <strong>Style Code</strong>.</p>
                <p>Nghiêm cấm mọi hành vi sao chép, sử dụng lại nội dung cho mục đích thương mại mà không được sự đồng ý bằng văn bản của chúng tôi.</p>
            </div>

            {/* 4. Trách nhiệm người dùng */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertTriangle size={24} /> 4. Các Hành Vi Bị Nghiêm Cấm
                </h2>
                <p>Khách hàng tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào để can thiệp, xâm nhập bất hợp pháp vào hệ thống hay làm thay đổi cấu trúc dữ liệu tại website Style Code. Nghiêm cấm việc:</p>
                <ul>
                    <li>Đặt đơn hàng ảo, đơn hàng giả mạo.</li>
                    <li>Phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống máy chủ.</li>
                    <li>Đưa ra các nhận xét, đánh giá có ý xúc phạm, quấy rối, làm phiền hoặc có bất kỳ hành vi thiếu văn hóa nào đối với người khác.</li>
                </ul>
            </div>

            {/* 5. Luật pháp áp dụng */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Gavel size={24} /> 5. Luật Pháp & Giải Quyết Tranh Chấp
                </h2>
                <p>Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh bởi luật pháp Việt Nam và Tòa án có thẩm quyền tại Việt Nam sẽ giải quyết bất kỳ tranh chấp nào phát sinh từ việc sử dụng trái phép trang web này.</p>
            </div>
            
            <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px', fontStyle: 'italic', color: '#666', fontSize: '14px' }}>
                <p>Mọi thắc mắc về Điều khoản sử dụng, vui lòng liên hệ bộ phận pháp lý qua email: <a href="mailto:legal@stylecode.vn" style={{color: '#000'}}>legal@stylecode.vn</a></p>
            </div>
        </div>
    );
};

export default TermsPage;
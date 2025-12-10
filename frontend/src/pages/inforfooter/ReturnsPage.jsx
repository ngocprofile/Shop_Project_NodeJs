import { AlertTriangle, CheckCircle, DollarSign, RefreshCcw, Truck, XCircle } from 'lucide-react';
import styles from './InfoPage.module.css';

const ReturnsPage = () => {
    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Chính Sách Đổi Trả & Hoàn Tiền</h1>
                <p className={styles.subtitle}>Cam kết hài lòng 100% - Hỗ trợ đổi trả nhanh chóng trong 30 ngày</p>
            </div>

            {/* 1. Điều kiện đổi trả */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={24} color="#27ae60" /> 1. Điều Kiện Áp Dụng
                </h2>
                <p>Khách hàng được quyền đổi/trả hàng trong vòng <strong>30 ngày</strong> kể từ ngày nhận hàng nếu thỏa mãn các điều kiện sau:</p>
                <ul style={{ lineHeight: '1.8' }}>
                    <li>Sản phẩm còn nguyên vẹn, giữ nguyên tem mác, hộp/bao bì sản phẩm.</li>
                    <li>Sản phẩm chưa qua sử dụng, không bị dơ bẩn, không có mùi lạ (nước hoa, mồ hôi...) và chưa qua giặt ủi.</li>
                    <li>Có hóa đơn mua hàng hoặc thông tin đơn hàng (SĐT, mã đơn) trên hệ thống.</li>
                    <li>Sản phẩm bị lỗi kỹ thuật do nhà sản xuất (rách, tuột chỉ, phai màu...) hoặc giao sai mẫu mã, kích thước.</li>
                </ul>
            </div>

            {/* 2. Sản phẩm KHÔNG áp dụng */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <XCircle size={24} color="#e74c3c" /> 2. Sản Phẩm Không Áp Dụng Đổi Trả
                </h2>
                <div style={{ background: '#fff5f5', border: '1px solid #feb2b2', padding: '20px', borderRadius: '8px', color: '#c53030' }}>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>Đồ lót, đồ bơi, vớ (tất) vì lý do vệ sinh an toàn.</li>
                        <li>Phụ kiện: Trang sức, kính mắt, thắt lưng (trừ khi có lỗi sản xuất).</li>
                        <li>Sản phẩm thuộc chương trình <strong>Final Sale / Xả kho</strong> (đã được ghi chú "Không đổi trả" khi mua).</li>
                        <li>Sản phẩm quà tặng kèm theo.</li>
                    </ul>
                </div>
            </div>

            {/* 3. Chi phí vận chuyển */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Truck size={24} /> 3. Chi Phí Vận Chuyển Đổi Trả
                </h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Lý do đổi trả</th>
                            <th>Chi phí vận chuyển</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Lỗi do Style Code:</strong><br/>(Hàng lỗi, giao sai size/mẫu, hư hỏng khi vận chuyển)</td>
                            <td><span style={{ color: '#27ae60', fontWeight: 'bold' }}>MIỄN PHÍ 100%</span><br/>(Cả chiều đi và chiều về)</td>
                        </tr>
                        <tr>
                            <td><strong>Nhu cầu cá nhân:</strong><br/>(Khách muốn đổi size, đổi màu, đổi mẫu khác do không ưng ý)</td>
                            <td><strong>Khách hàng thanh toán</strong><br/>(Phí ship 2 chiều theo giá bưu điện)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 4. Quy trình thực hiện */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <RefreshCcw size={24} /> 4. Quy Trình Thực Hiện
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ background: '#000', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
                        <div>
                            <strong>Bước 1: Đăng ký đổi trả</strong>
                            <p style={{ margin: '5px 0' }}>Liên hệ Hotline 1900 1234 hoặc nhắn tin Fanpage để thông báo yêu cầu đổi trả.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ background: '#000', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
                        <div>
                            <strong>Bước 2: Gửi hàng về Style Code</strong>
                            <p style={{ margin: '5px 0' }}>Đóng gói sản phẩm cẩn thận. Gửi về địa chỉ: <em>123 Lê Lợi, Q.1, TP.HCM (Người nhận: Kho Online Style Code - 0909 111 222)</em>.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ background: '#000', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
                        <div>
                            <strong>Bước 3: Kiểm tra & Xử lý</strong>
                            <p style={{ margin: '5px 0' }}>Sau khi nhận hàng, chúng tôi sẽ kiểm tra tình trạng sản phẩm (trong vòng 24h) và tiến hành đổi hàng mới hoặc hoàn tiền theo yêu cầu.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Chính sách hoàn tiền */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <DollarSign size={24} /> 5. Chính Sách Hoàn Tiền
                </h2>
                <p>Trong trường hợp hết size/mẫu để đổi hoặc sản phẩm lỗi không thể khắc phục, Style Code sẽ hoàn tiền cho quý khách:</p>
                <ul>
                    <li><strong>Phương thức hoàn tiền:</strong> Chuyển khoản ngân hàng.</li>
                    <li><strong>Thời gian xử lý:</strong> Từ 3 - 5 ngày làm việc (không tính Thứ 7, CN) kể từ khi chúng tôi xác nhận sản phẩm trả về đạt yêu cầu.</li>
                </ul>
                
                <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'start' }}>
                    <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ margin: 0, fontSize: '14px' }}>
                        <strong>Lưu ý:</strong> Với các đơn hàng thanh toán bằng thẻ tín dụng, thời gian tiền hoàn về tài khoản có thể mất từ 15-30 ngày tùy theo quy định của ngân hàng phát hành thẻ.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;
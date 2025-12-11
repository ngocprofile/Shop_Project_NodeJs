import { AlertCircle, Clock, MapPin, PackageCheck, Truck } from 'lucide-react';
import styles from './InfoPage.module.css';

const ShippingPage = () => {
    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Chính Sách Vận Chuyển & Giao Nhận</h1>
                <p className={styles.subtitle}>Style Code cam kết mang sản phẩm đến tay bạn nhanh chóng và an toàn nhất</p>
            </div>

            {/* 1. Phí vận chuyển */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Truck size={24} /> 1. Biểu Phí Vận Chuyển
                </h2>
                <p>Style Code áp dụng chính sách phí vận chuyển đồng giá trên toàn quốc để đảm bảo sự đơn giản và tiện lợi cho khách hàng:</p>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Giá trị đơn hàng</th>
                            <th>Khu vực</th>
                            <th>Phí vận chuyển</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Từ 500.000đ trở lên</strong></td>
                            <td>Toàn quốc</td>
                            <td><span style={{ color: '#27ae60', fontWeight: 'bold' }}>MIỄN PHÍ</span></td>
                        </tr>
                        <tr>
                            <td>Dưới 500.000đ</td>
                            <td>Nội thành TP.HCM & HN</td>
                            <td>30.000đ</td>
                        </tr>
                        <tr>
                            <td>Dưới 500.000đ</td>
                            <td>Các tỉnh thành khác</td>
                            <td>35.000đ</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 2. Thời gian giao hàng */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={24} /> 2. Thời Gian Xử Lý & Giao Hàng
                </h2>
                <p>Tổng thời gian nhận hàng = Thời gian xử lý đơn + Thời gian vận chuyển.</p>
                
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '15px', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                        <strong>Thời gian xử lý:</strong> Đơn hàng đặt trước 16:00 sẽ được đóng gói và bàn giao cho đơn vị vận chuyển trong ngày. Đơn đặt sau 16:00 sẽ được xử lý vào ngày hôm sau.
                    </li>
                    <li style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                        <strong>Thời gian vận chuyển dự kiến:</strong>
                        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '5px' }}><strong>Nội thành (TP.HCM, Hà Nội):</strong> 1 - 2 ngày làm việc.</li>
                            <li style={{ marginBottom: '5px' }}><strong>Khu vực miền Nam & Miền Trung:</strong> 2 - 3 ngày làm việc.</li>
                            <li style={{ marginBottom: '5px' }}><strong>Khu vực miền Bắc & Huyện xã:</strong> 3 - 5 ngày làm việc.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            {/* 3. Chính sách kiểm hàng */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <PackageCheck size={24} /> 3. Chính Sách Kiểm Hàng (Đồng Kiểm)
                </h2>
                <p>
                    Để đảm bảo quyền lợi tối đa cho khách hàng, Style Code áp dụng chính sách <strong>CHO PHÉP ĐỒNG KIỂM</strong> khi nhận hàng.
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                    <li>Bạn được quyền mở gói hàng kiểm tra số lượng, màu sắc, kích cỡ và tình trạng sản phẩm trước khi thanh toán cho shipper.</li>
                    <li><strong>Lưu ý:</strong> Không hỗ trợ mặc thử sản phẩm khi nhận hàng (để đảm bảo vệ sinh cho sản phẩm mới).</li>
                    <li>Nếu sản phẩm không đúng như đơn đặt hàng hoặc bị lỗi, bạn có quyền từ chối nhận hàng mà không mất chi phí nào.</li>
                </ul>
            </div>

            {/* 4. Đơn vị vận chuyển */}
            <div className={styles.section}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={24} /> 4. Đơn Vị Vận Chuyển
                </h2>
                <p>Chúng tôi hợp tác với các đơn vị vận chuyển uy tín nhất hiện nay để đảm bảo hàng hóa được giao nhanh chóng và an toàn:</p>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '15px' }}>
                    {['Giao Hàng Tiết Kiệm', 'Giao Hàng Nhanh (GHN)', 'Viettel Post', 'J&T Express'].map((dv, i) => (
                        <span key={i} style={{ 
                            padding: '8px 16px', 
                            border: '1px solid #ddd', 
                            borderRadius: '4px', 
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#555'
                        }}>
                            {dv}
                        </span>
                    ))}
                </div>
            </div>

            {/* 5. Lưu ý */}
            <div className={styles.section} style={{ marginTop: '40px' }}>
                <div style={{ 
                    background: '#fff3cd', 
                    border: '1px solid #ffeeba', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    color: '#856404' 
                }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', marginTop: 0 }}>
                        <AlertCircle size={20} /> Lưu ý quan trọng
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>Trong các đợt Sale lớn hoặc Lễ/Tết, thời gian giao hàng có thể chậm hơn 1-2 ngày do quá tải đơn hàng.</li>
                        <li>Vui lòng giữ điện thoại để shipper liên hệ. Nếu không liên lạc được 3 lần, đơn hàng sẽ được hoàn về kho.</li>
                        <li>Mọi vấn đề phát sinh về vận chuyển, vui lòng liên hệ Hotline <strong>1900 1234</strong> để được hỗ trợ ngay.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
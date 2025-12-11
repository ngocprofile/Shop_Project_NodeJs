import { Heart, Leaf, ShieldCheck, Target } from 'lucide-react';
import styles from './InfoPage.module.css';

const AboutPage = () => {
    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 className={styles.title}>Về Style Code</h1>
                <p className={styles.subtitle}>
                    "Không chỉ là thời trang, đó là phong cách sống."
                </p>
                <hr style={{ width: '60px', margin: '20px auto', borderTop: '2px solid #000' }} />
            </div>

            {/* Story Section */}
            <div className={styles.section}>
                <h2>Khởi Nguồn</h2>
                <p>
                    Được thành lập vào năm 2025 tại Việt Nam, <strong>Style Code</strong> ra đời từ niềm đam mê mãnh liệt với phong cách tối giản (Minimalism). Chúng tôi nhận thấy rằng giữa nhịp sống hối hả, một bộ trang phục đẹp không cần phải quá cầu kỳ, mà quan trọng là sự thoải mái, tinh tế và khả năng thể hiện cái "tôi" của người mặc.
                </p>
                <p>
                    Từ một cửa hàng nhỏ với những thiết kế áo thun cơ bản, Style Code đã và đang vươn mình trở thành điểm đến tin cậy cho những tín đồ thời trang yêu thích sự đơn giản nhưng không đơn điệu.
                </p>
            </div>

            {/* Mission & Vision Section */}
            <div className={styles.section}>
                <h2>Tầm Nhìn & Sứ Mệnh</h2>
                <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Target size={20} /> Tầm nhìn
                        </h3>
                        <p>Trở thành thương hiệu thời trang Local Brand hàng đầu Việt Nam, định hình phong cách Lifestyle hiện đại cho giới trẻ.</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Heart size={20} /> Sứ mệnh
                        </h3>
                        <p>Mang đến sự tự tin cho khách hàng thông qua những sản phẩm chất lượng cao, thiết kế vượt thời gian với mức giá hợp lý nhất.</p>
                    </div>
                </div>
            </div>

            {/* Core Values Section (Dùng Grid) */}
            <div className={styles.section}>
                <h2>Giá Trị Cốt Lõi</h2>
                <div className={styles.grid}>
                    {/* Value 1 */}
                    <div className={styles.card} style={{ border: 'none', boxShadow: 'none', background: '#f9f9f9' }}>
                        <div className={styles.cardContent} style={{ textAlign: 'center' }}>
                            <ShieldCheck size={32} style={{ marginBottom: '15px', color: '#333' }} />
                            <h3 className={styles.cardTitle}>Chất Lượng</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                Tỉ mỉ trong từng đường kim mũi chỉ. Chúng tôi kiểm soát chặt chẽ từ khâu chọn vải đến khi sản phẩm đến tay bạn.
                            </p>
                        </div>
                    </div>

                    {/* Value 2 */}
                    <div className={styles.card} style={{ border: 'none', boxShadow: 'none', background: '#f9f9f9' }}>
                        <div className={styles.cardContent} style={{ textAlign: 'center' }}>
                            <Leaf size={32} style={{ marginBottom: '15px', color: '#333' }} />
                            <h3 className={styles.cardTitle}>Bền Vững</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                Hướng tới thời trang bền vững, ưu tiên các chất liệu thân thiện với môi trường và quy trình sản xuất xanh.
                            </p>
                        </div>
                    </div>

                    {/* Value 3 */}
                    <div className={styles.card} style={{ border: 'none', boxShadow: 'none', background: '#f9f9f9' }}>
                        <div className={styles.cardContent} style={{ textAlign: 'center' }}>
                            <Heart size={32} style={{ marginBottom: '15px', color: '#333' }} />
                            <h3 className={styles.cardTitle}>Tận Tâm</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>
                                Khách hàng là trung tâm. Style Code luôn lắng nghe và hỗ trợ bạn với thái độ phục vụ chuyên nghiệp nhất.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div style={{ marginTop: '60px', textAlign: 'center', background: '#111', color: '#fff', padding: '40px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Tham Gia Cộng Đồng Style Code</h3>
                <p style={{ marginBottom: '20px', color: '#ccc' }}>Đừng bỏ lỡ những bộ sưu tập mới nhất và ưu đãi độc quyền.</p>
                {/* Nút này có thể Link đến trang đăng ký hoặc Shop */}
                <button style={{ 
                    background: '#fff', 
                    color: '#000', 
                    border: 'none', 
                    padding: '12px 30px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}>
                    Khám Phá Ngay
                </button>
            </div>
        </div>
    );
};

export default AboutPage;
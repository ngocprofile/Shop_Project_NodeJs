import { Briefcase, Clock, Gift, Mail, MapPin, Rocket, Star, Users } from 'lucide-react';
import styles from './InfoPage.module.css';

const CareersPage = () => {
    // Dữ liệu công việc (Dễ dàng thêm sửa xóa sau này)
    const jobs = [
        {
            id: 1,
            title: "Cửa Hàng Trưởng (Store Manager)",
            location: "Quận 1, TP.HCM",
            type: "Full-time",
            salary: "12.000.000đ - 15.000.000đ + KPI",
            deadline: "30/12/2025"
        },
        {
            id: 2,
            title: "Nhân Viên Tư Vấn Bán Hàng",
            location: "Cầu Giấy, Hà Nội",
            type: "Xoay ca (Sáng/Chiều/Tối)",
            salary: "6.000.000đ - 8.000.000đ + Hoa hồng",
            deadline: "Liên tục tuyển"
        },
        {
            id: 3,
            title: "Content Creator (Fashion/Lifestyle)",
            location: "Văn phòng TP.HCM",
            type: "Full-time",
            salary: "10.000.000đ - 15.000.000đ",
            deadline: "15/12/2025"
        },
        {
            id: 4,
            title: "Chuyên viên Chăm sóc Khách hàng",
            location: "Online / Remote",
            type: "Full-time",
            salary: "8.000.000đ - 10.000.000đ",
            deadline: "20/12/2025"
        }
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 className={styles.title}>Gia Nhập Đội Ngũ Style Code</h1>
                <p className={styles.subtitle}>Cùng chúng tôi kiến tạo phong cách và phát triển sự nghiệp của bạn</p>
            </div>

            {/* Phần 1: Tại sao chọn chúng tôi? (Quyền lợi) */}
            <div className={styles.section}>
                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Tại Sao Chọn Style Code?</h2>
                <div className={styles.grid}>
                    <div className={styles.card} style={{ border: 'none', background: '#f8f9fa', textAlign: 'center' }}>
                        <div className={styles.cardContent}>
                            <Users size={32} color="#333" style={{ marginBottom: '10px' }} />
                            <h3 className={styles.cardTitle}>Môi Trường Trẻ Trung</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>Làm việc với những đồng nghiệp Gen Z năng động, sáng tạo và cởi mở.</p>
                        </div>
                    </div>
                    <div className={styles.card} style={{ border: 'none', background: '#f8f9fa', textAlign: 'center' }}>
                        <div className={styles.cardContent}>
                            <Rocket size={32} color="#333" style={{ marginBottom: '10px' }} />
                            <h3 className={styles.cardTitle}>Lộ Trình Thăng Tiến</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>Cơ hội trở thành Cửa hàng trưởng hoặc Quản lý vùng sau 6 tháng.</p>
                        </div>
                    </div>
                    <div className={styles.card} style={{ border: 'none', background: '#f8f9fa', textAlign: 'center' }}>
                        <div className={styles.cardContent}>
                            <Gift size={32} color="#333" style={{ marginBottom: '10px' }} />
                            <h3 className={styles.cardTitle}>Đãi Ngộ Hấp Dẫn</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>Thưởng doanh số, lương tháng 13, voucher mua sắm nội bộ giảm 50%.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần 2: Danh sách vị trí đang tuyển */}
            <div className={styles.section} style={{ marginTop: '60px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Vị Trí Đang Tuyển Dụng</h2>
                <div className={styles.grid}>
                    {jobs.map((job) => (
                        <div key={job.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                    <h3 className={styles.cardTitle} style={{ fontSize: '18px', margin: 0 }}>{job.title}</h3>
                                    <span style={{ 
                                        fontSize: '12px', 
                                        background: '#eee', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontWeight: '600' 
                                    }}>
                                        {job.type}
                                    </span>
                                </div>
                                
                                <div style={{ color: '#555', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MapPin size={16} /> {job.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Briefcase size={16} /> {job.salary}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Clock size={16} /> Hạn nộp: {job.deadline}
                                    </div>
                                </div>

                                <button style={{ 
                                    width: '100%',
                                    padding: '10px 16px', 
                                    background: '#000', 
                                    color: '#fff', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    borderRadius: '4px'
                                }}>
                                    Xem Chi Tiết & Ứng Tuyển
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Phần 3: Footer tuyển dụng (CTA) */}
            <div style={{ 
                marginTop: '60px', 
                padding: '40px', 
                background: '#111', 
                color: '#fff', 
                borderRadius: '8px', 
                textAlign: 'center' 
            }}>
                <Star size={40} style={{ marginBottom: '20px' }} />
                <h2 style={{ marginBottom: '10px', color: '#fff' }}>Chưa tìm thấy vị trí phù hợp?</h2>
                <p style={{ color: '#ccc', marginBottom: '30px' }}>
                    Đừng ngần ngại gửi CV của bạn vào kho dữ liệu nhân tài của chúng tôi.<br/>
                    Chúng tôi sẽ liên hệ ngay khi có vị trí phù hợp với năng lực của bạn.
                </p>
                <a 
                    href="mailto:hr@stylecode.vn" 
                    style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#fff', 
                        color: '#000', 
                        padding: '12px 30px', 
                        textDecoration: 'none', 
                        fontWeight: 'bold', 
                        borderRadius: '4px'
                    }}
                >
                    <Mail size={18} /> Gửi CV ngay: hr@stylecode.vn
                </a>
            </div>
        </div>
    );
};

export default CareersPage;
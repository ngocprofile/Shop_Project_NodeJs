import { Check, Info, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../api';
import styles from './VoucherDashboard.module.css'; // File CSS mới

// === HELPER COMPONENTS (Trong cùng 1 file) ===

/**
 * 1. Component Card (Voucher)
 * Hiển thị thông tin 1 voucher
 */
const VoucherCard = ({ voucher, isCollected, onCollect, onViewDetails }) => {
    
    // Hàm helper để định dạng loại giảm giá
    const formatVoucherType = () => {
        const { discountType, discountValue, maxDiscountAmount } = voucher;
        if (discountType === 'freeship') {
            if (maxDiscountAmount > 0) {
                return `Miễn phí vận chuyển (Giảm tối đa ${maxDiscountAmount.toLocaleString()}đ)`;
            }
            return "Miễn phí vận chuyển";
        }
        if (discountType === 'fixed') {
            return `Giảm ${discountValue.toLocaleString()} VND`;
        }
        if (discountType === 'percentage') {
            if (maxDiscountAmount > 0) {
                return `Giảm ${discountValue}% (Tối đa ${maxDiscountAmount.toLocaleString()} VND)`;
            }
            return `Giảm ${discountValue}%`;
        }
        return "Ưu đãi";
    };

    // Hàm helper định dạng ngày
    const formatEndDate = () => {
        return new Date(voucher.endDate).toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    return (
        <div className={styles.voucherCard}>
            {/* Phần logo (icon) */}
            <div className={styles.cardLogo}>
                <span className={styles.logoText}>{voucher.discountType === 'freeship' ? 'SHIP' : 'SALE'}</span>
            </div>

            {/* Phần nội dung */}
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{voucher.title}</h3>
                <p className={styles.cardType}>{formatVoucherType()}</p>
                <p className={styles.cardExpiry}>HSD: {formatEndDate()}</p>
                <a 
                    href="#" 
                    className={styles.detailsLink} 
                    onClick={(e) => { e.preventDefault(); onViewDetails(voucher); }}
                >
                    <Info size={14} /> Điều kiện
                </a>
            </div>

            {/* Phần nút bấm */}
            <div className={styles.cardActions}>
                <button
                    className={isCollected ? styles.buttonCollected : styles.buttonCollect}
                    onClick={() => onCollect(voucher._id)}
                    disabled={isCollected}
                >
                    {isCollected ? (
                        <>
                            <Check size={18} /> Đã lưu
                        </>
                    ) : (
                        'Lưu'
                    )}
                </button>
            </div>
        </div>
    );
};

/**
 * 2. Component Modal (Chi tiết)
 * Hiển thị chi tiết voucher khi bấm "Điều kiện"
 */
const VoucherModal = ({ voucher, onClose }) => {
    if (!voucher) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Chi tiết Ưu đãi</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <h4>{voucher.title}</h4>
                    <p>{voucher.description || "Không có mô tả chi tiết."}</p>
                    <ul className={styles.detailList}>
                        <li>
                            <strong>Hạn sử dụng:</strong> 
                            {new Date(voucher.endDate).toLocaleString('vi-VN')}
                        </li>
                        <li>
                            <strong>Đơn hàng tối thiểu:</strong> 
                            {voucher.minOrderValue.toLocaleString()} VND
                        </li>
                        <li>
                            <strong>Giới hạn/người:</strong> 
                            {voucher.perUserLimit} lần
                        </li>
                        <li>
                            <strong>Tổng lượt dùng:</strong> 
                            {voucher.usageLimit === 0 ? 'Không giới hạn' : `${voucher.usageLimit} lượt`}
                        </li>
                    </ul>
                    <p className={styles.modalNote}>
                        Mã voucher (nếu có) sẽ được tự động áp dụng tại trang thanh toán cho các sản phẩm đủ điều kiện.
                    </p>
                </div>
            </div>
        </div>
    );
};


/**
 * === COMPONENT CHÍNH ===
 * Trang Kho Voucher
 */
const VoucherDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    
    // Dùng Set để tối ưu tốc độ kiểm tra "Đã lưu"
    const [myCollectedIds, setMyCollectedIds] = useState(new Set());
    
    // State cho Modal
    const [modalVoucher, setModalVoucher] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            setLoading(true);
            try {
                // Gọi 2 API song song
                const [dashboardRes, profileRes] = await Promise.all([
                    api.get('/vouchers/dashboard'),
                    api.get('/users/profile') // Để lấy 'collectedVouchers'
                ]);
                
                setDashboardData(dashboardRes.data);
                
                // Lấy ID từ 'collectedVouchers' của user
                if (profileRes.data.collectedVouchers) {
                    // (profileRes.data.collectedVouchers có thể chỉ là [id1, id2] 
                    // hoặc [{_id: id1}, {_id: id2}] tùy vào .populate()
                    // Code này xử lý cả 2 trường hợp)
                    const ids = profileRes.data.collectedVouchers.map(v => v._id || v);
                    setMyCollectedIds(new Set(ids));
                }
                
            } catch (err) {
                // Giả sử lỗi 401 (chưa đăng nhập) thì vẫn cho xem voucher
                if (err.response && err.response.status === 401) {
                     // Vẫn tải dashboard
                    const dashboardRes = await api.get('/vouchers/dashboard');
                    setDashboardData(dashboardRes.data);
                } else {
                    setError("Không thể tải kho voucher. Vui lòng thử lại.");
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    // Xử lý "Lưu" voucher
    const handleCollect = async (voucherId) => {
        // (Đây là logic 'Optimistic Update' - giả định thành công ngay)
        // 1. Cập nhật UI ngay lập tức
        setMyCollectedIds(prevIds => new Set(prevIds).add(voucherId));

        // 2. Gọi API
        try {
            await api.post(`/users/collect-voucher/${voucherId}`);
            // (Thành công, không cần làm gì thêm)
        } catch (err) {
            alert(err.response?.data?.message || 'Lưu thất bại. Có thể bạn chưa đăng nhập?');
            // 3. Nếu lỗi, trả lại trạng thái cũ
            setMyCollectedIds(prevIds => {
                const newIds = new Set(prevIds);
                newIds.delete(voucherId);
                return newIds;
            });
        }
    };

    // Xử lý Modal
    const openModal = (voucher) => setModalVoucher(voucher);
    const closeModal = () => setModalVoucher(null);

    // Hàm render 1 khu vực
    const renderSection = (title, vouchers) => {
        if (!vouchers || vouchers.length === 0) {
            return null; // Ẩn nếu không có voucher
        }
        
        return (
            <section className={styles.section}>
                <h2 className={styles.sectionHeader}>{title}</h2>
                <div className={styles.voucherGrid}>
                    {vouchers.map(voucher => (
                        <VoucherCard
                            key={voucher._id}
                            voucher={voucher}
                            isCollected={myCollectedIds.has(voucher._id)}
                            onCollect={handleCollect}
                            onViewDetails={openModal}
                        />
                    ))}
                </div>
            </section>
        );
    };

    // --- Render chính ---
    if (loading) {
        return <div className={styles.loadingState}><Loader2 className="spin-icon" /> Đang tải...</div>;
    }

    if (error) {
        return <div className={styles.errorState}>{error}</div>;
    }

    if (!dashboardData) {
        return <div className={styles.errorState}>Không có dữ liệu.</div>;
    }

    // Kiểm tra xem có voucher nào không
    const hasAnyVouchers = 
        dashboardData.newVouchers?.length > 0 ||
        dashboardData.expiringSoon?.length > 0 ||
        dashboardData.freeshipVouchers?.length > 0 ||
        dashboardData.sitewideVouchers?.length > 0 ||
        dashboardData.otherVouchers?.length > 0;

    return (
        <div className={styles.dashboardPage}>
            <h1>Kho Voucher</h1>

            {!hasAnyVouchers && (
                <div className={styles.emptyState}>
                    <p>Hiện tại không có voucher nào. Vui lòng quay lại sau!</p>
                </div>
            )}

            {renderSection("Voucher Mới", dashboardData.newVouchers)}
            {renderSection("Sắp hết hạn", dashboardData.expiringSoon)}
            {renderSection("Miễn phí vận chuyển", dashboardData.freeshipVouchers)}
            {renderSection("Toàn ngành hàng", dashboardData.sitewideVouchers)}
            {renderSection("Ưu đãi khác", dashboardData.otherVouchers)}

            {/* Modal (chỉ render khi cần) */}
            <VoucherModal voucher={modalVoucher} onClose={closeModal} />
        </div>
    );
};

export default VoucherDashboard;
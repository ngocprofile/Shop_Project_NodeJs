import { Info, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserProfile.module.css';

const VoucherModal = ({ voucher, onClose }) => {
    if (!voucher) return null;
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Chi tiết Ưu đãi</h3>
                    <button className={styles.closeButton} onClick={onClose}><X size={24} /></button>
                </div>
                <div className={styles.modalBody}>
                    <h4>{voucher.title}</h4>
                    <p>{voucher.description}</p>
                    <ul className={styles.detailList}>
                        <li><strong>Hạn sử dụng:</strong> {new Date(voucher.endDate).toLocaleString('vi-VN')}</li>
                        <li><strong>Đơn tối thiểu:</strong> {voucher.minOrderValue.toLocaleString()} VND</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const WalletVoucherCard = ({ voucher, onViewDetails }) => {
    const formatEndDate = () => new Date(voucher.endDate).toLocaleDateString('vi-VN');
    const typeLabel = voucher.discountType === 'freeship' ? 'SHIP' : 'SALE';
    
    return (
        <div className={styles.walletVoucherCard}>
            <div className={styles.walletCardLogo}><span>{typeLabel}</span></div>
            <div className={styles.walletCardContent}>
                <h4 className={styles.walletCardTitle}>{voucher.title}</h4>
                <p className={styles.walletCardExpiry}>HSD: {formatEndDate()}</p>
                <a href="#" className={styles.detailsLink} onClick={(e) => { e.preventDefault(); onViewDetails(voucher); }}>
                    <Info size={14} /> Điều kiện
                </a>
            </div>
        </div>
    );
};

const VoucherWallet = ({ vouchers }) => {
    const [modalVoucher, setModalVoucher] = useState(null);
    const now = new Date();
    const validVouchers = vouchers.filter(v => v && v.isActive && new Date(v.endDate) > now);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Ví Voucher</h3>
            </div>
            <div className={styles.cardBody}>
                {validVouchers.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Bạn chưa có voucher nào.</p>
                        <Link to="/vouchers" className={`${styles.button} ${styles.buttonPrimary}`}>Săn Voucher</Link>
                    </div>
                ) : (
                    <div className={styles.walletGrid}>
                        {validVouchers.map(v => (
                            <WalletVoucherCard key={v._id} voucher={v} onViewDetails={setModalVoucher} />
                        ))}
                    </div>
                )}
            </div>
            <VoucherModal voucher={modalVoucher} onClose={() => setModalVoucher(null)} />
        </div>
    );
};

export default VoucherWallet;
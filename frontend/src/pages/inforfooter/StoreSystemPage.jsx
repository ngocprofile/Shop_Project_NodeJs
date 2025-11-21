import { MapPin } from 'lucide-react';
import styles from './InfoPage.module.css';

const StoreSystemPage = () => {
    const stores = [
        { name: "Store Quận 1", address: "123 Lê Lợi, P. Bến Nghé, Q.1", phone: "0909 111 222" },
        { name: "Store Cầu Giấy", address: "456 Cầu Giấy, Hà Nội", phone: "0909 333 444" },
    ];

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Hệ Thống Cửa Hàng</h1>
        <div className={styles.grid}>
            {stores.map((store, i) => (
            <div key={i} className={styles.card}>
                <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{store.name}</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                    <MapPin size={16} /> {store.address}
                </p>
                <p style={{ marginTop: '10px', fontWeight: '500' }}>Hotline: {store.phone}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};
export default StoreSystemPage;
import { Clock, Map, MapPin, Navigation, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import styles from './InfoPage.module.css';

const StoreSystemPage = () => {
    // State để lọc khu vực
    const [activeCity, setActiveCity] = useState('ALL');

    const stores = [
        {
            id: 1,
            city: 'HCM',
            name: "Style Code Quận 1 (Flagship Store)",
            address: "123 Đường Lê Lợi, P. Bến Nghé, Quận 1, TP.HCM",
            phone: "028 3823 4567",
            hours: "09:00 - 22:00 (Mở cửa tất cả các ngày)",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop", // Ảnh minh họa
            mapLink: "https://goo.gl/maps/example1",
            facilities: ["Chỗ đậu xe hơi", "Thanh toán thẻ", "Phòng thử đồ VIP"]
        },
        {
            id: 2,
            city: 'HCM',
            name: "Style Code Võ Văn Ngân",
            address: "256 Võ Văn Ngân, P. Bình Thọ, TP. Thủ Đức",
            phone: "028 3722 8899",
            hours: "08:30 - 21:30 (Hàng ngày)",
            image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop",
            mapLink: "https://goo.gl/maps/example2",
            facilities: ["Giữ xe miễn phí", "Wifi miễn phí"]
        },
        {
            id: 3,
            city: 'HN',
            name: "Style Code Cầu Giấy",
            address: "456 Đường Cầu Giấy, P. Dịch Vọng, Q. Cầu Giấy, Hà Nội",
            phone: "024 3833 5566",
            hours: "09:00 - 22:00 (Mở cửa tất cả các ngày)",
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
            mapLink: "https://goo.gl/maps/example3",
            facilities: ["Chỗ đậu xe hơi", "Alteration Service (Sửa đồ)"]
        },
        {
            id: 4,
            city: 'HN',
            name: "Style Code Phố Huế",
            address: "89 Phố Huế, P. Ngô Thì Nhậm, Q. Hai Bà Trưng, Hà Nội",
            phone: "024 3943 7788",
            hours: "09:00 - 21:30 (Hàng ngày)",
            image: "https://images.unsplash.com/photo-1580793241553-e9f1cce181af?q=80&w=1000&auto=format&fit=crop",
            mapLink: "https://goo.gl/maps/example4",
            facilities: ["Thanh toán thẻ", "Giữ xe miễn phí"]
        }
    ];

    // Logic lọc danh sách
    const filteredStores = activeCity === 'ALL' 
        ? stores 
        : stores.filter(store => store.city === activeCity);

    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 className={styles.title}>Hệ Thống Cửa Hàng</h1>
                <p className={styles.subtitle}>Tìm cửa hàng Style Code gần bạn nhất</p>

                {/* Bộ lọc Khu vực (Tabs) */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                    {['ALL', 'HCM', 'HN'].map((city) => (
                        <button
                            key={city}
                            onClick={() => setActiveCity(city)}
                            style={{
                                padding: '10px 25px',
                                border: '1px solid #000',
                                background: activeCity === city ? '#000' : '#fff',
                                color: activeCity === city ? '#fff' : '#000',
                                cursor: 'pointer',
                                borderRadius: '30px',
                                fontWeight: '600',
                                transition: 'all 0.3s'
                            }}
                        >
                            {city === 'ALL' ? 'Tất cả' : (city === 'HCM' ? 'TP. Hồ Chí Minh' : 'Hà Nội')}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>
                {filteredStores.map((store) => (
                    <div key={store.id} className={styles.card} style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Ảnh cửa hàng */}
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img 
                                src={store.image} 
                                alt={store.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                            <div style={{ 
                                position: 'absolute', 
                                top: '10px', 
                                right: '10px', 
                                background: '#fff', 
                                padding: '4px 8px', 
                                borderRadius: '4px', 
                                fontSize: '12px', 
                                fontWeight: 'bold' 
                            }}>
                                {store.city === 'HCM' ? 'Hồ Chí Minh' : 'Hà Nội'}
                            </div>
                        </div>

                        <div className={styles.cardContent} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 className={styles.cardTitle} style={{ fontSize: '18px', marginBottom: '15px' }}>{store.name}</h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#555', fontSize: '14px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                    <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                                    <span>{store.address}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Phone size={18} /> 
                                    <a href={`tel:${store.phone}`} style={{ color: '#555', textDecoration: 'none' }}>{store.phone}</a>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Clock size={18} /> 
                                    <span>{store.hours}</span>
                                </div>
                            </div>

                            {/* Tiện ích */}
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', color: '#999' }}>Tiện ích:</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {store.facilities.map((facility, idx) => (
                                        <span key={idx} style={{ fontSize: '12px', background: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <ShieldCheck size={12} /> {facility}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Nút bấm */}
                            <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                                <a 
                                    href={store.mapLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    style={{ 
                                        flex: 1,
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        gap: '8px',
                                        padding: '10px', 
                                        background: '#000', 
                                        color: '#fff', 
                                        textDecoration: 'none', 
                                        borderRadius: '6px',
                                        fontWeight: '600',
                                        fontSize: '14px'
                                    }}
                                >
                                    <Navigation size={16} /> Chỉ đường
                                </a>
                                <a 
                                    href={`tel:${store.phone}`}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        padding: '10px', 
                                        border: '1px solid #ddd',
                                        color: '#333', 
                                        textDecoration: 'none', 
                                        borderRadius: '6px'
                                    }}
                                >
                                    <Phone size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredStores.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <Map size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
                    <p>Hiện chưa có cửa hàng tại khu vực này.</p>
                </div>
            )}
        </div>
    );
};

export default StoreSystemPage;
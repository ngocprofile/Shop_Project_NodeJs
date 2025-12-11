import { CreditCard, Loader2, Map as MapIcon, MapPin, Ticket, Truck, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api'; // File cấu hình axios của bạn
import { useCart } from '../context/CartContext';
import styles from './CheckoutPage.module.css';

// --- 1. IMPORT DỮ LIỆU ĐỊA CHỈ (LOCAL) ---
// Đảm bảo bạn đã tạo file này ở bước trước
import { VIETNAM_LOCATIONS } from '../data/vietnam_locations';

// --- MAP IMPORTS ---
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';

// Fix lỗi icon marker mặc định của Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const BACKEND_URL = 'http://localhost:5000';

// Helper Functions
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(val) || 0);

const getProductImage = (item) => {
    const variantImage = item.colorVariant?.image?.url;
    const productImage = item.product?.featuredImage;
    const path = variantImage || productImage;
    if (!path) return "https://via.placeholder.com/80?text=No+Img";
    if (path.startsWith('http')) return path;
    return BACKEND_URL + path;
};

// --- COMPONENT MAP: Bay đến khu vực chọn ---
const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) map.flyTo(center, 16, { duration: 1.5 });
    }, [center, map]);
    return null;
};

// --- COMPONENT MAP: Xử lý Click (Chỉ di chuyển Marker) ---
const LocationMarker = ({ setPosition }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    return null;
};

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, refreshCart } = useCart();

    const selectedItemIds = location.state?.selectedItemIds || [];
    const checkoutItems = cartItems.filter(item => selectedItemIds.includes(item._id));

    // --- STATE ---
    const [address, setAddress] = useState({
        fullName: '', phone: '', 
        city: '', district: '', ward: '', 
        address: '', // Địa chỉ cụ thể (Số nhà/Đường)
        notes: ''
    });

    // Map State
    const [showMap, setShowMap] = useState(false);
    const [mapPosition, setMapPosition] = useState({ lat: 10.762622, lng: 106.660172 }); 
    // const [mapAddressString, setMapAddressString] = useState('');

    // --- STATE ĐỊA CHỈ (LOGIC MỚI) ---
    const [provinces] = useState(VIETNAM_LOCATIONS); // Dùng dữ liệu từ file
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [hasDistrictLevel, setHasDistrictLevel] = useState(true); // Cờ kiểm tra tỉnh có huyện không

    // Checkout Data
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedShippingId, setSelectedShippingId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [voucherCode, setVoucherCode] = useState('');
    const [myVouchers, setMyVouchers] = useState([]); 
    const [showVoucherModal, setShowVoucherModal] = useState(false);

    const [orderSummary, setOrderSummary] = useState({ subtotal: 0, shippingFee: 0, voucherDiscount: 0, totalPrice: 0 });
    const [loading, setLoading] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);

    // --- 1. INIT DATA ---
    useEffect(() => {
        if (checkoutItems.length === 0) {
            alert("Vui lòng chọn sản phẩm từ giỏ hàng trước.");
            navigate('/cart');
            return;
        }
        const initData = async () => {
            try {
                const [shipRes, userRes] = await Promise.all([
                    axios.get('/shipping'),
                    axios.get('/users/profile')
                ]);
                setShippingMethods(shipRes.data);
                if (shipRes.data.length > 0) {
                    const defaultId = shipRes.data[0]._id;
                    setSelectedShippingId(defaultId);
                }
                if (userRes.data?.collectedVouchers) setMyVouchers(userRes.data.collectedVouchers);
            } catch (error) { console.error(error); }
        };
        initData();
        // Không cần gọi API provinces nữa vì đã có VIETNAM_LOCATIONS
    }, []);

    // --- 2. LOGIC ĐỊA CHỈ HYBRID (2 CẤP hoặc 3 CẤP) ---
    
    const handleProvinceChange = (e) => {
        const provinceName = e.target.value;
        // Tìm tỉnh trong file dữ liệu
        const selectedProv = provinces.find(p => p.name === provinceName);

        if (selectedProv) {
            // Reset cấp dưới
            setAddress({ ...address, city: provinceName, district: '', ward: '', address: '' });
            
            if (selectedProv.hasDistricts === false) {
                // Trường hợp: Tỉnh không có Huyện (VD: Nghệ An mới)
                setHasDistrictLevel(false);
                setDistricts([]);
                setWards(selectedProv.wards); // Lấy thẳng xã từ tỉnh
                // Tự động gán district là tên tỉnh (hoặc chuỗi rỗng) để tránh lỗi validate backend nếu cần
                // Ở đây ta để rỗng và xử lý lúc submit
            } else {
                // Trường hợp: Có Huyện (VD: Hà Nội)
                setHasDistrictLevel(true);
                setDistricts(selectedProv.districts);
                setWards([]);
            }
        } else {
            setAddress({ ...address, city: '', district: '', ward: '' });
            setDistricts([]);
            setWards([]);
        }
    };

    const handleDistrictChange = (e) => {
        const districtName = e.target.value;
        setAddress({ ...address, district: districtName, ward: '', address: '' });
        
        // Chỉ tìm trong districts nếu có huyện
        if (hasDistrictLevel) {
            const selectedDist = districts.find(d => d.name === districtName);
            if (selectedDist) setWards(selectedDist.wards);
            else setWards([]);
        }
    };

    const handleWardChange = (e) => {
        setAddress({ ...address, ward: e.target.value, address: '' });
    };

    // --- MAP AUTO FLY (TỰ ĐỘNG TÌM VỊ TRÍ) ---
    useEffect(() => {
        if (showMap && address.city && address.ward) {
            let query = "";
            // Logic ghép chuỗi tìm kiếm
            if (hasDistrictLevel && address.district) {
                query = `${address.ward}, ${address.district}, ${address.city}, Vietnam`;
            } else {
                // Nếu không có huyện thì bỏ qua
                query = `${address.ward}, ${address.city}, Vietnam`;
            }

            // Tìm tọa độ trên OpenStreetMap
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        setMapPosition({ 
                            lat: parseFloat(data[0].lat), 
                            lng: parseFloat(data[0].lon) 
                        });
                    }
                })
                .catch(err => console.error(err));
        }
    }, [address.city, address.district, address.ward, hasDistrictLevel, showMap]);

    /* onst confirmMapLocation = () => {
        // Logic: User tự nhập vào ô input, nút này chỉ để đóng map
        setShowMap(false);
    }; */

    // --- 3. TÍNH TIỀN ---
    const getOrderItemsPayload = useCallback(() => {
        return checkoutItems.map(item => ({
            product: item.product._id,
            colorVariantId: item.colorVariant._id,
            sizeInventoryId: item.sizeInventory._id,
            quantity: item.quantity
        }));
    }, [checkoutItems]);

    const calculateOrder = async (shippingId, code) => {
        if (!shippingId || checkoutItems.length === 0) return;
        setPreviewLoading(true);
        try {
            const payload = {
                orderItems: getOrderItemsPayload(),
                shippingMethodId: shippingId,
                voucherCode: code || null
            };
            const res = await axios.post('/orders/preview', payload);
            if (res.data.success) setOrderSummary(res.data.data);
        } catch {
            if (code) { alert("Voucher không hợp lệ."); setVoucherCode(''); }
        } finally { setPreviewLoading(false); }
    };

    useEffect(() => {
        if (selectedShippingId && checkoutItems.length > 0) {
            calculateOrder(selectedShippingId, voucherCode);
        }
        // eslint-disable-next-line
    }, [selectedShippingId, checkoutItems.length]);

    const handleShippingChange = (id) => { setSelectedShippingId(id); };
    const handleApplyVoucher = () => { calculateOrder(selectedShippingId, voucherCode); setShowVoucherModal(false); };

    // --- 4. SUBMIT ORDER ---
    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        if (!address.fullName || !address.phone) {
            alert("Vui lòng nhập Họ tên và Số điện thoại.");
            return;
        }

        // Validate địa chỉ
        if (!address.city || !address.ward || !address.address) {
             alert("Vui lòng nhập đầy đủ thông tin địa chỉ (Tỉnh, Xã, Số nhà).");
             return;
        }
        // Nếu tỉnh có huyện thì bắt buộc phải chọn huyện
        if (hasDistrictLevel && !address.district) {
             alert("Vui lòng chọn Quận/Huyện."); return;
        }

        setLoading(true);
        try {
            // Chuẩn bị object địa chỉ gửi đi
            const finalAddress = {
                fullName: address.fullName,
                phone: address.phone,
                city: address.city,
                ward: address.ward,
                address: address.address,
                // Nếu không có huyện, gửi tên Tỉnh vào trường District để backend không lỗi validate (nếu backend bắt buộc)
                // Hoặc gửi chuỗi "Trực thuộc tỉnh"
                district: hasDistrictLevel ? address.district : address.city 
            };

            const payload = {
                orderItems: getOrderItemsPayload(),
                shippingAddress: finalAddress,
                shippingMethodId: selectedShippingId,
                paymentMethod: paymentMethod,
                voucherCode: voucherCode || null,
                notes: address.notes || ""
            };

            console.log("Payload:", payload); // Debug

            const res = await axios.post('/orders', payload);
            if (res.data.success) {
                await refreshCart(); 
                
                const targetId = res.data.orderId || res.data.order?._id || res.data.order?.id;
                if (targetId) navigate(`/order-success/${targetId}`);
                else {
                    alert("Đặt hàng thành công! Vui lòng kiểm tra đơn mua.");
                    navigate('/profile');
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || "Lỗi đặt hàng.");
        } finally { setLoading(false); }
    };

    const validVouchersList = myVouchers.filter(v => v && v.isActive && new Date(v.endDate) > new Date());

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Thanh Toán</h1>
            <form onSubmit={handleSubmitOrder} className={styles.layout}>
                
                <div className={styles.leftColumn}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}><MapPin size={20} /> Thông tin giao hàng</h2>
                        
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Họ tên <span className={styles.required}>*</span></label>
                                <input type="text" required value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} placeholder="Nguyễn Văn A" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Số điện thoại <span className={styles.required}>*</span></label>
                                <input type="tel" required value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} placeholder="09..." />
                            </div>

                            {/* --- SELECT TỈNH --- */}
                            <div className={styles.formGroup}>
                                <label>Tỉnh / Thành phố <span className={styles.required}>*</span></label>
                                <select className={styles.selectInput} onChange={handleProvinceChange} value={address.city} required>
                                    <option value="">-- Chọn Tỉnh/TP --</option>
                                    {provinces.map(p => (
                                        <option key={p.code} value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* --- SELECT HUYỆN (Ẩn/Hiện tùy tỉnh) --- */}
                            {hasDistrictLevel && (
                                <div className={styles.formGroup}>
                                    <label>Quận / Huyện <span className={styles.required}>*</span></label>
                                    <select className={styles.selectInput} onChange={handleDistrictChange} value={address.district} required disabled={!address.city}>
                                        <option value="">-- Chọn Quận/Huyện --</option>
                                        {districts.map(d => (
                                            <option key={d.code} value={d.name}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* --- SELECT XÃ --- */}
                            <div className={styles.formGroup}>
                                <label>Phường / Xã <span className={styles.required}>*</span></label>
                                <select className={styles.selectInput} onChange={handleWardChange} value={address.ward} required disabled={!address.city || (hasDistrictLevel && !address.district)}>
                                    <option value="">-- Chọn Phường/Xã --</option>
                                    {wards.map(w => (
                                        <option key={w.code} value={w.name}>{w.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* --- MAP & ADDRESS INPUT --- */}
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'5px'}}>
                                    <label style={{marginBottom:0}}>Địa chỉ cụ thể <span className={styles.required}>*</span></label>
                                    <button 
                                        type="button" 
                                        className={styles.toggleMapBtn} 
                                        onClick={() => setShowMap(!showMap)} 
                                        disabled={!address.ward} 
                                        style={{opacity: !address.ward ? 0.5 : 1}}
                                        title={!address.ward ? "Vui lòng chọn Xã/Phường trước" : "Mở bản đồ"}
                                    >
                                        {showMap ? 'Ẩn bản đồ' : 'Xem vị trí trên bản đồ'} <MapIcon size={14} />
                                    </button>
                                </div>

                                {showMap && (
                                    <div className={styles.mapContainer} style={{marginBottom:'15px'}}>
                                        <MapContainer center={mapPosition} zoom={16} scrollWheelZoom={false} style={{ height: '300px', width: '100%', borderRadius: '8px' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <MapUpdater center={mapPosition} />
                                            <LocationMarker setPosition={setMapPosition} />
                                            <Marker position={mapPosition}><Popup>Vị trí giao hàng</Popup></Marker>
                                        </MapContainer>
                                        <p style={{fontSize:'12px', color:'#666', marginTop:'5px', fontStyle:'italic', textAlign:'center'}}>
                                            * Bản đồ dùng để tham khảo vị trí. Vui lòng nhập số nhà/tên đường vào ô dưới.
                                        </p>
                                    </div>
                                )}

                                <input 
                                    type="text" 
                                    required 
                                    value={address.address} 
                                    onChange={e => setAddress({...address, address: e.target.value})} 
                                    placeholder="VD: Số nhà 10, Đường ABC, Thôn XYZ..." 
                                />
                            </div>

                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label>Ghi chú</label>
                                <textarea rows="2" value={address.notes} onChange={e => setAddress({...address, notes: e.target.value})} />
                            </div>
                        </div>
                    </section>

                    {/* ... Shipping & Payment sections (Giữ nguyên) ... */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}><Truck size={20} /> Vận chuyển</h2>
                        <div className={styles.radioList}>
                            {shippingMethods.map(method => (
                                <label key={method._id} className={`${styles.radioItem} ${selectedShippingId === method._id ? styles.selected : ''}`}>
                                    <input type="radio" name="shipping" value={method._id} checked={selectedShippingId === method._id} onChange={() => handleShippingChange(method._id)} />
                                    <div className={styles.radioContent}>
                                        <div className={styles.radioHeader}>
                                            <span className={styles.radioLabel}>{method.name}</span>
                                            {method.type === 'express' && <span className={styles.badge}>Hỏa tốc</span>}
                                        </div>
                                        <span className={styles.radioSub}>{method.estimatedDelivery}</span>
                                    </div>
                                    <span className={styles.radioPrice}>{formatCurrency(method.cost)}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}><CreditCard size={20} /> Thanh toán</h2>
                        <div className={styles.radioList}>
                            <label className={`${styles.radioItem} ${paymentMethod === 'COD' ? styles.selected : ''}`}>
                                <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                                <span className={styles.radioLabel}>Thanh toán khi nhận hàng (COD)</span>
                            </label>
                            <label className={`${styles.radioItem} ${paymentMethod === 'BankTransfer' ? styles.selected : ''}`}>
                                <input type="radio" name="payment" value="BankTransfer" checked={paymentMethod === 'BankTransfer'} onChange={() => setPaymentMethod('BankTransfer')} />
                                <span className={styles.radioLabel}>Chuyển khoản ngân hàng</span>
                            </label>
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN */}
                <div className={styles.rightColumn}>
                    <div className={styles.summaryCard}>
                        <h3 className={styles.summaryTitle}>Đơn hàng ({checkoutItems.length} món)</h3>
                        <div className={styles.itemList}>
                            {checkoutItems.map((item, index) => {
                                const itemPrice = item.sizeInventory.finalPrice > 0 ? item.sizeInventory.finalPrice : item.sizeInventory.price;
                                return (
                                    <div key={index} className={styles.itemRow}>
                                        <div className={styles.itemInfo}>
                                            <div className={styles.imgBox}>
                                                <img src={getProductImage(item)} alt={item.product.name} />
                                                <span className={styles.qtyBadge}>{item.quantity}</span>
                                            </div>
                                            <div>
                                                <p className={styles.itemName}>{item.product.name}</p>
                                                <p className={styles.itemVariant}>{item.colorVariant.color} / {item.sizeInventory.size}</p>
                                            </div>
                                        </div>
                                        <span className={styles.itemPrice}>{formatCurrency(itemPrice * item.quantity)}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.voucherBox}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <label>Mã giảm giá</label>
                                <button type="button" className={styles.openVoucherModalBtn} onClick={() => setShowVoucherModal(true)}>Chọn mã</button>
                            </div>
                            <div className={styles.voucherInputGroup}>
                                <Ticket size={18} className={styles.voucherIcon} />
                                <input type="text" placeholder="Mã voucher" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value.toUpperCase())} />
                                <button type="button" className={styles.applyBtn} onClick={handleApplyVoucher} disabled={!voucherCode || previewLoading}>Áp dụng</button>
                            </div>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.costRow}><span>Tạm tính</span><span>{formatCurrency(orderSummary.subtotal)}</span></div>
                        <div className={styles.costRow}><span>Vận chuyển</span><span>{formatCurrency(orderSummary.shippingFee)}</span></div>
                        {orderSummary.voucherDiscount > 0 && <div className={`${styles.costRow} ${styles.discount}`}><span>Giảm giá</span><span>-{formatCurrency(orderSummary.voucherDiscount)}</span></div>}
                        <div className={`${styles.costRow} ${styles.total}`}><span>Tổng cộng</span><span className={styles.totalAmount}>{previewLoading ? <Loader2 className="animate-spin" /> : formatCurrency(orderSummary.totalPrice)}</span></div>
                        <button type="submit" className={styles.checkoutBtn} disabled={loading || previewLoading}>
                            {loading ? <Loader2 className="animate-spin" /> : `ĐẶT HÀNG (${formatCurrency(orderSummary.totalPrice)})`}
                        </button>
                    </div>
                </div>
            </form>

            {/* MODAL VOUCHER (Giữ nguyên) */}
            {showVoucherModal && (
                <div className={styles.modalOverlay} onClick={() => setShowVoucherModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}><h3>Chọn Voucher</h3><button className={styles.closeModalBtn} onClick={() => setShowVoucherModal(false)}><X size={24} /></button></div>
                        <div className={styles.voucherList}>
                            {validVouchersList.length === 0 ? <p style={{textAlign: 'center', color: '#999'}}>Không có mã phù hợp.</p> : 
                                validVouchersList.map(v => {
                                    const isEligible = orderSummary.subtotal >= v.minOrderValue;
                                    return (
                                        <div key={v._id} className={`${styles.voucherItem} ${!isEligible ? styles.disabled : ''}`}>
                                            <div className={styles.voucherInfo}>
                                                <h4><span className={styles.codeTag}>{v.code}</span></h4>
                                                <p>{v.type === 'freeship' ? 'Miễn phí vận chuyển' : `Giảm ${v.discountValue}%`}</p>
                                                {!isEligible && <p style={{fontSize: '12px', color: 'red'}}>Chưa đủ điều kiện đơn hàng</p>}
                                            </div>
                                            <button className={styles.selectVoucherBtn} disabled={!isEligible} onClick={() => { setVoucherCode(v.code); calculateOrder(selectedShippingId, v.code); setShowVoucherModal(false); }}>Dùng</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
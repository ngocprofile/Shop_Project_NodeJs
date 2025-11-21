import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api'; // Import api client đã cấu hình axios

// Tạo Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    // 1. Hàm gọi API để lấy số lượng mới nhất từ Server
    // Dùng khi: Load trang lần đầu, F5, hoặc Login thành công
    const refreshCartCount = async () => {
        const token = localStorage.getItem('token');
        
        // Nếu chưa đăng nhập thì không gọi API
        if (!token) {
            setCartCount(0);
            return;
        }

        try {
            // Gọi endpoint /api/cart/count (đã tạo ở backend)
            const res = await api.get('/cart/count');
            
            if (res.data && typeof res.data.count === 'number') {
                setCartCount(res.data.count);
                console.log("CartContext: Đã cập nhật số lượng từ server:", res.data.count);
            }
        } catch (error) {
            console.error("CartContext: Lỗi cập nhật số lượng giỏ hàng:", error);
            // Nếu lỗi 401 (Unauthorized), reset về 0
            if (error.response && error.response.status === 401) {
                setCartCount(0);
            }
        }
    };

    // 2. Hàm cập nhật thủ công (Client-side update)
    // Dùng khi: Thêm vào giỏ hàng thành công (backend trả về totalQuantity mới)
    // Giúp giao diện nhảy số ngay lập tức mà không cần gọi lại API /count
    const updateCountImmediately = (newCount) => {
        setCartCount(newCount);
    };

    // Gọi refresh 1 lần khi ứng dụng khởi chạy
    useEffect(() => {
        refreshCartCount();

        // (Tùy chọn) Lắng nghe sự kiện storage để đồng bộ khi đăng nhập/đăng xuất ở tab khác
        const handleStorageChange = () => {
            refreshCartCount();
        };
        window.addEventListener('storage', handleStorageChange);
        
        // (Tùy chọn) Lắng nghe sự kiện custom 'auth-change' nếu bạn có cơ chế login/logout
        window.addEventListener('auth-change', refreshCartCount);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-change', refreshCartCount);
        };
    }, []);

    // Giá trị chia sẻ cho toàn app
    const value = {
        cartCount,
        refreshCartCount,
        updateCountImmediately
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Hook custom để các component khác sử dụng dễ dàng
// Ví dụ: const { cartCount } = useCart();
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart phải được sử dụng bên trong CartProvider");
    }
    return context;
};
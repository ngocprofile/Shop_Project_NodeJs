import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api'; // Đảm bảo import đúng file axios config của bạn

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // State lưu danh sách sản phẩm chi tiết (cho trang Cart/Checkout)
    const [cartItems, setCartItems] = useState([]);
    // State lưu tổng số lượng (cho Badge trên Header)
    const [cartCount, setCartCount] = useState(0);
    // State loading để chặn giao diện khi đang tải
    const [loading, setLoading] = useState(true);

    // 1. Hàm lấy dữ liệu giỏ hàng từ Server
    const refreshCart = async () => {
        const token = localStorage.getItem('accessToken'); // Kiểm tra key lưu token của bạn
        if (!token) {
            setCartItems([]);
            setCartCount(0);
            setLoading(false);
            return;
        }

        try {
            // Gọi API lấy chi tiết giỏ hàng
            // Backend cần có route: GET /api/cart
            const res = await api.get('/cart');
            
            if (res.data && res.data.items) {
                setCartItems(res.data.items);
                
                // Tính tổng số lượng item để hiển thị lên Header
                // (Hoặc lấy từ res.data.totalQuantity nếu backend có trả về)
                const totalQty = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(totalQty);
            } else {
                // Giỏ hàng rỗng
                setCartItems([]);
                setCartCount(0);
            }
        } catch (error) {
            console.error("CartContext: Lỗi tải giỏ hàng", error);
            if (error.response?.status === 401) {
                setCartItems([]);
                setCartCount(0);
            }
        } finally {
            setLoading(false);
        }
    };

    // 2. Hàm cập nhật số lượng ngay lập tức (Optimistic UI)
    // Dùng khi thêm vào giỏ hàng hoặc tăng giảm số lượng ở trang Cart
    const updateCountImmediately = (newCount) => {
        setCartCount(newCount);
        // Lưu ý: Nếu muốn update cả cartItems thì nên gọi lại refreshCart()
        // hoặc truyền logic phức tạp hơn vào đây. 
        // Để đơn giản, khi add to cart xong, bạn nên gọi refreshCart().
    };

    // 3. Hàm xóa sạch giỏ hàng (Dùng sau khi Checkout thành công)
    const clearCart = async () => {
        // Cập nhật State ngay lập tức để UI phản hồi nhanh
        setCartItems([]);
        setCartCount(0);
        
        // Nếu backend của bạn tự xóa giỏ hàng sau khi tạo đơn hàng (Create Order) thành công,
        // thì không cần gọi API delete cart ở đây.
        // Tuy nhiên, nếu backend không tự xóa, bạn cần gọi:
        // await api.delete('/cart'); 
        
        // Ở đây ta giả định Frontend chỉ cần reset state vì Backend đã xử lý logic
        // chuyển cart thành order và làm trống cart rồi.
        // Nhưng để chắc chắn đồng bộ, ta gọi lại refreshCart một lần nữa:
        await refreshCart();
    };

    // Khởi chạy lần đầu
    useEffect(() => {
        refreshCart();

        // Lắng nghe sự kiện để đồng bộ giữa các tab hoặc khi login/logout
        const handleAuthChange = () => refreshCart();
        
        window.addEventListener('storage', handleAuthChange); // Khi localStorage đổi (login/logout)
        // Nếu bạn có custom event 'auth-change', giữ nguyên dòng dưới
        window.addEventListener('auth-change', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleAuthChange);
            window.removeEventListener('auth-change', handleAuthChange);
        };
    }, []);

    const value = {
        cartItems,
        cartCount,
        loading,
        refreshCart,       // Đổi tên refreshCartCount -> refreshCart cho ngắn gọn
        refreshCartCount: refreshCart, // Giữ lại alias cũ để đỡ phải sửa Header
        updateCountImmediately,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart phải được sử dụng bên trong CartProvider");
    }
    return context;
};
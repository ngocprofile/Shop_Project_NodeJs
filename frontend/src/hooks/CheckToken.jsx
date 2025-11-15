// frontend/src/hooks/checkToken.jsx
import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Debug: Log nội dung localStorage để kiểm tra
        console.log('Checking localStorage:');
        console.log('accessToken:', localStorage.getItem('accessToken'));
        console.log('refreshToken:', localStorage.getItem('refreshToken'));
        console.log('User:', localStorage.getItem('user'));

        const token = localStorage.getItem('accessToken'); // SỬA: Dùng 'accessToken' thay vì 'token'
        const userData = localStorage.getItem('user');

        if (token) {
        // Chỉ cần token là đủ để set isLoggedIn = true
        setIsLoggedIn(true);
        if (userData) {
            try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            console.log('User parsed successfully:', parsedUser);
            } catch (error) {
            console.error('Lỗi khi parse user data:', error);
            // Không set isLoggedIn = false nếu chỉ lỗi parse user, vẫn giữ true nếu có token
            localStorage.removeItem('user'); // Xóa user data lỗi
            }
        } else {
            console.warn('Có accessToken nhưng không có user data. Có thể cần fetch user info từ API.');
            // Nếu cần, bạn có thể gọi API để fetch user info dựa trên token ở đây
            // Ví dụ: fetchUser(token).then(setUser);
        }
        } else {
        console.log('No accessToken found, setting isLoggedIn = false');
        setIsLoggedIn(false);
        }

        setLoading(false);
        console.log('Final isLoggedIn state:', !!token);
    }, []);

    // Hàm đăng nhập: lưu token và user info (nếu có)
    const login = (token, userData = null) => {
        localStorage.setItem('accessToken', token); // SỬA: Lưu 'accessToken'
        if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        }
        setIsLoggedIn(true);
        setUser(userData);
        console.log('Login called: isLoggedIn set to true, accessToken saved');
    };

    // Hàm đăng xuất: xóa token và user info
    const logout = () => {
        localStorage.removeItem('accessToken'); // SỬA: Xóa 'accessToken'
        localStorage.removeItem('refreshToken'); // Thêm: Xóa refreshToken
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        console.log('Logout called: isLoggedIn set to false');
    };

    // Hàm kiểm tra quyền (ví dụ: kiểm tra role nếu cần)
    const hasPermission = (requiredRole) => {
        if (!user || !user.role) return false;
        return user.role === requiredRole || user.role === 'admin'; // Ví dụ logic quyền
    };

    return {
        isLoggedIn,
        user,
        loading,
        login,
        logout,
        hasPermission
    };
};

export default useAuth;
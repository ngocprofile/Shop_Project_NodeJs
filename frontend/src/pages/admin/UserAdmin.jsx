import { Edit3, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api';
import styles from './AdminUser.module.css';

// (Hàm getRoleBadge giữ nguyên)
const getRoleBadge = (role) => {
    switch (role) {
        case 'admin':
        return `${styles.badge} ${styles.badgeDanger}`; 
        case 'staff':
        return `${styles.badge} ${styles.badgeSuccess}`;
        default:
        return `${styles.badge} ${styles.badgeDefault}`;
    }
};

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all'); 
    const [sortOrder, setSortOrder] = useState('default'); // <-- 1. STATE MỚI CHO SẮP XẾP
    const navigate = useNavigate();
    // const navigate = useNavigate();

    // (useEffect gọi API fetchUsers giữ nguyên)
    useEffect(() => {
        const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/users'); 
            setUsers(res.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách người dùng:", error);
        } finally {
            setLoading(false);
        }
        };
        
        fetchUsers();
    }, []);

    // (Hàm handleEditUser và handleDeleteUser giữ nguyên)
    const handleEditUser = (id) => {
        // Chuyển đến trang chỉnh sửa người dùng
        console.log('Navigating to edit user with ID:', id);
        navigate(`/admin/users/edit/${id}`);
    };
    const handleDeleteUser = async (id) => {
        if (window.confirm(`Bạn có chắc muốn xóa người dùng ID: ${id}?`)) {
        try {
            // Gọi API xóa (vẫn dùng 'id' bình thường)
            await api.delete(`/users/${id}`);
            alert('Đã xóa người dùng thành công!');
            
            // SỬA 4: Lọc mảng bằng user.id
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
            alert('Xóa thất bại. Vui lòng thử lại.');
        }
        }
    };

    // === 3. CẬP NHẬT LOGIC LỌC VÀ SẮP XẾP ===
    const processedUsers = users
        .filter((user) => {
        // Bước 1: Lọc theo Role
        if (roleFilter === 'all') {
            return true;
        }
        return user.role === roleFilter;
        })
        .filter((user) => {
        // Bước 2: Lọc theo Search Term
        const name = user.name || '';
        const email = user.email || '';
        return (
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        })
        .sort((a, b) => {
        // Bước 3: Sắp xếp
        const nameA = a.name || '';
        const nameB = b.name || '';
        
        if (sortOrder === 'name-asc') {
            // localeCompare xử lý tiếng Việt và chữ hoa/thường
            return nameA.localeCompare(nameB); 
        }
        if (sortOrder === 'name-desc') {
            return nameB.localeCompare(nameA);
        }
        // 'default' - không sắp xếp (hoặc giữ nguyên thứ tự API trả về)
        return 0; 
        });

    if (loading) {
        return <div className={styles.loading}>Đang tải danh sách người dùng...</div>;
    }

    return (
        <div className={styles.productPage}>
        {/* Header của trang */}
        <div className={styles.pageHeader}>
            <h1>Quản lý Người dùng ({processedUsers.length})</h1>
            
            {/* === 2. THÊM GIAO DIỆN LỌC === */}
            <div className={styles.filtersContainer}>
            <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={() => navigate('/admin/users/new')}
            >
                <Plus size={18} />
                Thêm
            </button>
            {/* Lọc theo Role */}
            <div className={styles.filterGroup}>
                <label htmlFor="roleFilter" className={styles.filterLabel}>Vai trò:</label>
                <select
                id="roleFilter"
                className={styles.formSelect} 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                >
                <option value="all">Tất cả</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="customer">Customer</option>
                </select>
            </div>

            {/* Sắp xếp theo Tên */}
            <div className={styles.filterGroup}>
                <label htmlFor="sortOrder" className={styles.filterLabel}>Sắp xếp:</label>
                <select
                id="sortOrder"
                className={styles.formSelect} 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                >
                <option value="default">Mặc định</option>
                <option value="name-asc">Tên (A → Z)</option>
                <option value="name-desc">Tên (Z → A)</option>
                </select>
            </div>

            {/* Thanh tìm kiếm */}
            <div className={styles.searchBar}>
                <Search size={18} className={styles.searchIcon} />
                <input
                type="text"
                placeholder="Tìm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                />
            </div>
            </div>
        </div>

        {/* Card chứa bảng (Không thay đổi) */}
        <div className={styles.card}>
            <div className={styles.cardBody}>
            <table className={styles.productTable}>
                <thead>
                <tr>
                    <th>Người dùng</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Ngày tham gia</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {processedUsers.length === 0 ? (
                    <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>Không tìm thấy người dùng.</td>
                    </tr>
                ) : (
                    processedUsers.map((user) => (
                    <tr key={user._id}>
                        <td className={styles.userCell}>
                        <img
                            src={user.avatar || `https://placehold.co/40x40/E2E8F0/4A5568?text=${user.name ? user.name.charAt(0) : '?'}`}
                            alt="avatar"
                            className={styles.userAvatar}
                        />
                        <div>
                            <div className={styles.userName}>{user.name || '(Chưa có tên)'}</div>
                            <div className={styles.userEmail}>{user.email}</div>
                        </div>
                        </td>
                        <td>
                        <span className={getRoleBadge(user.role)}>
                            {user.role}
                        </span>
                        </td>
                        <td>
                        <span
                            className={`${styles.badge} ${
                            user.isActive
                                ? styles.badgeSuccess
                                : styles.badgeWarning
                            }`}
                        >
                            {user.isActive ? 'Đang hoạt động' : 'Đã khóa'}
                        </span>
                        </td>
                        <td>
                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                        </td>
                        <td className={styles.actionCell}>
                        <button
                            className={`${styles.actionButton} ${styles.editButton}`}
                            onClick={() => handleEditUser(user._id)} // SỬA 2: Đổi _id thành id
                        >
                            <Edit3 size={16} />
                        </button>
                        <button
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            onClick={() => handleDeleteUser(user._id)} // SỬA 3: Đổi _id thành id
                        >
                            <Trash2 size={16} />
                        </button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default UserAdmin;
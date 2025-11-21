import {
    ArrowDown, ArrowUp,
    ChevronDown,
    ChevronRight,
    Edit3,
    Plus,
    Save,
    Search,
    Trash // Icon cho Upload
    ,

    Trash2,
    UploadCloud,
    X
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import api from '../../api'; // File axios đã cấu hình
import styles from './AdminProduct.module.css'; // Dùng chung CSS

// --- (Helper 1) ---
// Biến mảng "phẳng" từ API thành cấu trúc "cây" (cha-con)
function buildCategoryTree(categories) {
    const map = {};
    const roots = [];
    categories.forEach(cat => {
        map[cat._id] = { ...cat, children: [] };
    });
    categories.forEach(cat => {
        if (cat.parentCategory) {
        // Đảm bảo parentCategory là ID (do .populate)
        const parentId = cat.parentCategory._id || cat.parentCategory;
        if (map[parentId]) {
            map[parentId].children.push(map[cat._id]);
        }
        } else {
        roots.push(map[cat._id]);
        }
    });
    return roots;
    }

    // --- (Helper 2) ---
    // Sắp xếp cây một cách đệ quy
    function sortTreeRecursive(nodes, key, direction) {
    nodes.sort((a, b) => {
        let valA = a[key] ? a[key].toString().toLowerCase() : '';
        let valB = b[key] ? b[key].toString().toLowerCase() : '';
        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
        sortTreeRecursive(node.children, key, direction);
        }
    });
    }

    // Khởi tạo state rỗng cho form (bỏ 'image')
    const initialState = {
    name: '',
    description: '',
    parentCategory: '', 
    isActive: true,
    };

    // --- FIX LỖI 404: Lấy URL gốc của server (loại bỏ /api) ---
    // Giả sử api.js có baseURL: 'http://localhost:5000/api'
    const serverRootUrl = 'http://localhost:5000';
    // --- BỔ SUNG LOG ---
    console.log("Frontend: Server Root URL (để hiển thị ảnh):", serverRootUrl);
    // --- (Hết log) ---


    const CategoryAdmin = () => {
    const [categories, setCategories] = useState([]); // Danh sách gốc
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 

    // State cho Form (đã tách riêng ảnh)
    const [formData, setFormData] = useState(initialState);
    const [imageFile, setImageFile] = useState(null); 
    const [imagePreview, setImagePreview] = useState(null); 
    const [existingImageUrl, setExistingImageUrl] = useState(''); 

    const [editingId, setEditingId] = useState(null); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State cho Bảng
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [expandedCategories, setExpandedCategories] = useState(new Set());

    // --- API Functions ---
    const fetchCategories = async () => {
        setLoading(true);
        try {
        const res = await api.get('/categories');
        setCategories(res.data);
        setError(''); 
        } catch (err) {
        setError('Lỗi khi tải danh mục.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Hàm Submit (đã cập nhật dùng FormData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || !formData.name) return;
        setIsSubmitting(true);
        setError('');

        // --- BỔ SUNG LOG ---
        console.log("--- Frontend: [handleSubmit] ---");
        // --- (Hết log) ---

        // 1. Tạo FormData
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('parentCategory', formData.parentCategory || ''); 
        data.append('isActive', formData.isActive);

        // 2. Xử lý logic ảnh
        if (imageFile) {
        // --- BỔ SUNG LOG ---
        console.log("Đang gửi file MỚI:", imageFile.name);
        // --- (Hết log) ---
        data.append('image', imageFile);
        } else if (!existingImageUrl && editingId) {
        // --- BỔ SUNG LOG ---
        console.log("Đang gửi tín hiệu 'null' (xóa ảnh)");
        // --- (Hết log) ---
        data.append('image', 'null'); // Báo backend xóa
        } else {
        console.log("Không có file mới, giữ ảnh cũ (nếu có).");
        }
        
        try {
        if (editingId) {
            // Cập nhật (PUT) với FormData
            await api.put(`/categories/${editingId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            alert('Cập nhật danh mục thành công!');
        } else {
            // Thêm mới (POST) với FormData
            await api.post('/categories', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
        }
        handleCancel();
        fetchCategories(); // Tải lại danh sách
        } catch (err) {
        setError(err.response?.data?.message || (editingId ? 'Cập nhật thất bại.' : 'Thêm thất bại.'));
        console.error(err);
        } finally {
        setIsSubmitting(false);
        }
    };

    // Hàm Xóa (Controller backend sẽ tự xóa file)
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
        try {
            await api.delete(`/categories/${id}`);
            alert('Xóa thành công!');
            fetchCategories();
        } catch (err) {
            setError('Xóa thất bại.');
            console.error(err);
        }
        }
    };

    // --- Helper Functions ---
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    // Hàm xử lý file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        // --- BỔ SUNG LOG ---
        console.log("--- Frontend: [handleImageChange] ---");
        console.log("File đã chọn:", file.name);
        // --- (Hết log) ---
        setImageFile(file); // Lưu file
        setImagePreview(URL.createObjectURL(file)); // Tạo link xem trước
        setExistingImageUrl(''); // Xóa ảnh cũ (nếu có)
        }
    };

    // Xóa ảnh (khỏi preview)
    const removeImage = () => {
        // --- BỔ SUNG LOG ---
        console.log("--- Frontend: [removeImage] ---");
        console.log("Đã xóa ảnh khỏi preview.");
        // --- (Hết log) ---
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl(''); // Xóa cả ảnh cũ
    };

    // Cập nhật handleEditClick (FIX LỖI 404)
    const handleEditClick = (category) => {
        setEditingId(category._id);
        setFormData({
        name: category.name,
        description: category.description || '',
        parentCategory: category.parentCategory?._id || '', 
        isActive: category.isActive,
        });
        
        // Xử lý ảnh
        setImageFile(null);
        setImagePreview(null);
        if(category.image) {
        const finalUrl = serverRootUrl + category.image;
        // --- BỔ SUNG LOG ---
        console.log(`--- Frontend: [handleEditClick] ---`);
        console.log(`Đang đặt ảnh hiện tại (existingImageUrl): ${finalUrl}`);
        // --- (Hết log) ---
        setExistingImageUrl(finalUrl);
        } else {
        console.log(`--- Frontend: [handleEditClick] ---`);
        console.log("Danh mục này không có ảnh.");
        setExistingImageUrl('');
        }

        setError('');
        window.scrollTo(0, 0); 
    };

    // Cập nhật handleCancel (reset state ảnh)
    const handleCancel = () => {
        setEditingId(null);
        setFormData(initialState); 
        setError('');
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl('');
    };

    // --- Logic cho Bảng ---
    const toggleExpand = (categoryId) => {
        setExpandedCategories(prev => {
        const newSet = new Set(prev);
        if (newSet.has(categoryId)) newSet.delete(categoryId);
        else newSet.add(categoryId);
        return newSet;
        });
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const categoryTree = useMemo(() => {
        const tree = buildCategoryTree(categories);
        sortTreeRecursive(tree, sortConfig.key, sortConfig.direction);
        return tree;
    }, [categories, sortConfig]);

    const filteredCategories = useMemo(() => {
        if (!searchTerm) return [];
        return categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);


    // --- Component con (đệ quy) ---
    // (FIX LỖI 404)
    const RenderCategoryRows = ({ categories, level }) => {
        return categories.map(cat => {
        const isExpanded = expandedCategories.has(cat._id);
        const hasChildren = cat.children && cat.children.length > 0;
        // Dùng serverRootUrl (đã bỏ /api)
        const imageUrl = cat.image ? serverRootUrl + cat.image : null;

        // --- BỔ SUNG LOG ---
        if (cat.image) {
            console.log(`[Render Bảng]: Đang cố render ảnh: ${imageUrl}`);
        }
        // --- (Hết log) ---

        return (
            <React.Fragment key={cat._id}>
            <tr className={styles.categoryRow}>
                {/* CỘT ẢNH MỚI */}
                <td>
                {imageUrl ? (
                    <img src={imageUrl} alt={cat.name} className={styles.categoryImage} />
                ) : (
                    <span className={styles.categoryImagePlaceholder}></span>
                )}
                </td>
                
                {/* CỘT TÊN */}
                <td>
                <span style={{ paddingLeft: `${level * 24}px` }} className={styles.categoryNameCell}>
                    {hasChildren ? (
                    <button className={styles.expandButton} onClick={() => toggleExpand(cat._id)}>
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    ) : (
                    <span className={styles.expandButtonPlaceholder}></span> 
                    )}
                    {cat.name}
                </span>
                </td>

                {/* CÁC CỘT CÒN LẠI */}
                <td>{cat.parentCategory ? (cat.parentCategory.name || 'N/A') : '—'}</td>
                <td>
                <span className={`${styles.badge} ${cat.isActive ? styles.badgeSuccess : styles.badgeWarning}`}>
                    {cat.isActive ? 'Hoạt động' : 'Đã ẩn'}
                </span>
                </td>
                <td className={styles.actionCell}>
                <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => handleEditClick(cat)}
                >
                    <Edit3 size={16} />
                </button>
                <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDelete(cat._id)}
                >
                    <Trash2 size={16} />
                </button>
                </td>
            </tr>
            {isExpanded && hasChildren && (
                <RenderCategoryRows categories={cat.children} level={level + 1} />
            )}
            </React.Fragment>
        );
        });
    };
    
    // Component render hàng khi tìm kiếm (dạng phẳng)
    // (FIX LỖI 404)
    const RenderFilteredRow = ({ category }) => {
        // Dùng serverRootUrl (đã bỏ /api)
        const imageUrl = category.image ? serverRootUrl + category.image : null;
        
        // --- BỔ SUNG LOG ---
        if (category.image) {
            console.log(`[Render Bảng (Filter)]: Đang cố render ảnh: ${imageUrl}`);
        }
        // --- (Hết log) ---

        return (
        <tr className={styles.categoryRow}>
            <td>
            {imageUrl ? (
                <img src={imageUrl} alt={category.name} className={styles.categoryImage} />
            ) : (
                <span className={styles.categoryImagePlaceholder}></span>
            )}
            </td>
            <td>
            <span className={styles.categoryNameCell}>
                {category.name}
            </span>
            </td>
            <td>{category.parentCategory ? category.parentCategory.name : '—'}</td>
            <td>
            <span className={`${styles.badge} ${category.isActive ? styles.badgeSuccess : styles.badgeWarning}`}>
                {category.isActive ? 'Hoạt động' : 'Đã ẩn'}
            </span>
            </td>
            <td className={styles.actionCell}>
            <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => handleEditClick(category)}
            >
                <Edit3 size={16} />
            </button>
            <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDelete(category._id)}
            >
                <Trash2 size={16} />
            </button>
            </td>
        </tr>
        );
    };

    return (
        <div className={styles.productPage}>
        {/* 1. Form Thêm/Sửa */}
        <div className={styles.card} style={{ marginBottom: '2rem' }}>
            <div className={styles.cardHeader}>
            <h3>{editingId ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h3>
            </div>
            <div className={styles.cardBody}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {error && (
                <div className={`${styles.badge} ${styles.badgeDanger}`} style={{ marginBottom: '1rem', width: '100%', borderRadius: '4px' }}>
                    {error}
                </div>
                )}
                
                <div className={styles.formGroup}>
                <label htmlFor="name">Tên danh mục *</label>
                <input type="text" id="name" name="name" className={styles.formInput} value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="description">Mô tả</label>
                <textarea
                    id="description" name="description"
                    className={styles.formTextarea}
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                ></textarea>
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="parentCategory">Danh mục cha</label>
                <select
                    id="parentCategory" name="parentCategory"
                    className={styles.formSelect}
                    value={formData.parentCategory}
                    onChange={handleInputChange}
                >
                    <option value="">-- (Không có) --</option>
                    {categories.filter(cat => cat._id !== editingId).map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                </div>

                {/* Input Ảnh (Đã cập nhật) */}
                <div className={styles.formGroup}>
                <label htmlFor="image">Ảnh danh mục</label>
                <div className={styles.imageUploadContainer}>
                    <div className={styles.imagePreview}>
                    {imagePreview ? (
                        <img src={imagePreview} alt="Xem trước" />
                    ) : existingImageUrl ? (
                        <img src={existingImageUrl} alt="Ảnh hiện tại" />
                    ) : (
                        <div className={styles.imagePlaceholder}>
                        <UploadCloud size={24} />
                        <p>Chọn ảnh</p>
                        </div>
                    )}
                    </div>

                    <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    onChange={handleImageChange}
                    className={styles.fileInputHidden}
                    />
                    
                    <label htmlFor="image" className={`${styles.button} ${styles.buttonSecondary}`} style={{ marginRight: '0.5rem' }}>
                    Chọn ảnh
                    </label>

                    {(imagePreview || existingImageUrl) && (
                    <button 
                        type="button" 
                        className={`${styles.button} ${styles.buttonDangerOutline}`}
                        onClick={removeImage}
                    >
                        <Trash size={16} /> Xóa ảnh
                    </button>
                    )}
                </div>
                </div>

                {/* Trạng thái */}
                <div className={styles.formGroup}>
                <label>Trạng thái</label>
                <div className={styles.formToggle}>
                    <label className={styles.switch}>
                    <input
                        type="checkbox" id="isActive" name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                    </label>
                    <p>{formData.isActive ? "Đang hoạt động" : "Đã ẩn"}</p>
                </div>
                </div>

                {/* Nút bấm */}
                <div className={styles.formActions} style={{ justifyContent: 'flex-start' }}>
                <button
                    type="submit"
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    disabled={isSubmitting}
                >
                    {editingId ? <Save size={18} /> : <Plus size={18} />}
                    {isSubmitting ? 'Đang lưu...' : (editingId ? 'Cập nhật' : 'Thêm')}
                </button>
                {editingId && (
                    <button
                    type="button"
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={handleCancel}
                    >
                    <X size={18} />
                    Hủy
                    </button>
                )}
                </div>
            </form>
            </div>
        </div>

        {/* 2. Bảng Liệt kê (Đã cập nhật) */}
        <div className={styles.card}>
            <div className={styles.cardHeader}>
            <h3>Danh sách Danh mục ({categories.length})</h3>
            </div>

            <div className={styles.cardBody} style={{ paddingBottom: 0 }}>
            <div className={styles.filtersContainer}>
                <div className={styles.searchBar} style={{ flexGrow: 1 }}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Tìm theo tên danh mục..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                </div>
                {searchTerm === '' && (
                <div className={styles.filterGroup}>
                    <button
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={() => requestSort('name')}
                    >
                    Sắp xếp theo Tên 
                    {sortConfig.key === 'name' && (
                        sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                    </button>
                </div>
                )}
            </div>
            </div>

            <div className={styles.cardBody}>
            <table className={styles.productTable}>
                {/* Cập nhật <thead> */}
                <thead>
                <tr>
                    <th style={{ width: '80px' }}>Ảnh</th>
                    <th style={{width: '45%'}}>Tên Danh mục</th>
                    <th>Danh mục cha</th>
                    <th>Trạng thái</th>
                    <th style={{ width: '150px' }}>Hành động</th>
                </tr>
                </thead>

                {/* Cập nhật <tbody> */}
                <tbody>
                {loading ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center' }}>Đang tải...</td></tr>
                ) : (
                    searchTerm ? (
                    filteredCategories.length > 0 ? (
                        filteredCategories.map(cat => (
                        <RenderFilteredRow key={cat._id} category={cat} />
                        ))
                    ) : (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>Không tìm thấy danh mục.</td></tr>
                    )
                    ) : (
                    categoryTree.length > 0 ? (
                        <RenderCategoryRows categories={categoryTree} level={0} />
                    ) : (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>Chưa có danh mục nào.</td></tr>
                    )
                    )
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default CategoryAdmin;
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// =================================================================
// 🛠️ CẤU HÌNH ĐƯỜNG DẪN TUYỆT ĐỐI
// =================================================================

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

// ✅ UPLOAD_DIR: Trỏ đến thư mục 'uploads' nằm ngoài thư mục 'src'
const UPLOAD_DIR = path.join(__dirname, '../../uploads'); 
console.log(`[Multer Config] Thư mục đích: ${UPLOAD_DIR}`); // Log vị trí đích cuối cùng

const MAX_FILE_SIZE = 5 * 1024 * 1024; // Giới hạn 5MB
const ALLOWED_MIMETYPES = /jpeg|jpg|png|gif|webp/; 

// --- 1. Đảm bảo thư mục 'uploads' tồn tại ---
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true }); 
    console.log(`[Multer Config] Đã tạo thư mục: ${UPLOAD_DIR}`);
}

// --- 2. Cấu hình nơi lưu trữ (Storage) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Log báo bắt đầu quá trình lưu
        console.log(`[Multer Processing] Bắt đầu lưu file: ${file.originalname}`); 
        cb(null, UPLOAD_DIR); 
    },

    filename: (req, file, cb) => {
        // Lấy phần mở rộng file
        const fileExt = path.extname(file.originalname);
        
        // Tạo tên file mới
        const fileName = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
        const finalPath = fileName + fileExt;
        
        // 💡 Log này chỉ xác nhận TÊN ĐƯỢC TẠO, KHÔNG PHẢI GHI XUỐNG ĐĨA
        console.log(`[Multer Processing] Tên file được tạo: ${finalPath}`); 
        
        cb(null, finalPath);
    }
});

// --- 3. Cấu hình bộ lọc file (File Filter) ---
const fileFilter = (req, file, cb) => {
    const extname = ALLOWED_MIMETYPES.test(path.extname(file.originalname).toLowerCase());
    const mimetype = ALLOWED_MIMETYPES.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        // 🔴 LOG LỖI TỪ CHỐI RẤT QUAN TRỌNG
        console.error(`[Multer Error] File bị từ chối: Loại file hoặc phần mở rộng không khớp.`);
        cb(new Error('Lỗi: Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif, webp)!'));
    }
};

// --- 4. Khởi tạo Multer ---
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: MAX_FILE_SIZE,
        files: 10 // Giới hạn số lượng file (Thêm giới hạn này nếu route dùng upload.array)
    },
    fileFilter: fileFilter
});

// --- 5. Export ---
export default upload;
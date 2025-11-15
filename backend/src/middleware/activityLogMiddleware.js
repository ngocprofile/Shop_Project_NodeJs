// middleware/activityLogMiddleware.js
import ActivityLog from "../models/activityLogModel.js";

/**
 * 🛡️ Middleware tự động ghi log hoạt động trước request (pre-log)
 * @param {Array<string>} targetActions - Mảng các action cần log (ví dụ: ['post order', 'update_profile'])
 * @param {string} targetRole - Vai trò mục tiêu ('user', 'staff', 'admin') - tùy chọn
 * Sử dụng: router.post('/orders', protect, activityLogMiddleware(['post order']), handler);
 */
export const activityLogMiddleware = (targetActions = [], targetRole = null) => {
    return async (req, res, next) => {
        const { method, originalUrl, body, params } = req;
        const userId = req.user?.id;
        const userRole = req.user?.role;

        // Bỏ qua nếu không có user (anonymous) hoặc không khớp role
        if (!userId || (targetRole && userRole !== targetRole)) {
        return next();
        }

        // Xác định action dựa trên method và route cuối cùng
        const routeSegment = originalUrl.split('/').pop() || 'unknown';
        let action = `${method.toLowerCase()} ${routeSegment}`.toLowerCase();

        // Nếu có targetActions, chỉ log nếu khớp
        if (targetActions.length > 0 && !targetActions.some(t => action.includes(t))) {
        return next();
        }

        // Tạo description chi tiết dựa trên action phổ biến
        let description = "";
        const sanitizedBody = { ...body }; // Sanitize để tránh log sensitive data như password
        delete sanitizedBody.password;
        delete sanitizedBody.token;
        delete sanitizedBody.refreshToken;
        delete sanitizedBody.emailToken; // Thêm sanitize cho token reset password

        switch (action) {
        case 'post order':
        case 'create order':
            description = `Tạo đơn hàng mới: ${sanitizedBody.orderId || body.items?.length || '0'} sản phẩm`;
            break;
        case 'get my orders':
            description = "Xem lịch sử đơn hàng cá nhân";
            break;
        case 'get orders':
            description = "Xem tất cả đơn hàng hệ thống";
            break;
        case 'put order':
        case 'update order':
            description = `Cập nhật đơn hàng ${params.id || params.orderId || 'ID ẩn danh'}: Trạng thái mới ${sanitizedBody.status || 'không xác định'}`;
            break;
        case 'delete order':
            description = `Xóa đơn hàng ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post feedback':
        case 'create feedback':
            description = `Tạo đánh giá mới cho sản phẩm ${sanitizedBody.product || 'ID ẩn danh'}`;
            break;
        case 'get user feedback':
            description = "Xem đánh giá cá nhân cho sản phẩm";
            break;
        case 'put feedback':
        case 'update feedback':
            description = `Cập nhật đánh giá sản phẩm ${params.id || 'ID ẩn danh'}`;
            break;
        case 'delete feedback':
            description = `Xóa đánh giá sản phẩm ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post product':
        case 'create product':
            description = `Tạo sản phẩm mới: ${sanitizedBody.name || 'Tên sản phẩm'}`;
            break;
        case 'put product':
        case 'update product':
            description = `Chỉnh sửa sản phẩm ${params.id || 'ID ẩn danh'}: ${sanitizedBody.name || 'Tên sản phẩm'}`;
            break;
        case 'delete product':
            description = `Xóa sản phẩm ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post variant':
        case 'add variant':
            description = `Thêm biến thể cho sản phẩm ${params.productId || 'ID ẩn danh'}`;
            break;
        case 'put variant':
        case 'update variant':
            description = `Cập nhật biến thể ${params.id || 'ID ẩn danh'}`;
            break;
        case 'get profile':
            description = "Xem thông tin hồ sơ cá nhân";
            break;
        case 'put profile':
        case 'update profile':
            description = `Chỉnh sửa thông tin cá nhân: ${sanitizedBody.email ? `Email mới: ${sanitizedBody.email}` : 'Cập nhật cơ bản'}`;
            break;
        case 'get users':
            description = "Xem danh sách tất cả người dùng";
            break;
        case 'post user':
        case 'create user':
            description = `Tạo người dùng mới: ${sanitizedBody.email || 'Email ẩn danh'}`;
            break;
        case 'delete user':
            description = `Xóa người dùng ${params.id || 'ID ẩn danh'}`;
            break;
        case 'put user role':
        case 'update user role':
            description = `Cập nhật vai trò người dùng ${params.id || 'ID ẩn danh'}: ${sanitizedBody.role || 'Vai trò mới'}`;
            break;
        case 'get staff':
            description = "Xem danh sách nhân viên";
            break;
        case 'get staff by id':
            description = `Xem chi tiết nhân viên ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post staff':
        case 'create staff':
            description = `Tạo nhân viên mới: ${sanitizedBody.email || 'Email ẩn danh'}`;
            break;
        case 'put staff':
        case 'update staff':
            description = `Cập nhật nhân viên ${params.id || 'ID ẩn danh'}`;
            break;
        case 'delete staff':
            description = `Xóa nhân viên ${params.id || 'ID ẩn danh'}`;
            break;
        case 'get vouchers':
            description = "Xem tất cả voucher";
            break;
        case 'get voucher by id':
            description = `Xem chi tiết voucher ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post voucher':
        case 'create voucher':
            description = `Tạo voucher mới: ${sanitizedBody.code || 'Mã voucher'}`;
            break;
        case 'put voucher':
        case 'update voucher':
            description = `Cập nhật voucher ${params.id || 'ID ẩn danh'}`;
            break;
        case 'delete voucher':
            description = `Xóa voucher ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post shipping':
        case 'create shipping':
            description = `Tạo phương thức vận chuyển mới: ${sanitizedBody.name || 'Tên phương thức'}`;
            break;
        case 'put shipping':
        case 'update shipping':
            description = `Cập nhật phương thức vận chuyển ${params.id || 'ID ẩn danh'}`;
            break;
        case 'delete shipping':
            description = `Xóa phương thức vận chuyển ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post notification':
        case 'create notification':
            description = `Gửi thông báo mới cho user ${sanitizedBody.user || 'ID ẩn danh'}`;
            break;
        case 'get notifications':
            description = "Xem danh sách thông báo cá nhân";
            break;
        case 'get unread count':
            description = "Xem số lượng thông báo chưa đọc";
            break;
        case 'put notification read':
            description = `Đánh dấu thông báo ${params.id || 'ID ẩn danh'} là đã đọc`;
            break;
        case 'delete notification':
            description = `Xóa thông báo ${params.id || 'ID ẩn danh'}`;
            break;
        case 'put mark all read':
            description = "Đánh dấu tất cả thông báo là đã đọc";
            break;
        case 'post media':
        case 'create media':
            description = `Tạo media mới: ${sanitizedBody.filename || 'Tên file'}`;
            break;
        case 'get media by id':
            description = `Xem media ${params.id || 'ID ẩn danh'}`;
            break;
        case 'get media related':
            description = `Xem media liên quan đến ${params.relatedModel} ${params.relatedId || 'ID ẩn danh'}`;
            break;
        case 'put media':
        case 'update media':
            description = `Cập nhật media ${params.id || 'ID ẩn danh'}`;
            break;
        case 'delete media':
            description = `Xóa media ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post register':
        case 'create user':
            description = `Đăng ký tài khoản mới: ${sanitizedBody.email || 'Email ẩn danh'}`;
            break;
        case 'post login':
            description = "Đăng nhập thành công";
            break;
        case 'post refresh token':
            description = "Làm mới access token";
            break;
        case 'post logout':
            description = "Đăng xuất tài khoản";
            break;
        case 'put change password':
            description = "Đổi mật khẩu tài khoản";
            break;
        case 'post category':
        case 'create category':
            description = `Tạo danh mục mới: ${sanitizedBody.name || 'Tên danh mục'}`;
            break;
        case 'put category':
        case 'update category':
            description = `Cập nhật danh mục ${params.id || 'ID ẩn danh'}`;
            break;
        case 'delete category':
            description = `Xóa danh mục ${params.id || 'ID ẩn danh'}`;
            break;
        case 'post brand':
        case 'create brand':
            description = `Tạo thương hiệu mới: ${sanitizedBody.name || 'Tên thương hiệu'}`;
            break;
        case 'put brand':
        case 'update brand':
            description = `Cập nhật thương hiệu ${params.id || 'ID ẩn danh'}`;
            break;
        case 'delete brand':
            description = `Xóa thương hiệu ${params.id || 'ID ẩn danh'}`;
            break;
        default:
            description = `Hoạt động hệ thống: ${action}`;
        }

        const ipAddress = req.ip || req.connection.remoteAddress || "";
        const userAgent = req.get('User-Agent') || "";

        try {
        await ActivityLog.create({
            user: userId,
            action,
            description,
            ipAddress,
            userAgent,
        });
        } catch (error) {
        console.error("Lỗi ghi activity log:", error);
        // Không throw để không block request
        }

        next();
    };
};

/**
 * 📊 Middleware ghi log sau response (post-log) - log success/fail
 * Sử dụng: router.put('/orders/:id', protect, activityLogMiddleware(['update_order']), postActivityLog, handler);
 */
export const postActivityLog = (req, res, next) => {
    const originalJson = res.json;
    const originalSend = res.send;
    const userId = req.user?.id;
    const { method, originalUrl } = req;
    const routeSegment = originalUrl.split('/').pop() || 'unknown';
    const action = `${method.toLowerCase()} ${routeSegment}`;

    if (!userId) {
        return next();
    }

    // Override res.json và res.send để capture status
    const logResponse = (statusCode, body) => {
        const isSuccess = statusCode >= 200 && statusCode < 300;
        const description = isSuccess 
        ? `Hoạt động thành công: ${action}` 
        : `Hoạt động thất bại: ${action} (Status: ${statusCode})`;

        ActivityLog.create({
        user: userId,
        action,
        description,
        ipAddress: req.ip || "",
        userAgent: req.get('User-Agent') || "",
        }).catch(err => console.error("Lỗi post log:", err));
    };

    res.json = function(body) {
        logResponse(this.statusCode, body);
        return originalJson.call(this, body);
    };

    res.send = function(body) {
        logResponse(this.statusCode, body);
        return originalSend.call(this, body);
    };

    next();
};
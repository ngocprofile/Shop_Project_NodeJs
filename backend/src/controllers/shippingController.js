import Shipping from "../models/shippingModel.js";

/**
 * 🚚 Tạo phương thức vận chuyển mới (Admin)
 */
export const createShippingMethod = async (req, res, next) => {
    try {
        // Lấy dữ liệu từ body (đảm bảo validator đã cho qua các trường mới)
        const { 
            name, type, cost, 
            freeShipOrderThreshold, allowedProvinceCodes, 
            estimatedDelivery, description, isActive 
        } = req.body; // Lưu ý: Nếu dùng req.validated.body thì phải update Joi schema trước

        const existing = await Shipping.findOne({ name });
        if (existing) {
            const error = new Error("Tên phương thức vận chuyển đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        const shipping = await Shipping.create({
            name,
            type,
            cost,
            freeShipOrderThreshold,
            allowedProvinceCodes,
            estimatedDelivery,
            description,
            isActive,
        });

        res.status(201).json({
            message: "Tạo phương thức vận chuyển thành công",
            shipping,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 📋 Lấy danh sách phương thức vận chuyển
 * LOGIC MỚI: Hỗ trợ lọc theo 'provinceCode' (Mã tỉnh) nếu frontend gửi lên
 */
export const getAllShippingMethods = async (req, res, next) => {
    try {
        const { provinceCode } = req.query; // Nhận mã tỉnh từ query params (VD: ?provinceCode=79)
        
        let query = { isActive: true }; // Mặc định chỉ lấy cái đang hoạt động

        // Nếu là Admin gọi API (không có query provinceCode), có thể muốn xem cả cái đang ẩn
        // Nhưng ở đây ta giả định đây là API public cho người dùng
        
        const allMethods = await Shipping.find(query).sort({ cost: 1 });

        // Lọc logic khu vực (Nếu có provinceCode)
        const availableMethods = allMethods.filter(method => {
            // Nếu allowedProvinceCodes rỗng -> Toàn quốc -> Lấy
            if (!method.allowedProvinceCodes || method.allowedProvinceCodes.length === 0) return true;
            
            // Nếu có provinceCode gửi lên, check xem có nằm trong danh sách cho phép không
            if (provinceCode) {
                return method.allowedProvinceCodes.includes(provinceCode);
            }
            
            // Nếu không gửi provinceCode nhưng method này lại yêu cầu tỉnh -> Tạm ẩn hoặc hiện tùy logic
            return true; 
        });

        res.status(200).json(availableMethods);
    } catch (error) {
        next(error);
    }
};

/**
 * 🔍 Lấy chi tiết 1 phương thức (Admin dùng để sửa)
 */
export const getShippingById = async (req, res, next) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            const error = new Error("Không tìm thấy phương thức vận chuyển");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(shipping);
    } catch (error) {
        next(error);
    }
};

/**
 * ✏️ Cập nhật phương thức vận chuyển (Admin)
 */
export const updateShippingMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body; 

        const shipping = await Shipping.findById(id);
        if (!shipping) {
            const error = new Error("Không tìm thấy phương thức vận chuyển");
            error.statusCode = 404;
            return next(error);
        }

        // Cập nhật dữ liệu
        Object.keys(updateData).forEach((key) => {
            shipping[key] = updateData[key];
        });

        const updated = await shipping.save();
        
        res.status(200).json({
            message: "Cập nhật thành công",
            shipping: updated,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 🗑️ Xóa phương thức vận chuyển (Admin)
 */
export const deleteShippingMethod = async (req, res, next) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            const error = new Error("Không tìm thấy phương thức vận chuyển");
            error.statusCode = 404;
            return next(error);
        }

        await shipping.deleteOne();
        res.status(200).json({ message: "Đã xóa phương thức vận chuyển" });
    } catch (error) {
        next(error);
    }
};
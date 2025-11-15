import Brand from "../models/brandModel.js";

/**
 * 🧩 Lấy danh sách tất cả thương hiệu
 * @route GET /api/brands
 * @access Public
 */
export const getAllBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find().sort({ createdAt: -1 });
        res.status(200).json(brands);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Lấy thông tin chi tiết 1 thương hiệu
 * @route GET /api/brands/:id
 * @access Public
 */
export const getBrandById = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(brand);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Tạo thương hiệu mới
 * @route POST /api/brands
 * @access Private (Admin)
 */
export const createBrand = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, description, origin, logo } = req.validated.body;

        // Kiểm tra trùng tên thương hiệu
        const existing = await Brand.findOne({ name });
        if (existing) {
            const error = new Error("Thương hiệu này đã tồn tại");
            error.statusCode = 400;
            return next(error);
        }

        const brand = new Brand({
            name,
            description,
            origin,
            logo,
        });

        const createdBrand = await brand.save();
        res.status(201).json({
            message: "Thêm thương hiệu thành công",
            brand: createdBrand,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Cập nhật thương hiệu
 * @route PUT /api/brands/:id
 * @access Private (Admin)
 */
export const updateBrand = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, description, origin, logo, isActive } = req.validated.body;

        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        // Cập nhật chỉ nếu field được cung cấp (từ validated body)
        if (name !== undefined) brand.name = name;
        if (description !== undefined) brand.description = description;
        if (origin !== undefined) brand.origin = origin;
        if (logo !== undefined) brand.logo = logo;
        if (isActive !== undefined) brand.isActive = isActive;

        const updatedBrand = await brand.save();
        res.status(200).json({
            message: "Cập nhật thương hiệu thành công",
            brand: updatedBrand,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Xóa thương hiệu
 * @route DELETE /api/brands/:id
 * @access Private (Admin)
 */
export const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) {
            const error = new Error("Không tìm thấy thương hiệu");
            error.statusCode = 404;
            return next(error);
        }

        await brand.deleteOne();
        res.status(200).json({ message: "Xóa thương hiệu thành công" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
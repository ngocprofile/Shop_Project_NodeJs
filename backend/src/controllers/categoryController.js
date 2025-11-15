import Category from "../models/categoryModel.js";

/**
 * 🧩 Lấy danh sách tất cả danh mục
 * @route GET /api/categories
 * @access Public
 */
export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
        .populate("parentCategory", "name")
        .sort({ createdAt: -1 });

        res.status(200).json(categories);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Lấy thông tin chi tiết 1 danh mục
 * @route GET /api/categories/:id
 * @access Public
 */
export const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id).populate(
        "parentCategory",
        "name"
        );

        if (!category) {
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        res.status(200).json(category);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Tạo danh mục mới
 * @route POST /api/categories
 * @access Private (Admin)
 */
export const createCategory = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, description, parentCategory, image } = req.validated.body;

        // Kiểm tra trùng tên danh mục
        const existing = await Category.findOne({ name });
        if (existing) {
        const error = new Error("Danh mục này đã tồn tại");
        error.statusCode = 400;
        return next(error);
        }

        const category = new Category({
        name,
        description,
        parentCategory: parentCategory || null,
        image,
        });

        const createdCategory = await category.save();
        res.status(201).json({
        message: "Thêm danh mục thành công",
        category: createdCategory,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Cập nhật danh mục
 * @route PUT /api/categories/:id
 * @access Private (Admin)
 */
export const updateCategory = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { name, description, parentCategory, image, isActive } = req.validated.body;

        const category = await Category.findById(req.params.id);

        if (!category) {
        const error = new Error("Không tìm thấy danh mục");
        error.statusCode = 404;
        return next(error);
        }

        // Cập nhật chỉ nếu field được cung cấp (từ validated body)
        if (name !== undefined) category.name = name;
        if (description !== undefined) category.description = description;
        if (parentCategory !== undefined) category.parentCategory = parentCategory;
        if (image !== undefined) category.image = image;
        if (isActive !== undefined) category.isActive = isActive;

        const updated = await category.save();

        res.status(200).json({
        message: "Cập nhật danh mục thành công",
        category: updated,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🧩 Xóa danh mục
 * @route DELETE /api/categories/:id
 * @access Private (Admin)
 */
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
        const error = new Error("Không tìm thấy danh mục");
        error.statusCode = 404;
        return next(error);
        }

        await category.deleteOne();
        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
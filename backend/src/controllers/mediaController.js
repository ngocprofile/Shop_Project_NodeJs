// mediaController.js
import Media from "../models/mediaModel.js";

/**
 * 📤 Tạo media mới (thường gọi sau khi upload file)
 */
export const createMedia = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { filename, url, type, relatedModel, relatedId } = req.validated.body;

        const newMedia = new Media({
            filename,
            url,
            type: type || "image",
            relatedModel,
            relatedId,
        });

        const savedMedia = await newMedia.save();
        res.status(201).json(savedMedia);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🔍 Lấy media theo ID
 */
export const getMediaById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const media = await Media.findById(id).select("-isDeleted");
        if (!media) {
            const error = new Error("Media không tồn tại");
            error.statusCode = 404;
            return next(error);
        }

        if (media.isDeleted) {
            const error = new Error("Media đã bị xóa");
            error.statusCode = 404;
            return next(error);
        }

        res.json(media);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 📋 Lấy danh sách media theo relatedModel và relatedId (VD: tất cả ảnh của sản phẩm)
 */
export const getMediaByRelated = async (req, res, next) => {
    try {
        // Sử dụng req.validated.params và req.validated.query từ middleware validate
        const { relatedModel, relatedId } = req.validated.params;
        const { type } = req.validated.query; // Lọc theo loại nếu có

        const query = { relatedModel, relatedId, isDeleted: false };
        if (type) {
            query.type = type;
        }

        const medias = await Media.find(query).sort({ createdAt: -1 });
        res.json(medias);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * ✏️ Cập nhật media (VD: thay đổi URL, type)
 */
export const updateMedia = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Sử dụng req.validated.body từ middleware validate
        const updates = req.validated.body;
        const userId = req.user?.id; // Nếu cần kiểm tra quyền sở hữu, tùy chỉnh thêm

        const media = await Media.findById(id);
        if (!media) {
            const error = new Error("Media không tồn tại");
            error.statusCode = 404;
            return next(error);
        }

        if (media.isDeleted) {
            const error = new Error("Media đã bị xóa");
            error.statusCode = 404;
            return next(error);
        }

        // Kiểm tra quyền nếu cần (VD: relatedId thuộc user)
        // Ví dụ: if (media.relatedModel === "Product" && !userOwnsProduct(userId, media.relatedId)) { ... }

        Object.assign(media, updates);
        const updatedMedia = await media.save();

        res.json(updatedMedia);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

/**
 * 🗑️ Xóa media (soft delete)
 */
export const deleteMedia = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id; // Nếu cần kiểm tra quyền

        const media = await Media.findById(id);
        if (!media) {
            const error = new Error("Media không tồn tại");
            error.statusCode = 404;
            return next(error);
        }

        if (media.isDeleted) {
            const error = new Error("Media đã bị xóa");
            error.statusCode = 404;
            return next(error);
        }

        // Kiểm tra quyền nếu cần
        // Ví dụ: if (!userOwnsMedia(userId, media)) { return res.status(403).json({ message: "Không có quyền xóa" }); }

        media.isDeleted = true;
        await media.save();

        res.json({ message: "Xóa media thành công" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
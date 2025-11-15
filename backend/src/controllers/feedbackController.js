// feedbackController.js
import Feedback from "../models/feedbackModel.js";
import Product from "../models/productModel.js"; // Assuming Product model exists
import { validateArrayOfUrls, validateObjectId, validateRating } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

// Tạo feedback mới
export const createFeedback = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const { product, rating, comment, images } = req.validated.body;
        const userId = req.user.id; // Giả sử req.user từ middleware auth

        // Extra check với validationUtils cho product (ObjectId)
        const productCheck = validateObjectId(product);
        if (!productCheck.isValid) {
            const error = new Error(productCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        // Extra check cho rating
        const ratingCheck = validateRating(rating);
        if (!ratingCheck.isValid) {
            const error = new Error(ratingCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        // Extra check cho images nếu có
        if (images && images.length > 0) {
            const imagesCheck = validateArrayOfUrls(images);
            if (!imagesCheck.isValid) {
                const error = new Error(`Hình ảnh không hợp lệ: ${imagesCheck.errors.join(', ')}`);
                error.statusCode = 400;
                return next(error);
            }
        }

        // Kiểm tra xem user đã đánh giá sản phẩm này chưa
        const existingFeedback = await Feedback.findOne({ user: userId, product });
        if (existingFeedback) {
            const error = new Error("Bạn đã đánh giá sản phẩm này rồi!");
            error.statusCode = 400;
            return next(error);
        }

        // Kiểm tra sản phẩm tồn tại
        const productExists = await Product.findById(product);
        if (!productExists) {
            const error = new Error("Sản phẩm không tồn tại!");
            error.statusCode = 404;
            return next(error);
        }

        const newFeedback = new Feedback({
            user: userId,
            product,
            rating,
            comment,
            images: images || [],
        });

        const savedFeedback = await newFeedback.save();

        // Cập nhật rating trung bình cho sản phẩm (tùy chọn)
        const feedbacks = await Feedback.find({ product }).select("rating");
        const averageRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length;
        await Product.findByIdAndUpdate(product, { averageRating });

        res.status(201).json(savedFeedback);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// Lấy danh sách feedback theo sản phẩm
export const getFeedbacksByProduct = async (req, res, next) => {
    try {
        // Sử dụng req.validated.params từ middleware validate
        const { productId } = req.validated.params;

        // Extra check với validationUtils cho productId (ObjectId)
        const productIdCheck = validateObjectId(productId);
        if (!productIdCheck.isValid) {
            const error = new Error(productIdCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const feedbacks = await Feedback.find({ product: productId })
            .populate("user", "name avatar") // Populate thông tin user cơ bản
            .populate("product", "name")
            .sort({ createdAt: -1 });

        res.json(feedbacks);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// Lấy feedback của user cho sản phẩm cụ thể
export const getUserFeedbackForProduct = async (req, res, next) => {
    try {
        // Sử dụng req.validated.params từ middleware validate
        const { productId } = req.validated.params;
        const userId = req.user.id;

        // Extra check với validationUtils cho productId (ObjectId)
        const productIdCheck = validateObjectId(productId);
        if (!productIdCheck.isValid) {
            const error = new Error(productIdCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const feedback = await Feedback.findOne({ user: userId, product: productId })
            .populate("user", "name")
            .populate("product", "name");

        res.json(feedback || null);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// Cập nhật feedback
export const updateFeedback = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Extra check với validationUtils cho id (ObjectId)
        const idCheck = validateObjectId(id);
        if (!idCheck.isValid) {
            const error = new Error(idCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const feedback = await Feedback.findOne({ _id: id, user: userId });
        if (!feedback) {
            const error = new Error("Feedback không tồn tại hoặc không phải của bạn!");
            error.statusCode = 404;
            return next(error);
        }

        // Sử dụng req.validated.body từ middleware validate
        const { rating, comment, images } = req.validated.body;

        // Extra check cho rating nếu có thay đổi
        if (rating !== undefined) {
            const ratingCheck = validateRating(rating);
            if (!ratingCheck.isValid) {
                const error = new Error(ratingCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        // Extra check cho images nếu có thay đổi
        if (images !== undefined && images.length > 0) {
            const imagesCheck = validateArrayOfUrls(images);
            if (!imagesCheck.isValid) {
                const error = new Error(`Hình ảnh không hợp lệ: ${imagesCheck.errors.join(', ')}`);
                error.statusCode = 400;
                return next(error);
            }
        }

        feedback.rating = rating !== undefined ? rating : feedback.rating;
        feedback.comment = comment !== undefined ? comment : feedback.comment;
        feedback.images = images !== undefined ? images : feedback.images;

        const updatedFeedback = await feedback.save();

        // Cập nhật lại rating trung bình cho sản phẩm
        const feedbacks = await Feedback.find({ product: feedback.product }).select("rating");
        const averageRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length;
        await Product.findByIdAndUpdate(feedback.product, { averageRating });

        res.json(updatedFeedback);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

// Xóa feedback
export const deleteFeedback = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Extra check với validationUtils cho id (ObjectId)
        const idCheck = validateObjectId(id);
        if (!idCheck.isValid) {
            const error = new Error(idCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const feedback = await Feedback.findOneAndDelete({ _id: id, user: userId });
        if (!feedback) {
            const error = new Error("Feedback không tồn tại hoặc không phải của bạn!");
            error.statusCode = 404;
            return next(error);
        }

        // Cập nhật lại rating trung bình cho sản phẩm
        const feedbacks = await Feedback.find({ product: feedback.product }).select("rating");
        const averageRating = feedbacks.length > 0 
            ? feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length 
            : 0;
        await Product.findByIdAndUpdate(feedback.product, { averageRating });

        res.json({ message: "Xóa feedback thành công!" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
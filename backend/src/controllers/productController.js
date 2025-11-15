import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import Variant from "../models/variantModel.js";
import Voucher from "../models/voucherModel.js";
import { validateArrayOfUrls, validateEnum, validatePositiveNumber } from "../utils/validationUtils.js"; // Import validationUtils cho extra checks

//
// 🔹 Hàm áp dụng tự động voucher tốt nhất cho sản phẩm
//
const applyBestVoucherForProduct = async (product) => {
    const now = new Date();
    const vouchers = await Voucher.find({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
    });

    if (!vouchers.length) return product;

    let bestVoucher = null;
    let maxDiscount = 0;

    for (const voucher of vouchers) {
        if (voucher.minOrderValue && product.basePrice < voucher.minOrderValue) continue;

        let discount = 0;
        if (voucher.discountType === "percentage") {
            discount = (product.basePrice * voucher.discountValue) / 100;
            if (voucher.maxDiscountAmount && discount > voucher.maxDiscountAmount)
                discount = voucher.maxDiscountAmount;
        } else if (voucher.discountType === "fixed") {
            discount = voucher.discountValue;
        }

        if (discount > maxDiscount) {
            maxDiscount = discount;
            bestVoucher = voucher;
        }
    }

    product.appliedVoucher = bestVoucher ? bestVoucher.code : null;
    product.discountValue = maxDiscount;
    product.finalPrice = Math.max(product.basePrice - maxDiscount, 0);

    // 🔸 Áp dụng giá giảm cho từng biến thể nếu có
    if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
            const variantPrice = variant.price || product.basePrice;
            let discount = 0;
            if (bestVoucher) {
                if (bestVoucher.discountType === "percentage") {
                    discount = (variantPrice * bestVoucher.discountValue) / 100;
                    if (bestVoucher.maxDiscountAmount && discount > bestVoucher.maxDiscountAmount)
                        discount = bestVoucher.maxDiscountAmount;
                } else if (bestVoucher.discountType === "fixed") {
                    discount = bestVoucher.discountValue;
                }
            }
            variant.discountValue = discount;
            variant.finalPrice = Math.max(variantPrice - discount, 0);
        }
    }

    return product;
};

//
// 🆕 Tạo sản phẩm (tự động áp voucher nếu hợp lệ)
//
export const createProduct = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const {
            name,
            description,
            brand,
            category,
            basePrice,
            images,
            gender,
            material,
            variants,
        } = req.validated.body;

        // Extra check với validationUtils cho basePrice và images
        const priceCheck = validatePositiveNumber(basePrice);
        if (!priceCheck.isValid) {
            const error = new Error(priceCheck.message);
            error.statusCode = 400;
            return next(error);
        }

        const imagesCheck = validateArrayOfUrls(images);
        if (images && !imagesCheck.isValid) {
            const error = new Error(`Hình ảnh không hợp lệ: ${imagesCheck.errors.join(', ')}`);
            error.statusCode = 400;
            return next(error);
        }

        // Extra check enum cho gender và material nếu có (giả sử enum: ['male', 'female', 'unisex'] cho gender)
        if (gender) {
            const genderCheck = validateEnum(gender, ['male', 'female', 'unisex']);
            if (!genderCheck.isValid) {
                const error = new Error(genderCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (material) {
            const materialCheck = validateEnum(material, ['cotton', 'polyester', 'leather', 'other']); // Giả sử enum materials
            if (!materialCheck.isValid) {
                const error = new Error(materialCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        const brandExists = await Brand.findById(brand);
        const categoryExists = await Category.findById(category);

        if (!brandExists) {
            const error = new Error("Thương hiệu không hợp lệ");
            error.statusCode = 400;
            return next(error);
        }
        if (!categoryExists) {
            const error = new Error("Danh mục không hợp lệ");
            error.statusCode = 400;
            return next(error);
        }

        let newProduct = new Product({
            name,
            description,
            brand,
            category,
            basePrice,
            images,
            gender,
            material,
        });

        await newProduct.save();

        // 🔹 Nếu có biến thể => tạo đồng loạt
        if (Array.isArray(variants) && variants.length > 0) {
            const createdVariants = await Promise.all(
                variants.map(async (v) => {
                    // Extra check cho variant price và stock
                    const variantPriceCheck = validatePositiveNumber(v.price || basePrice);
                    if (!variantPriceCheck.isValid) {
                        const error = new Error(`Giá biến thể không hợp lệ: ${variantPriceCheck.message}`);
                        error.statusCode = 400;
                        throw error;
                    }
                    const stockCheck = validatePositiveNumber(v.stock || 0);
                    if (!stockCheck.isValid) {
                        const error = new Error(`Stock biến thể không hợp lệ: ${stockCheck.message}`);
                        error.statusCode = 400;
                        throw error;
                    }
                    return Variant.create({ ...v, product: newProduct._id });
                })
            );
            newProduct.variants = createdVariants.map((v) => v._id);
            await newProduct.save();
        }

        // 🔹 Áp voucher tự động (nếu có)
        newProduct = await Product.findById(newProduct._id).populate("variants");
        const productWithDiscount = await applyBestVoucherForProduct(newProduct);

        res.status(201).json({
            message: "Tạo sản phẩm thành công (đã áp voucher tự động nếu hợp lệ)",
            product: productWithDiscount,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

//
// 🧾 Lấy tất cả sản phẩm (có áp voucher)
//
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate("brand", "name")
            .populate("category", "name")
            .populate("variants");

        const productsWithDiscount = await Promise.all(
            products.map((p) => applyBestVoucherForProduct(p))
        );

        res.status(200).json(productsWithDiscount);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

//
// 🔍 Lấy chi tiết sản phẩm
//
export const getProductById = async (req, res, next) => {
    try {
        // Sử dụng req.params.id (validated in routes)
        const product = await Product.findById(req.params.id)
            .populate("brand", "name")
            .populate("category", "name")
            .populate("variants");

        if (!product) {
            const error = new Error("Không tìm thấy sản phẩm");
            error.statusCode = 404;
            return next(error);
        }

        const productWithDiscount = await applyBestVoucherForProduct(product);
        res.status(200).json(productWithDiscount);
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

//
// ✏️ Cập nhật sản phẩm
//
export const updateProduct = async (req, res, next) => {
    try {
        // Sử dụng req.validated.body từ middleware validate
        const updates = req.validated.body;

        // Extra check với validationUtils cho price nếu có thay đổi
        if (updates.basePrice !== undefined) {
            const priceCheck = validatePositiveNumber(updates.basePrice);
            if (!priceCheck.isValid) {
                const error = new Error(priceCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (updates.images !== undefined) {
            const imagesCheck = validateArrayOfUrls(updates.images);
            if (!imagesCheck.isValid) {
                const error = new Error(`Hình ảnh không hợp lệ: ${imagesCheck.errors.join(', ')}`);
                error.statusCode = 400;
                return next(error);
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, {
            new: true,
        })
            .populate("brand", "name")
            .populate("category", "name")
            .populate("variants");

        if (!updatedProduct) {
            const error = new Error("Không tìm thấy sản phẩm để cập nhật");
            error.statusCode = 404;
            return next(error);
        }

        const productWithDiscount = await applyBestVoucherForProduct(updatedProduct);
        res.status(200).json({
            message: "Cập nhật sản phẩm thành công (đã tính lại giá giảm)",
            product: productWithDiscount,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

//
// 🗑️ Xóa sản phẩm và biến thể liên quan
//
export const deleteProduct = async (req, res, next) => {
    try {
        // Sử dụng req.params.id (validated in routes)
        const product = await Product.findById(req.params.id);
        if (!product) {
            const error = new Error("Không tìm thấy sản phẩm");
            error.statusCode = 404;
            return next(error);
        }

        await Variant.deleteMany({ product: product._id });
        await product.deleteOne();

        res.status(200).json({ message: "Đã xóa sản phẩm và các biến thể liên quan" });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

//
// 🧩 Thêm biến thể mới
//
export const addVariantToProduct = async (req, res, next) => {
    try {
        // Sử dụng req.params.productId và req.validated.body từ middleware validate
        const { productId } = req.params;
        const { variants } = req.validated.body;

        const product = await Product.findById(productId);
        if (!product) {
            const error = new Error("Không tìm thấy sản phẩm");
            error.statusCode = 404;
            return next(error);
        }

        const createdVariants = await Promise.all(
            variants.map(async (v) => {
                // Extra check cho variant price và stock với validationUtils
                const variantPriceCheck = validatePositiveNumber(v.price || 0);
                if (!variantPriceCheck.isValid) {
                    const error = new Error(`Giá biến thể không hợp lệ: ${variantPriceCheck.message}`);
                    error.statusCode = 400;
                    throw error;
                }
                const stockCheck = validatePositiveNumber(v.stock || 0);
                if (!stockCheck.isValid) {
                    const error = new Error(`Stock biến thể không hợp lệ: ${stockCheck.message}`);
                    error.statusCode = 400;
                    throw error;
                }
                return Variant.create({ ...v, product: productId });
            })
        );

        product.variants.push(...createdVariants.map((v) => v._id));
        await product.save();

        res.status(201).json({
            message: "Đã thêm biến thể mới cho sản phẩm",
            createdVariants,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};

//
// 🔄 Cập nhật biến thể cụ thể
//
export const updateVariant = async (req, res, next) => {
    try {
        // Sử dụng req.params.id và req.validated.body từ middleware validate
        const { id } = req.params;
        const updates = req.validated.body;

        // Extra check với validationUtils cho price và stock nếu có thay đổi
        if (updates.price !== undefined) {
            const priceCheck = validatePositiveNumber(updates.price);
            if (!priceCheck.isValid) {
                const error = new Error(priceCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }
        if (updates.stock !== undefined) {
            const stockCheck = validatePositiveNumber(updates.stock);
            if (!stockCheck.isValid) {
                const error = new Error(stockCheck.message);
                error.statusCode = 400;
                return next(error);
            }
        }

        const updatedVariant = await Variant.findByIdAndUpdate(id, updates, {
            new: true,
        });
        if (!updatedVariant) {
            const error = new Error("Không tìm thấy biến thể để cập nhật");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            message: "Cập nhật biến thể thành công",
            updatedVariant,
        });
    } catch (error) {
        next(error); // Chuyền lỗi cho errorMiddleware
    }
};
// middleware/validateMiddleware.js
import Joi from "joi"; // npm install joi

/**
 * 🧹 Middleware kiểm tra dữ liệu đầu vào bằng Joi
 * - Validate req.body, req.params, req.query dựa trên schema.
 * - Nếu lỗi: Trả response 400 với chi tiết lỗi cho TẤT CẢ trường hợp (field, message, type).
 * - Nếu OK: Gán req.validated = { body, params, query } (sau strip unknown fields).
 * Sử dụng: router.post('/', validate(schemas.createUser), handler);
 * * File này được thiết kế để kiểm tra dữ liệu đầu vào cho TẤT CẢ các controller/model chính trong dự án.
 * Mỗi schema có messages tùy chỉnh để hiển thị lỗi chi tiết.
 * Áp dụng vào routes tương ứng để validate trước khi đến controller.
 */
const validate = (schema) => {
    return (req, res, next) => {
        // 1. Chỉ lấy ra các phần (body, params, query) mà schema CÓ khai báo
        // Ví dụ: Schema chỉ có 'body', thì objectToValidate chỉ có { body: ... }
        const objectToValidate = {};
        if (schema.body) objectToValidate.body = req.body;
        if (schema.params) objectToValidate.params = req.params;
        if (schema.query) objectToValidate.query = req.query;

        // 2. Validate
        const { error, value } = Joi.object(schema).validate(
            objectToValidate,
            {
                abortEarly: false,  // Báo tất cả lỗi
                stripUnknown: true, // Xóa các trường thừa bên trong body/params
                allowUnknown: false // Chặt chẽ: Không cho phép gửi trường lạ
            }
        );

        if (error) {
            // 3. Xử lý lỗi (Giữ nguyên logic của bạn vì nó rất tốt)
            const errors = error.details.map((detail) => ({
                field: detail.path.join("."),  
                type: detail.type,            
                message: detail.message.replace(/['"]/g, ""), 
                // value: detail.context?.value || "N/A" // Có thể bỏ dòng này để response gọn hơn
            }));

            return res.status(400).json({
                success: false,
                message: "Dữ liệu đầu vào không hợp lệ",
                totalErrors: errors.length,
                errors: errors
            });
        }

        // 4. Gán lại dữ liệu đã làm sạch vào req
        // Joi có tính năng convert (VD: "123" -> 123), nên cần gán lại value vào req
        if (value.body) req.body = value.body;
        if (value.params) req.params = value.params;
        if (value.query) req.query = value.query;
        
        // Hoặc dùng req.validated như bạn (nhưng gán đè req.body tiện hơn cho controller)
        req.validated = value; 

        next();
    };
};

const objectId = Joi.string().hex().length(24).messages({
    'string.hex': 'ID phải là một chuỗi 24 ký tự hex.',
    'string.length': 'ID phải có đúng 24 ký tự.'
});
const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

// ===================================================
// A. SIZE INVENTORY: TÁCH BIỆT KEYS VÀ SCHEMA
// ===================================================

const SIZE_OPTIONS = [
    // === Kích cỡ Quần áo (Quốc tế/Việt Nam) ===
    'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL',
    
    // === Kích cỡ Đặc biệt (Cho quần áo hoặc phụ kiện) ===
    'OS',         // One Size (Giữ lại theo code cũ, nhưng nên dùng 'One Size' hoặc 'Free Size')
    'One Size',   // Một kích cỡ (Phù hợp với tất cả)
    'Free Size',  // Kích cỡ tự do (Phổ biến ở VN)

    // === Kích cỡ Giày dép (Phổ biến: EU) ===
    '35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5',
    '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5',
    '45', '45.5', '46', '47', '48', '49', '50'
];

// ⚠️ QUAN TRỌNG: Đây là Object thuần chứa các rule (KEYS), KHÔNG PHẢI Joi.object()
// Dùng cái này để spread (...) vào các schema khác
const sizeInventoryKeys = {
    size: Joi.string().trim().uppercase().max(20).required().valid(...SIZE_OPTIONS).messages({
        'any.only': 'Kích thước không hợp lệ. Vui lòng chọn size tiêu chuẩn.',
        'any.required': 'Kích thước (size) là bắt buộc.',
    }),
    price: Joi.number().min(0).precision(2).required().messages({
        'any.required': 'Giá bán size là bắt buộc.',
    }),
    stock: Joi.number().integer().min(0).default(0).messages({
        'number.integer': 'Tồn kho phải là số nguyên.'
    }),
    finalPrice: Joi.number().min(0).precision(2).optional(),
};

// ⚠️ QUAN TRỌNG: Đây là Joi Schema hoàn chỉnh, dùng để validate nested Array
const sizeInventorySchema = Joi.object(sizeInventoryKeys);

// ===================================================
// B. COLOR VARIANT SCHEMA
// ===================================================

const colorVariantCreateSchema = Joi.object({
    color: Joi.string().trim().uppercase().max(50).required().messages({ 
        'string.max': 'Tên màu không được quá 50 ký tự.',
        'any.required': 'Tên màu là bắt buộc.'
    }),
    colorCode: Joi.string().trim().uppercase().max(7).required().regex(hexColorRegex).messages({
        'any.required': 'Mã màu (Color Code) là bắt buộc.',
        'string.pattern.base': 'Mã màu không hợp lệ (Ví dụ: #FF0000).',
    }),
    // ✅ Dùng sizeInventorySchema (Joi Object) ở đây là ĐÚNG vì nằm trong items()
    sizes: Joi.array().items(sizeInventorySchema).min(1).required().messages({
        'array.min': 'Biến thể màu cần ít nhất một kích cỡ và tồn kho.',
        'any.required': 'Thông tin kích cỡ và tồn kho là bắt buộc.',
    }),
    image: Joi.string().uri().optional().allow(null, ''), 
});

// =================================================================
// 🛠️ HELPER SCHEMAS
// =================================================================

// Helper cho định dạng ObjectId (24 ký tự hex)
const JoiObjectId = Joi.string().hex().length(24).messages({
    'string.hex': 'ID không hợp lệ (phải là chuỗi hex 24 ký tự).',
    'string.length': 'ID phải có đúng 24 ký tự.',
});

// Helper cho Object hình ảnh đơn lẻ (sử dụng trong mảng images của Variant)
const imageObjectSchema = Joi.object({
    url: Joi.string().uri().required().messages({ 'string.uri': 'URL ảnh không hợp lệ.' }),
    public_id: Joi.string().allow(null).default(null),
    isMain: Joi.boolean().default(false)
});

// Helper cho Variant khi tạo (chưa có _id)
const variantCreateSchema = Joi.object({
    color: Joi.string().trim().max(50).required(),
    size: Joi.string().trim().max(50).required(),
    price: Joi.number().min(0).precision(2).required(),
    stock: Joi.number().integer().min(0).default(0),
});
// Schemas đầy đủ cho TẤT CẢ các controller/model (User, Product, Order, Feedback, Voucher, Shipping, Notification, Media, Category, Brand, Staff, Auth)
export const schemas = {
  // ========== AUTH CONTROLLER ==========
    // Register (public POST /auth/register)
    register: {
        body: Joi.object({
            name: Joi.string().min(2).max(50).required().messages({
                'string.base': 'Tên phải là chuỗi.',
                'string.min': 'Tên phải ít nhất 2 ký tự.',
                'string.max': 'Tên không được quá 50 ký tự.',
                'any.required': 'Tên là bắt buộc.'
            }),
            email: Joi.string().email().lowercase().required().messages({
                'string.base': 'Email phải là chuỗi.',
                'string.email': 'Email không hợp lệ.',
                'any.required': 'Email là bắt buộc.'
            }),
            password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
                'string.base': 'Mật khẩu phải là chuỗi.',
                'string.min': 'Mật khẩu phải ít nhất 6 ký tự.',
                'string.pattern.base': 'Mật khẩu phải có chữ hoa, thường và số.',
                'any.required': 'Mật khẩu là bắt buộc.'
            }),
            phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional().messages({
                'string.base': 'Số điện thoại phải là chuỗi.',
                'string.pattern.base': 'Số điện thoại không hợp lệ (10-11 số).'
            }),
            
            // =======================================================
            // === 💡 ĐÃ SỬA LỖI: Thêm 'role' vào đây ===
            // =======================================================
            role: Joi.string().valid("customer", "admin", "staff", "user").required().messages({
                'any.only': 'Vai trò không hợp lệ (phải là customer, admin, staff, hoặc user).',
                'any.required': 'Vai trò là bắt buộc.'
            })
            // =======================================================

        })
    },
    
    // 💡 THÊM SCHEMA CHO LOGIN (vì authRoutes.js có dùng)
    login: {
        body: Joi.object({
             email: Joi.string().email().lowercase().required().messages({
                'string.email': 'Email không hợp lệ.',
                'any.required': 'Email là bắt buộc.'
            }),
             password: Joi.string().required().messages({
                'any.required': 'Mật khẩu là bắt buộc.'
            })
        })
    },

    // Change Password (private PUT /auth/change-password)
    changePassword: {
        body: Joi.object({
            currentPassword: Joi.string().min(6).required().messages({
                'string.base': 'Mật khẩu hiện tại phải là chuỗi.',
                'string.min': 'Mật khẩu hiện tại phải ít nhất 6 ký tự.',
                'any.required': 'Mật khẩu hiện tại là bắt buộc.'
            }),
            newPassword: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
                'string.base': 'Mật khẩu mới phải là chuỗi.',
                'string.min': 'Mật khẩu mới phải ít nhất 6 ký tự.',
                'string.pattern.base': 'Mật khẩu mới phải có chữ hoa, thường và số.',
                'any.required': 'Mật khẩu mới là bắt buộc.'
            })
        })
    },

    // Forgot/Reset Password (public POST /auth/forgot-password, PUT /auth/reset-password/:token)
    forgotPassword: {
        body: Joi.object({
            email: Joi.string().email().required().messages({
                'string.base': 'Email phải là chuỗi.',
                'string.email': 'Email không hợp lệ.',
                'any.required': 'Email là bắt buộc.'
            })
        })
    },

    resetPassword: {
        body: Joi.object({
            email: Joi.string().email().required().messages({
            'string.email': 'Email không hợp lệ.',
            'any.required': 'Email là bắt buộc.'
            }),
            otp: Joi.string().length(6).required().messages({
            'string.length': 'OTP phải gồm 6 ký tự.',
            'any.required': 'OTP là bắt buộc.'
            }),
            newPassword: Joi.string()
            .min(6)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
            .required()
            .messages({
                'string.base': 'Mật khẩu phải là chuỗi.',
                'string.min': 'Mật khẩu phải ít nhất 6 ký tự.',
                'string.pattern.base': 'Mật khẩu phải có chữ hoa, thường và số.',
                'any.required': 'Mật khẩu là bắt buộc.'
            })
        })
    },


    // ========== USER CONTROLLER ==========
    // Create User (admin POST /users)
    createUser: {
        body: Joi.object({
            name: Joi.string().min(2).max(50).required().messages({
                'string.base': 'Tên phải là chuỗi.',
                'string.min': 'Tên phải ít nhất 2 ký tự.',
                'string.max': 'Tên không được quá 50 ký tự.',
                'any.required': 'Tên là bắt buộc.'
            }),
            email: Joi.string().email().lowercase().required().messages({
                'string.base': 'Email phải là chuỗi.',
                'string.email': 'Email không hợp lệ.',
                'any.required': 'Email là bắt buộc.'
            }),
            password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
                'string.base': 'Mật khẩu phải là chuỗi.',
                'string.min': 'Mật khẩu phải ít nhất 6 ký tự.',
                'string.pattern.base': 'Mật khẩu phải có chữ hoa, thường và số.',
                'any.required': 'Mật khẩu là bắt buộc.'
            }),
            role: Joi.string().valid("user", "staff", "admin").default("user").messages({
                'any.only': 'Vai trò phải là user, staff hoặc admin.'
            }),
            phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional().messages({
                'string.base': 'Số điện thoại phải là chuỗi.',
                'string.pattern.base': 'Số điện thoại không hợp lệ (10-11 số).'
            })
        })
    },

    // Update User Profile (private PUT /users/profile)
    updateProfile: {
        body: Joi.object({
            name: Joi.string().min(2).max(50).optional().messages({
                'string.base': 'Tên phải là chuỗi.',
                'string.min': 'Tên phải ít nhất 2 ký tự.',
                'string.max': 'Tên không được quá 50 ký tự.'
            }),
            phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional().messages({
                'string.base': 'Số điện thoại phải là chuỗi.',
                'string.pattern.base': 'Số điện thoại không hợp lệ.'
            }),
            address: Joi.string().max(200).optional().messages({
                'string.base': 'Địa chỉ phải là chuỗi.',
                'string.max': 'Địa chỉ không được quá 200 ký tự.'
            })
        }).min(1)  // Ít nhất 1 field để cập nhật
    },

    // Update User Role (admin PUT /users/:id/role)
    updateUserRole: {
        // Validation cho body
        body: Joi.object({
            role: Joi.string().valid("customer", "staff", "admin").required().messages({
                'string.base': 'Vai trò phải là chuỗi.',
                'any.only': 'Vai trò phải là user, staff hoặc admin.',
                'any.required': 'Vai trò là bắt buộc.'
            }),
        }).length(1), // ⭐ Chỉ cho phép duy nhất field 'role'
        
        // Validation cho params (ID)
        params: Joi.object({
            id: Joi.string().hex().length(24).required().messages({
                'string.hex': 'ID người dùng phải là chuỗi thập lục phân.',
                'string.length': 'ID người dùng phải có 24 ký tự.',
                'any.required': 'ID người dùng là bắt buộc.'
            })
        })
    },

    // Update User Status (admin PUT /users/:id/status)
    updateUserStatus: {
        // Validation cho body
        body: Joi.object({
            isActive: Joi.boolean().required().messages({
                'any.required': 'Trạng thái hoạt động (isActive) là bắt buộc.',
                'boolean.base': 'Trạng thái hoạt động phải là True hoặc False.',
            }),
        }).length(1), // ⭐ Chỉ cho phép duy nhất field 'isActive'
        
        // Validation cho params (ID)
        params: Joi.object({
            id: Joi.string().hex().length(24).required().messages({
                'string.hex': 'ID người dùng phải là chuỗi thập lục phân.',
                'string.length': 'ID người dùng phải có 24 ký tự.',
                'any.required': 'ID người dùng là bắt buộc trong tham số.',
            })
        })
    },

    // ========== 1. PRODUCT CONTROLLER ==========
    
    // 1.1. Create Product
    createProduct: {
        body: Joi.object({
            name: Joi.string().min(3).max(100).required(),
            description: Joi.string().max(10000).required(),
            basePrice: Joi.number().min(0).precision(2).required(),
            category: JoiObjectId.required(),
            brand: JoiObjectId.optional(),
            gender: Joi.string().valid('Nam', 'Nữ', 'Unisex').optional(),
            material: Joi.string().max(100).optional(),
            
            // Variants lồng nhau
            variants: Joi.array().items(colorVariantCreateSchema).optional(),
            
            // ColorCode (Optional ở cấp Product)
            colorCode: Joi.string().trim().uppercase().max(7).optional().regex(hexColorRegex),
        })
    },

    // 1.2. Update Product
    updateProduct: {
        body: Joi.object({
            name: Joi.string().min(3).max(100).optional(),
            description: Joi.string().max(10000).optional(),
            basePrice: Joi.number().min(0).precision(2).optional(),
            category: JoiObjectId.optional(),
            brand: JoiObjectId.optional(),
            gender: Joi.string().valid('Nam', 'Nữ', 'Unisex').optional(),
            material: Joi.string().max(100).optional(),
            isActive: Joi.boolean().optional(),
            featuredImage: Joi.string().valid('null').uri().allow(null, '').optional(),
            gallery: Joi.array().items(Joi.string().uri()).optional(),
            colorCode: Joi.string().trim().uppercase().max(7).optional().regex(hexColorRegex),
        }).min(1), // Cần ít nhất 1 trường để update
        params: Joi.object({
            id: JoiObjectId.required()
        })
    },
    
    // 1.3. Add Variant to existing Product (Nested)
    addVariant: {
        body: Joi.object({
            variants: Joi.array().items(colorVariantCreateSchema).min(1).required()
        }),
        params: Joi.object({
            productId: JoiObjectId.required()
        })
    },
    
    // ========== 2. COLOR VARIANT CONTROLLER ==========

    // 2.1. Create Color Variant (Tạo Màu mới)
    createColorVariant: {
        body: Joi.object({
            product: JoiObjectId.required(),
            color: Joi.string().trim().uppercase().max(50).required(),
            colorCode: Joi.string().trim().uppercase().max(7).required().regex(hexColorRegex),
            sizes: Joi.array().items(sizeInventorySchema).min(1).required(),
        })
    },

    // 2.2. Update Color Variant
    updateColorVariant: {
        body: Joi.object({
            color: Joi.string().trim().uppercase().max(50).optional(), 
            colorCode: Joi.string().trim().uppercase().max(7).optional().regex(hexColorRegex),
            image: Joi.string().valid('null').uri().allow(null, '').optional(),
        }).min(1),
        params: Joi.object({
            id: JoiObjectId.required()
        })
    },
    
    // ========== 3. SIZE INVENTORY CONTROLLER ==========

    // 3.1. Create Size Inventory
    createSizeInventory: {
        body: Joi.object({
            variant: JoiObjectId.required(),
            // ✅ Dùng spread operator (...) với KEYS là chính xác
            ...sizeInventoryKeys, 
        })
    },
    
    // 3.2. Update Size Inventory
    updateSizeInventory: {
        body: Joi.object({
            // ✅ Lấy lại các KEYS nhưng chuyển thành optional()
            size: sizeInventoryKeys.size.optional(),
            price: sizeInventoryKeys.price.optional(),
            stock: sizeInventoryKeys.stock.optional(),
            finalPrice: sizeInventoryKeys.finalPrice.optional(),
        }).min(1),
        params: Joi.object({
            id: JoiObjectId.required()
        })
    },
    
    mongoIdParam: {
        params: Joi.object({
            id: JoiObjectId.required()
        })
    },
    
    mongoIdProductIdParam: {
        params: Joi.object({
            productId: JoiObjectId.required()
        })
    },

    // =================================================
    // 🛒 ORDER VALIDATION (ĐÃ SỬA LỖI CẤU TRÚC)
    // =================================================
    createOrder: {
        // 👇 QUAN TRỌNG: Phải bọc trong 'body'
        body: Joi.object({
            orderItems: Joi.array().items(
                Joi.object({
                    product: objectId.required().messages({
                        'any.required': 'Product ID là bắt buộc.'
                    }),
                    colorVariantId: objectId.required().messages({
                        'any.required': 'ColorVariant ID là bắt buộc.'
                    }),
                    sizeInventoryId: objectId.required().messages({
                        'any.required': 'SizeInventory ID là bắt buộc.'
                    }),
                    quantity: Joi.number().integer().min(1).max(100).required()
                })
            ).min(1).required(),

            shippingAddress: Joi.object({
                fullName: Joi.string().trim().min(2).max(100).required(),
                phone: Joi.string().trim().pattern(/^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/).required(),
                address: Joi.string().trim().max(200).required(),
                city: Joi.string().trim().required(),
                district: Joi.string().trim().required(),
                ward: Joi.string().trim().required(),
            }).required(),

            shippingMethodId: objectId.required().messages({
                'any.required': 'Vui lòng chọn phương thức vận chuyển.'
            }),

            paymentMethod: Joi.string().valid("COD", "BankTransfer", "CreditCard", "Momo", "VNPay").required(),
            
            voucherCode: Joi.string().trim().uppercase().allow(null, '').optional(),
            
            notes: Joi.string().trim().max(500).allow(null, '').optional()
        })
    },

    // 🔧 Update Order Status (Phần này của bạn đã ĐÚNG rồi)
    updateOrderStatus: {
        params: Joi.object({
            orderId: objectId.required()
        }),
        body: Joi.object({
            orderStatus: Joi.string().valid("Pending", "Processing", "Shipping", "Delivered", "Cancelled", "Returned").optional(),
            paymentStatus: Joi.string().valid("Unpaid", "Paid", "Refunded").optional()
        }).min(1)
    },

    // 🗑️ Delete Order (Phần này cũng ĐÚNG rồi)
    deleteOrder: {
        params: Joi.object({
            id: objectId.required()
        })
    },

    // ========== FEEDBACK CONTROLLER ==========
    // Create Feedback (user POST /feedback)
    createFeedback: {
        body: Joi.object({
            product: Joi.string().required().messages({
                'string.base': 'ID sản phẩm phải là chuỗi.',
                'any.required': 'ID sản phẩm là bắt buộc.'
            }),
            rating: Joi.number().min(1).max(5).required().messages({
                'number.base': 'Điểm đánh giá phải là số.',
                'number.min': 'Điểm đánh giá phải từ 1-5.',
                'number.max': 'Điểm đánh giá phải từ 1-5.',
                'any.required': 'Điểm đánh giá là bắt buộc.'
            }),
            comment: Joi.string().max(500).optional().messages({
                'string.base': 'Nhận xét phải là chuỗi.',
                'string.max': 'Nhận xét không được quá 500 ký tự.'
            }),
            images: Joi.array().items(Joi.string().uri()).optional().messages({
                'array.base': 'Hình ảnh phải là mảng.',
                'array.uri': 'URL hình ảnh không hợp lệ.'
            })
        })
    },

    // Update Feedback (user PUT /feedback/:id)
    updateFeedback: {
        body: Joi.object({
            rating: Joi.number().min(1).max(5).optional().messages({
                'number.base': 'Điểm đánh giá phải là số.',
                'number.min': 'Điểm đánh giá phải từ 1-5.',
                'number.max': 'Điểm đánh giá phải từ 1-5.'
            }),
            comment: Joi.string().max(500).optional().messages({
                'string.base': 'Nhận xét phải là chuỗi.',
                'string.max': 'Nhận xét không được quá 500 ký tự.'
            }),
            images: Joi.array().items(Joi.string().uri()).optional().messages({
                'array.base': 'Hình ảnh phải là mảng.',
                'array.uri': 'URL hình ảnh không hợp lệ.'
            })
        }).min(1),  // Ít nhất 1 field để cập nhật
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID đánh giá phải là chuỗi.',
                'any.required': 'ID đánh giá là bắt buộc.'
            })
        })
    },

    // ========== VOUCHER CONTROLLER ==========

    // Create Voucher (admin POST /vouchers)
    createVoucher: {
        body: Joi.object({
            // Khối Thông tin
            code: Joi.string().alphanum().min(5).max(20).trim().uppercase().required().messages({
                'string.alphanum': 'Mã voucher chỉ được chứa chữ và số.',
                'string.min': 'Mã voucher phải ít nhất 5 ký tự.',
                'string.max': 'Mã voucher không được quá 20 ký tự.',
                'any.required': 'Mã voucher là bắt buộc.'
            }),
            title: Joi.string().required().messages({
                'any.required': 'Tên hiển thị (title) là bắt buộc.'
            }),
            description: Joi.string().allow('').optional(),

            // Khối Giảm giá
            discountType: Joi.string().valid("percentage", "fixed" , "freeship").required().messages({
                'any.only': 'Loại giảm giá phải là "percentage", "fixed" hoặc "freeship".',
                'any.required': 'Loại giảm giá là bắt buộc.'
            }),

            discountValue: Joi.number().min(0).required().messages({
                'number.base': 'Giá trị giảm phải là số.',
                'number.min': 'Giá trị giảm không được âm.',
                'any.required': 'Giá trị giảm là bắt buộc.'
            }),

            // --- 1. SỬA LỖI LOGIC Ở ĐÂY ---
            // (Chỉ cấm khi là 'fixed', cho phép khi là 'percentage' và 'freeship')
            maxDiscountAmount: Joi.when('discountType', {
                is: 'fixed', // KHI LÀ 'fixed'
                then: Joi.forbidden(), // THÌ CẤM
                otherwise: Joi.number().min(0).optional().default(0).messages({ // NGƯỢC LẠI (là 'percentage' hoặc 'freeship')
                    'number.min': 'Giảm/Trợ giá tối đa không được âm.'
                }) 
            }),
            // --- (Hết phần sửa) ---

            // Khối Điều kiện & Giới hạn
            minOrderValue: Joi.number().min(0).optional().default(0).messages({
                'number.min': 'Giá trị đơn tối thiểu không được âm.'
            }),
            usageLimit: Joi.number().integer().min(0).optional().default(0).messages({
                'number.integer': 'Tổng lượt dùng phải là số nguyên.',
                'number.min': 'Tổng lượt dùng không được âm.'
            }),
            perUserLimit: Joi.number().integer().min(1).optional().default(1).messages({
                'number.integer': 'Giới hạn mỗi người dùng phải là số nguyên.',
                'number.min': 'Giới hạn mỗi người dùng ít nhất là 1.'
            }),

            // Khối Thời gian
            startDate: Joi.date().min('now').required().messages({
                'date.base': 'Ngày bắt đầu phải là ngày hợp lệ.',
                'date.min': 'Ngày bắt đầu phải là từ bây giờ trở đi.',
                'any.required': 'Ngày bắt đầu là bắt buộc.'
            }),
            endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
                'date.base': 'Ngày kết thúc phải là ngày hợp lệ.',
                'date.greater': 'Ngày kết thúc phải sau ngày bắt đầu.',
                'any.required': 'Ngày kết thúc là bắt buộc.'
            }),
            
            // Khối Áp dụng (Khớp Model)
            applicableProducts: Joi.array().items(objectId).optional().default([]),
            applicableBrands: Joi.array().items(objectId).optional().default([]),
            applicableCategories: Joi.array().items(objectId).optional().default([]),

            isActive: Joi.boolean().optional().default(true)
        })
    },

    // Update Voucher (admin PUT /vouchers/:id)
    updateVoucher: {
        body: Joi.object({
            code: Joi.string().alphanum().min(5).max(20).trim().uppercase().optional(),
            title: Joi.string().optional(),
            description: Joi.string().allow('').optional(),
            
            // --- 2. SỬA LỖI Ở ĐÂY (Thêm "freeship") ---
            discountType: Joi.string().valid("percentage", "fixed", "freeship").optional(),
            
            discountValue: Joi.number().min(0).optional(),
            maxDiscountAmount: Joi.number().min(0).optional(), // (Khi update, Joi.when rất phức tạp, để controller xử lý)
            minOrderValue: Joi.number().min(0).optional(),
            usageLimit: Joi.number().integer().min(0).optional(),
            perUserLimit: Joi.number().integer().min(1).optional(),
            startDate: Joi.date().min('now').optional(),
            endDate: Joi.date().optional(),
            
            applicableProducts: Joi.array().items(objectId).optional(),
            applicableBrands: Joi.array().items(objectId).optional(),
            applicableCategories: Joi.array().items(objectId).optional(),
            
            isActive: Joi.boolean().optional()
        }).min(1).messages({
            'object.min': 'Cần ít nhất một trường để cập nhật.'
        }), 
        
        params: Joi.object({
            id: objectId.required()
        })
    },

    // Validate Voucher (public POST /vouchers/validate)
    // (Schema này đã ĐÚNG)
    validateVoucher: {
        body: Joi.object({
            code: Joi.string().alphanum().trim().uppercase().required().messages({
                'any.required': 'Mã voucher là bắt buộc.'
            }),
            userId: objectId.required().messages({
                'any.required': 'ID người dùng là bắt buộc.'
            }),
            orderValue: Joi.number().min(0).required().messages({
                'number.base': 'Giá trị đơn hàng phải là số.',
                'number.min': 'Giá trị đơn hàng không được âm.',
                'any.required': 'Giá trị đơn hàng là bắt buộc.'
            })
        })
    },

    // =================================================
    // 🚚 SHIPPING VALIDATION (ĐÃ CHUẨN HÓA)
    // =================================================

    // 🚚 Create Shipping Method
    createShippingMethod: {
        body: Joi.object({
            name: Joi.string().min(3).max(100).required().messages({
                'string.base': 'Tên phương thức phải là chuỗi.',
                'string.min': 'Tên phương thức phải ít nhất 3 ký tự.',
                'string.max': 'Tên phương thức không được quá 100 ký tự.',
                'any.required': 'Tên phương thức là bắt buộc.'
            }),
            
            type: Joi.string().valid('standard', 'express', 'pickup').default('standard').messages({
                'any.only': 'Loại phương thức phải là: standard, express hoặc pickup.'
            }),

            cost: Joi.number().min(0).required().messages({
                'number.base': 'Phí vận chuyển phải là số.',
                'number.min': 'Phí vận chuyển không được âm.',
                'any.required': 'Phí vận chuyển là bắt buộc.'
            }),

            freeShipOrderThreshold: Joi.number().min(0).allow(null).messages({
                'number.base': 'Mức Freeship phải là số.',
                'number.min': 'Mức Freeship không được âm.'
            }),

            allowedProvinceCodes: Joi.array().items(Joi.string()).messages({
                'array.base': 'Mã tỉnh thành phải là một danh sách (mảng).'
            }),

            estimatedDelivery: Joi.string().max(100).optional().messages({
                'string.base': 'Thời gian giao hàng dự kiến phải là chuỗi.',
                'string.max': 'Thời gian giao hàng không quá 100 ký tự.'
            }),

            description: Joi.string().max(500).allow('').optional().messages({
                'string.max': 'Mô tả không được quá 500 ký tự.'
            }),

            isActive: Joi.boolean().messages({
                'boolean.base': 'Trạng thái hoạt động phải là true hoặc false.'
            })
        })
    },

    // ✏️ Update Shipping Method
    updateShippingMethod: {
        // Thêm validate params ID để đảm bảo ID hợp lệ
        params: Joi.object({
            id: objectId.required() 
        }),
        body: Joi.object({
            name: Joi.string().min(3).max(100).optional(),
            type: Joi.string().valid('standard', 'express', 'pickup').optional(),
            cost: Joi.number().min(0).optional(),
            freeShipOrderThreshold: Joi.number().min(0).allow(null).optional(),
            allowedProvinceCodes: Joi.array().items(Joi.string()).optional(),
            estimatedDelivery: Joi.string().max(100).optional(),
            description: Joi.string().max(500).allow('').optional(),
            isActive: Joi.boolean().optional()
        }).min(1).messages({
            'object.min': 'Bạn cần cung cấp ít nhất một trường để cập nhật.'
        })
    },

    // ========== NOTIFICATION CONTROLLER ==========
    // Create Notification (admin POST /notifications)
    createNotification: {
        body: Joi.object({
            user: Joi.string().required().messages({
                'string.base': 'ID người nhận phải là chuỗi.',
                'any.required': 'ID người nhận là bắt buộc.'
            }),
            title: Joi.string().min(5).max(100).required().messages({
                'string.base': 'Tiêu đề phải là chuỗi.',
                'string.min': 'Tiêu đề phải ít nhất 5 ký tự.',
                'string.max': 'Tiêu đề không được quá 100 ký tự.',
                'any.required': 'Tiêu đề là bắt buộc.'
            }),
            message: Joi.string().min(10).max(500).required().messages({
                'string.base': 'Nội dung phải là chuỗi.',
                'string.min': 'Nội dung phải ít nhất 10 ký tự.',
                'string.max': 'Nội dung không được quá 500 ký tự.',
                'any.required': 'Nội dung là bắt buộc.'
            }),
            link: Joi.string().uri().optional().messages({
                'string.uri': 'Liên kết không hợp lệ.'
            })
        })
    },

    // Mark As Read (user PUT /notifications/:id/read)
    markAsRead: {
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID thông báo phải là chuỗi.',
                'any.required': 'ID thông báo là bắt buộc.'
            })
        })
    },

    // Mark All As Read (user PUT /notifications/mark-all-read)
    markAllAsRead: {},  // Không cần body/params

    // ========== MEDIA CONTROLLER ==========
    // Create Media (admin POST /media)
    createMedia: {
        body: Joi.object({
            filename: Joi.string().min(1).required().messages({
                'string.base': 'Tên file phải là chuỗi.',
                'string.min': 'Tên file phải ít nhất 1 ký tự.',
                'any.required': 'Tên file là bắt buộc.'
            }),
            url: Joi.string().uri().required().messages({
                'string.uri': 'URL không hợp lệ.',
                'any.required': 'URL là bắt buộc.'
            }),
            type: Joi.string().valid("image", "video", "document").default("image").messages({
                'any.only': 'Loại media phải là image, video hoặc document.'
            }),
            relatedModel: Joi.string().required().messages({
                'string.base': 'Model liên kết phải là chuỗi.',
                'any.required': 'Model liên kết là bắt buộc (e.g., Product).'
            }),
            relatedId: Joi.string().required().messages({
                'string.base': 'ID liên kết phải là chuỗi.',
                'any.required': 'ID liên kết là bắt buộc.'
            })
        })
    },

    // Update Media (admin PUT /media/:id)
    updateMedia: {
        body: Joi.object({
            filename: Joi.string().min(1).optional().messages({
                'string.base': 'Tên file phải là chuỗi.',
                'string.min': 'Tên file phải ít nhất 1 ký tự.'
            }),
            url: Joi.string().uri().optional().messages({
                'string.uri': 'URL không hợp lệ.'
            }),
            type: Joi.string().valid("image", "video", "document").optional().messages({
                'any.only': 'Loại media phải là image, video hoặc document.'
            })
        }).min(1),  // Ít nhất 1 field để cập nhật
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID media phải là chuỗi.',
                'any.required': 'ID media là bắt buộc.'
            })
        })
    },

    // Get Media By Related (admin GET /media/related/:relatedModel/:relatedId?type=image)
    getMediaByRelated: {
        params: Joi.object({
            relatedModel: Joi.string().required().messages({
                'string.base': 'Model liên kết phải là chuỗi.',
                'any.required': 'Model liên kết là bắt buộc.'
            }),
            relatedId: Joi.string().required().messages({
                'string.base': 'ID liên kết phải là chuỗi.',
                'any.required': 'ID liên kết là bắt buộc.'
            })
        }),
        query: Joi.object({
            type: Joi.string().valid("image", "video", "document").optional().messages({
                'any.only': 'Loại media phải là image, video hoặc document.'
            })
        })
    },

    // ========== CATEGORY CONTROLLER ==========
    // Create Category (admin POST /categories)
    createCategory: {
        body: Joi.object({
            name: Joi.string().min(3).max(50).required().messages({
                'string.base': 'Tên danh mục phải là chuỗi.',
                'string.min': 'Tên danh mục phải ít nhất 3 ký tự.',
                'string.max': 'Tên danh mục không được quá 50 ký tự.',
                'any.required': 'Tên danh mục là bắt buộc.'
            }),
            description: Joi.string().max(200).optional().messages({
                'string.base': 'Mô tả phải là chuỗi.',
                'string.max': 'Mô tả không được quá 200 ký tự.'
            })
        })
    },

    // Update Category (admin PUT /categories/:id)
    updateCategory: {
        body: Joi.object({
            name: Joi.string().min(3).max(50).optional().messages({
                'string.base': 'Tên danh mục phải là chuỗi.',
                'string.min': 'Tên danh mục phải ít nhất 3 ký tự.',
                'string.max': 'Tên danh mục không được quá 50 ký tự.'
            }),
            description: Joi.string().max(200).optional().messages({
                'string.base': 'Mô tả phải là chuỗi.',
                'string.max': 'Mô tả không được quá 200 ký tự.'
            })
        }).min(1),  // Ít nhất 1 field để cập nhật
        params: Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'ID danh mục là bắt buộc.'
            })
        })
    },

    // ========== BRAND CONTROLLER ==========
    // Create Brand (admin POST /brands)
    createBrand: {
        body: Joi.object({
            name: Joi.string().min(3).max(50).required().messages({
                'string.base': 'Tên thương hiệu phải là chuỗi.',
                'string.min': 'Tên thương hiệu phải ít nhất 3 ký tự.',
                'string.max': 'Tên thương hiệu không được quá 50 ký tự.',
                'any.required': 'Tên thương hiệu là bắt buộc.'
            }),
            description: Joi.string().max(200).optional().messages({
                'string.base': 'Mô tả phải là chuỗi.',
                'string.max': 'Mô tả không được quá 200 ký tự.'
            }),
            logo: Joi.string().uri().optional().messages({
                'string.uri': 'URL logo không hợp lệ.'
            })
        })
    },

    // Update Brand (admin PUT /brands/:id)
    updateBrand: {
        body: Joi.object({
            name: Joi.string().min(3).max(50).optional().messages({
                'string.base': 'Tên thương hiệu phải là chuỗi.',
                'string.min': 'Tên thương hiệu phải ít nhất 3 ký tự.',
                'string.max': 'Tên thương hiệu không được quá 50 ký tự.'
            }),
            description: Joi.string().max(200).optional().messages({
                'string.base': 'Mô tả phải là chuỗi.',
                'string.max': 'Mô tả không được quá 200 ký tự.'
            }),
            logo: Joi.string().uri().optional().messages({
                'string.uri': 'URL logo không hợp lệ.'
            })
        }).min(1),  // Ít nhất 1 field để cập nhật
        params: Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'ID thương hiệu là bắt buộc.'
            })
        })
    },

    // ========== STAFF CONTROLLER ==========
    // Create Staff (admin POST /staff)
    createStaff: {
        body: Joi.object({
            name: Joi.string().min(2).max(50).required().messages({
                'string.base': 'Tên phải là chuỗi.',
                'string.min': 'Tên phải ít nhất 2 ký tự.',
                'string.max': 'Tên không được quá 50 ký tự.',
                'any.required': 'Tên là bắt buộc.'
            }),
            email: Joi.string().email().lowercase().required().messages({
                'string.email': 'Email không hợp lệ.',
                'any.required': 'Email là bắt buộc.'
            }),
            password: Joi.string().min(6).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
                'string.min': 'Mật khẩu phải ít nhất 6 ký tự.',
                'string.pattern.base': 'Mật khẩu phải có chữ hoa, thường và số.',
                'any.required': 'Mật khẩu là bắt buộc.'
            }),
            role: Joi.string().valid("staff").default("staff").messages({
                'any.only': 'Vai trò phải là staff.'
            }),
            phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional().messages({
                'string.pattern.base': 'Số điện thoại không hợp lệ (10-11 số).'
            })
        })
    },

    // Update Staff (admin PUT /staff/:id)
    updateStaff: {
        body: Joi.object({
            name: Joi.string().min(2).max(50).optional().messages({
                'string.min': 'Tên phải ít nhất 2 ký tự.',
                'string.max': 'Tên không được quá 50 ký tự.'
            }),
            email: Joi.string().email().optional().messages({
                'string.email': 'Email không hợp lệ.'
            }),
            phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional().messages({
                'string.pattern.base': 'Số điện thoại không hợp lệ.'
            })
        }).min(1),  // Ít nhất 1 field để cập nhật
        params: Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'ID nhân viên là bắt buộc.'
            })
        })
    },

    // Update Staff Profile (staff PUT /staff/profile/me)
    updateMyProfile: {
        body: Joi.object({
            name: Joi.string().min(2).max(50).optional().messages({
                'string.min': 'Tên phải ít nhất 2 ký tự.',
                'string.max': 'Tên không được quá 50 ký tự.'
            }),
            phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional().messages({
                'string.pattern.base': 'Số điện thoại không hợp lệ.'
            })
        }).min(1)  // Ít nhất 1 field để cập nhật
    }
};

// Export hàm chính và schemas (sử dụng schemas.modelName để validate)
export default validate;
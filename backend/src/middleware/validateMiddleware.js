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
        const { body, params, query } = req;

        // Validate toàn bộ { body, params, query } theo schema
        const { error, value } = Joi.object(schema).validate(
        { body, params, query },
        { 
            abortEarly: false,  // Validate TẤT CẢ fields, không dừng sớm
            stripUnknown: true, // Loại bỏ fields không mong muốn
            allowUnknown: false // Không cho phép unknown fields
        }
        );

        if (error) {
        // Xử lý TẤT CẢ trường hợp lỗi: Map chi tiết từng error detail
        const errors = error.details.map((detail) => ({
            field: detail.path.join("."),  // e.g., "body.email"
            type: detail.type,            // e.g., "string.email"
            message: detail.message.replace(/['"]/g, ""), // Clean message
            value: detail.context?.value || "N/A"  // Giá trị gây lỗi (nếu có)
        }));

        // Response chi tiết cho TẤT CẢ trường hợp
        return res.status(400).json({
            success: false,
            message: "Dữ liệu đầu vào không hợp lệ",
            totalErrors: errors.length,
            errors: errors  // Danh sách đầy đủ lỗi
        });
        }

        // Nếu OK: Gán dữ liệu đã validate (sạch)
        req.validated = value;
        next();
    };
};

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

    // ========== PRODUCT CONTROLLER ==========
    // Create Product (admin/staff POST /products)
    createProduct: {
        body: Joi.object({
            name: Joi.string().min(3).max(100).required().messages({
                'string.base': 'Tên sản phẩm phải là chuỗi.',
                'string.min': 'Tên sản phẩm phải ít nhất 3 ký tự.',
                'string.max': 'Tên sản phẩm không được quá 100 ký tự.',
                'any.required': 'Tên sản phẩm là bắt buộc.'
            }),
            description: Joi.string().max(500).optional().messages({
                'string.base': 'Mô tả phải là chuỗi.',
                'string.max': 'Mô tả không được quá 500 ký tự.'
            }),
            price: Joi.number().min(0).precision(2).required().messages({
                'number.base': 'Giá phải là số.',
                'number.min': 'Giá phải lớn hơn hoặc bằng 0.',
                'number.precision': 'Giá phải có tối đa 2 chữ số thập phân.',
                'any.required': 'Giá là bắt buộc.'
            }),
            category: Joi.string().required().messages({
                'string.base': 'Danh mục phải là chuỗi.',
                'any.required': 'Danh mục là bắt buộc.'
            }),
            brand: Joi.string().optional().messages({
                'string.base': 'Thương hiệu phải là chuỗi.'
            }),
            stock: Joi.number().min(0).default(0).messages({
                'number.base': 'Số lượng tồn kho phải là số.',
                'number.min': 'Số lượng tồn kho không được âm.'
            }),
            images: Joi.array().items(Joi.string().uri()).optional().messages({
                'array.base': 'Hình ảnh phải là mảng.',
                'array.uri': 'URL hình ảnh không hợp lệ.'
            })
        })
    },

    // Update Product (admin/staff PUT /products/:id)
    updateProduct: {
        body: Joi.object({
            name: Joi.string().min(3).max(100).optional().messages({
                'string.base': 'Tên sản phẩm phải là chuỗi.',
                'string.min': 'Tên sản phẩm phải ít nhất 3 ký tự.',
                'string.max': 'Tên sản phẩm không được quá 100 ký tự.'
            }),
            description: Joi.string().max(500).optional().messages({
                'string.base': 'Mô tả phải là chuỗi.',
                'string.max': 'Mô tả không được quá 500 ký tự.'
            }),
            price: Joi.number().min(0).precision(2).optional().messages({
                'number.base': 'Giá phải là số.',
                'number.min': 'Giá phải lớn hơn hoặc bằng 0.',
                'number.precision': 'Giá phải có tối đa 2 chữ số thậpân.'
            }),
            category: Joi.string().optional().messages({
                'string.base': 'Danh mục phải là chuỗi.'
            }),
            brand: Joi.string().optional().messages({
                'string.base': 'Thương hiệu phải là chuỗi.'
            }),
            stock: Joi.number().min(0).optional().messages({
                'number.base': 'Số lượng tồn kho phải là số.',
                'number.min': 'Số lượng tồn kho không được âm.'
            })
        }).min(1),  // Ít nhất 1 field
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID sản phẩm phải là chuỗi.',
                'any.required': 'ID sản phẩm là bắt buộc.'
            })
        })
    },

    // Add Variant (admin/staff POST /products/:productId/variants)
    addVariant: {
        body: Joi.object({
            size: Joi.string().optional().messages({
                'string.base': 'Kích thước phải là chuỗi.'
            }),
            color: Joi.string().optional().messages({
                'string.base': 'Màu sắc phải là chuỗi.'
            }),
            price: Joi.number().min(0).optional().messages({
                'number.base': 'Giá biến thể phải là số.',
                'number.min': 'Giá biến thể phải lớn hơn hoặc bằng 0.'
            }),
            stock: Joi.number().min(0).default(0).messages({
                'number.base': 'Số lượng tồn kho biến thể phải là số.',
                'number.min': 'Số lượng tồn kho biến thể không được âm.'
            })
        }).min(1),
        params: Joi.object({
            productId: Joi.string().required().messages({
                'string.base': 'ID sản phẩm phải là chuỗi.',
                'any.required': 'ID sản phẩm là bắt buộc.'
            })
        })
    },

    // Update Variant (admin/staff PUT /products/variants/:id)
    updateVariant: {
        body: Joi.object({
            size: Joi.string().optional().messages({
                'string.base': 'Kích thước phải là chuỗi.'
            }),
            color: Joi.string().optional().messages({
                'string.base': 'Màu sắc phải là chuỗi.'
            }),
            price: Joi.number().min(0).optional().messages({
                'number.base': 'Giá biến thể phải là số.',
                'number.min': 'Giá biến thể phải lớn hơn hoặc bằng 0.'
            }),
            stock: Joi.number().min(0).optional().messages({
                'number.base': 'Số lượng tồn kho biến thể phải là số.',
                'number.min': 'Số lượng tồn kho biến thể không được âm.'
            })
        }).min(1),
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID biến thể phải là chuỗi.',
                'any.required': 'ID biến thể là bắt buộc.'
            })
        })
    },

    // ========== ORDER CONTROLLER ==========
    // Create Order (user POST /orders)
    createOrder: {
        body: Joi.object({
            items: Joi.array().min(1).items(
                Joi.object({
                    product: Joi.string().required().messages({
                        'string.base': 'ID sản phẩm phải là chuỗi.',
                        'any.required': 'ID sản phẩm là bắt buộc.'
                    }),
                    quantity: Joi.number().min(1).required().messages({
                        'number.base': 'Số lượng phải là số.',
                        'number.min': 'Số lượng phải lớn hơn 0.',
                        'any.required': 'Số lượng là bắt buộc.'
                    })
                })
            ).required().messages({
                'array.base': 'Danh sách sản phẩm phải là mảng.',
                'array.min': 'Đơn hàng phải có ít nhất 1 sản phẩm.',
                'any.required': 'Danh sách sản phẩm là bắt buộc.'
            }),
            voucherCode: Joi.string().optional().messages({
                'string.base': 'Mã voucher phải là chuỗi.'
            }),
            shippingMethod: Joi.string().required().messages({
                'string.base': 'Phương thức vận chuyển phải là chuỗi.',
                'any.required': 'Phương thức vận chuyển là bắt buộc.'
            }),
            address: Joi.string().max(200).required().messages({
                'string.base': 'Địa chỉ phải là chuỗi.',
                'string.max': 'Địa chỉ không được quá 200 ký tự.',
                'any.required': 'Địa chỉ giao hàng là bắt buộc.'
            }),
            paymentMethod: Joi.string().valid("cash", "card", "bank").default("cash").messages({
                'string.base': 'Phương thức thanh toán phải là chuỗi.',
                'any.only': 'Phương thức thanh toán phải là cash, card hoặc bank.'
            })
        })
    },

    // Update Order Status (admin PUT /orders/:orderId)
    updateOrderStatus: {
        body: Joi.object({
            status: Joi.string().valid("pending", "confirmed", "shipped", "delivered", "cancelled").required().messages({
                'string.base': 'Trạng thái phải là chuỗi.',
                'any.only': 'Trạng thái phải là pending, confirmed, shipped, delivered hoặc cancelled.',
                'any.required': 'Trạng thái là bắt buộc.'
            })
        }),
        params: Joi.object({
            orderId: Joi.string().required().messages({
                'string.base': 'ID đơn hàng phải là chuỗi.',
                'any.required': 'ID đơn hàng là bắt buộc.'
            })
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
            code: Joi.string().alphanum().min(5).max(20).required().messages({
                'string.base': 'Mã voucher phải là chuỗi.',
                'string.alphanum': 'Mã voucher phải là chữ và số.',
                'string.min': 'Mã voucher phải ít nhất 5 ký tự.',
                'string.max': 'Mã voucher không được quá 20 ký tự.',
                'any.required': 'Mã voucher là bắt buộc.'
            }),
            // 💡 SỬA LỖI: Đổi 'discount' thành 'value' để khớp với Controller
            value: Joi.number().min(0).max(100).required().messages({
                'number.base': 'Giá trị (value) phải là số.',
                'number.min': 'Giá trị phải lớn hơn hoặc bằng 0%.',
                'number.max': 'Giá trị không được quá 100%.',
                'any.required': 'Giá trị (value) là bắt buộc.'
            }),
            type: Joi.string().valid("percentage", "fixed").default("percentage").messages({
                'any.only': 'Loại giảm giá phải là percentage hoặc fixed.'
            }),
            minOrderValue: Joi.number().min(0).default(0).messages({
                'number.base': 'Giá trị đơn hàng tối thiểu phải là số.',
                'number.min': 'Giá trị đơn hàng tối thiểu không được âm.'
            }),
            expiryDate: Joi.date().min('now').required().messages({
                'date.base': 'Ngày hết hạn phải là ngày hợp lệ.',
                'date.min': 'Ngày hết hạn phải trong tương lai.',
                'any.required': 'Ngày hết hạn là bắt buộc.'
            })
        })
    },

    // Update Voucher (admin PUT /vouchers/:id)
    updateVoucher: {
        body: Joi.object({
            code: Joi.string().alphanum().min(5).max(20).optional().messages({
                'string.base': 'Mã voucher phải là chuỗi.',
                'string.alphanum': 'Mã voucher phải là chữ và số.',
                'string.min': 'Mã voucher phải ít nhất 5 ký tự.',
                'string.max': 'Mã voucher không được quá 20 ký tự.'
            }),
            // 💡 SỬA LỖI: Đổi 'discount' thành 'value' để khớp với Controller
            value: Joi.number().min(0).max(100).optional().messages({
                'number.base': 'Giá trị (value) phải là số.',
                'number.min': 'Giá trị phải lớn hơn hoặc bằng 0%.',
                'number.max': 'Giá trị không được quá 100%.'
            }),
            type: Joi.string().valid("percentage", "fixed").optional().messages({
                'any.only': 'Loại giảm giá phải là percentage hoặc fixed.'
            }),
            minOrderValue: Joi.number().min(0).optional().messages({
                'number.base': 'Giá trị đơn hàng tối thiểu phải là số.',
                'number.min': 'Giá trị đơn hàng tối thiểu không được âm.'
            }),
            expiryDate: Joi.date().min('now').optional().messages({
                'date.base': 'Ngày hết hạn phải là ngày hợp lệ.',
                'date.min': 'Ngày hết hạn phải trong tương lai.'
            })
        }).min(1),  // Ít nhất 1 field để cập nhật
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID voucher phải là chuỗi.',
                'any.required': 'ID voucher là bắt buộc.'
            })
        })
    },

    // Validate Voucher (public POST /vouchers/validate)
    validateVoucher: {
        body: Joi.object({
            code: Joi.string().alphanum().min(5).max(20).required().messages({
                'string.base': 'Mã voucher phải là chuỗi.',
                'string.alphanum': 'Mã voucher phải là chữ và số.',
                'string.min': 'Mã voucher phải ít nhất 5 ký tự.',
                'string.max': 'Mã voucher không được quá 20 ký tự.',
                'any.required': 'Mã voucher là bắt buộc.'
            })
        })
    },

    // ========== SHIPPING CONTROLLER ==========
    // Create Shipping Method (admin POST /shipping)
    createShippingMethod: {
        body: Joi.object({
            name: Joi.string().min(3).max(50).required().messages({
                'string.base': 'Tên phương thức phải là chuỗi.',
                'string.min': 'Tên phương thức phải ít nhất 3 ký tự.',
                'string.max': 'Tên phương thức không được quá 50 ký tự.',
                'any.required': 'Tên phương thức là bắt buộc.'
            }),
            price: Joi.number().min(0).precision(2).required().messages({
                'number.base': 'Phí vận chuyển phải là số.',
                'number.min': 'Phí vận chuyển phải lớn hơn hoặc bằng 0.',
                'number.precision': 'Phí vận chuyển phải có tối đa 2 chữ số thập phân.',
                'any.required': 'Phí vận chuyển là bắt buộc.'
            }),
            estimatedDays: Joi.number().min(1).max(30).required().messages({
                'number.base': 'Số ngày ước tính phải là số.',
                'number.min': 'Số ngày ước tính phải ít nhất 1.',
                'number.max': 'Số ngày ước tính không được quá 30.',
                'any.required': 'Số ngày ước tính là bắt buộc.'
            })
        })
    },

    // Update Shipping Method (admin PUT /shipping/:id)
    updateShippingMethod: {
        body: Joi.object({
            name: Joi.string().min(3).max(50).optional().messages({
                'string.base': 'Tên phương thức phải là chuỗi.',
                'string.min': 'Tên phương thức phải ít nhất 3 ký tự.',
                'string.max': 'Tên phương thức không được quá 50 ký tự.'
            }),
            price: Joi.number().min(0).precision(2).optional().messages({
                'number.base': 'Phí vận chuyển phải là số.',
                'number.min': 'Phí vận chuyển phải lớn hơn hoặc bằng 0.',
                'number.precision': 'Phí vận chuyển phải có tối đa 2 chữ số thập phân.'
            }),
            estimatedDays: Joi.number().min(1).max(30).optional().messages({
                'number.base': 'Số ngày ước tính phải là số.',
                'number.min': 'Số ngày ước tính phải ít nhất 1.',
                'number.max': 'Số ngày ước tính không được quá 30.'
            })
        }).min(1),  // Ít nhất 1 field để cập nhật
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'ID phương thức phải là chuỗi.',
                'any.required': 'ID phương thức là bắt buộc.'
            })
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
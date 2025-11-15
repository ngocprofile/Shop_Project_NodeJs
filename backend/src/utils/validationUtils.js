// utils/validationUtils.js
import Joi from 'joi'; // Cài npm i joi nếu chưa
import mongoose from 'mongoose'; // Cho ObjectId

/**
 * 🧩 Kiểm tra email hợp lệ (Joi - hỗ trợ lowercase, no TLD allow)
 * @param {string} email - Email cần kiểm tra
 * @returns {Object} { isValid: boolean, message: string, value?: string }
 */
export const validateEmail = (email) => {
    const schema = Joi.string().email({ tlds: { allow: false } }).lowercase().required();
    const { error, value } = schema.validate(email);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Email hợp lệ',
        value: value
    };
};

/**
 * 🧩 Kiểm tra phone Việt Nam (10-11 số, bắt đầu 0, mobile patterns)
 * @param {string} phone - Số điện thoại
 * @returns {Object} { isValid: boolean, message: string, value?: string }
 */
export const validatePhone = (phone) => {
    const schema = Joi.string().pattern(/^0[3|5|7|8|9][0-9]{8}$/).required();
    const { error, value } = schema.validate(phone);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Số điện thoại hợp lệ',
        value: value
    };
};

/**
 * 🧩 Kiểm tra password mạnh (min 8 ký tự, có hoa/thường/số/đặc biệt)
 * @param {string} password - Mật khẩu
 * @returns {Object} { isValid: boolean, message: string, value?: string }
 */
export const validatePassword = (password) => {
    const schema = Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).required();
    const { error, value } = schema.validate(password);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Mật khẩu hợp lệ',
        value: value
    };
};

/**
 * 🧩 Kiểm tra ObjectId Mongoose hợp lệ
 * @param {string} id - ID cần kiểm tra
 * @returns {Object} { isValid: boolean, message: string, value?: string }
 */
export const validateObjectId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    return {
        isValid,
        message: isValid ? 'ObjectId hợp lệ' : 'ID không hợp lệ (ObjectId)',
        value: id
    };
};

/**
 * 🧩 Kiểm tra URL hợp lệ (Joi URI)
 * @param {string} url - URL cần kiểm tra
 * @returns {Object} { isValid: boolean, message: string, value?: string }
 */
export const validateURL = (url) => {
    const schema = Joi.string().uri().required();
    const { error, value } = schema.validate(url);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'URL hợp lệ',
        value: value
    };
};

/**
 * 🧩 Kiểm tra số dương (price, quantity, etc. - min 0)
 * @param {number} num - Số cần kiểm tra
 * @returns {Object} { isValid: boolean, message: string, value?: number }
 */
export const validatePositiveNumber = (num) => {
    const schema = Joi.number().min(0).precision(2).required(); // Precision 2 cho price
    const { error, value } = schema.validate(num);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Số hợp lệ',
        value: value
    };
};

/**
 * 🧩 Kiểm tra rating (1-5 sao cho feedback)
 * @param {number} rating - Rating cần kiểm tra
 * @returns {Object} { isValid: boolean, message: string, value?: number }
 */
export const validateRating = (rating) => {
    const schema = Joi.number().min(1).max(5).required();
    const { error, value } = schema.validate(rating);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Rating hợp lệ (1-5)',
        value: value
    };
};

/**
 * 🧩 Kiểm tra số lượng (quantity/stock - positive integer)
 * @param {number} quantity - Số lượng cần kiểm tra
 * @returns {Object} { isValid: boolean, message: string, value?: number }
 */
export const validateQuantity = (quantity) => {
    const schema = Joi.number().integer().min(1).required();
    const { error, value } = schema.validate(quantity);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Số lượng hợp lệ',
        value: value
    };
};

/**
 * 🧩 Kiểm tra ngày trong tương lai (expiryDate > now)
 * @param {string|Date} date - Ngày cần kiểm tra
 * @returns {Object} { isValid: boolean, message: string, value?: Date }
 */
export const validateFutureDate = (date) => {
    const now = new Date();
    const inputDate = new Date(date);
    const schema = Joi.date().min(now).required();
    const { error, value } = schema.validate(date);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Ngày hợp lệ (trong tương lai)',
        value: value
    };
};

/**
 * 🧩 Kiểm tra mảng URL hợp lệ (images array)
 * @param {array} urls - Mảng URL cần kiểm tra
 * @returns {Object} { isValid: boolean, errors: array, value?: array }
 */
export const validateArrayOfUrls = (urls) => {
    const schema = Joi.array().items(Joi.string().uri()).optional();
    const { error, value } = schema.validate(urls);
    return {
        isValid: !error,
        errors: error ? error.details.map(d => d.message) : [],
        value: value
    };
};

/**
 * 🧩 Kiểm tra enum (role, status, etc.)
 * @param {string} value - Giá trị cần kiểm tra
 * @param {array} allowedValues - Mảng giá trị cho phép
 * @returns {Object} { isValid: boolean, message: string, value?: string }
 */
export const validateEnum = (value, allowedValues) => {
    const schema = Joi.string().valid(...allowedValues).required();
    const { error, value: validatedValue } = schema.validate(value);
    return {
        isValid: !error,
        message: error ? error.details[0].message : 'Giá trị hợp lệ',
        value: validatedValue
    };
};

/**
 * 🧩 Validate object theo schema Joi tùy chỉnh (full errors)
 * @param {Object} data - Dữ liệu cần validate
 * @param {Object} schema - Joi schema
 * @returns {Object} { isValid: boolean, errors: array, value: object }
 */
export const validateWithSchema = (data, schema) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    return {
        isValid: !error,
        errors: error ? error.details.map(d => ({
            field: d.path.join('.'),
            message: d.message,
            type: d.type
        })) : [],
        value // Dữ liệu sạch nếu valid
    };
};
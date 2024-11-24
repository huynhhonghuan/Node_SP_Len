const validatorJS = require('validator');
const { check, validationResult } = require('express-validator');

// Example usage

const validateObjectId = (req, res, next) => {
    const id = req.params.id || req.params.productid || req.params.optionid || req.params.commentid || '';
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
}

// Middleware kiểm tra dữ liệu
const validateOptionData = [
    // Kiểm tra mảng options
    check('options')
        .isArray().withMessage('Options phải là mảng')
        .notEmpty().withMessage('Mảng options không được rỗng')
        .bail()
        .custom((options) => {
            if (options.length === 0) {
                throw new Error('Mảng options không được rỗng');
            }

            // Kiểm tra từng phần tử trong mảng
            options.forEach((option) => {
                // Kiểm tra image
                if (!option.image || typeof option.image !== 'string') {
                    throw new Error('Ảnh sản phẩm phải là chuỗi');
                }
                // Kiểm tra quantity
                if (Number(option.quantity) <= 0) {
                    throw new Error('Số lượng sản phẩm phải là số nguyên lớn hơn 0');
                }
                // Kiểm tra price
                if (Number(option.price) <= 0) {
                    throw new Error('Giá sản phẩm phải là số lớn hơn 0');
                }
            });
            return true;
        }),

    // Middleware để xử lý kết quả kiểm tra
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware để kiểm tra dữ liệu sản phẩm
const validateProductData = [
    check('name')
        .isString().withMessage('Tên sản phẩm phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp tên sản phẩm')
        .isLength({ min: 3, max: 200 }).withMessage('Tên sản phẩm phải có từ 3 đến 200 kí tự'),

    check('description')
        .isString().withMessage('Mô tả sản phẩm phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp mô tả sản phẩm')
        .isLength({ min: 3, max: 500 }).withMessage('Mô tả sản phẩm phải có từ 3 đến 500 kí tự'),

    check('image')
        // .isString().withMessage('Ảnh sản phẩm phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp ảnh sản phẩm'),

    check('type')
        .isIn(['wool', 'product', 'tool']).withMessage('Loại sản phẩm không hợp lệ'),

    // Sử dụng validateOptionData để kiểm tra options
    ...validateOptionData,

    check('note')
        .optional()
        .isString().withMessage('Ghi chú sản phẩm phải là chuỗi'),

    // Middleware để xử lý kết quả kiểm tra
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateComment = [
    check('userId')
        .notEmpty().withMessage('Vui lòng cung cấp userId')
        .custom((userId) => {
            if (!validatorJS.isMongoId(userId)) {
                throw new Error('userId không hợp lệ');
            }
            return true;
        }),

    check('content')
        .notEmpty().withMessage('Vui lòng cung cấp nội dung bình luận')
        .isString().withMessage('Nội dung bình luận phải là chuỗi')
        .isLength({ min: 1, max: 500 }).withMessage('Nội dung bình luận phải từ 1 đến 500 ký tự'),

    // Middleware để xử lý kết quả kiểm tra
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateObjectId,
    validateProductData,
    validateOptionData,
    validateComment,
}
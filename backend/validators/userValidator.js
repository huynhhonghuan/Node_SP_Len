const validatorJS = require('validator');
const { check, validationResult } = require('express-validator');

// Example usage
const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    next();
}

// Middleware kiểm tra dữ liệu người dùng
const validateUserData = [
    // Kiểm tra tên
    check('name')
        .isString().withMessage('Tên phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp tên!')
        .isLength({ min: 3, max: 50 }).withMessage('Tên phải có từ 3 đến 50 kí tự'),

    // Kiểm tra email
    check('email')
        .isEmail().withMessage('Email không hợp lệ')
        .notEmpty().withMessage('Vui lòng cung cấp email!')
        .normalizeEmail(), // Chuyển đổi email thành chữ thường

    // Kiểm tra mật khẩu
    check('password')
        .isString().withMessage('Mật khẩu phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp mật khẩu!')
        .isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 kí tự'),

    // Kiểm tra vai trò
    check('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Vai trò không hợp lệ'),

    // Kiểm tra trạng thái hoạt động
    check('isActive')
        .optional()
        .isBoolean().withMessage('Trạng thái hoạt động phải là boolean'),

    // Middleware để xử lý kết quả kiểm tra
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateObjectId, validateUserData };
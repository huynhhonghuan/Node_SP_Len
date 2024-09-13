const validatorJS = require('validator');
const { check, validationResult } = require('express-validator');

// Kiểm tra ObjectId
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

    // Kiểm tra số điện thoại
    check('phone')
        .isString().withMessage('Số điện thoại phải là chuỗi số')
        .notEmpty().withMessage('Vui lòng cung cấp số điện thoại!')
        .isLength({ min: 10, max: 11 }).withMessage('Số điện thoại có 10 hoặc 11 số'),

    // Kiểm tra mật khẩu
    check('password')
        .isString().withMessage('Mật khẩu phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp mật khẩu!')
        .isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 kí tự'),

    // Kiểm tra vai trò
    check('role')
        .optional()
        .isIn(['admin', 'customer', 'staff']).withMessage('Vai trò không hợp lệ'),

    // Kiểm tra trạng thái hoạt động
    check('isActive')
        .optional()
        .isBoolean().withMessage('Trạng thái hoạt động phải là boolean'),

    // Kiểm tra địa chỉ
    check('addresses.*.phone')
        .isString().withMessage('Số điện thoại trong địa chỉ phải là chuỗi số')
        .notEmpty().withMessage('Vui lòng cung cấp số điện thoại trong địa chỉ!')
        .isLength({ min: 10, max: 11 }).withMessage('Số điện thoại trong địa chỉ có 10 hoặc 11 số'),

    check('addresses.*.city')
        .isString().withMessage('Tỉnh/thành phố trong địa chỉ phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp tỉnh/thành phố trong địa chỉ!'),

    check('addresses.*.district')
        .isString().withMessage('Quận/huyện trong địa chỉ phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp quận/huyện trong địa chỉ!'),

    check('addresses.*.ward')
        .isString().withMessage('Phường/xã trong địa chỉ phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp phường/xã trong địa chỉ!'),

    check('addresses.*.street')
        .isString().withMessage('Đường phố trong địa chỉ phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp đường phố trong địa chỉ!'),

    check('addresses.*.type')
        .optional()
        .isIn(['home', 'office', 'other']).withMessage('Loại địa chỉ không hợp lệ'),

    check('addresses.*.note')
        .optional()
        .isString().withMessage('Ghi chú trong địa chỉ phải là chuỗi')
        .isLength({ max: 200 }).withMessage('Ghi chú trong địa chỉ phải từ 0 đến 200 kí tự'),

    check('addresses.*.default')
        .optional()
        .isBoolean().withMessage('Giá trị mặc định trong địa chỉ phải là boolean'),

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

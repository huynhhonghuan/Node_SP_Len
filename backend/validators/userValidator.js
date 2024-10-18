const validatorJS = require('validator');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

// Kiểm tra ObjectId
const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    next();
}

// Middleware kiểm tra dữ liệu người dùng
const validateUserData = (isUpdate = false) => [
    // Kiểm tra tên
    check('name')
        .isString().withMessage('Tên phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp tên!')
        .isLength({ min: 3, max: 50 }).withMessage('Tên phải có từ 3 đến 50 kí tự')
        .matches(/^[A-Za-z\s]+$/).withMessage('Tên chỉ được chứa chữ cái và khoảng cách, không được có số hoặc ký tự đặc biệt'),

    // Kiểm tra email
    check('email')
        .isEmail().withMessage('Email không hợp lệ')
        .notEmpty().withMessage('Vui lòng cung cấp email!')
        .normalizeEmail()
        .custom(async (email, { req }) => {
            if (isUpdate) {
                // Chỉ kiểm tra nếu không phải là trường hợp cập nhật hoặc email khác với email hiện tại
                const userId = req.params.id; // Lấy ID của bản ghi từ params
                const existingUser = await User.findOne({ email, _id: { $ne: userId } });
                if (existingUser) {
                    throw new Error('Email đã tồn tại!');
                }
            } else {
                const user = await User.findOne({ email });
                if (user) {
                    throw new Error('Email đã tồn tại!');
                }
            }
        }),

    // Kiểm tra số điện thoại
    check('phone')
        .isString().withMessage('Số điện thoại phải là chuỗi số')
        .notEmpty().withMessage('Vui lòng cung cấp số điện thoại!')
        .isLength({ min: 10, max: 11 }).withMessage('Số điện thoại có 10 hoặc 11 số')
        .custom(async (phone, { req }) => {
            if (isUpdate) {
                // Chỉ kiểm tra nếu không phải là trường hợp cập nhật hoặc số điện thoại khác với số điện thoại hiện tại
                const userId = req.params.id; // Lấy ID của bản ghi từ params
                const existingUser = await User.findOne({ phone, _id: { $ne: userId } });
                if (existingUser) {
                    throw new Error('Số điện thoại đã tồn tại!');
                }
            } else {
                const user = await User.findOne({ phone });
                if (user) {
                    throw new Error('Số điện thoại đã tồn tại!');
                }
            }
        }),

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

module.exports = { validateUserData };


module.exports = { validateObjectId, validateUserData };

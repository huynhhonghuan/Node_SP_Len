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
    // Kiểm tra tên người dùng, không bắt buộc nếu đang cập nhật (isUpdate)
    check('name')
        .notEmpty().withMessage('Vui lòng cung cấp tên!')
        .isLength({ min: 3, max: 50 }).withMessage('Tên phải có từ 3 đến 50 kí tự!'),

    // Kiểm tra email, bắt buộc đối với cả cập nhật và đăng ký
    check('email')
        .notEmpty().withMessage('Vui lòng cung cấp email!')
        .isEmail().withMessage('Email phải hợp lệ!')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (user && user.id !== req.params.id) {
                throw new Error('Email đã tồn tại!');
            }
            return true;
        }),

    // Kiểm tra số điện thoại, bắt buộc đối với cả cập nhật và đăng ký
    check('phone')
        .notEmpty().withMessage('Vui lòng cung cấp số điện thoại!')
        .isMobilePhone().withMessage('Số điện thoại phải hợp lệ!')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ phone: value });
            if (user && user.id !== req.params.id) {
                throw new Error('Số điện thoại đã tồn tại!');
            }
            return true;
        }),

    // Kiểm tra mật khẩu, không bắt buộc khi cập nhật, nhưng bắt buộc khi đăng ký
    check('password')
        .notEmpty().withMessage('Vui lòng cung cấp mật khẩu!')
        .isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 kí tự!'),

    // Kiểm tra role
    check('role')
        .optional() // Không bắt buộc
        .isIn(['customer', 'admin', 'staff']).withMessage('Role phải là customer, admin, hoặc staff!'),

    // Kiểm tra addresses nếu được cung cấp
    check('addresses.*.phone')
        .optional()
        .isMobilePhone().withMessage('Số điện thoại phải hợp lệ!'),

    check('addresses.*.city')
        .optional()
        .notEmpty().withMessage('Vui lòng cung cấp tỉnh/thành phố!'),

    check('addresses.*.district')
        .optional()
        .notEmpty().withMessage('Vui lòng cung cấp quận/huyện!'),

    check('addresses.*.ward')
        .optional()
        .notEmpty().withMessage('Vui lòng cung cấp phường/xã!'),

    check('addresses.*.street')
        .optional()
        .notEmpty().withMessage('Vui lòng cung cấp đường phố!'),

    // Ghi chú tối đa 200 kí tự
    check('addresses.*.note')
        .optional()
        .isLength({ max: 200 }).withMessage('Ghi chú phải dưới 200 kí tự!'),

    // Middleware xử lý kết quả validate
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateObjectId, validateUserData };

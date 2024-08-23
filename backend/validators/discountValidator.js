const validatorJS = require('validator');

const { check, validatorResult } = require('express-validator');

const validateObjectId = async (req, res, next) => {
    const id = req.params.id || '';
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
}

const validateDiscountData = [
    check('code')
        .isLength({ min: 5, max: 10 }).withMessage('Mã giảm giá phải từ 5 đến 10 kí tự!')
        .matches(/^[A-Za-z0-9]+$/).withMessage('Mã giảm giá chỉ gồm chữ cái và số!')
        .custom(async (value) => {
            const existingDiscount = await mongoose.model('Discount').findOne({ code: value });
            if (existingDiscount) {
                throw new Error('Mã giảm giá đã tồn tại!');
            }
        }),
    check('percentage')
        .isInt({ min: 0, max: 100 }).withMessage('Phần trăm giảm giá phải từ 0 đến 100!')
        .custom(value => {
            if (value % 5 !== 0) {
                throw new Error('Phần trăm giảm giá phải là bội số của 5!');
            }
            return true;
        }),
    check('startDate')
        .isISO8601().withMessage('Ngày bắt đầu không hợp lệ!')
        .custom((value) => {
            const today = new Date();
            if (new Date(value) < today) {
                throw new Error('Ngày bắt đầu phải sau ngày hiện tại!');
            }
            return true;
        }),
    check('endDate')
        .isISO8601().withMessage('Ngày kết thúc không hợp lệ!')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('Ngày kết thúc phải sau ngày bắt đầu!');
            }
            return true;
        }),
    check('lowestTotal')
        .isFloat({ min: 0 }).withMessage('Tổng giá trị đơn hàng phải lớn hơn 0!'),
    check('counts')
        .optional()
        .isInt({ min: 0 }).withMessage('Số lần sử dụng phải lớn hơn hoặc bằng 0!'),
    check('customersId')
        .optional()
        .isArray().withMessage('Danh sách khách hàng phải là một mảng!')
        .custom((value) => {
            value.forEach(id => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error('ID khách hàng không hợp lệ!');
                }
            });
            return true;
        }),
    check('isActive')
        .isBoolean().withMessage('Trạng thái phải là kiểu Boolean!'),

    // Middleware kiểm tra 
    (req, res, next) => {
        const errors = validatorResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateObjectId,
    validateDiscountData,
}
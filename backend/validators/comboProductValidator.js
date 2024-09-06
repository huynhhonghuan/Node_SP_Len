const validatorJS = require('validator');

const { check, validatorResult } = require('express-validator');

const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
}

const validateComboProductData = [
    check('name')
        .isString().withMessage('Tên sản phẩm phải là chuỗi')
        .isLength({ min: 3, max: 50 }).withMessage('Tên combo sản phẩm phải từ 3 đến 50 kí tự')
        .notEmpty().withMessage('Vui lòng nhập tên combo sản phẩm'),

    check('description')
        .isString().withMessage('Mô tả sản phẩm phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp mô tả sản phẩm')
        .isLength({ min: 3, max: 500 }).withMessage('Mô tả sản phẩm phải có từ 3 đến 500 kí tự'),

    check('price')
        .isNumeric().withMessage('Giá combo sản phẩm phải là số')
        .notEmpty().withMessage('Vui lòng nhập giá combo sản phẩm'),

    check('products')
        .isArray().withMessage('Danh sách sản phẩm phải là mảng')
        .custom((value) => {
            value.forEach(product => {
                if (!validatorJS.isMongoId(product)) {
                    throw new Error('ID sản phẩm không hợp lệ!');
                }
            });
            return true;
        }),

    // Middleware to handle the validation result
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
    validateComboProductData,
}
const validatorJS = require('validator');
const { check, validationResult } = require('express-validator');

const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'ID không hợp lệ' });
    }
    next();
}

const validateComboProductData = [
    check('name')
        .isString().withMessage('Tên combo phải là chuỗi')
        .isLength({ min: 3, max: 50 }).withMessage('Tên combo phải từ 3 đến 50 kí tự')
        .notEmpty().withMessage('Vui lòng nhập tên combo'),

    check('description')
        .isString().withMessage('Mô tả combo phải là chuỗi')
        .notEmpty().withMessage('Vui lòng cung cấp mô tả combo')
        .isLength({ min: 3, max: 500 }).withMessage('Mô tả combo phải từ 3 đến 500 kí tự'),

    check('price')
        .isNumeric().withMessage('Giá combo phải là số')
        .notEmpty().withMessage('Vui lòng nhập giá combo'),

    check('products')
        .isArray().withMessage('Danh sách sản phẩm phải là mảng')
        .notEmpty().withMessage('Danh sách sản phẩm không được rỗng!')
        .bail()
        .custom((products) => {
            if (products.length === 0) {
                throw new Error('Mảng sản phẩm không được rỗng');
            }
            products.forEach(product => {
                if (!product.productId || !validatorJS.isMongoId(product.productId)) {
                    throw new Error('ID sản phẩm không hợp lệ!');
                }
                if (!product.optionId || !validatorJS.isMongoId(product.optionId)) {
                    throw new Error('ID lựa chọn không hợp lệ!');
                }
            });
            return true;
        }),

    // Middleware để xử lý kết quả validation
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

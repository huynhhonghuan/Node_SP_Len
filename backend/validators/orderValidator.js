const { check, validationResult } = require('express-validator');

const validateObjectId = async (req, res, next) => {
    const id = req.params.id || req.params.userid || req.params.productid || '';
    if (!validatorJs.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
};

const validateOrderData = [
    check('customerId')
        .isMongoId().withMessage('Vui lòng cung cấp Id khách hàng hợp lệ'),

    check('products')
        .isArray({ min: 1 }).withMessage('Vui lòng cung cấp ít nhất một sản phẩm'),

    check('products.*.productId')
        .isMongoId().withMessage('Vui lòng cung cấp Id sản phẩm hợp lệ'),

    check('products.*.optionId')
        .isMongoId().withMessage('Vui lòng cung cấp Id lựa chọn hợp lệ'),

    check('products.*.quantity')
        .isInt({ gt: 0 }).withMessage('Số lượng sản phẩm phải lớn hơn 0'),

    check('products.*.price')
        .isFloat({ gt: 0 }).withMessage('Giá sản phẩm phải lớn hơn 0'),

    check('date')
        .isISO8601().withMessage('Vui lòng cung cấp ngày đặt hàng hợp lệ'),

    check('totalPrice')
        .isFloat({ gt: 0 }).withMessage('Tổng giá phải lớn hơn 0'),

    check('status')
        .optional()
        .isIn(['pending', 'processing', 'shipped', 'failed']).withMessage('Trạng thái không hợp lệ'),

    check('note')
        .optional()
        .isString().withMessage('Ghi chú phải là một chuỗi'),

    check('paymentMethod')
        .isIn(['cod', 'vnpay']).withMessage('Hình thức thanh toán không hợp lệ'),

    check('paymentVnpay.paymentTransactionId')
        .optional()
        .isString().withMessage('Mã giao dịch thanh toán phải là một chuỗi'),

    check('paymentVnpay.paymentQRCodeUrl')
        .optional()
        .isURL().withMessage('URL mã QR phải hợp lệ'),

    check('paymentVnpay.paymentStatus')
        .optional()
        .isIn(['pending', 'completed', 'failed']).withMessage('Trạng thái thanh toán không hợp lệ'),

    check('paymentVnpay.paymentDate')
        .optional()
        .isISO8601().withMessage('Ngày thanh toán phải là một định dạng hợp lệ'),

    check('shippingAddress.phone')
        .isMobilePhone('vi-VN').withMessage('{VALUE} phải là số điện thoại hợp lệ!'),

    check('shippingAddress.city')
        .notEmpty().withMessage('Vui lòng cung cấp tỉnh/thành phố!'),

    check('shippingAddress.district')
        .notEmpty().withMessage('Vui lòng cung cấp quận/huyện!'),

    check('shippingAddress.ward')
        .notEmpty().withMessage('Vui lòng cung cấp phường/xã!'),

    check('shippingAddress.street')
        .notEmpty().withMessage('Vui lòng cung cấp đường phố!'),

    check('shippingAddress.type')
        .optional()
        .isIn(['home', 'office', 'other']).withMessage('Loại địa chỉ không hợp lệ'),

    check('shippingAddress.note')
        .optional()
        .isLength({ max: 200 }).withMessage('Ghi chú phải từ 0 đến 200 kí tự!'),

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
    validateOrderData,
};

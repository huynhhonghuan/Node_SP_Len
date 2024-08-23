const validatorJS = require('validator');

const { check, validatorResult } = require('express-validator');

const validateObjectId = async (req, res, next) => {
    const id = req.params.id || req.params.chatid || req.params.userid || '';
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
}

// Middleware để kiểm tra dữ liệu chat
const validateChatData = [
    check('customerId')
        .optional()
        .custom(value => {
            if (value && !mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('customerId không hợp lệ');
            }
            return true;
        }),
    check('recipientId')
        .optional()
        .custom(value => {
            if (value && !mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('recipientId không hợp lệ');
            }
            return true;
        }),
    check('messages')
        .isArray({ min: 1 }).withMessage('Phải có ít nhất một tin nhắn')
        .custom(messages => {
            messages.forEach(message => {
                if (!message.content) {
                    throw new Error('Nội dung tin nhắn không được bỏ trống');
                }
            });
            return true;
        }),
    check('status')
        .isIn(['pending', 'received', 'processing', 'completed', 'cancelled'])
        .withMessage('Trạng thái không hợp lệ'),
    check('startedAt')
        .optional()
        .isISO8601().withMessage('Thời gian bắt đầu không hợp lệ'),
    check('completedAt')
        .optional()
        .isISO8601().withMessage('Thời gian hoàn thành không hợp lệ'),

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
    validateChatData,
}
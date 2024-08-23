const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    // nếu rỗng là khách, còn có là khách hàng đã có tài khoản
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: null,
    },
    //người tiếp nhận trả lời
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: null,
    },
    // nội dung tin nhắn
    messages: [{
        content: {
            type: String,
            required: true
        },
        // isSee: {
        //     type: String,
        //     enum: ['send', 'viewed'],
        //     default: 'send',
        // },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    // trạng thái của cuộc tin nhắn, (chờ tiếp nhận ,tiếp nhận, đang xử lý, hoàn thành, không tiếp nhận)
    status: {
        type: String,
        enum: ['pending', 'received', 'processing', 'completed', 'cancelled'],
        default: 'pending',
    },
    // thời gian bắt đầu cuộc trò chuyện
    startedAt: {
        type: Date,
        default: Date.now,
    },
    // thời gian hoàn thành cuộc trò chuyện
    completedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
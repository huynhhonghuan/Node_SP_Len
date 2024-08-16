const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    // Thông tin người gửi
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Thông tin người nhận
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Nội dung tin nhắn
    content: {
        type: String,
        required: true
    }
    // huan
}, {
});
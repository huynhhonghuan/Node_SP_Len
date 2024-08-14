const mongoose = require('mongoose');
const validatorJs = require('validator');

const addressSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, "Vui lòng cung cấp số điện thoại!"],
        validate: {
            validator: validatorJs.isMobilePhone,
            message: '{VALUE} phải là số điện thoại hợp lệ!'
        }
    },
    city: {
        type: Number,
        required: [true, "Vui lòng cung cấp tỉnh/thành phố!"],
    },
    district: {
        type: Number,
        required: [true, "Vui lòng cung cấp quận/huyện!"],
    },
    ward: {
        type: Number,
        required: [true, "Vui lòng cung cấp phườnng/xã!"],
    },
    street: {
        type: String,
        required: [true, "Vui lòng cung cấp đường phố!"],
    },
    type: {
        type: String,
        enum: ['home', 'office', 'other'],
        default: 'home' // Default type is 'home'
    },
    note: {
        type: String,
        maxlength: [200, "Ghi chú phải từ 0 đến 200 kí tự!"]
    },
    default: {
        type: Boolean,
        default: false // Default is false
    }
});

module.exports = { addressSchema }
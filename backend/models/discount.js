const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Vui lòng cung cấp mã giảm giá!"],
        unique: true,
        minlength: [5, "Mã giảm giá phải có ít nhất 5 kí tự!"],
        maxlength: [10, "Mã giảm giá chỉ được từ 5 đến 20 kí tự!"],
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9]+$/.test(v);
            },
            message: '{VALUE} chỉ gồm chữ cái và số!'
        }
    },
    percentage: {
        type: Number,
        required: [true, "Vui lòng cung cấp phần trăm giảm giá!"],
        min: [0, "Phần trăm giảm giá phải lớn hơn 0!"],
        max: [100, "Phần trăm giảm giá phải nhỏ hơn hoặc bằng"],
        validate: {
            validator: function (v) {
                return v % 5 === 0;
            },
            message: '{VALUE} phải là bội số của 5!'
        }
    },
    startDate: {
        type: Date,
        required: [true, "Vui lòng cung cấp ngày bắt đầu giảm giá!"],
        validate: {
            validator: function (v) {
                return new Date() <= v;
            },
            message: '{VALUE} phải sau ngày hiện tại!'
        }
    },
    endDate: {
        type: Date,
        required: [true, "Vui lòng cung cấp ngày kết thúc giảm giá!"],
        validate: {
            validator: function (v) {
                return v => new Date();
            },
            message: '{VALUE} phải trước ngày hiện tại!'
        }
    },
    lowestTotal: {
        type: Number,
        required: [true, "Vui lòng cung cấp tổng giá trị đơn hàng thấp nhất để được giảm giá!"],
        min: [0, "Giá sản phẩm đắt nhất khi giảm giá phải lớn hơn 0!"]
    },
    counts: {
        type: Number,
        default: 0,
        min: [0, "Giá sản phẩm đắt nhất khi giảm giá phải lớn hơn 0!"]
    },
    customers_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);
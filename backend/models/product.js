const mongoose = require('mongoose');
const validatorJS = require('validator');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng cung cấp tên sản phẩm!"],
        minlength: [3, "Tên sản phẩm phải có ít nhất 3 kí tự!"],
        maxlength: [200, "Tên sản phẩm chỉ được từ 3 đến 50 kí tự!"]
    },
    description: {
        type: String,
        required: [true, "Vui lòng cung cấp mô tả sản phẩm!"],
        minlength: [3, "Mô tả sản phẩm phải có ít nhất 3 kí tự!"],
        maxlength: [500, "Mô tả sản phẩm chỉ được từ 3 đến 500 ký tự"]
    },
    image: {
        type: String,
        required: [true, "Vui lòng cung cấp ảnh sản phẩm!"]
    },
    type: {
        type: String,
        required: [true, "Vui lòng cung cấp loại sản phẩm!"],
        enum: ['wool', 'product', 'tool'],
        default: 'wool'
    },
    options: [{
        image: {
            type: String,
            required: [true, "Vui lòng cung cấp ảnh sản phẩm!"],
        },
        quantity: {
            type: Number,
            required: [true, "Vui lòng cung cấp số lượng sản phẩm!"],
            min: [0, "Số lượng sản phẩm phải lớn hơn 0!"]
        },
        price: {
            type: Number,
            required: [true, "Vui lòng cung cấp giá sản phẩm!"],
            min: [0, "Giá sản phẩm phải lớn hơn 0!"]
        }
    }],
    note: {
        type: String,
        required: false,
        default: "",
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

// Thêm validate để đảm bảo options có ít nhất một phần tử
productSchema.path('options').validate(function (options) {
    return options.length > 0;
}, 'Options phải có ít nhất một phần tử');

module.exports = mongoose.model('Product', productSchema);
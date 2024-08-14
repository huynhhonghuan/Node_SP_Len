const mongoose = require('mongoose');
const validatorJS = require('validator');

const optionSchema = new mongoose.Schema({
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
});

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
        enum: ['wool', 'product']
    },
    options: {
        type: [optionSchema],
        required: [true, "Vui lòng cung cấp tùy chọn sản phẩm!"]
    },
    note: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
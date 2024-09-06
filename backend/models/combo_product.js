const mongoose = require('mongoose');

const ComboProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng cung cấp tên combo'],
        minlength: [3, 'Tên combo phải có ít nhất 3 kí tự'],
        maxlength: [50, 'Tên combo chỉ được từ 3 đến 50 kí tự']
    },
    description: {
        type: String,
        required: [true, 'Vui lòng cung cấp mô tả combo'],
        minlength: [3, 'Mô tả combo phải có ít nhất 3 kí tự'],
        maxlength: [500, 'Mô tả combo chỉ được từ 3 đến 200 kí tự']
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        optionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Vui lòng cung cấp lựa chọn'],
            validate: {
                validator: async function (value) {
                    const product = await mongoose.model('Product').findOne({
                        _id: this.optionId,
                        'options._id': value
                    });
                    return product != null;
                },
                message: 'Lựa chọn sản phẩm không tồn tại',
            }
        },
    }],
    price: {
        type: Number,
        required: [true, 'Vui lòng cung cấp giá combo'],
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('ComboProduct', ComboProductSchema);
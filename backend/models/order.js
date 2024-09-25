const mongoose = require('mongoose');
const validatorJs = require('validator');

const orderSchema = new mongoose.Schema({
    // Thông tin người mua
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vui lòng cung cấp Id khách hàng'],
    },
    // Thông tin sản phẩm
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Vui lòng cung cấp Id sản phẩm'],
            },
            optionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, 'Vui lòng cung cấp lựa chọn'],
                validate: {
                    validator: async function (value) {
                        const product = await mongoose.model('Product').findOne({
                            _id: this.productId,
                            'options._id': value
                        });
                        return product != null;
                    },
                    message: 'Lựa chọn sản phẩm không tồn tại',
                }
            },
            quantity: {
                type: Number,
                required: [true, 'Vui lòng cung cấp số lượng sản phẩm'],
                min: [1, 'Số lượng sản phẩm phải lớn hơn 0'],
            },
            price: {
                type: Number,
                required: [true, 'Vui lòng cung cấp giá sản phẩm'],
                min: [0, 'Giá sản phẩm phải lớn hơn 0'],
            },
        },
    ],
    // Thông tin đơn hàng
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Vui lòng cung cấp ngày đặt hàng'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Vui lòng cung cấp tổng giá'],
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'failed'],
        default: 'pending',
    },
    // Thông tin chú thích khi mua hàng
    note: {
        type: String,
        default: null
    },
    // Thông tin thanh toán 
    paymentMethod: {
        type: String,
        enum: ['cod', 'vnpay'],
        required: [true, 'Vui lòng cung cấp hình thức thanh toán'],
    },
    paymentVnpay: {
        paymentTransactionId: {
            type: String,
            required: function () { return this.paymentMethod === 'vnpay'; },
            default: null
        },
        paymentQRCodeUrl: {
            type: String,
            required: function () { return this.paymentMethod === 'vnpay'; },
            default: null
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
            required: function () { return this.paymentMethod === 'vnpay'; },
        },
        paymentDate: {
            type: Date,
            default: null,
            required: function () { return this.paymentMethod === 'vnpay'; },
        },
    },
    // Thông tin giao hàng
    shippingAddress: {
        phone: {
            type: String,
            required: [true, "Vui lòng cung cấp số điện thoại!"],
            validate: {
                validator: validatorJs.isMobilePhone,
                message: '{VALUE} phải là số điện thoại hợp lệ!'
            }
        },
        city: {
            type: String,
            required: [true, "Vui lòng cung cấp tỉnh/thành phố!"],
        },
        district: {
            type: String,
            required: [true, "Vui lòng cung cấp quận/huyện!"],
        },
        ward: {
            type: String,
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
    }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
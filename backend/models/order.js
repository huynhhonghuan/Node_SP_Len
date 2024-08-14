const mongoose = require('mongoose');
const { addressSchema } = require('../models/address');

const orderSchema = new mongoose.Schema({
    // Thông tin người mua
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vui lòng cung cấp Id khách hàng'],
    },
    // Thông tin sản phẩm
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Vui lòng cung cấp Id sản phẩm'],
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
        enum: ['pending', 'processing', 'shipped'],
        default: 'pending',
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
        type: addressSchema,
        required: [true, 'Vui lòng cung cấp địa chỉ giao hàng'],
    },
    // Thông tin phản hồi
    comments: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            content: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    // Thông tin chú thích
    note: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
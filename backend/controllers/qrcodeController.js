// controllers/paymentController.js
const QRCode = require('qrcode');
const Order = require('../models/order');

exports.generatePaymentQRCode = async (req, res) => {
    const { bankAccount, bankName, accountHolder, amount, invoiceId } = req.body;

    // Nội dung thông tin thanh toán trong mã QR
    const qrData = `STK:${bankAccount}\nNH:${bankName}\nTKCH:${accountHolder}\nSoTien:${amount}\nMaHD:${invoiceId}`;

    try {
        // Tạo mã QR từ chuỗi thông tin trên
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        res.status(200).json({ qrCodeUrl });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo mã QR thanh toán', error });
    }
};

//Cập nhật trạng thái thanh toán đơn hàng

exports.updatePaymentStatus = async (req, res) => {
    const { orderId, paymentStatus } = req.body;

    try {
        // Tìm đơn hàng theo ID và cập nhật trạng thái thanh toán bên trong `paymentVnpay`
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { 'paymentVnpay.paymentStatus': paymentStatus },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        res.status(200).json({
            message: 'Cập nhật trạng thái thanh toán thành công!',
            updatedOrder,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi cập nhật trạng thái thanh toán',
            error: error.message,
        });
    }
};

// Lấy trạng thái thanh toán đơn hàng
exports.getPaymentStatus = async (req, res) => {

    try {
        console.log(req.params.orderId);
        // Tìm đơn hàng theo ID và chỉ lấy trường `paymentVnpay.paymentStatus`
        const order = await Order.findById(req.params.orderId);

        console.log(order);

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        res.status(200).json({
            message: 'Lấy trạng thái thanh toán thành công!',
            paymentStatus: order.paymentVnpay.paymentStatus,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Lỗi lấy trạng thái thanh toán',
            error: error.message,
        });
    }
};
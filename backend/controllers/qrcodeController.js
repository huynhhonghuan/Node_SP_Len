// controllers/paymentController.js
const QRCode = require('qrcode');

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
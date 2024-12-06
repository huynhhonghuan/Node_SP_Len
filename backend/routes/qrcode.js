// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { generatePaymentQRCode, getPaymentStatus, updatePaymentStatus } = require('../controllers/qrcodeController');

router.post('/qr-code', generatePaymentQRCode);
router.get('/status/:orderId', getPaymentStatus);
router.put('/status', updatePaymentStatus);

module.exports = router;
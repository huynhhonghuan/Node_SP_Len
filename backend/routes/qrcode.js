// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { generatePaymentQRCode } = require('../controllers/qrcodeController');

router.post('/qr-code', generatePaymentQRCode);

module.exports = router;

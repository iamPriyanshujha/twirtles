const express = require('express');
const router = express.Router();
const { 
  createRazorpayOrder, 
  verifyPayment, 
  submitQrPayment, 
  submitCodPayment 
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// All endpoints in this router require authentication
router.use(protect);

// 1. Razorpay integration routes
router.post('/razorpay-order', createRazorpayOrder);
router.post('/verify', verifyPayment);

// 2. Manual Bank Transfer via Static Business QR Code
router.post('/qr-submit', submitQrPayment);

// 3. Simple Cash on Delivery confirmation
router.post('/cod-submit', submitCodPayment);

module.exports = router;

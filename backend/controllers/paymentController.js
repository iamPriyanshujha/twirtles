const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const { notifyOrderPlacement, notifyPaymentFailure } = require('../services/notificationService');

// Lazy initialize Razorpay client instance
let razorpayClient = null;

const getRazorpayClient = () => {
  if (!razorpayClient) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.log('⚠️  NOTE: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET not set in environment variables. Running in mock-gateway fallback mode.');
      return null;
    }

    try {
      razorpayClient = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
      });
    } catch (error) {
      console.error('Failed to initialize Razorpay SDK:', error.message);
      return null;
    }
  }
  return razorpayClient;
};

// @desc    Step 1: Create a Razorpay Order ID for frontend checkout
// @route   POST /api/payments/razorpay-order
// @access  Private (Authenticated)
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress, billingAddress, city, phone, state, pinCode } = req.body;

    if (!items || items.length === 0 || !total) {
      return res.status(400).json({ success: false, message: 'Invalid transaction specs. Cart items or totals are missing' });
    }

    // 1. First, persist a pending order record in MongoDB database
    const pendingOrder = await Order.create({
      user: req.user.id,
      userEmail: req.user.email,
      items,
      total,
      paymentMethod: 'razorpay',
      paymentStatus: 'pending',
      status: 'placed', // Retain as placed but payment status is pending
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      city,
      state: state || '',
      pinCode: pinCode || '',
      phone
    });

    const amountInPaise = Math.round(total * 100);

    // 2. Fetch Razorpay custom client or initiate simulated order fallback
    const razorpayIdx = getRazorpayClient();
    if (!razorpayIdx) {
      // Mock gateway sandbox fallback details for direct evaluation
      const mockOrderId = `order_MOCK_${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
      
      pendingOrder.razorpayOrderId = mockOrderId;
      await pendingOrder.save();

      // Initiate Transaction audit log
      await Transaction.create({
        transactionId: `tx_init_${mockOrderId}`,
        orderId: pendingOrder._id,
        paymentMethod: 'razorpay',
        status: 'initiated',
        amount: total,
        rawResponse: { note: 'Created in simulated gateway mode due to missing environment keys' }
      });

      return res.status(200).json({
        success: true,
        mode: 'sandbox_simulated',
        orderId: pendingOrder._id,
        razorpayOrderId: mockOrderId,
        amount: amountInPaise,
        currency: 'INR',
        key_id: 'rzp_test_mock_keys'
      });
    }

    // Create a real order in Razorpay using official SDK
    const rzpOrderResponse = await razorpayIdx.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_order_${pendingOrder._id.toString().substring(12)}`,
      notes: {
        userId: req.user.id,
        userEmail: req.user.email,
        dbOrderId: pendingOrder._id.toString()
      }
    });

    // 3. Update saved Mongoose order with created Razorpay order reference
    pendingOrder.razorpayOrderId = rzpOrderResponse.id;
    await pendingOrder.save();

    // Create transaction log
    await Transaction.create({
      transactionId: `tx_init_${rzpOrderResponse.id}`,
      orderId: pendingOrder._id,
      paymentMethod: 'razorpay',
      status: 'initiated',
      amount: total,
      rawResponse: rzpOrderResponse
    });

    res.status(201).json({
      success: true,
      mode: 'live_production',
      orderId: pendingOrder._id,
      razorpayOrderId: rzpOrderResponse.id,
      amount: amountInPaise,
      currency: 'INR',
      key_id: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('Error creating Razorpay transaction:', error);
    res.status(500).json({ success: false, message: 'Razorpay order creation collapsed', error: error.message });
  }
};

// @desc    Step 2: Signature cryptographical verification after transaction success callback
// @route   POST /api/payments/verify
// @access  Private (Authenticated)
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      dbOrderId, 
      razorpayOrderId, 
      razorpayPaymentId, 
      razorpaySignature 
    } = req.body;

    if (!dbOrderId || !razorpayOrderId || !razorpayPaymentId) {
      return res.status(400).json({ success: false, message: 'Verification transaction handles are missing' });
    }

    // Fetch the linked order
    const order = await Order.findById(dbOrderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Associated database order could not be resolved' });
    }

    // A. Check for sandboxed mock verification
    if (razorpayOrderId.startsWith('order_MOCK_') && (!razorpaySignature || razorpaySignature === 'mock_bypass_signature')) {
      order.paymentStatus = 'paid';
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = 'MOCK_COMPLIANT_BYPASS_SIGNATURE';
      await order.save();

      // Log successful audit trail
      await Transaction.create({
        transactionId: razorpayPaymentId,
        orderId: order._id,
        paymentMethod: 'razorpay',
        status: 'success',
        amount: order.total,
        rawResponse: { mode: 'sandbox_sandbox_verification_direct_pass_confirmed' }
      });

      // Dispatch real email and SMS!
      await notifyOrderPlacement(order);

      return res.json({
        success: true,
        message: 'Sandbox Simulated Order Verified and Confirmed! 🍿✨',
        data: order
      });
    }

    // B. Live HMAC cryptographic checks
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({ success: false, message: 'Live verification failed: missing key secret config on target server' });
    }

    // Hash composition: "razorpay_order_id|razorpay_payment_id" signed with keySecret
    const textToSign = `${razorpayOrderId}|${razorpayPaymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(textToSign)
      .digest('hex');

    if (generatedSignature === razorpaySignature) {
      // Signature is genuine!
      order.paymentStatus = 'paid';
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = razorpaySignature;
      await order.save();

      // Record transaction success
      await Transaction.create({
        transactionId: razorpayPaymentId,
        orderId: order._id,
        paymentMethod: 'razorpay',
        status: 'success',
        amount: order.total,
        rawResponse: { note: 'HMAC validation verified successfully', gatewayPaymentId: razorpayPaymentId }
      });

      // Send real emails & text alerts
      await notifyOrderPlacement(order);

      res.status(200).json({
        success: true,
        message: 'Payment verified and transaction logged successfully! 🚀🎉',
        data: order
      });
    } else {
      // Signature mismatch
      order.paymentStatus = 'failed';
      await order.save();

      // Audit trail record
      await Transaction.create({
        transactionId: razorpayPaymentId || `failed_${Date.now()}`,
        orderId: order._id,
        paymentMethod: 'razorpay',
        status: 'failed',
        amount: order.total,
        rawResponse: { note: 'HMAC signature verification failed' }
      });

      // Trigger payment failed warning
      await notifyPaymentFailure(order, 'HMS SHA256 Signature verification mismatch');

      res.status(400).json({
        success: false,
        message: 'Verification failed: signature tampered or mismatch'
      });
    }

  } catch (error) {
    console.error('Error verified process response:', error);
    res.status(500).json({ success: false, message: 'Server failed payment signature validation', error: error.message });
  }
};

// @desc    Route 2: Static QR paying with custom transaction reference approval matching
// @route   POST /api/payments/qr-submit
// @access  Private (Authenticated)
exports.submitQrPayment = async (req, res) => {
  try {
    const { items, total, shippingAddress, city, phone, utrNumber, state, pinCode } = req.body;

    if (!utrNumber || utrNumber.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please specify the valid UPI/UTR reference ID transaction code' });
    }

    // Save order in a pending review state
    const qrOrder = await Order.create({
      user: req.user.id,
      userEmail: req.user.email,
      items,
      total,
      paymentMethod: 'qr_code',
      paymentStatus: 'pending', // Pending merchant account verification logic
      status: 'placed',
      utrNumber: utrNumber.trim(),
      shippingAddress,
      city,
      state: state || '',
      pinCode: pinCode || '',
      phone
    });

    // Write to audit trail
    await Transaction.create({
      transactionId: `UTR_${utrNumber.trim()}`,
      orderId: qrOrder._id,
      paymentMethod: 'qr_code',
      status: 'initiated',
      amount: total,
      rawResponse: { userEnteredUtr: utrNumber.trim(), note: 'Waiting on merchant to confirm receipt in bank account' }
    });

    // Dispatch placement notification
    await notifyOrderPlacement(qrOrder);

    res.status(201).json({
      success: true,
      message: 'Your UPI transaction has been queued! The owner is reviewing your transaction matching UTR reference. 📦⏱️',
      data: qrOrder
    });

  } catch (error) {
    console.error('Error committing QR receipt:', error);
    res.status(500).json({ success: false, message: 'QR payment submission aborted' });
  }
};

// @desc    Route 3: Cash On Delivery instantly verified order confirmation
// @route   POST /api/payments/cod-submit
// @access  Private (Authenticated)
exports.submitCodPayment = async (req, res) => {
  try {
    const { items, total, shippingAddress, city, phone, state, pinCode } = req.body;

    // Create delivery order
    const codOrder = await Order.create({
      user: req.user.id,
      userEmail: req.user.email,
      items,
      total,
      paymentMethod: 'cod',
      paymentStatus: 'pending', // Payable to the courier on handover
      status: 'placed',
      shippingAddress,
      city,
      state: state || '',
      pinCode: pinCode || '',
      phone
    });

    // Log transaction record
    await Transaction.create({
      transactionId: `COD_TX_${codOrder._id.toString().substring(12)}_${Date.now()}`,
      orderId: codOrder._id,
      paymentMethod: 'cod',
      status: 'initiated',
      amount: total,
      rawResponse: { note: 'Cash on delivery instance' }
    });

    // Notify user of placed status
    await notifyOrderPlacement(codOrder);

    res.status(201).json({
      success: true,
      message: 'Cash on Delivery order successfully placed! Prepare cash on delivery day. 📦🐢',
      data: codOrder
    });

  } catch (error) {
    console.error('Error committing COD context:', error);
    res.status(500).json({ success: false, message: 'Cash on delivery mapping failure' });
  }
};

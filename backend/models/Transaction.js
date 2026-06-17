const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'qr_code', 'cod'],
    required: true
  },
  status: {
    type: String,
    enum: ['initiated', 'success', 'failed', 'refunded'],
    required: true,
    default: 'initiated'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  rawResponse: {
    type: mongoose.Schema.Types.Mixed, // Capture JSON-formatted webhook payloads or payment responses
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);

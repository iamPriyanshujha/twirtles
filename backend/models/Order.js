const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true
  }
});

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  items: [OrderItemSchema],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['placed', 'declined', 'completed'],
    default: 'placed'
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'qr_code', 'cod'],
    required: true,
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    required: true,
    default: 'pending'
  },
  razorpayOrderId: {
    type: String,
    default: ''
  },
  razorpayPaymentId: {
    type: String,
    default: ''
  },
  razorpaySignature: {
    type: String,
    default: ''
  },
  utrNumber: {
    type: String, // Filled when custom manual approved QR Code payment is used
    default: ''
  },
  // Additional address details for delivery verification
  shippingAddress: {
    type: String,
    required: true
  },
  billingAddress: {
    type: String, // Can default value same as shipping if absent
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: ''
  },
  pinCode: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);

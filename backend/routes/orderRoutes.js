const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getMyOrders, 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Customer ordering paths
router.post('/', protect, createOrder);
router.get('/my-history', protect, getMyOrders);

// Admin-level manager ordering paths
router.get('/admin-queue', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;

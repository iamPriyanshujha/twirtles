const Order = require('../models/Order');
const { notifyOrderStatusUpdate } = require('../services/notificationService');

// ==========================================
// CUSTOMER CLIENT ENDPOINTS
// ==========================================

// @desc    Place a new munchies order
// @route   POST /api/orders
// @access  Private (Customer Authenticated)
exports.createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress, city, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your items cart is empty' });
    }

    if (!total || !shippingAddress || !city || !phone) {
      return res.status(400).json({ success: false, message: 'Please specify total cost, verified phone, and complete shipping address coordinates' });
    }

    // Create order record linked to current user
    const order = await Order.create({
      user: req.user.id,
      userEmail: req.user.email,
      items,
      total,
      shippingAddress,
      city,
      phone,
      status: 'placed' // Standard default status when placed
    });

    res.status(201).json({
      success: true,
      message: 'Twirtles order placed successfully! 🛒✨',
      data: order
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Server database order entry registration failed', error: error.message });
  }
};

// @desc    Get current user's order history
// @route   GET /api/orders/my-history
// @access  Private (Customer Authenticated)
exports.getMyOrders = async (req, res) => {
  try {
    // Find orders where user id matches current authenticated user, sorted by most recent
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Fetch customer orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve transaction logs' });
  }
};


// ==========================================
// ADMIN / OWNER EXECUTIVE ENDPOINTS
// ==========================================

// @desc    Get all orders globally (Review placed vs. declined vs. completed)
// @route   GET /api/orders/admin-queue
// @access  Private (Admin Role only)
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all logs in the database, populating the purchaser name/email details, sorted by newest
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Admin global queue fetch error:', error);
    res.status(500).json({ success: false, message: 'Executive authority bypass failed' });
  }
};

// @desc    Update a specific order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin Role only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['placed', 'declined', 'completed'];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid status: [placed, declined, completed]' 
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order record not found by provided ID parameter' });
    }

    order.status = status;
    await order.save();

    // Trigger customer notification securely (non-blocking)
    try {
      notifyOrderStatusUpdate(order, status);
    } catch (notifErr) {
      console.error('Failed to dispatch status update notification:', notifErr.message);
    }

    res.json({
      success: true,
      message: `Order status successfully synchronized to [${status.toUpperCase()}]! 📦✅`,
      data: order
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Could not process status update on backend database' });
  }
};

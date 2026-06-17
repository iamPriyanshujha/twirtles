const User = require('../models/User');

// @desc    Get authenticated user profile
// @route   GET /api/user/profile
// @access  Private (Authenticated)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile coordinate not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ success: false, message: 'Server failed to fetch profile information' });
  }
};

// @desc    Toggle item in customer wishlist (Add if not present, remove if present)
// @route   POST /api/user/wishlist/toggle
// @access  Private (Authenticated)
exports.toggleWishlistItem = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Please provide a product ID' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    // Toggle logic
    const index = user.wishlist.indexOf(productId);
    let message = '';
    if (index > -1) {
      user.wishlist.splice(index, 1);
      message = 'Item removed from wishlist successfully';
    } else {
      user.wishlist.push(productId);
      message = 'Item added to wishlist successfully';
    }

    await user.save();
    res.json({
      success: true,
      message,
      data: user.wishlist
    });

  } catch (error) {
    console.error('Wishlist toggle error:', error);
    res.status(500).json({ success: false, message: 'failed to update wishlist items' });
  }
};

// @desc    Clear or overwrite absolute wishlist list
// @route   PUT /api/user/wishlist
// @access  Private (Authenticated)
exports.updateWishlist = async (req, res) => {
  try {
    const { wishlist } = req.body; // Array expected
    if (!Array.isArray(wishlist)) {
      return res.status(400).json({ success: false, message: 'Wishlist must be an array of product IDs' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { wishlist },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Wishlist synchronized successfully',
      data: user.wishlist
    });

  } catch (error) {
    console.error('Wishlist sync error:', error);
    res.status(500).json({ success: false, message: 'Failed to sync developer wishlist database' });
  }
};

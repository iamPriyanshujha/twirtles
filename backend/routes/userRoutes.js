const express = require('express');
const router = express.Router();
const { getUserProfile, toggleWishlistItem, updateWishlist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// User details routes under guard
router.get('/profile', protect, getUserProfile);
router.post('/wishlist/toggle', protect, toggleWishlistItem);
router.put('/wishlist', protect, updateWishlist);

module.exports = router;

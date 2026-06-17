const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/authMiddleware');

// Generate JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d' // Account session lasts 30 days
  });
};

// @desc    Register a new snack user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please include all required fields (name, email, password)' });
    }

    // Check if user already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Account with this email already exists' });
    }

    // Create user in MongoDB (Password pre-hashing is handled by Mongoose hooks!)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'customer' // Defaults to customer unless explicitly set as 'admin'
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          wishlist: user.wishlist,
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    console.error('Registration processing error:', error);
    res.status(500).json({ success: false, message: 'Server registration failed', error: error.message });
  }
};

// @desc    Authenticate custom login
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Attempt retrieval
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials: user not found' });
    }

    // Match password hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials: password incorrect' });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        wishlist: user.wishlist,
        token: generateToken(user._id)
      }
    });

  } catch (error) {
    console.error('Login processing error:', error);
    res.status(500).json({ success: false, message: 'Server authentication failed', error: error.message });
  }
};

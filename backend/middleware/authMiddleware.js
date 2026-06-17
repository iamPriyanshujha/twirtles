const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'twirtles_super_secure_secret_key_1402';

// Standard Auth Guard: ensures request contains valid token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token details
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify signature
      const decoded = jwt.verify(token, JWT_SECRET);

      // Fetch user from DB excluding password
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('JWT Token Verification Error:', error);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

// Admin Guard: ensures user has executive permissions
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Creator/Admin level privileges required' });
  }
};

module.exports = { protect, adminOnly, JWT_SECRET };

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/twirtles';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('================================================');
    console.log('💚 SUCCESS: Linked to MongoDB Database instance!');
    console.log(`📡 DB path: ${MONGO_URI}`);
    console.log('================================================');
  })
  .catch((err) => {
    console.error('🚨 ERROR: MongoDB connection failure!');
    console.error(err.message);
    console.log('------------------------------------------------');
    console.log('💡 Tip: Ensure MongoDB service is running locally on your PC!');
  });

// Middlewares
app.use(cors({
  origin: '*', // Allows convenient requests from your React client port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server API Routes mapping
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Base application status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    message: 'Welcome to the Twirtles Full-stack MongoDB & Express API Backend! 🐢🍿',
    timestamp: new Date()
  });
});

// Central fallback error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled runtime server exception:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server encountered an unexpected internal error'
  });
});

// Run server listener
app.listen(PORT, () => {
  console.log(`🚀 Server successfully triggered and listening on Node.js port: ${PORT}`);
  console.log(`🔗 Local status check: http://localhost:${PORT}/`);
  console.log('------------------------------------------------');
});

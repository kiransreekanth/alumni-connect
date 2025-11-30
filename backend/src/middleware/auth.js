// File: backend/src/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - Verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id)
        .select('-password')
        .populate('college', 'name slug emailDomain');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      // Check if user is verified
      if (!req.user.isVerified) {
        return res.status(403).json({
          success: false,
          message: 'Account not verified. Please wait for admin approval.',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Token is invalid or expired.',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message,
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};

// Check if user belongs to the same college
exports.checkCollegeAccess = async (req, res, next) => {
  try {
    const resourceCollegeId = req.params.collegeId || req.body.college;

    if (!resourceCollegeId) {
      return res.status(400).json({
        success: false,
        message: 'College ID is required',
      });
    }

    // Check if user's college matches the resource college
    if (req.user.college._id.toString() !== resourceCollegeId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access resources from your own college.',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'College access check failed',
      error: error.message,
    });
  }
};

// Check if user is admin of their college
exports.isCollegeAdmin = async (req, res, next) => {
  try {
    const College = require('../models/College');
    
    const college = await College.findById(req.user.college._id);
    
    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found',
      });
    }

    // Check if user is in the admins array or has admin role
    const isAdmin = 
      req.user.role === 'admin' ||
      college.admins.some(adminId => adminId.toString() === req.user._id.toString());

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. College admin privileges required.',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Admin check failed',
      error: error.message,
    });
  }
};
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Fetch user but do NOT return the password
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// --- NEW DAY 05 RBAC MIDDLEWARE ---
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, let them pass
    } else {
        res.status(403).json({ message: 'Access denied: Admin privileges required' });
    }
};

module.exports = { protect, admin };
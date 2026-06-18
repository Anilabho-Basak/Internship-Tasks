const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); // <-- 1. Import validator
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

// --- DAY 07: Validate incoming Registration data ---
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], registerUser);

// --- DAY 07: Validate incoming Login data ---
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], loginUser);

// Admin-Only User Management Route
router.get('/users', protect, admin, getUsers);

module.exports = router;
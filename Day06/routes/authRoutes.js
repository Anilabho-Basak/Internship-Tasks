const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// --- NEW DAY 05: Admin-Only User Management Route ---
// Must pass 'protect' (be logged in) AND 'admin' (have the admin role)
router.get('/users', protect, admin, getUsers);

module.exports = router;
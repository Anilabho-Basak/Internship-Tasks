const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Lock this entire router behind BOTH authentication and admin privileges
router.use(protect, admin); 

// Dashboard Route: GET http://localhost:5000/api/admin/analytics
router.get('/analytics', getDashboardAnalytics);

module.exports = router;
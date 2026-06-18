const express = require('express');
const router = express.Router();
// 1. Import your new generateSystemReport function here!
const { getDashboardAnalytics, generateSystemReport } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Lock this entire router behind BOTH authentication and admin privileges
router.use(protect, admin); 

// Dashboard Route: GET http://localhost:5000/api/admin/analytics
router.get('/analytics', getDashboardAnalytics);

// 2. NEW ROUTE: Trigger Background Job 
// POST http://localhost:5000/api/admin/report
router.post('/report', generateSystemReport);

module.exports = router;
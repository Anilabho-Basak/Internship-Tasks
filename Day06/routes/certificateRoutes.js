const express = require('express');
const router = express.Router();
const { generateCertificate } = require('../controllers/certificateController');
const { protect } = require('../middlewares/authMiddleware');

// Must be logged in to generate a certificate
router.get('/generate', protect, generateCertificate);

module.exports = router;
const express = require('express');
const router = express.Router();

// Import both controllers
const { uploadFile, downloadFile } = require('../controllers/fileController');

const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Your day 4 middleware

// Day 04: Upload Route
router.post('/upload', protect, upload.single('file'), uploadFile);

// --- NEW DAY 05: Document Retrieval Route ---
// Matches requests like: GET /api/files/6a302...
router.get('/:id', protect, downloadFile);

module.exports = router;
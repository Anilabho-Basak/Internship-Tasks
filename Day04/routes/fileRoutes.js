const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/fileController');
const { protect } = require('../middlewares/authMiddleware'); // 
const upload = require('../middlewares/uploadMiddleware');       // Day 04 Upload

// POST /api/files/upload
// First checks if user has a valid JWT token via protect, then handles the file upload
router.post('/upload', protect, upload.single('file'), uploadFile);

module.exports = router;
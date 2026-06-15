const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// This is a test route to verify your token works
router.get('/profile', protect, (req, res) => {
    res.status(200).json({ message: `Welcome to your private profile, ${req.user.name}!` });
});

module.exports = router;
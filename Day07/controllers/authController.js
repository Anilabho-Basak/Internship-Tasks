const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator'); // <-- 1. Import result checker

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Register new user
const registerUser = async (req, res) => {
    // --- DAY 07: Check for validation errors BEFORE touching the database ---
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error("REGISTRATION CRASH:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Login user
const loginUser = async (req, res) => {
    // --- DAY 07: Check for validation errors BEFORE checking the database ---
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("REAL LOGIN CRASH:", error); 
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Users (Admin Only)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); 
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching users' });
    }
};

module.exports = { registerUser, loginUser, getUsers };
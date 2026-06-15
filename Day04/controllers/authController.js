const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Register new user
exports.registerUser = async (req, res) => {
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
exports.loginUser = async (req, res) => {
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
            // No console.log here! Just standard rejection.
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // The debug trap belongs here, where 'error' actually exists
        console.error("REAL LOGIN CRASH:", error); 
        res.status(500).json({ message: 'Server error' });
    }
};
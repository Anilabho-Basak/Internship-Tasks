const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <-- New Import

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' // By default, everyone is a normal user
    }
}, { timestamps: true });

// --- SECURITY HOOKS ---

// 1. Hash password before saving to the database
userSchema.pre('save', async function(next) {
    // If the password hasn't been changed/created, skip the hashing
    if (!this.isModified('password')) {
        next();
    }

    // Generate the "salt" (the random scramble key)
    const salt = await bcrypt.genSalt(10);
    // Overwrite the plain text password with the hashed version
    this.password = await bcrypt.hash(this.password, salt);
});

// 2. Match user entered password to hashed password in database for Login
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
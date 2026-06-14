// models/Intern.js
const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the intern name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email address'],
        unique: true
    },
    department: {
        type: String,
        required: [true, 'Please assign a department (e.g., IT, HR, Marketing)']
    },
    status: {
        type: String,
        enum: ['onboarding', 'active', 'completed', 'terminated'],
        default: 'onboarding'
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Intern', internSchema);
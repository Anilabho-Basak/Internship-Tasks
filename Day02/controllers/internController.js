const Intern = require('../models/Intern');

exports.createIntern = async (req, res) => {
    try {
        const intern = await Intern.create(req.body);
        res.status(201).json({ success: true, data: intern });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getInterns = async (req, res) => {
    try {
        const interns = await Intern.find();
        res.status(200).json({ success: true, count: interns.length, data: interns });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add 'next' to the parameters
exports.getIntern = async (req, res, next) => { 
    try {
        const intern = await Intern.findById(req.params.id);
        if (!intern) {
            res.status(404);
            throw new Error('Intern not found'); // This triggers the error handler
        }
        res.status(200).json({ success: true, data: intern });
    } catch (error) {
        next(error); // Passes the error to your global middleware
    }
};

exports.updateIntern = async (req, res) => {
    try {
        const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!intern) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: intern });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteIntern = async (req, res) => {
    try {
        const intern = await Intern.findByIdAndDelete(req.params.id);
        if (!intern) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Intern deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
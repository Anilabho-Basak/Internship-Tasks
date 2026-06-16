const File = require('../models/File');
const path = require('path');
const fs = require('fs');

// --- DAY 04: Upload File ---
const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        // Save file data to the database and link to user
        const newFile = await File.create({
            user: req.user.id,
            filename: req.file.filename,
            filePath: req.file.path
        });

        res.status(201).json({
            success: true,
            message: "File uploaded and linked to user successfully!",
            data: newFile
        });
    } catch (error) {
        console.error("UPLOAD CRASH:", error);
        res.status(500).json({ message: 'Server error during upload' });
    }
};

// --- NEW DAY 05: Secure Document Retrieval ---
const downloadFile = async (req, res) => {
    try {
        // 1. Find the file in the database
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found in database' });
        }

        // 2. Security Check: Only the file owner OR an admin can access it
        if (file.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to download this file' });
        }

        // 3. Check if the physical file still exists on the server
        const filePath = path.resolve(file.filePath);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'Physical file is missing from the server' });
        }

        // 4. Trigger the download!
        res.download(filePath, file.filename); 
        
    } catch (error) {
        console.error("DOWNLOAD CRASH:", error);
        res.status(500).json({ message: 'Server error downloading file' });
    }
};

// Export both functions!
module.exports = { 
    uploadFile,
    downloadFile 
};
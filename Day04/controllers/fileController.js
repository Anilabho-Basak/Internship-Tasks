const File = require('../models/File');

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    // req.user.id comes directly from your Day 03 authMiddleware payload
    const newFile = new File({
      filename: req.file.filename,
      filePath: req.file.path,
      user: req.user.id 
    });

    await newFile.save();

    res.status(201).json({
      success: true,
      message: 'File uploaded and linked to user successfully!',
      data: newFile
    });
  } catch (error) {
    next(error); // Passes error to your errorMiddleware.js
  }
};
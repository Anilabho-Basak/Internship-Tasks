// --- NEW DAY 05: Global Error Handler ---
const errorHandler = (err, req, res, next) => {
    // If the status is already a 400-level error, keep it. Otherwise, default to 500 (Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        success: false,
        message: err.message,
        // Only show the detailed crash stack trace if we are NOT in production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };
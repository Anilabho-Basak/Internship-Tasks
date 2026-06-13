// middlewares/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    // If the status code wasn't already set to an error code, default to 500 (Server Error)
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Check specifically for a Mongoose bad ObjectId error (e.g., ID is too short)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Intern not found. Invalid ID format.';
    }

    // Send a clean JSON response
    res.status(statusCode).json({
        success: false,
        message: message,
        // Only show the detailed stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };
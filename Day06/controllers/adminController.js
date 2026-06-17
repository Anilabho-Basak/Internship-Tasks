const User = require('../models/User');
const File = require('../models/File'); // Using your File model from Day 04
const agenda = require('../config/agenda');

// Initialize the cache (Data will live in memory for 60 seconds)
const NodeCache = require('node-cache');
const analyticsCache = new NodeCache({ stdTTL: 60 });

// @desc    Get dashboard statistics for Admin
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getDashboardAnalytics = async (req, res) => {
    try {
        // 1. CHECK CACHE FIRST: If we have the data, send it instantly and skip the database!
        if (analyticsCache.has('dashboardData')) {
            console.log("⚡ Serving analytics from Cache!");
            return res.status(200).json(analyticsCache.get('dashboardData'));
        }

        console.log("🐢 Fetching analytics from Database...");
        // Run database queries in parallel for maximum speed
        const [totalUsers, totalAdmins, totalFiles] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'admin' }),
            File.countDocuments()
        ]);

        // Construct the response payload
        const responsePayload = {
            success: true,
            message: "Admin dashboard analytics fetched successfully",
            data: {
                userMetrics: {
                    totalUsers,
                    admins: totalAdmins,
                    standardUsers: totalUsers - totalAdmins
                },
                systemMetrics: {
                    totalFilesUploaded: totalFiles
                }
            }
        };

        // 2. SAVE TO CACHE: Save the payload so the next request is instant
        analyticsCache.set('dashboardData', responsePayload);

        res.status(200).json(responsePayload);
    } catch (error) {
        console.error("ANALYTICS CRASH:", error);
        res.status(500).json({ message: 'Server error fetching analytics data' });
    }
};

// @desc    Trigger a heavy background report
// @route   POST /api/admin/report
// @access  Private/Admin
const generateSystemReport = async (req, res) => {
    try {
        // 1. Queue the job in the background and pass the logged-in admin's ID to it
        // This matches the exact name defined in your reportJob.js file
        await agenda.now('generate heavy report', { userId: req.user._id });

        // 2. IMMEDIATELY respond to the client so Postman doesn't wait
        res.status(200).json({
            success: true,
            message: "Report generation started in the background! Check your VS Code terminal."
        });
    } catch (error) {
        console.error("BACKGROUND JOB TRIGGER CRASH:", error);
        res.status(500).json({ message: "Failed to queue background job" });
    }
};

// Export both functions cleanly
module.exports = { 
    getDashboardAnalytics, 
    generateSystemReport 
};
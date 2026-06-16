const User = require('../models/User');
const File = require('../models/File'); // Using your File model from Day 04

// @desc    Get dashboard statistics for Admin
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getDashboardAnalytics = async (req, res) => {
    try {
        // Run database queries in parallel for maximum speed
        const [totalUsers, totalAdmins, totalFiles] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'admin' }),
            File.countDocuments()
        ]);

        res.status(200).json({
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
        });
    } catch (error) {
        console.error("ANALYTICS CRASH:", error);
        res.status(500).json({ message: 'Server error fetching analytics data' });
    }
};

module.exports = { getDashboardAnalytics };
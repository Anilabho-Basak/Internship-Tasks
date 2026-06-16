const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const internRoutes = require('./routes/internRoutes');
const authRoutes = require('./routes/authRoutes'); // New Day 3 Import
const fileRoutes = require('./routes/fileRoutes'); // New Day 4 Import
const { errorHandler } = require('./middlewares/errorMiddleware');
const morgan = require('morgan');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); // This will log every Postman request to your terminal

// Mount routes
app.use('/api/interns', internRoutes);
app.use('/api/auth', authRoutes); // New Day 3 Route
app.use('/api/files', fileRoutes); // New Day 4 Route
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));

// Custom Error Handler (Must be placed after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
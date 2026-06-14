const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const internRoutes = require('./routes/internRoutes');
const authRoutes = require('./routes/authRoutes'); // New Day 3 Import
const { errorHandler } = require('./middlewares/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api/interns', internRoutes);
app.use('/api/auth', authRoutes); // New Day 3 Route

// Custom Error Handler (Must be placed after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
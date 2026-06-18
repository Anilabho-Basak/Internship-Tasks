const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const internRoutes = require('./routes/internRoutes');
const authRoutes = require('./routes/authRoutes'); 
const fileRoutes = require('./routes/fileRoutes'); 
const { errorHandler } = require('./middlewares/errorMiddleware');
const morgan = require('morgan');
const helmet = require('helmet'); // <-- Added Helmet for HTTP security
const rateLimit = require('express-rate-limit'); 
const agenda = require('./config/agenda');
require('./jobs/reportJob'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- DAY 6: SECURITY MIDDLEWARE ---

// 1. Helmet: Secures Express apps by setting 14 different HTTP headers
app.use(helmet());

// 2. Rate Limiting: Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { 
        success: false, 
        message: '🚨 Too many requests from this IP. You are locked out for 15 minutes.' 
    }
});

// --- DAY 07: API Documentation Route ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev')); 

// Apply the rate limiter to ALL routes that start with /api/
app.use('/api/', limiter); 

// --- DAY 07: Production Health Check Route ---
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true, 
        message: '🚀 Internship Capstone API is live and running!',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Mount routes
app.use('/api/interns', internRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/files', fileRoutes); 
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));

// Custom Error Handler (Must be placed after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
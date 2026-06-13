const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// In-memory data store (simulating a database)
let interns = [
    { id: 1, name: "Anilabho", domain: "Backend" },
    { id: 2, name: "Shreyam", domain: "AIML" }
];

// A simple route for the home page (root URL)
app.get('/', (req, res) => {
    res.send("Welcome to my Backend API! Navigate to /api/interns to see the data.");
});

// 1. GET API: Retrieve data
app.get('/api/interns', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        data: interns
    });
});

// 2. POST API: Create/submit new data
app.post('/api/interns', (req, res) => {
    const { name, domain } = req.body;

    // Basic validation
    if (!name || !domain) {
        return res.status(400).json({
            success: false,
            message: "Please provide both name and domain"
        });
    }

    // Create new entry
    const newIntern = {
        id: interns.length + 1,
        name: name,
        domain: domain
    };

    interns.push(newIntern);

    res.status(201).json({
        success: true,
        message: "Data created successfully",
        data: newIntern
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
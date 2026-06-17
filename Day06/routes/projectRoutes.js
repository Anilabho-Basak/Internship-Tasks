const express = require('express');
const router = express.Router();
const { 
    createProject, 
    getProjects, 
    updateProject, 
    deleteProject 
} = require('../controllers/projectController');

const { protect } = require('../middlewares/authMiddleware');

// Lock ALL project routes so only logged-in users can access them
router.use(protect);

// Routes for /api/projects
router.route('/')
    .get(getProjects)     // READ
    .post(createProject); // CREATE

// Routes for /api/projects/:id
router.route('/:id')
    .put(updateProject)    // UPDATE
    .delete(deleteProject); // DELETE

module.exports = router;
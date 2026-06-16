const Project = require('../models/Project');

// 1. CREATE (POST)
const createProject = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const project = await Project.create({
            title,
            description,
            status,
            createdBy: req.user.id // Assigns the project to the logged-in user
        });
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: 'Error creating project' });
    }
};

// 2. READ (GET All Projects for a user)
const getProjects = async (req, res) => {
    try {
        // Only fetch projects created by the person making the request
        const projects = await Project.find({ createdBy: req.user.id });
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
};

// 3. UPDATE (PUT)
const updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Security check: Make sure this user owns the project
        if (project.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this project' });
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ message: 'Error updating project' });
    }
};

// 4. DELETE (DELETE)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Security check: Make sure this user owns the project
        if (project.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this project' });
        }

        await project.deleteOne();
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
    }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
const { prisma } = require('../config/prisma');

// POST /projects
const createProject = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Project name is required" });
        }
        const project = await prisma.project.create({
            data: {
                name,
                userId: req.user.userId,
            },
        });
        return res.status(201).json({
            success: true,
            data: project,
            message: "Create project successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

// GET /projects
const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { tasks: true } },
            },
        });
        return res.status(200).json({
            success: true,
            data: projects,
            message: "Get projects successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

// PUT /projects/:id
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const existing = await prisma.project.findFirst({
            where: { id: parseInt(id), userId: req.user.userId },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        const project = await prisma.project.update({
            where: { id: parseInt(id) },
            data: { ...(name && { name }) },
        });
        return res.status(200).json({
            success: true,
            data: project,
            message: "Update project successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

// DELETE /projects/:id
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await prisma.project.findFirst({
            where: { id: parseInt(id), userId: req.user.userId },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Tasks bị xoá cascade theo project (onDelete: Cascade trong schema)
        await prisma.project.delete({ where: { id: parseInt(id) } });

        return res.status(200).json({
            success: true,
            message: "Delete project successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
};

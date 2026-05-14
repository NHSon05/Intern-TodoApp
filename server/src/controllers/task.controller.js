const { prisma } = require('../config/prisma');

// POST /projects/:projectId/tasks
const createTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, status, scheduleDate, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Please fill task title" });
        }

        const project = await prisma.project.findFirst({
            where: { id: parseInt(projectId), userId: req.user.userId },
        });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                scheduleDate: scheduleDate ? new Date(scheduleDate) : null,
                dueDate: dueDate ? new Date(dueDate) : null,
                status: status || "NEW",
                userId: req.user.userId,
                projectId: parseInt(projectId),
            },
        });
        return res.status(201).json({
            success: true,
            data: task,
            message: "Create task successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

// GET /projects/:projectId/tasks
const getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, status, page } = req.query;

        const project = await prisma.project.findFirst({
            where: { id: parseInt(projectId), userId: req.user.userId },
        });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        const limit = 10;
        const currentPage = parseInt(page) || 1;
        const skip = (currentPage - 1) * limit;

        const whereCondition = {
            projectId: parseInt(projectId),
            userId: req.user.userId,
        };
        if (title)  whereCondition.title  = { contains: title };
        if (status) whereCondition.status = status;

        const [tasks, totalTasks] = await Promise.all([
            prisma.task.findMany({
                where: whereCondition,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.task.count({ where: whereCondition }),
        ]);

        return res.status(200).json({
            success: true,
            data: tasks,
            meta: {
                total: totalTasks,
                page: currentPage,
                limit,
                totalPages: Math.ceil(totalTasks / limit),
            },
            message: "Get tasks successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

// PUT /projects/:projectId/tasks/:taskId
const updateTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const { title, description, status, scheduleDate, dueDate } = req.body;

        const existing = await prisma.task.findFirst({
            where: {
                id: parseInt(taskId),
                projectId: parseInt(projectId),
                userId: req.user.userId,
            },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        const task = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: {
                ...(title        && { title }),
                ...(description  && { description }),
                ...(status       && { status }),
                ...(scheduleDate && { scheduleDate: new Date(scheduleDate) }),
                ...(dueDate      && { dueDate: new Date(dueDate) }),
            },
        });
        return res.status(200).json({
            success: true,
            data: task,
            message: "Update task successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

// PATCH /projects/:projectId/tasks/:taskId/status
const updateTaskStatus = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const { status } = req.body;

        const existing = await prisma.task.findFirst({
            where: {
                id: parseInt(taskId),
                projectId: parseInt(projectId),
                userId: req.user.userId,
            },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        const task = await prisma.task.update({
            where: { id: parseInt(taskId) },
            data: { status, updatedAt: new Date() },
        });
        return res.status(200).json({
            success: true,
            data: task,
            message: "Update task status successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

// DELETE /projects/:projectId/tasks/:taskId
const deleteTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;

        const existing = await prisma.task.findFirst({
            where: {
                id: parseInt(taskId),
                projectId: parseInt(projectId),
                userId: req.user.userId,
            },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        await prisma.task.delete({ where: { id: parseInt(taskId) } });
        return res.status(200).json({
            success: true,
            message: "Delete task successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Error: " + error.message });
    }
};

module.exports = {
    createTasks,
    getTasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
};
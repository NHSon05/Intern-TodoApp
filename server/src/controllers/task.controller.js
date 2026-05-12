const { prisma } = require('../config/prisma');

const createTasks = async ( req, res) => {
    try {
        const {title, description, category, scheduleDate} = req.body;

        if (!title) {
            return res.status(400).json({message: "Please fill title task"})
        }
        const tasks = await prisma.task.create({
            data: {
                title,
                description,
                category,
                scheduleDate: new Date(scheduleDate),
                status: "NEW",
                userId: req.user.userId
            }
        })
        return res.status(201).json({
            success: true,
            data: tasks,
            message: "Create task successfully"
        })
    } catch (error) {
        return res.status(500).json({message: "Error" + error.message})
    }
}

const getTasks = async (req, res) => {
    try {
        const userId = req.user.userId
    
        const {title, status, category, page } = req.query
    
        // pagination
        const limit = 10;
        const currentPage = parseInt(page) || 1;
        const skip = (currentPage - 1) * limit;
    
        // dynamic where
        const whereCondition = {
            userId: req.user.userId
        }
    
        if ( title ) {
            whereCondition.title = {
                contains: title
            }
        }
        if (status) {
            whereCondition.status = status;
        }
        if (category) {
            whereCondition.category = category
        }
        
        const [tasks, totalTasks] = await Promise.all([
            prisma.task.findMany({
                where: whereCondition,
                skip: skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.task.count({
                where: whereCondition
            })
        ])

        const totalPages = Math.ceil(totalTasks / limit);
        
        return res.status(200).json({
            success: true,
            data: tasks,
            meta: {
                total: totalTasks,
                page: currentPage,
                limit: limit,
                totalPages
            },
            message: "Get task successfully"
        })
    } catch (error) {
        return res.status(500).json({message: "Error " + error.message})
    }
}

const getTasksById = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await prisma.task.findUnique({
            where: {
                id: parseInt(id),
                userId: req.user.userId
            }
        })
        return res.status(200).json({
            success: true,
            data: tasks,
            message: "Get task successfully"
        })
    } catch (error) {
        return res.status(500).json({message: "Error " + error.message})
    }
}

const updateTasksById = async (req, res) => {
    try {
        const { id } = req.params;
        const {title,  description,  status, category, scheduleDate} = req.body;
        const tasks = await prisma.task.update({
            where: {
                id: parseInt(id),
                userId: req.user.userId
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                category: true,
                scheduleDate: true,
            },
            data: {
                ...(title && {title}),
                ...(description && {description}),
                ...(status && {status}),
                ...(category && {category}),
                ...(scheduleDate && {scheduleDate: new Date(scheduleDate)})
            }
        })
        if(!tasks) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: tasks,
            message: "Update task successfully"
        })
    } catch (error) {
        return res.status(500).json({message: "Error " + error.message})
    }
}

const deleteTasksById = async (req, res) => {
    try {
        const {id} = req.params;
        const tasks = await prisma.task.delete({
            where: {
                id: parseInt(id),
                userId: req.user.userId
            }
        })
        if (!tasks) {
            return res.status(404).json({message: "Task not found"})
        }
        return res.status(200).json({
            success: true,
            message: "Delete task successfully"
        })
    } catch (error) {
        return res.status(500).json({message: "Error" + error.message})
    }
}

const toggleTaskStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const { status } = req.body;
        const tasks = await prisma.task.findUnique({
            where: {
                id: parseInt(id),
                userId: req.user.userId
            }
        })
        if (!tasks) {
            return res.status(404).json({message: "Task not found"})
        }
        const newStatus = status;
        const updatedTasks = await prisma.task.update({
            where: {
                id: parseInt(id),
                userId: req.user.userId
            },
            data: {
                status: newStatus,
                updatedAt: new Date()
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                category: true,
                scheduleDate: true,
            }
        })
        return res.status(200).json({
            success: true,
            data: updatedTasks,
            message: "Toggle task status successfully"
        })
    } catch (error) {
        return res.status(500).json({message: "Error" + error.message})
    }
}



module.exports = {
    createTasks,
    getTasks, 
    getTasksById,
    updateTasksById,
    deleteTasksById,
    toggleTaskStatus
} 
const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');
const {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
} = require('../controllers/project.controller');

const {
    createTasks,
    getTasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
} = require('../controllers/task.controller');

// Project CRUD
router.post('/', verifyToken, createProject);
router.get('/', verifyToken, getProjects);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

// Tasks nested under project
router.post('/:projectId/tasks', verifyToken, createTasks);
router.get('/:projectId/tasks', verifyToken, getTasks);
router.put('/:projectId/tasks/:taskId', verifyToken, updateTask);
router.patch('/:projectId/tasks/:taskId/status', verifyToken, updateTaskStatus);
router.delete('/:projectId/tasks/:taskId', verifyToken, deleteTask);

module.exports = router;

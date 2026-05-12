const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');
const { createTasks, getTasks, getTasksById, updateTasksById, toggleTaskStatus, deleteTasksById } = require('../controllers/task.controller');

router.post('/', verifyToken, createTasks)
router.get('/', verifyToken, getTasks)
router.get('/:id', verifyToken,  getTasksById)
router.put('/:id', verifyToken, updateTasksById)
router.patch('/:id/status', verifyToken, toggleTaskStatus)
router.delete('/:id', verifyToken, deleteTasksById)


module.exports = router;
const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');
const { createTasks, getTasks, updateTask, updateTaskStatus, deleteTask } = require('../controllers/task.controller');

router.post('/', verifyToken, createTasks)
router.get('/', verifyToken, getTasks)
router.put('/:id', verifyToken, updateTask)
router.patch('/:id/status', verifyToken, updateTaskStatus)
router.delete('/:id', verifyToken, deleteTask)

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    createTask,
    updateTask,
    getTask,
    updateTaskStatus,
    updateChecklist,
    getTaskAnalytics,
    deleteTask,
    getTaskById
} = require('../controllers/taskController');
const { verifyToken } = require("../middlewares/verifyJwtToken");

router.post('/create', verifyToken, createTask);

router.put('/:id/update', verifyToken, updateTask);

router.get('/all-tasks', verifyToken, getTask);

router.get('/get-task/:id', verifyToken, getTaskById);

router.put('/:id/updateStatus', verifyToken, updateTaskStatus);

router.put('/:id/updateChecklist', verifyToken, updateChecklist);

router.get('/analytics', verifyToken, getTaskAnalytics);

router.delete('/:id/delete', verifyToken, deleteTask);

module.exports = router;

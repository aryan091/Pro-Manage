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
    getTaskById,
    viewTask
} = require('../controllers/task.controller');
const { verifyToken } = require("../middlewares/verifyJwtToken");

router.post('/create', verifyToken, createTask);

router.put('/update/:id', verifyToken, updateTask);

router.get('/all-tasks', verifyToken, getTask);

router.get('/get-task/:id', verifyToken, getTaskById);

router.put('/update-status/:id', verifyToken, updateTaskStatus);

router.put('/updateChecklist/:id', verifyToken, updateChecklist);

router.get('/analytics', verifyToken, getTaskAnalytics);

router.get('/view-task/:id', viewTask )

router.delete('/delete/:id', verifyToken, deleteTask);



module.exports = router;

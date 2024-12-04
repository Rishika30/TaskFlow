const express = require('express');
const TaskController = require('../controllers/taskController');
const ValidationMiddleware = require('../middlewares/validationMiddleware');
const router = express.Router();

// Create a task
router.post('/', 
    ValidationMiddleware.validateCreateTask, 
    TaskController.createTask
);

// Get all tasks
router.get('/', TaskController.getAllTasks);

// Update task status
router.put('/:id', 
    ValidationMiddleware.validateTaskId,
    ValidationMiddleware.validateTaskStatus, 
    TaskController.updateTaskStatus
);

// Delete a task
router.delete('/:id', 
    ValidationMiddleware.validateTaskId,
    TaskController.deleteTask
);

// Filter tasks by status
router.get('/status/:status', TaskController.getTasksByStatus);

module.exports = router;
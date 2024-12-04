const TaskService = require('../services/taskService');

class TaskController {
    async createTask(req, res, next) {
        try {
            const { title, description } = req.body;
            const newTask = await TaskService.createTask(title, description);
            
            res.status(201).json({
                message: 'Task created successfully',
                task: newTask
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllTasks(req, res, next) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    async updateTaskStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updatedTask = await TaskService.updateTask(id, { status });
            
            res.status(200).json({
                message: 'Task updated successfully',
                task: updatedTask
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const { id } = req.params;
            await TaskService.deleteTask(id);
            
            res.status(200).json({ 
                message: 'Task deleted successfully' 
            });
        } catch (error) {
            next(error);
        }
    }

    async getTasksByStatus(req, res, next) {
        try {
            const { status } = req.params;
            const tasks = await TaskService.getTasksByStatus(status);
            
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TaskController();
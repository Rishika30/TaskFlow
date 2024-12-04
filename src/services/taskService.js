const FileHandler = require('../utils/fileHandler');
const Task = require('../models/taskModel');
const TASKS_FILE_PATH = './data/tasks.json';

class TaskService {
    constructor() {
        this.fileHandler = new FileHandler(TASKS_FILE_PATH);
    }

    async createTask(title, description) {
        const tasks = await this.fileHandler.readFile();
        const newTask = new Task(title, description);
        tasks.push(newTask);
        await this.fileHandler.writeFile(tasks);
        return newTask;
    }

    async getAllTasks() {
        return await this.fileHandler.readFile();
    }

    async updateTask(id, updates) {
        const tasks = await this.fileHandler.readFile();
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex === -1) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        tasks[taskIndex] = { 
            ...tasks[taskIndex], 
            ...updates
        };

        await this.fileHandler.writeFile(tasks);
        return tasks[taskIndex];
    }

    async deleteTask(id) {
        const tasks = await this.fileHandler.readFile();
        const filteredTasks = tasks.filter(task => task.id !== id);
        
        if (tasks.length === filteredTasks.length) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        await this.fileHandler.writeFile(filteredTasks);
    }

    async getTasksByStatus(status) {
        const tasks = await this.fileHandler.readFile();
        return tasks.filter(task => task.status === status);
    }
}

module.exports = new TaskService();
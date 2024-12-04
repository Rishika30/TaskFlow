class ValidationMiddleware {
    // Validate task creation
    validateCreateTask(req, res, next) {
        const { title, description } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ 
                error: 'Title is required and cannot be empty' 
            });
        }

        if (!description || description.trim() === '') {
            return res.status(400).json({ 
                error: 'Description is required and cannot be empty' 
            });
        }

        next();
    }

    // Validate task status update
    validateTaskStatus(req, res, next) {
        const { status } = req.body;

        if (status && !['pending', 'completed'].includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status. Must be "pending" or "completed"' 
            });
        }

        next();
    }

    // Validate task ID parameter
    validateTaskId(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ 
                error: 'Task ID is required' 
            });
        }

        next();
    }
}

module.exports = new ValidationMiddleware();
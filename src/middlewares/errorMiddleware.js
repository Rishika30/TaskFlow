class ErrorMiddleware {
    // Global error handler
    handleError(err, req, res, next) {
        console.error(err);

        const statusCode = err.statusCode || 500;
        const errorResponse = {
            status: 'error',
            message: err.message || 'Internal Server Error'
        };

        res.status(statusCode).json(errorResponse);
    }
}

module.exports = new ErrorMiddleware();
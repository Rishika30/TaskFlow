const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes');
const ErrorMiddleware = require('./src/middlewares/errorMiddleware');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/tasks', taskRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find requested URL ${req.originalUrl} on this server`
    });
});
// Error Handler
app.use(ErrorMiddleware.handleError);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
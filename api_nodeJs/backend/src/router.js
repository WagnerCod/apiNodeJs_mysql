const express = require('express');
const tasksController = require('./controllers/tasksControllers');
const router = express.Router();
const taskMiddleware = require('./middlewares/taksmoddlewares');


router.get('/tasks', tasksController.getAll);
router.post('/tasks', taskMiddleware.validateBody, tasksController.insertCreateTask);
router.put('/tasks/:id', taskMiddleware.validateBody, tasksController.updateTask);
router.delete('/tasks/:id', tasksController.deleteTasks);

module.exports = router;
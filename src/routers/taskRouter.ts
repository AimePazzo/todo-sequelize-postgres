import express from 'express'
import taskController from '../modules/tasks/controller/taskController'
import { authenticateToken } from '../middleware/authMiddleware';
const taskRouter = express.Router();

taskRouter.get('/', taskController.getTasks);
taskRouter.get('/task',authenticateToken, taskController.getTaskByUser)
taskRouter.post('/addtask',authenticateToken,taskController.createTask)
taskRouter.put('/updatetask/:id',authenticateToken,taskController.updateTask)
taskRouter.delete('/deletetask/:id',authenticateToken,taskController.deleteTask)
export default taskRouter;
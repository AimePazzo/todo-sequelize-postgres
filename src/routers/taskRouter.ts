import express from 'express'
import taskController from '../modules/tasks/controller/taskController'
import { authenticateToken } from '../middleware/authMiddleware';
const taskRouter = express.Router();

taskRouter.get('/', taskController.getTasks);
taskRouter.get('/get-todo',authenticateToken, taskController.getTaskByUser)
taskRouter.post('/create-todo',authenticateToken,taskController.createTask)
taskRouter.put('/update-todo/:id',authenticateToken,taskController.updateTask)
taskRouter.delete('/delete-todo/:id',authenticateToken,taskController.deleteTask)
export default taskRouter;
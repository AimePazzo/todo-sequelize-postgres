import taskRepo from "../taskRepo/taskRepo";
import { Request, Response } from "express";


interface ExtendedRequest extends Request {
    userId?: string;
  }
const getTasks = async(req:Request, res:Response):Promise<void> => {
    const tasks = await taskRepo.getAllTasks();
    res.status(200).json(tasks);
}

const createTask = async(req:ExtendedRequest, res:Response):Promise<void> => {
    const taskData ={
        userId : req.userId,
        title : req.body.title
    }
    const newTask = await taskRepo.createTask(taskData);
    res.status(201).json(newTask);
}

const deleteTask = async(req:ExtendedRequest, res:Response):Promise<void> => {
    const userId = req.userId;
    const taskId = req.params.id;
    await taskRepo.deleteTask({userId, taskId});
    res.status(200).json({message: 'Task deleted successfully'});
}

const updateTask = async(req:ExtendedRequest, res:Response):Promise<void> => {
    const userId = req.userId;
    const taskId = req.params.id;
    const title = req.body.title;
    const updatedTask = await taskRepo.updateTask({userId, taskId, title});
    res.status(200).json(updatedTask);
}

const getTaskByUser = async(req:ExtendedRequest, res:Response):Promise<void> => {
    const userId = req.userId;
    const task = await taskRepo.getTaskByUserId(userId);
    res.status(200).json(task);
}

export default {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    getTaskByUser,
}
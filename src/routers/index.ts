import { Router } from "express";
import authRouter from './authRouter';
import taskRouter from "./taskRouter";

const router = Router();

router.use('/user', authRouter);
router.use('/todo', taskRouter);
export default router;
import express from "express";
import userController from "../modules/users/controller/userController";
const authRouter = express.Router();


authRouter.get("/",userController.getUsers );
authRouter.post("/signup",userController.createUser);
authRouter.post("/login",userController.login);
export default authRouter;
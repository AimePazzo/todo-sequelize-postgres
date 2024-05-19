import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import userRepo from "../repository/userRepo";

const getUsers = async(req:Request , res:Response ) =>{
    const users = await userRepo.getUsers();
    if(users){
        return res.status(200).json(users);
    }
    return res.status(404).json({
        message: "No users found"
    });
}

const createUser = async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password =  hashedPassword;
        const user = await userRepo.createUser(req.body);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({
                message: "User not created"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const findUser = await userRepo.getUserByEmail(req.body.email);
        if (findUser) {
            if (process.env.JWT_SECRET) {
                const token = jwt.sign({ id: findUser.id }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                });
                res.status(200).json({
                    success: 200,
                    message: "Login Success",
                    token
                });
            } else {
                throw new Error("JWT secret is not defined.");
            }
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export default{createUser,getUsers,login}
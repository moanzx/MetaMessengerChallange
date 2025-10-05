import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";
// import { User } from "../models/user.model";

// The job of the controllers is to validate the data if the middleware validation is not enough

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    return res.status(200).json({ message: "login successful", result });
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await registerUser(username, password);
        return res.status(200).json({ message: "user registered successfully", user });
    } catch (error) {
        next(error);
    }
};
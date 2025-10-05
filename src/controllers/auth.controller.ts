import { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/auth.service";
// import { User } from "../models/user.model";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // check if the body is valid
        if (!req.body || typeof req.body !== "object") {
            throw new Error("INVALID_BODY");
        }

        // check if the username and password fields are in the body
        if (!("username" in req.body) && !("password" in req.body)) {
            throw new Error("MISSING_FIELDS");
        }

        // check if the username and password are not empty
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error("EMPTY_FIELDS");
        }

        // After validation send to service
        const user = await registerUser(username, password);
        return res.status(200).json({ message: "service endpoint reached", data: user });
    } catch (error) {
        next(error);
    }
};
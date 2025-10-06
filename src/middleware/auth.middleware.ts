import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("UNAUTHORIZED");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("UNAUTHORIZED");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
            username: string;
        }

        (req as any).user = decoded;

        next();


    } catch (error) {
        next(error);
    }
}
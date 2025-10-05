import { Request, Response, NextFunction } from "express";

export const validateAuthFields = (req: Request, res: Response, next: NextFunction) => {
    // check if the body is valid
    if (!req.body || typeof req.body !== "object") {
        throw new Error("INVALID_BODY");
    }

    // check if the username and password fields are in the body
    if (!("username" in req.body) || !("password" in req.body)) {
        throw new Error("MISSING_FIELDS");
    }

    // check if the username and password are not empty
    const { username, password } = req.body;
    if (!username || !password) {
        throw new Error("EMPTY_FIELDS");
    }

    next();
};


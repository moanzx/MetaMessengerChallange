import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error caught by middleware:", err.message);

    // Handle specific error types
    switch (err.message) {
        case "INVALID_BODY":
            return res.status(400).json({ error: "Invalid body" });
        case "MISSING_FIELDS":
            return res.status(400).json({ error: "Username and password fields are required" });
        case "EMPTY_FIELDS":
            return res.status(400).json({ error: "Username and password are required" });
        case "USER_ALREADY_EXISTS":
            return res.status(409).json({ error: "Username already taken" });
        case "DATABASE_ERROR":
            return res.status(500).json({ error: "Database error occurred" });
        case "UNKNOWN_ERROR":
            return res.status(500).json({ error: "An unexpected error occurred" });
        default:
            // Log the actual error for debugging
            console.error("Unexpected error:", err.message);
            return res.status(500).json({
                error: "Internal server error",
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
    }
};

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
        case "USER_NOT_FOUND":
            return res.status(404).json({ error: "User's username not found" });
        case "INVALID_PASSWORD":
            return res.status(401).json({ error: "Invalid password" });
        case "UNAUTHORIZED":
            return res.status(401).json({ error: "Unauthorized" });
        // Common JWT error messages mapped to Unauthorized
        case "jwt malformed":
        case "invalid token":
        case "invalid signature":
        case "JsonWebTokenError":
        case "TokenExpiredError":
        case "jwt expired":
            return res.status(401).json({ error: "Token is invalid or expired" });
        case "MISSING_FIELDS_CHAT":
            return res.status(400).json({ error: "Recipient ID and content are required" });
        default:
            // Log the actual error for debugging
            console.error("Unexpected error:", err.message);
            return res.status(500).json({
                error: "Internal server error",
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
    }
};

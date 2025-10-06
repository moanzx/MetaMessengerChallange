import { Request, Response, NextFunction } from "express";

export const validateMessage = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body || typeof req.body !== "object") {
            throw new Error("INVALID_BODY");
        }

        const { recipientIdentifier, content } = req.body as { recipientIdentifier?: unknown; content?: unknown };

        if (!("recipientIdentifier" in req.body) || !("content" in req.body)) {
            throw new Error("MISSING_FIELDS_CHAT");
        }

        if (typeof recipientIdentifier !== "string" || typeof content !== "string") {
            throw new Error("INVALID_BODY");
        }

        if (!recipientIdentifier.trim() || !content.trim()) {
            throw new Error("EMPTY_FIELDS");
        }

        // Basic input sanity for recipient identifier
        if (recipientIdentifier.includes("$") || recipientIdentifier.includes(".")) {
            throw new Error("INVALID_RECIPIENT_IDENTIFIER");
        }

        const maxLength = 1000;
        if (content.length > maxLength) {
            throw new Error("MESSAGE_TOO_LONG");
        }

        next();
    } catch (error) {
        next(error);
    }
}



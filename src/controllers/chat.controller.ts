import { NextFunction, Request, Response } from "express";
import { sendMessage } from "../services/chat.service";
import sanitizeHtml from "sanitize-html";


export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const { recipientIdentifier: recipientUsername, content } = req.body;
        const senderId = user.userId;
        const cleanContent = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} }).trim();
        if (!cleanContent) throw new Error("EMPTY_CONTENT");
        const msg = await sendMessage(senderId, recipientUsername, cleanContent);
        return res.status(201).json({ message: "Message sent", msg });
    } catch (error) {
        next(error);
    }
}

// history handlers moved to controllers/history.controller.ts
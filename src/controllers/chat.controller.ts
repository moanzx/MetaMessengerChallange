import { NextFunction, Request, Response } from "express";
import { Message } from "../models/message.model";
import { sendMessage } from "../services/chat.service";

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // check if the body is valid
        if (!req.body || typeof req.body !== "object") {
            throw new Error("INVALID_BODY");
        }

        if (!("recipientIdentifier" in req.body) || !("content" in req.body)) {
            throw new Error("MISSING_FIELDS_CHAT");
        }

        const user = (req as any).user;
        const { recipientIdentifier: recipientId, content } = req.body;
        const senderId = user.userId;
        const msg = await sendMessage(senderId, recipientId, content);
        return res.status(201).json({ message: "Message sent endpoint hit" });
    } catch (error) {
        next(error);
    }
}

// history handlers moved to controllers/history.controller.ts
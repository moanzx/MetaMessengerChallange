import { NextFunction, Request, Response } from "express";
import { Message } from "../models/message.model";
import { getChatsCached, getChats } from "../services/history.service";

export const getChatHistoryCached = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        const history = await getChatsCached(user.userId);
        return res.status(200).json({ message: "Chat history fetched", history });
    } catch (error) {
        next(error);
    }
}

export const getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    // const stats = await Message.find({ senderId: "68e36a595f3ab32717f7b4df" }).explain("executionStats");
    // console.log(JSON.stringify(stats, null, 2));
    // return res.status(200).json({ message: "Chat history endpoint hit" });
    const history = await getChats((req as any).user.userId);
    return res.status(200).json({ message: "User chat history", history });
}



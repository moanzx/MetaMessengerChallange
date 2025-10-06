import { LastMessage } from "../models/lastMessage.model";
import { Message } from "../models/message.model";
import mongoose from "mongoose";

export const getChatsCached = async (userId: string) => {
    const chats = await LastMessage.find({ $or: [{ user1Id: userId }, { user2Id: userId }] });
    return chats;
}

export const getChats = async (userId: string) => {
    return await Message.aggregate([
        // reduce the amount of rows with filter (match), user is either sender or recipient
        {
            $match: { $or: [{ senderId: new mongoose.Types.ObjectId(userId) }, { recipientId: new mongoose.Types.ObjectId(userId) }] }
        },
        // sort by timestamp in descending order, already indexed so the later group will take the first document (latest message) first
        {
            $sort: { timestamp: -1 }
        },
        // group by unique participants, we use the concat of the user ids to avoid duplicates with a condition to insure the order of the pair
        {
            $group: {
                _id: {
                    participants: {
                        $cond: [
                            { $gt: ['$senderId', '$recipientId'] },
                            { $concat: [{ $toString: "$recipientId" }, "_", { $toString: "$senderId" }] },
                            { $concat: [{ $toString: "$senderId" }, "_", { $toString: "$recipientId" }] }
                        ],
                    },
                },
                lastMessage: { $first: "$$ROOT" }
            },
        },
    ]);
}


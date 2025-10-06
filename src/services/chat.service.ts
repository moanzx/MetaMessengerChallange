import { Message } from "../models/message.model";
import { LastMessage } from "../models/lastMessage.model";
import { User } from "../models/user.model";

export const sendMessage = async (senderId: string, recipientId: string, content: string) => {
    console.log("recipientId", recipientId);
    const recipient = await User.findOne({ _id: recipientId });
    if (!recipient) {
        throw new Error("RECIPIENT_NOT_FOUND");
    }
    const msg = await Message.create({ senderId, recipientId, content });
    updateLastMessage(msg);
    return msg;
}

async function updateLastMessage(msg: any) {
    const usersIds = [msg.senderId, msg.recipientId].sort();
    const lastMessage = await LastMessage.findOne({ user1Id: usersIds[0], user2Id: usersIds[1] });
    if (!lastMessage) {
        await LastMessage.create({ user1Id: usersIds[0], user2Id: usersIds[1], senderId: msg.senderId, content: msg.content, timestamp: msg.timestamp });
    } else {
        if (lastMessage.timestamp < msg.timestamp) {
            await LastMessage.updateOne({ user1Id: usersIds[0], user2Id: usersIds[1] }, { content: msg.content, timestamp: msg.timestamp });
        }
    }
}

export const getChats = async (userId: string) => {
    const chats = await LastMessage.find({ $or: [{ user1Id: userId }, { user2Id: userId }] });
    return chats;
}
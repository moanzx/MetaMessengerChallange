import { Message } from "../models/message.model";
import { LastMessage } from "../models/lastMessage.model";
import { User } from "../models/user.model";

export const sendMessage = async (senderId: string, recipientUsername: string, content: string) => {
    const recipient = await User.findOne({ username: recipientUsername }).select("_id").lean();
    if (!recipient) {
        throw new Error("RECIPIENT_NOT_FOUND");
    }
    const msg = await Message.create({ senderId, recipientId: recipient._id, content });
    updateLastMessage(msg);
    return msg;
}

async function updateLastMessage(msg: any) {
    const usersIds = [msg.senderId, msg.recipientId].sort();
    const lastMessage = await LastMessage.findOne({ user1Id: usersIds[0], user2Id: usersIds[1] }).lean();
    if (!lastMessage) {
        await LastMessage.create({ user1Id: usersIds[0], user2Id: usersIds[1], senderId: msg.senderId, content: msg.content, timestamp: msg.timestamp });
    } else {
        if (lastMessage.timestamp < msg.timestamp) {
            await LastMessage.updateOne(
                { user1Id: usersIds[0], user2Id: usersIds[1] },
                { $set: { content: msg.content, timestamp: msg.timestamp, senderId: msg.senderId } }
            );
        }
    }
}

// moved to services/history.service.ts
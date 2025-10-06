import { Schema, model } from "mongoose";

const lastMessageSchema = new Schema({
    user1Id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user2Id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

lastMessageSchema.index({ user1Id: 1, user2Id: 1 }, { unique: true });

export const LastMessage = model("LastMessage", lastMessageSchema);
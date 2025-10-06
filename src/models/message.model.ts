import { Schema, model } from "mongoose";

const messageSchema = new Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true, trim: true },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Message = model("Message", messageSchema);

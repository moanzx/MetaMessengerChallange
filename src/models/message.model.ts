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

messageSchema.index({ senderId: 1 });
messageSchema.index({ recipientId: 1 });
messageSchema.index({ timestamp: -1 });


export const Message = model("Message", messageSchema);

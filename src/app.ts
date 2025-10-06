import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import express from "express";
import authRoutes from "./routes/auth.routes";
import historyRoutes from "./routes/history.routes";
import chatRoutes from "./routes/chat.routes";
import { errorMiddleware } from "./middleware/error.middleware";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.get("/ping", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);


import { Message } from "./models/message.model";

export default app;

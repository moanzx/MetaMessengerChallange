import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());


app.get("/ping", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/auth", authRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;

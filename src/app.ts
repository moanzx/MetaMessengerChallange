import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import express from "express";
import authRoutes from "./routes/auth.routes";
import historyRoutes from "./routes/history.routes";
import chatRoutes from "./routes/chat.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";


dotenv.config();
connectDB();

const app = express();

// Adds secure HTTP headers by Helmet middleware
app.use(helmet());


// Limit request body size to prevent abuse by express.json middleware by
app.use(express.json({ limit: "10kb" }));

// Basic rate limiter: max 100 requests per 15 minutes per IP so if user makes 100 requests in 15 minutes, it will block the user for 15 minutes
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

// Prevent NoSQL injection: removes $ and . keys from inputs by mongoSanitize middleware
app.use((req, res, next) => {
    if (req.body) mongoSanitize.sanitize(req.body);
    next();
});

app.get("/ping", (req, res) => {
    res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;

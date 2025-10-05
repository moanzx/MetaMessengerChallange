import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import express from "express";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/ping", (req, res) => {
    res.json({ ok: true });
});

export default app;

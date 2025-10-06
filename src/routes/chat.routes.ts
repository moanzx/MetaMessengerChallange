import express from "express";

import { createMessage } from "../controllers/chat.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/send", verifyToken, createMessage);

export default router;

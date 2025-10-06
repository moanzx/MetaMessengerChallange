import express from "express";

import { createMessage } from "../controllers/chat.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { validateMessage } from "../middleware/validateMessage.middleware";

const router = express.Router();

router.post("/send", verifyToken, validateMessage, createMessage);

export default router;

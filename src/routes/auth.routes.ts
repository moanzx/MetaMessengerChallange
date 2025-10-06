import express from "express";

import { register, login } from "../controllers/auth.controller";
import { validateAuthFields } from "../middleware/validateAuthFields.middleware";

import { createMessage, getChatHistory } from "../controllers/chat.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validateAuthFields, register);
router.post("/login", validateAuthFields, login);

router.post("/send", verifyToken, createMessage);
router.get("/history", verifyToken, getChatHistory);

export default router;

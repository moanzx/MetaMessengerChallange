import express from "express";

import { getChatHistory, getChatHistoryCached } from "../controllers/history.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", verifyToken, getChatHistory);
router.get("/cached", verifyToken, getChatHistoryCached);

export default router;


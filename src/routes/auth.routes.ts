import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validateAuthFields } from "../middleware/validateAuthFields.middleware";

const router = express.Router();

router.post("/register", validateAuthFields, register);
router.post("/login", validateAuthFields, login);

export default router;

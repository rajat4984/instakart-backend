import { Router } from "express";
import { register, login, getProfile } from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/profile", authMiddleware);

export default router;

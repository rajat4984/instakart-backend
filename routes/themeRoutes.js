import express from "express";
import { getTheme, createOrUpdateTheme } from "../controller/themeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get the theme
router.get("/:userId", getTheme);

// Route to create or update the theme
router.post("/", authMiddleware,createOrUpdateTheme);

export default router;
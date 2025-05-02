import express from "express";
import { getTheme, createOrUpdateTheme } from "../controller/themeController.js";

const router = express.Router();

// Route to get the theme
router.get("/", getTheme);

// Route to create or update the theme
router.post("/", createOrUpdateTheme);

export default router;
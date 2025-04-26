import { Router } from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUser,
  getUserById,
  updateUserProfileAdmin,
} from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", register);
router.get("/getAllUsers/",getAllUser);
router.get("/getSingleUser/:id",getUserById);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/updateUserProfileAdmin/:id", updateUserProfileAdmin);

export default router;

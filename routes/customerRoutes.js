import express, { Router } from "express";

import {
  deleteCustomer,
  getSingleCustomer,
  getAllCustomer,
  createCustomer,
  updateCustomer,
} from "../controller/customerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createCustomer);
router.get("/", authMiddleware, getAllCustomer);
router.put("/:id", authMiddleware, updateCustomer);
router.get("/getSingleCustomer", authMiddleware, getSingleCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);

export default router;

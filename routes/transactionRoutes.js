import express from "express";
import {
  createPhonePePayment,
  createTransaction,
  getTransactions,
} from "../controller/transactionController.js";
import { getPhonePeToken } from "../middleware/phonePayAuhTokenMiddleware.js";

const router = express.Router();

router.get("/transaction", getTransactions); // Get all products
router.post("/transaction", getPhonePeToken ,createPhonePePayment); // Get all products

export default router;

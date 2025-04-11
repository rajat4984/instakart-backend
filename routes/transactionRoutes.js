import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../controller/transactionController.js";

const router = express.Router();

router.get("/transaction", getTransactions); // Get all products
router.post("/transaction", createTransaction); // Get all products

export default router;

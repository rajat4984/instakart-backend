import express, { Router } from "express";

import {
  deleteCustomer,
  getSingleCustomer,
  getAllCustomer,
  createCustomer,
} from "../controller/customerController.js";

const router = Router();

router.post("/", createCustomer);
router.get("/", getAllCustomer);
router.get("/search", getSingleCustomer);
router.delete("/:id", deleteCustomer);

export default router;

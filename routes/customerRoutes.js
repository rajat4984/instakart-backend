import express, { Router } from "express";

import {
  deleteCustomer,
  getSingleCustomer,
  getAllCustomer,
  createCustomer,
  updateCustomer,
} from "../controller/customerController.js";
 
const router = Router();

router.post("/", createCustomer);
router.get("/", getAllCustomer);
router.put('/:id',updateCustomer)
router.get("/getSingleCustomer", getSingleCustomer);
router.delete("/:id", deleteCustomer);

export default router;

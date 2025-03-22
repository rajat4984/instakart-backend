// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
// router.get("/:id",getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;

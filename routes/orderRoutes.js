import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from "../controller/orderController.js";

const router = express.Router();

router.post("/", createOrder); // Create order
router.get("/", getAllOrders); // Get all orders
router.get("/:orderId", getOrderById); // Get order by orderId
router.put("/:orderId", updateOrder); // Update order
router.delete("/:orderId", deleteOrder); // Delete order

export default router;

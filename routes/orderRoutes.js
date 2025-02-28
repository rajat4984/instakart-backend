const express = require("express");
const { createOrder, getOrderById, updateOrder, deleteOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder); // Create order
router.get("/", getAllOrders); // Get all orders
router.get("/:orderId", getOrderById); // Get order by orderId
router.put("/:orderId", updateOrder); // Update order
router.delete("/:orderId", deleteOrder); // Delete order

module.exports = router;

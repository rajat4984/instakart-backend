import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts); // Get product list
router.post("/", authMiddleware, createProduct); // Create product
router.put("/:id", authMiddleware, updateProduct); // Edit product
router.delete("/:id", authMiddleware, deleteProduct); // Delete product

export default router;

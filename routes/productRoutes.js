import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,  // ✅ Import the new controller
} from "../controller/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts); // Get all products
router.get("/:id", getProductById); // ✅ Get a single product
router.post("/", createProduct); // Create product
router.put("/:id", updateProduct); // Edit product
router.delete("/:id", deleteProduct); // Delete product

export default router;

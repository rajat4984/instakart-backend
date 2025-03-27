import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProducts,  // ✅ Import the new controller
} from "../controller/productController.js";

const router = express.Router();

router.post("/", getProducts); // Get all products
router.get('/search',searchProducts);
// router.get("/:id", getProductById); // ✅ Get a single product
router.post("/", createProduct); // Create product
router.put("/:id", updateProduct); // Edit product
router.delete("/:id", deleteProduct); // Delete product

export default router;

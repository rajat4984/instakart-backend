import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchProducts,
  getTagsByUser, // ✅ Import the new controller
} from "../controller/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/getAllProducts", getProducts); // Get all products
router.get("/search", searchProducts);
router.get("/:id", getProductById); // ✅ Get a single product
router.post("/", authMiddleware,createProduct); // Create product
router.put("/:id", authMiddleware,updateProduct); // Edit product
router.delete("/:id",authMiddleware ,deleteProduct); // Delete product
router.get('/getStoreTags/:userId',getTagsByUser)

export default router;
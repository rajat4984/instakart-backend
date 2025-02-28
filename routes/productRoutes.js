const express = require("express");
const Product = require("../models/Product");
const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// ✅ 1️⃣ Create a new product
router.post("/", createProduct);

// ✅ 2️⃣ Get all products
router.get("/", getAllProducts);

// ✅ 3️⃣ Get a single product by ID
router.get("/:id", getSingleProduct);

// Update a product by ID
router.put("/:id", updateProduct);

// ✅ 5️⃣ Delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;

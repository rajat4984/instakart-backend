import express from "express";

import {
  createVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
} from "../controller/variantController.js";

const router = express.Router();

// Routes
router.post("/:productId", createVariant);
router.get("/", getAllVariants);
router.get("/:variantId", getVariantById);
router.put("/:variantId", updateVariant);
router.delete("/:variantId", deleteVariant);

export default router;

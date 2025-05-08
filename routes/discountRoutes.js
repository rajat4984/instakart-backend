import express from "express";
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controller/discountController.js";

const router = express.Router();

// Get all coupons
router.get("/", getAllCoupons);

// Get a coupon by ID
router.get("/:id", getCouponById);

// Create a new coupon
router.post("/", createCoupon);

// Update a coupon by ID
router.put("/:id", updateCoupon);

router.delete("/:id", deleteCoupon);

export default router;
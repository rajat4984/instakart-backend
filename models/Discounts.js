import { Schema, model } from "mongoose";

// Coupon Schema
const CouponSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true,
  },
  couponName: {
    type: String,
    required: true,
    unique: true, // Ensures the coupon name is unique
  },
  couponType: {
    type: String,
    enum: ["percentage", "value", "cart price", "bundle product"], // Allowed types
    required: true,
  },
  discountValue: {
    type: Number, // Discount value (e.g., fixed amount)
    default: 0,
  },
  discountPercentage: {
    type: Number, // Discount percentage (e.g., 10%)
    default: 0,
  },
  minCartValue: {
    type: Number, // Minimum cart value to apply the coupon
    default: 0,
    required: true,
  },
  noOfProductsToBuy: {
    type: Number, // Number of products to buy for bundle offers
    default: 0,
  },
  noOfProductsFree: {
    type: Number, // Number of products that will be free
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  expiresAt: {
    type: Date, // Expiry date for the coupon
  },
  
});

export default model("Coupon", CouponSchema); 
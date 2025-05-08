import Coupon from "../models/Discounts.js";

// Get All Coupons
export const getAllCoupons = async (req, res) => {
    try {
      const userId = req.user.id; // Get the logged-in user's ID
      const coupons = await Coupon.find({ userId }); // Filter coupons by userId
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// Get a Coupon by ID
  export const getCouponById = async (req, res) => {
    try {
      const { id } = req.params; // Get the coupon ID from the request parameters
      const userId = req.user.id; // Get the logged-in user's ID
  
      // Find the coupon by ID and ensure it belongs to the logged-in user
      const coupon = await Coupon.findOne({ _id: id, userId });
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found or not authorized" });
      }
  
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Create a New Coupon
export const createCoupon = async (req, res) => {
  try {
    const {  couponName, couponType, discountValue, discountPercentage, noOfProductsToBuy, noOfProductsFree, expiresAt,minCartValue } = req.body;
    const userId = req.user.id;
    // Validate required fields
    if (!couponName || !couponType) {
      return res.status(400).json({ message: "Coupon name and type are required" });
    }

    const newCoupon = new Coupon({
      userId,
      couponName,
      couponType,
      discountValue,
      discountPercentage,
      noOfProductsToBuy,
      minCartValue,
      noOfProductsFree,
      expiresAt,
    });

    await newCoupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.couponName) {
      return res.status(400).json({
        message: "A discount with this name already exists.",
      });
    }
  
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a Coupon
export const updateCoupon = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Get the logged-in user's ID
      const updatedData = req.body;
  
      // Find the coupon by ID and ensure it belongs to the logged-in user
      const coupon = await Coupon.findOneAndUpdate({ _id: id, userId }, updatedData, { new: true });
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found or not authorized" });
      }
  
      res.status(200).json({ message: "Coupon updated successfully", coupon });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// Delete a Coupon
export const deleteCoupon = async (req, res) => {
  console.log("Hello from deleteCoupon");
    try {
      const { id } = req.params;
      const userId = req.user.id; // Get the logged-in user's ID
  
      // Find the coupon by ID and ensure it belongs to the logged-in user
      const coupon = await Coupon.findOneAndDelete({ _id: id, userId });
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found or not authorized" });
      }
  
      res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
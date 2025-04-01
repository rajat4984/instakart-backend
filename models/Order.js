import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderId: {
    type: String,
    unique: true, // Keep orderId unique
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
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
  paymentForm: {
    subTotal: {
      type: Number,
      required: true,
    },
    totalDiscounts: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash on Delivery", "Online Payment"], // Restrict to valid options
    },
  },
});

export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now, // Automatically sets the order date
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // References the Customer schema
    required: true,
  },
  orderId: {
    type: String,
    unique: true,
    required: true, // Unique order ID written by the customer
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // References the Product schema
      required: true,
    },
  ],
  customerAddress: {
    type: String, // Either provided by the user or fetched from the existing customer
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);

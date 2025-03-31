// controllers/orderController.js
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import Product from "../models/Product.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const {
      customerId,
      products,
      customerDetails,
      orderId,
      totalAmount,
      paymentMethod,
    } = req.body;

    console.log(
      customerId,
      products,
      customerDetails,
      orderId,
      totalAmount,
      paymentMethod,
      "orderorder"
    );
    let customer;

    if (customerId) {
      customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
    } else if (customerDetails) {
      const {
        firstName,
        mobileNumber,
        email,
        addressLine1,
        addressLine2,
        pincode,
      } = customerDetails;
      customer = await Customer.findOne({ mobileNumber });
      if (!customer) {
        customer = new Customer({
          firstName,
          mobileNumber,
          email,
          addressLine1,
          addressLine2,
          pincode,
        });
        await customer.save();
      }
    } else {
      return res
        .status(400)
        .json({ error: "Provide either customerId or customerDetails" });
    }

    const productObjects = await Product.find({ _id: { $in: products } });
    if (productObjects.length !== products.length) {
      return res.status(400).json({ error: "Some products are invalid" });
    }

    const order = new Order({
      customer: customer._id,
      products,
      orderId, // NOTE MAKE AN ORDER ID FIELD IN THE FRONTEND
      totalAmount,
      paymentMethod,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer").populate("products");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("customer")
      .populate("products");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, totalAmount, paymentMethod } = req.body;

    if (products) {
      const validProducts = await Product.find({ _id: { $in: products } });
      if (validProducts.length !== products.length) {
        return res.status(400).json({ error: "Invalid products provided" });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { products, paymentMethod, totalAmount },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

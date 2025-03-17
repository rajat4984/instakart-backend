import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import Product from "../models/Product.js"; 

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { customerId, orderId, products, customerDetails } =
      req.body;

    // Check if orderId is unique
    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ error: "Order ID already exists" });
    }

    let customer;

    // If customerId is provided, fetch customer
    if (customerId) {
      customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
    }
    // If customer details are provided, create a new customer
    else if (customerDetails) {
      const {
        firstName,
        mobileNumber,
        email,
        addressLine1,
        addressLine2,
        pincode,
      } = customerDetails;

      const existingCustomer = await Customer.findOne({ mobileNumber });
      if (existingCustomer) {
        customer = existingCustomer;
      } else {
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

    // Validate product IDs
    const productObjects = await Product.find({ _id: { $in: products } });
    if (productObjects.length !== products.length) {
      return res.status(400).json({ error: "Some products are invalid" });
    }


    // Create and save the order
    const order = new Order({
      customer: customer._id,
      orderId,
      products,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders without populating customer or product details
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId })
      .populate("customer") // Fetch customer details
      .populate("products"); // Fetch product details

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
    const { orderId } = req.params;
    const { products, customerAddress } = req.body;

    let updateData = {};
    if (products) {
      const validProducts = await Product.find({ _id: { $in: products } });
      if (validProducts.length !== products.length) {
        return res.status(400).json({ error: "Invalid products provided" });
      }
      updateData.products = products;
    }
    if (customerAddress) updateData.customerAddress = customerAddress;

    const updatedOrder = await Order.findOneAndUpdate({ orderId }, updateData, {
      new: true,
    });

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
    const { orderId } = req.params;
    const deletedOrder = await Order.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


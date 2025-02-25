const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

// Create a new customer
router.post("/", async (req, res) => {
  try {
    const { mobileNumber, email } = req.body;

    // Check if mobileNumber already exists
    const existingMobile = await Customer.findOne({ mobileNumber });
    if (existingMobile) {
      return res.status(400).json({ error: "Mobile number already exists" });
    }

    // Check if email already exists (if provided)
    if (email) {
      const existingEmail = await Customer.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    // Create and save the new customer
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single customer by mobile number or email
router.get("/search", async (req, res) => {
  try {
    const { identifier } = req.query;

    if (!identifier) {
      return res
        .status(400)
        .json({ message: "Please provide a phone number or email" });
    }

    // Find customer by mobile number or email
    const customer = await Customer.findOne({
      $or: [{ mobileNumber: identifier }, { email: identifier }],
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Customer.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a customer by ID
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const customerId = req.params.id;

    // Validate customer existence
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Ensure unique mobile number
    if (
      updates.mobileNumber &&
      updates.mobileNumber !== customer.mobileNumber
    ) {
      const existingCustomer = await Customer.findOne({
        mobileNumber: updates.mobileNumber,
      });
      if (existingCustomer) {
        return res.status(400).json({ error: "Mobile number already exists" });
      }
    }

    // Ensure unique email (if provided)
    if (updates.email && updates.email !== customer.email) {
      const existingEmail = await Customer.findOne({ email: updates.email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    // Update the customer
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      updates,
      { new: true }
    );

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

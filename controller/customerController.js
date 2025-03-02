import Customer from "../models/Customer.js";  

// Create a new customer
export const createCustomer = async (req, res) => {
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
};

// Get all customers
export const getAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single customer by mobile number or email
export const getSingleCustomer = async (req, res) => {
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
};

export const deleteCustomer = async (req, res) => {
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
};


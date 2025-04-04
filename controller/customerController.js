import mongoose from "mongoose";
import Customer from "../models/Customer.js";

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { mobileNumber, email } = req.body;
    const userId = req.user.id;

    // Check if mobileNumber already exists for the *specific* user
    const existingCustomer = await Customer.findOne({
      userId,
    mobileNumber,
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Mobile number already exists for this user.",
      });
    }

    // Check if email already exists for the *specific* user.
    const existingEmailCustomer = await Customer.findOne({
      userId,
      email,
    });

    if (existingEmailCustomer) {
      return res.status(400).json({
        message: "Email already exists for this user.",
      });
    }

    // Create and save the new customer with userId
    const customer = new Customer({ ...req.body, userId });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all customers
export const getAllCustomer = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch customers matching the userId
    const customers = await Customer.find({ userId });

    res.status(200).json(customers); // Explicitly set status code
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single customer by mobile number or email
export const getSingleCustomer = async (req, res) => {
  try {
    const { identifier } = req.query;
    const userId = req.user.id;

    if (!identifier) {
      return res
        .status(400)
        .json({ message: "Please provide a phone number or email" });
    }

    // Find customer by mobile number or email for the user
    const customer = await Customer.findOne({
      userId,
      $or: [{ mobileNumber: identifier }, { email: identifier }],
    });

    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
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

// import mongoose from "mongoose";
// import Customer from "../models/customerModel.js";

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      addressLine1,
      addressLine2,
      pincode,
    } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    // Ensure at least one field is provided
    if (
      !firstName &&
      !lastName &&
      !mobileNumber &&
      !email &&
      !addressLine1 &&
      !addressLine2 &&
      !pincode
    ) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    // Update fields using conditional spreading
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(mobileNumber && { mobileNumber }),
        ...(email && { email }),
        ...(addressLine1 && { addressLine1 }),
        ...(addressLine2 && { addressLine2 }),
        ...(pincode && { pincode }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

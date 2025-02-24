const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  mobileNumber: { type: String, required: true, unique: true }, // Unique
  email: { type: String, unique: true}, // Unique but optional
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  pincode: { type: String },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
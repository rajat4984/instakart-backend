const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false }, // Optional
  mobileNumber: { type: String, required: true },
  email: { type: String, required: false }, // Optional
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: false }, // Optional
  pincode: { type: String, required: false }, // Optional
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

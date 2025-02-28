import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false }, // Optional
  mobileNumber: { type: String, required: true },
  email: { type: String, required: false }, // Optional
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: false }, // Optional
  pincode: { type: String, required: false }, // Optional
});

const Customer = model("Customer", customerSchema);

export default Customer;

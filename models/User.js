import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  businessName: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  country: { type: String }, // Added country
  city: { type: String }, // Added city
  postalCode: { type: String }, // Added postalCode
  taxId: { type: String }, // Added taxId
});

export default model("User", UserSchema);

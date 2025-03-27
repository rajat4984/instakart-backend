import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  businessName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
});

export default model("User", UserSchema);

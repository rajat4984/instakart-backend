import { Schema, model } from "mongoose";

const BankDetailsSchema = new Schema(
  {
    beneficiaryName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    reEnterAccountNumber: { type: String, required: true },
    accountType: { type: String, enum: ["Savings", "Current"], required: true },
    ifsc: { type: String, required: true },
    bankName: { type: String, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  businessName: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  postalCode: { type: String },
  taxId: { type: String },
  BankVerified: { type: Boolean, default: false },
  documentVerfied: { type: Boolean, default: false },

  // 💰 Bank Details Section
  bankDetails: BankDetailsSchema,
});

export default model("User", UserSchema);

import { Schema, model } from "mongoose";

// Bank Details Schema
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

// Documents Schema
const DocumentsSchema = new Schema(
  {
    gstNumber: { type: String },
    gstImage: { type: String }, // URL of the uploaded GST image
    panNumber: { type: String },
    panImage: { type: String }, // URL of the uploaded PAN image
  },
  { _id: false }
);

// User Schema
const UserSchema = new Schema({
  fullName: { type: String, required: true },
  businessName: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  email: { type: String, unique: true, sparse: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  type: { type: String, enum: ["user", "admin"], default: "user" },
  country: { type: String },
  city: { type: String },
  postalCode: { type: String },
  taxId: { type: String },
  BankVerified: { type: Boolean, default: false },
  documentVerified: { type: Boolean, default: false },

  // 💰 Bank Details Section
  bankDetails: BankDetailsSchema,

  // 📄 Documents Section
  documents: DocumentsSchema,
});

export default model("User", UserSchema);
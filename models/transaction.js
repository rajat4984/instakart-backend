import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String },
  storeID: { type: String, required: true },
  amount: { type: String, sparse: true },
  transactionID: { type: String, default: "" },
  type: { type: String, required: true },
  status: { type: String, required: true },
  mobile: { type: String },
});

export default model("Transaction", TransactionSchema);

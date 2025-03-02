import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  optionName: String,
  optionValue: String,
});

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    mediaUrls: { type: [String], required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    cost: { type: Number },
    margin: { type: Number },
    tax: { type: Number },
    profit: { type: Number },
    SKU: { type: String },
    status: { type: String, enum: ["active", "draft"], default: "draft" },
    weight: { type: Number },
    length: { type: Number },
    breadth: { type: Number },
    height: { type: Number },
    variants: { type: [VariantSchema] }, // Array of Objects
    tags: { type: [String] },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);

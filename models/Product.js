import mongoose from "mongoose";

// Tag model
const TagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Tag = mongoose.model("Tag", TagSchema);

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
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant" }], // Array of ObjectIds referencing Variant model
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], // Array of ObjectIds referencing Tag model
    quantity: { type: Number, default: 0 },
    businessName: { type: String },
    totalPrice: { type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);

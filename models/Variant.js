import mongoose from "mongoose";

const VariantSchema = {
  title: { type: String, required: true },
  media: [{ type: String }], // Array of image URLs or file paths
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  comparePrice: { type: Number, default: 0 },
};

export default mongoose.model("Variant", VariantSchema);

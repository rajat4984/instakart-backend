import { Schema, model } from "mongoose";

// Theme Schema
const ThemeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true,
  },
  banners: {
    type: [String], // Array of strings to store banner URLs or IDs
    required: true,
  },
  colors: {
    type: {
      primary: { type: String, required: true }, // Primary color
      secondary: { type: String, required: true }, // Secondary color
    },
    required: true,
  },
});

// Export the Theme model
export default model("Theme", ThemeSchema);
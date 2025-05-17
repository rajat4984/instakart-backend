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
      footerColor: { type: String, required: true }, // Footer color
      navbarColor: { type: String, required: true }, // Navbar color
      primaryBtnColor: { type: String, required: true }, // Primary button color
      secondaryBtnColor: { type: String, required: true }, // Secondary button color
      primaryTextColor: { type: String, required: true }, // Primary text color
      secondaryTextColor: { type: String, required: true }, // Secondary text color
    },
    required: true,
  },
});

// Export the Theme model
export default model("Theme", ThemeSchema);
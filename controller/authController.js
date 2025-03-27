import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Signup
export async function register(req, res) {
  try {
    const { fullName, email, mobile, password, businessName } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({ message: "Email or Mobile is required" });
    }

    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hash(password, 10);
    user = new User({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      businessName,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, mobile, password } = req.body;

    // Ensure at least one identifier (email or mobile) is provided
    if (!email && !mobile) {
      return res.status(400).json({ message: "Email or Mobile is required" });
    }

    // Find user by email or mobile
    const user = await User.findOne({
      $or: email ? [{ email }] : mobile ? [{ mobile }] : [],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Get Profile (Protected)
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

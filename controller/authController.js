import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Signup
export async function register(req, res) {
  try {
    const { fullName, email, mobile, password, businessName } = req.body;
    console.log(req.body,'bodybody')
    if (!email && !mobile) {
      return res.status(400).json({ message: "Email or Mobile is required" });
    }

    const emailLower = email?.toLowerCase();
    let user = await User.findOne({ $or: [{ email: emailLower }, { mobile }] });

    if (user)
      return res
        .status(400)
        .json({ message: "Email or Mobile already exists" });

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

    res.json({
      message: "Login successful",
      token,
      name: user.fullName,
      email: user.email,
      businessName:user.businessName,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Get Profile (Protected)
export async function getProfile(req, res) {
  try {
    // 1. Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];

    // 2. Decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", error: err.message });
    }

    // 3. Extract the user ID from the decoded token
    const userId = decoded.id; // Adjust 'id' if your payload uses a different property name

    // 4. Find the user by ID, excluding the password
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" }); //should this be 401?
    }

    // 5. Send the user data in the response
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Update Profile (Protected)
export async function updateProfile(req, res) {
  try {
    // 1. Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];

    // 2. Decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", error: err.message });
    }

    // 3. Extract the user ID from the decoded token
    const userId = decoded.id;

    // 4. Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5. Update the user data
    const {
      name,
      email,
      mobile,
      businessName,
      country,
      city,
      postalCode,
      taxId,
      profileImage,
    } = req.body;

    //update fields.
    if (name) user.fullName = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (businessName) user.businessName = businessName;
    if (country) user.country = country;
    if (city) user.city = city;
    if (postalCode) user.postalCode = postalCode;
    if (taxId) user.taxId = taxId;
    if (profileImage) user.profilePicture = profileImage;

    // 6. Save the updated user data
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

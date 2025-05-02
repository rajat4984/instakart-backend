import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access Denied!" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    console.log("User ID:", req.user); // Log the user ID for debugging
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};

export default authMiddleware;

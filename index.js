import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);

// Connect to DB
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

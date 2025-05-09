import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import variantRoutes from "./routes/variantRoutes.js";
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/variants", authMiddleware, variantRoutes);
app.use("/api/v1/customers", authMiddleware, customerRoutes);
app.use("/api/v1/orders", authMiddleware, orderRoutes);
app.use("/api/v1/transactions", transactionRoutes);

// Connect to DB
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

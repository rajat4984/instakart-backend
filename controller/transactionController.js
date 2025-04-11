import Product from "../models/Product.js";
import Transaction from "../models/transaction.js";
import { v4 as uuidv4 } from 'uuid'; 

// 📌 Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const { transactionType, page = 1, limit = 10 } = req.query;

    // Build the query object
    const query = { storeID: req.user._id };
    if (transactionType) {
      query.transactionType = transactionType;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const transactions = await Product.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Product.countDocuments(query);

    res.status(200).json({
      data: transactions,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      totalCount,
      statusCode: 200,
      message: "Transactions fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const uniqueID = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const transaction = new Transaction({
      ...req.body,
      transactionID: uniqueID,
    });
    await transaction.save();
    res
      .status(201)
      .json({ statusCode: 201, message: "Product Created Successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📌 Edit a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📌 Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get a single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("variants"); // Populate the variants field
    if (!product) return res.status(404).json({ message: "Product not found" });
    res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    console.log("Searchproductq");
    console.log(query, "query");
    const products = await Product.find({
      userId: req.user.id, // Filter by userId
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

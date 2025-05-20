import Product from "../models/Product.js";
import { Tag } from "../models/Product.js";

// 📌 Get all products
export const getProducts = async (req, res) => {
  try {
    const userType = req.body.userType;
    const businessName = req.body.businessName.replace("-", " ");
    let query = { businessName };
    if (userType === "user") {
      query.status = "active";
    }
    const products = await Product.find(query);
    
    res.status(200).json({
      data: products,
      statusCode: 200,
      message: "Products Fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 📌 Create a new product
export const createProduct = async (req, res) => {
  console.log(req.body, "productbody");
  try {
    // Handle categories as tag names (strings)
    const categoryNames = req.body.categories || [];
    const tagIds = [];
    for (const name of categoryNames) {
      if (!name || typeof name !== "string") continue;
      // Find tag case-insensitively and by userId
      let tag = await Tag.findOne({
        name: { $regex: `^${name}$`, $options: "i" },
        userId: req.user.id,
      });
      if (!tag) {
        tag = await Tag.create({ name, userId: req.user.id });
      }
      tagIds.push(tag._id);
    }
    const product = new Product({
      ...req.body,
      categories: tagIds,
      userId: req.user.id,
      businessName: req.user.businessName,
    });
    await product.save();
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
    res.status(200).json({ message: "Product fetched successfully", product });
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

    res.status(200).json({
      products,
      statusCode: 200,
      message: "Result fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get all tags for a user
export const getTagsByUser = async (req, res) => {
  try {
    // Use req.user.id if authenticated, or req.query.userId for admin access
    const userId = req.user?.id || req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const tags = await Tag.find({ userId });
    res
      .status(200)
      .json({ tags, statusCode: 200, message: "Tags fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

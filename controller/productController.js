import Product from "../models/Product.js";

// 📌 Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 📌 Create a new product
export const createProduct = async (req, res) => {
  console.log(req.body,'body')
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
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
    const product = await Product.findById(req.params.id).populate('variants'); // Populate the variants field
    console.log(product,'product')
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
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
      title: { $regex: query, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

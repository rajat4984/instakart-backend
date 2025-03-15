import Product from "../models/Product.js";

// 📌 Get all products
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;

    // Convert filter values to the appropriate types
    const query = {};
    for (const key in filters) {
      if (
        [
          "price",
          "comparePrice",
          "cost",
          "margin",
          "tax",
          "profit",
          "weight",
          "length",
          "breadth",
          "height",
          "quantity",
        ].includes(key)
      ) {
        query[key] = Number(filters[key]); // Convert to Number
      } else if (key === "status") {
        query[key] = filters[key]; // Direct match for enum fields
      } else if (key === "tags") {
        query[key] = { $in: filters[key].split(",") }; // Match any tag
      } else if (key === "title" || key === "description" || key === "SKU") {
        query[key] = { $regex: filters[key], $options: "i" }; // Case-insensitive search
      }
    }

    // Get paginated results
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Create a new product
export const createProduct = async (req, res) => {
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
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

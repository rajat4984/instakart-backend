const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productImage: { type: String, required: true },
  productName: { type: String, required: true, unique: true }, // Unique constraint added
  productDescription: { type: String },
  productPrice: { type: Number, required: true },
  productSalePrice: { type: Number },
  productQuantity: { type: Number, required: true },
  productCurrentQuantity: { type: Number, default: function () { return this.productQuantity; } } 
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
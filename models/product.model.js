const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  manufacturer: String,

  description: String,

  creationAt: Date,
  createdBy: String,
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;

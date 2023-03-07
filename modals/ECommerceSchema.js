const mongoose = require("mongoose");

// Here we are defining the structure of the document
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
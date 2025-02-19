const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
    },
  ],
  
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: [
    {
      type: String,
    },
  ],
  shopId: {
    type: mongoose.Schema.Types.ObjectId, // Change this to ObjectId
    ref: "Shop", // Reference to Shop model
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

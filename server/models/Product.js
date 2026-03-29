const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Electronics", "Clothing", "Books", "Home", "Sports", "Beauty"],
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/300x300?text=Product+Image",
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: mongoose.Schema.Types.ObjectId,
        comment: String,
        rating: Number,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);

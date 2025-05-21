const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema({
  cpu: String,
  ram: String,
  storage: String,
  screen: String,
  battery: String,
  camera: String,
  operatingSystem: String,
  color: String,
  weight: String,
  connectivity: String,
  others: String,
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "discontinued"],
      default: "active",
    },
    isFeatured: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    images: [{ type: String }],
    specifications: {
      laptop: specificationSchema,
      smartphone: specificationSchema,
      tablet: specificationSchema,
      desktop: specificationSchema,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

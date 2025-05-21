// helpers/productFilterHelper.js
const buildProductFilter = ({
  name,
  priceMin,
  priceMax,
  createdFrom,
  createdTo,
  updatedFrom,
  updatedTo,
  inStock,
  category,
  isFeatured,
  status,
  brand,
}) => {
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (priceMin || priceMax) {
    filter.price = {};
    if (priceMin) filter.price.$gte = parseFloat(priceMin);
    if (priceMax) filter.price.$lte = parseFloat(priceMax);
  }

  if (createdFrom || createdTo) {
    filter.createdAt = {};
    if (createdFrom) filter.createdAt.$gte = new Date(createdFrom);
    if (createdTo) filter.createdAt.$lte = new Date(createdTo);
  }

  if (updatedFrom || updatedTo) {
    filter.updatedAt = {};
    if (updatedFrom) filter.updatedAt.$gte = new Date(updatedFrom);
    if (updatedTo) filter.updatedAt.$lte = new Date(updatedTo);
  }

  if (inStock === "outOfStock") {
    filter.stock = 0;
  } else if (inStock === "lowStock") {
    filter.stock = { $gt: 0, $lt: 10 };
  } else if (inStock === "inStock") {
    filter.stock = { $gte: 10 };
  }

  if (category) {
    filter.category = category; // assume ObjectId from client
  }

  if (typeof isFeatured !== "undefined") {
    filter.isFeatured = isFeatured === "true"; // string to boolean
  }

  if (status) {
    filter.status = status; // e.g., "active", "inactive", etc.
  }

  if (brand) {
    filter.brand = brand; // assume ObjectId or string from client
  }

  return filter;
};

module.exports = { buildProductFilter };

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
  specialTag,
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
    filter.category = category;
  }

  if (specialTag) {
    filter.specialTag = specialTag;
  }

  if (status) {
    filter.status = status;
  }

  if (brand) {
    filter.brand = brand;
  }

  return filter;
};

const buildSortOption = (sortBy) => {
  switch (sortBy) {
    case "active":
      return { price: 1 };
    case "featured":
      return { price: -1 };
    case "new":
      return { sold: -1 };
    case "name_asc":
      return { name: 1 };
    case "bestseller":
      return { name: -1 };
    // case "createdAt_asc":
    //   return { createdAt: 1 };
    // case "createdAt_desc":
    //   return { createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
};

module.exports = { buildProductFilter, buildSortOption };

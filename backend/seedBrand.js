const mongoose = require("mongoose");
const Brand = require("./models/Brand");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

async function seedBrands() {
  await connectDB();

  const brandSeed = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Oppo",
    "Realme",
    "Vivo",
    "OnePlus",
    "Google",
    "Nokia",
    "Sony",
    "Dell",
    "HP",
    "Asus",
    "Acer",
    "Lenovo",
    "MSI",
    "Razer",
    "Microsoft",
    "LG",
    "Anker",
    "Baseus",
    "Ugreen",
    "Logitech",
    "Corsair",
    "Gigabyte",
    "Cooler Master",
    "NZXT",
  ];

  const uniqueBrands = [...new Set(brandSeed)]; // Remove duplicates

  for (const brandName of uniqueBrands) {
    await Brand.findOneAndUpdate(
      { name: brandName },
      { name: brandName },
      { upsert: true, new: true }
    );
    console.log(`✅ Seeded brand: ${brandName}`);
  }

  const allBrands = await Brand.find({});
  console.log(`📦 Tổng số brands hiện tại: ${allBrands.length}`);
  console.log(allBrands.map((b) => b.name).join(", "));

  console.log("✅ Seed brands hoàn tất");

  await mongoose.disconnect();
  console.log("🔌 MongoDB connection closed");
}

seedBrands();

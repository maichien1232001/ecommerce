const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const swaggerConfig = require("./config/swagger");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const cartRoutes = require("./routes/cartRoutes");
const couponRoutes = require("./routes/couponRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
const reportRoutes = require("./routes/reportRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const shippingRoutes = require("./routes/shippingRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const imageRoutes = require("./routes/imageRoutes");
const brandRoutes = require("./routes/brandRoutes");
const provincesRoutes = require("./routes/provincesRoutes");

const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
connectDB();

const app = express();
swaggerConfig(app);
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Cho phép gửi cookie qua CORS
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/cloudinary", imageRoutes);
app.use("/api/address", provincesRoutes);

// Handle lỗi
app.use(errorHandler);

module.exports = app;

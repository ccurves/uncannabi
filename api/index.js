const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const orderRoutes = require("./routes/order.route");
const checkoutRoutes = require("./routes/checkout.route");
const wishlistRoutes = require("./routes/wishlist.route");

const app = express();

require("dotenv").config({
  path: "./config/.env",
});

//Connect to Database
connectDB();

//Use bodyParser
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  })
);

//Config for only development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

  // app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

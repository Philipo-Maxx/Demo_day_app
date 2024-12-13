import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDb } from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/client/auth/User.route.js";
import { productRouter } from "./routes/admin/product.route.js";
import { shopRouter } from "./routes/client/shop/user.shop.route.js";
import { cartRouter } from "./routes/client/shop/cart.shop.route.js";
import { featureRouter } from "./routes/common/feature-route.js";
import { reviewRouter } from "./routes/client/shop/review.shop.route.js";
import { shopOrderRouter } from "./routes/client/shop/order.shop.route.js";
import { addressRouter } from "./routes/client/shop/address.route.js";
import { adminOrderRouter } from "./routes/admin/order.route.js";
import { searchRouter } from "./routes/client/shop/search.shop.route.js";
const app = express();
const port = process.env.PORT_NUMBER || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Authorization",
      "Content-Type",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
connectDb();

// ==============================
//=================================
app.use("/api/v1/auth", authRouter);

//Shop
app.use("/api/v1/shop/products", shopRouter);
app.use("/api/v1/shop/cart", cartRouter);
app.use("/api/shop/review", reviewRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/address", addressRouter);
app.use("/api/shop/search", searchRouter);
//common

app.use("/api/common/feature", featureRouter);

//Admin
app.use("/api/v1/admin/products", productRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.listen(port, () => {
  console.log(`Server running on port number ${port}`);
});

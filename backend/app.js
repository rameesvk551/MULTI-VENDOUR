const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const shop = require("./controller/shop")
const user = require("./controller/user");
const order = require("./controller/order");
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
const product = require("./controller/product");
const ErrorHandler = require("./middleware/error");

const app = express();

// Middleware
// Allow specific origin and credentials
app.use(
    cors({
      origin: "http://localhost:3000", // Explicitly specify your frontend's origin
      credentials: true,              // Allow cookies and credentials
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allow headers used in the request
    })
  );
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}

// Routes
app.use("/api/v2/order",order);
app.use("/api/v2/user",user);
app.use("/api/v2/shop",shop);
app.use("/api/v2/product",product);
app.use("/api/v2/event",event);
app.use("/api/v2/coupon",coupon);


// Error Handling Middleware (must come after routes)
app.use(ErrorHandler);

module.exports = app;

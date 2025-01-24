const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const user = require("./controller/user");
const ErrorHandler = require("./middleware/error");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}

// Routes
app.use("/api/v2",user);

// Error Handling Middleware (must come after routes)
app.use(ErrorHandler);

module.exports = app;

const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  // Set default values for error properties
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID Error
  if (err.name === "CastError") {
    const message = `Resource not found with this ID. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate key: ${Object.keys(err.keyValue).join(", ")} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = "Your URL is invalid. Please try again later.";
    err = new ErrorHandler(message, 400);
  }

  // JWT Expired Error
  if (err.name === "TokenExpiredError") {
    const message = "Your URL has expired. Please try again later.";
    err = new ErrorHandler(message, 400);
  }

  // Send the response
  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};

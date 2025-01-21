const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = error.message || "internalserver error";

  //wromgmongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found with this id ... invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)}Entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "your url is invalid pleae try again later";
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.code === "TokenExpiredError") {
    const message = "Your url is expired pleae try again later";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statuscode).json({
    success: false,
    message: er.message,
  });
};

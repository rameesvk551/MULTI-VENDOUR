const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { userToken } = req.cookies;
  if (!userToken) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(userToken, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY);

  req.seller = await shop.findById(decoded.id);

  next();
});

exports.isAdmin = (...roles) => {
  return (req,res,next) => {
      if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
      };
      next();
  }
}

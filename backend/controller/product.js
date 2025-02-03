const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { fs } = require("fs");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/auth");
const Shop = require("../model/shop");
const Product = require("../model/product");


router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
try {
  const shopId = req.seller._id;
  console.log("shopID", shopId);

  console.log("prrroduct,", req.body);

  const shop = await Shop.findById(shopId);
  if (!shop) {
    return console.log("no seller exist ");
  }

  const files = req.files;
  const imageUrl = files.map((file) => `${file.filename}`);
  const productData = req.body;
  productData.image = imageUrl;
  productData.shop = shop;

  const newProduct = await new Product(productData);
  await newProduct.save();
  const product = newProduct;
  res.status(201).json({
    success: true,
    product,
  });
} catch (error) {
  console.log("error is",error);
  
  
}
  })
);

//get all product of a shop
router.get("get-all-products-shop/:id",catchAsyncErrors,(async(req,res,next)=>{
  try {
    const products= await Product.find({shopId:req.params.id})
    res.status(201).json({
      success:true,
      products
    })
  } catch (error) {
    return next(new ErrorHandler(error,400))
    
  }
}))

module.exports = router;

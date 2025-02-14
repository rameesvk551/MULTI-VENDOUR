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
  isSeller,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("entered");
      
      // ✅ Ensure seller is attached
      const shopId = req.seller?._id;
      if (!shopId) {
        return res.status(404).json({ success: false, message: "Seller not found!" });
      }
      console.log("shopID", shopId);

      console.log("Received product data:", req.body);

      
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return res.status(404).json({ success: false, message: "No seller exists" });
      }

   
      const files = req.files;
      const imageUrl = files.map((file) => file.filename);

    
      const productData = { ...req.body, image: imageUrl, shop: shopId };

      const newProduct = new Product(productData);
      await newProduct.save();

      res.status(201).json({
        success: true,
        product: newProduct,
      });

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  })
)

router.get("/get-all-product-of-shop/:id", catchAsyncErrors( async (req, res, next) => {
  try {
    console.log(" Shop ID:", req.params.id); 
    const products = await Product.find({ shopId: req.params.id });

    console.log(" Products Found:", products);  

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(" Error in Route:", error);  
    return next(new ErrorHandler(error, 400));
  }
}));


router.get("/get-all-products",catchAsyncErrors(async(req,res,next)=>{
  try {
    const allProducts=await Product.find()
  return res.status(200).json({
    success: true,
    allProducts,
  });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
    
  }

}))


module.exports = router;

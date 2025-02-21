const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { fs } = require("fs");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
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

    const products = await Product.find({ shopId: req.params.id });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(" Error in Route:", error);  
    return next(new ErrorHandler(error, 400));
  }
}));


router.get("/get-all-products", catchAsyncErrors(async (req, res, next) => {
  try {
    const allProducts = await Product.find()
    .populate("reviews.user", "name avatar") 
    .populate("shopId");
     console.log("aaaaaaaaal pro",allProducts);
     
    return res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      console.log("revvvvvvvvvvvvvvvvvvi",req.body);
      
      const product = await Product.findById(productId);
  
      const review = {
        user,
        rating,
        comment,
        productId,
      };
      console.log("ppppro founded");
      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        console.log("pushing")
        product.reviews.push(review);
        console.log("pushed");
        
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );
       console.log("reviewed succseefully");
       
      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

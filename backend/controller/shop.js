const express=require("express")
const path=require("path")
const router=express.Router()
const {upload} =require ("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const { fs } = require("fs")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Shop = require("../model/shop")
const { sendShopToken } = require("../utils/jwtToken")
const { isSeller } = require("../middleware/auth")



// create shop
router.post("/create-shop", catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log("req.body...",req.body);
      
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        console.log("checking");
        
        return next(new ErrorHandler("User already exists", 400));
      }
  
      
  
      const newSeller =await  new Shop({
        name: req.body.name,
        email: email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
      });
      console.log("newSeller",newSeller);
      
     await newSeller.save()
     const seller=newSeller
sendShopToken(seller,201,res)
     
        
     
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }));
  
  //load user
router.get("/get-seller",isSeller,catchAsyncErrors(async(req,res,next) =>{
  try {
    console.log("seller",req.seller);
    
    const seller=await Shop.findById(req.seller.id)
    
    if(!seller){
      console.log("not seller");
      
      return next(new ErrorHandler("user doesn't exist",400))
    }
    res.status(200).json({success:true,seller})
  } catch (error) {
    return next(new ErrorHandler(error.message,500))
  }
}))

  module.exports = router
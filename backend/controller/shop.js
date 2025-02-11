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
  


  // login seller
router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log("req.bodyyyyyyyyyyyyy",req.body);
   
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const seller = await Shop.findOne({ email }).select("+password");
          console.log("seller",seller);
          
     
      if (!seller) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }
   console.log("Stored hashed password:", seller.password); // Check if password exists

console.log("password checking ", password, seller.password);

const isPasswordValid = await seller.comparePassword(password);

console.log("password checked"); // If this doesn't log, there's an error in comparePassword
   
      if (!isPasswordValid) {
        console.log("password not matching  ")
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
   console.log("ending token ");
   
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
  //load seller
router.get("/get-seller",isSeller,catchAsyncErrors(async(req,res,next) =>{
  try {
    
    const seller=await Shop.findById(req.seller.id)
    
    if(!seller){
 
      
      return next(new ErrorHandler("user doesn't exist",400))
    }
    console.log("sssssssssss");
    
     return res.status(200).json({success:true,seller})
  } catch (error) {
    console.log(error);
    
    return next(new ErrorHandler(error.message,500))
  }
}))

  module.exports = router
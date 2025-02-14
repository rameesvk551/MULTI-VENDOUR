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
router.post("/create-shop", upload.single("images"), catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log("req.body...",req.body);
      
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        console.log("checking");
        
        return next(new ErrorHandler("User already exists", 400));
      }
  
       // Get uploaded file path
    const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    console.log("creatting");
  
      const newSeller =await  new Shop({
        name: req.body.name,
        email: email,
        password: req.body.password,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
        avatar: filePath,

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

// logout seller

router.delete("/logout",isSeller, catchAsyncErrors(async (req, res, next) => {
  try {
  
    
    res.clearCookie("sellerToken", {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", // Set secure to true in production
      sameSite: "strict"
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}));
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

// update shopinfo
router.put("/update-shop-info", isSeller, catchAsyncErrors(async (req, res, next) => {
 try {
  console.log("Updating seller info:", req.body);

  const { name,
    address,
    zipCode,
    phoneNumber,
    description, } = req.body;


  const seller = await Shop.findById(req.seller.id)

  console.log("shop found:",seller);

  if (!seller) {
    return next(new ErrorHandler("shop not found", 404));
  }

  if (name) seller.name = name;
  if (address) seller.address =address; 
  if (description) seller.description = description;
  if (zipCode) seller.zipCode =zipCode; 
  if (phoneNumber) seller.phoneNumber = phoneNumber;

  await seller.save();

  res.status(200).json({ success: true, message: "Updated successfully", seller});
 } catch (error) {
  console.log(error);
  next(error); 
  
 }
}));

  module.exports = router
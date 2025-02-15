const express=require("express")
const path=require("path")
const router=express.Router()
const {upload} =require ("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const { fs } = require("fs")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Shop = require("../model/shop")
const { sendShopToken, sendUserToken } = require("../utils/jwtToken")
const { isSeller } = require("../middleware/auth")



  // create shop
router.post("/create-shop", upload.single("image"), async (req, res) => {
  try {
 
    if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

   
    const { name, email, password, zipCode, address, phoneNumber } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      console.log("aalready");
      return next(new ErrorHandler("User already exists", 400));
     
      
    }
    const avatarPath = req.file.path;

    const newShop = new Shop({
      name,
      email,
      password,
      zipCode,
      address,
      phoneNumber,
      avatar: avatarPath,
    });
    await newShop.save();
    res.status(201).json({ message: "User created successfully!", user: newUser });
    sendUserToken(user,201,res)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  // login seller
router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
   
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }
      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
   
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
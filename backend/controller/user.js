const express=require("express")
const path=require("path")
const router=express.Router()
const {upload} =require ("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const  User = require("../model/user")
const { fs } = require("fs")
const jwt =require ("jsonwebtoken")
const sendMail = require("../utils/sendMail")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const bcrypt=require("bcrypt")
const sendToken = require("../utils/jwtToken")
const { isAuthenticated } = require("../middleware/auth")
const { log } = require("console")
// create user
router.post("/create-user", async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password, } = req.body;
  
    
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

     const newUser = new User({ name, email, password });
await newUser.save();
const user = await User.findById(newUser._id).select("+password");

sendToken.sendUserToken(user,200,res)



 
    
   
     

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});




// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
   console.log(req.body);
   
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");
      console.log(" user",user)
     
      if (!user) {
        console.log("no user");
        
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      console.log("sending cokie",user);
      
      sendToken.sendUserToken(user,200,res)
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


//load user
router.get("/get-user",isAuthenticated,catchAsyncErrors(async(req,res,next) =>{
  try {
    const user=await User.findById(req.user.id)
    
    if(!user){
      return next(new ErrorHandler("user doesn't exist",400))
    }
    res.status(200).json({success:true,user})
  } catch (error) {
    return next(new ErrorHandler(error.message,500))
  }
}))


//update user 
router.put("/update-user-info",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
   const {password,email,name,phoneNumber}=req.body
  const user=await User.findById({_id:req.user.id})
  if(!user){
    return next(new ErrorHandler("User not found", 404));
    
  }else{
    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
      return next(new ErrorHandler("Invalid password", 401))
      
    }else{

      if(email) user.email=email
      if(name) user.email=email
      if(phoneNumber) user.phoneNumber=phoneNumber
      await user.save()
      res.status(200).json({success:true,message:"updated successfully"})
    }

  }

}))

router.post("/add-address",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
  try {
    console.log("reqqqqqqqqqqqqasrt address",req.body);
    
    const user =await User.findById(req.user.id)
    const {country,city,addres1,address2,zipCode,addressType}=req.body
    if(!user){
      return next(new ErrorHandler("User not found", 404));
      
    }else{
      const isDuplicate=user.addresses.some((adrs)=>
       adrs.country === country &&
      adrs.city === city &&
      adrs.address1===addres1 &&
      adrs.address2 === address2 &&
      adrs.zipCode === zipCode &&
      adrs.addressType ===addressType
    )

    if (isDuplicate){
      return next(new ErrorHandler("This address already exists", 400));
    }

    user.addresses.push({country,city,addres1,address2,zipCode,addressType})
    await user.save()
    console.log("ssssssaved");
    
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
      user
    });

    }

  } catch (error) {
    
  }
}))



router.delete("/delete-address/:addressId",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
  console.log("deleeeeeeting");
  
const {addressId}=req.params
if (!addressId) {
  return res.status(400).json({ message: "Address ID is required" });
}
  const user =await User.findById(req.user.id)
  if(!user){
    return next(new ErrorHandler("User not found", 404));
    
  }else{
    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);
    await user.save();
     console.log("address deleted successfully");
     
    res.status(200).json({ message: "Address deleted successfully", addresses: user.addresses })
  }


  

}))


module.exports = router
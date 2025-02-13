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
router.post("/create-user", upload.single("uploads"), async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file); // Logs file details

    const { name, email, password } = req.body;
    
    // Check if user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }


    // Get uploaded file path
    const filePath = req.file ? req.file.path : null;

    // Create new user with file path
    const newUser = new User({ 
      name, 
      email, 
      password, 
      avatar: filePath, // Save file path in database
    });

    await newUser.save();

    // Fetch the user including password (if needed)
    const user = await User.findById(newUser._id).select("+password");

    // Send token response
    sendToken.sendUserToken(user, 200, res);

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
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

//update user passord 
router.put("/update-user-password",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
  try {
    console.log("updating pasword",req.body);
    const {oldPassword,newPassword,confirmPassword}=req.body
    const user = await User.findById(req.user.id).select("+password");
 
    console.log("User found:", user);
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    if (!oldPassword) {
      return next(new ErrorHandler("Password is required", 400));
    }
    if ( newPassword !== confirmPassword) {
      return next(new ErrorHandler("Password not matching", 400));
    }
  
    console.log("Checking password...");
    const isPasswordValid = await user.comparePassword(oldPassword);
    console.log("Password checked:", isPasswordValid);
  
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid password", 401));
    }

    user.password = newPassword
    await user.save()
     console.log("new password aved");
     res.status(200).json({
      success:true,message:"Password updated successfully"
     })
     
  } catch (error) {
    return next(new ErrorHandler("internal server error", 500));
  }
}))






//update user 
router.put("/update-user-info", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  console.log("Updating user info:", req.body);

  const { password, email, name, phoneNumber } = req.body;


  const user = await User.findById(req.user.id).select("+password");

  console.log("User found:", user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!password) {
    return next(new ErrorHandler("Password is required", 400));
  }

  console.log("Checking password...");
  const isPasswordValid = await user.comparePassword(password);
  console.log("Password checked:", isPasswordValid);

  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid password", 401));
  }

  // Update user fields if provided
  if (email) user.email = email;
  if (name) user.name = name;  // Fixed incorrect assignment
  if (phoneNumber) user.phoneNumber = phoneNumber;

  await user.save();

  res.status(200).json({ success: true, message: "Updated successfully", user });
}));


//add address
router.post("/add-address",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
  try {

    
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
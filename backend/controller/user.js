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
// user register
router.post("/create-user",upload.single("file"), async (req,res,next)=>{
try {
  const {name,email,password}=req.body
  const userEmail=await User.findOne({email})
 
  if (userEmail) {
    const filename=req.file.filename
    const filePath=`uploads/${filename}`
    fs.unlink(filePath,(err)=>{
      if(err){
        console.log(err);
        res.status(500).json({message:"Error deleting file"})
        
      }
    })
    return json({userAlreadyExist:true,message:"user already exist"})
  }
 console.log("user not existtts");
 
  const hashedPassword= await bcrypt.hash(password,10)
  const filename=req.file.filename || "avator"
  const fileUrl=path.join(filename)


  const  newUser= new User({
      name:name,
      email:email,
      password:hashedPassword,
      avator:fileUrl | "avator.png"
  })
  console.log("new uer",newUser);
  
     
  const activationToken=createActivationToken(newUser.toObject())
  console.log("activatin url creaing");
 
  const activationUrl=`http://localhost:3000/activation/${activationToken}`
 
 
  try {
    await sendMail({
      email:newUser.email,
      subject:"activate your account",
      message:`hallo ${newUser.name} please click on the link to activate your account :${activationUrl}`
    })

    res.status(201).json({
      success:true,
      message:`please check your mail :- ${newUser.email} to activate your account`
    })
    
  } catch (error) {
    console.log("error in sending mail");
    
    return next(new ErrorHandler(error.message))
  }
  


} catch (error) {

  return next(new ErrorHandler(error.message,400))
}


})

// create activation token 
const createActivationToken = (payload) => {
  try {
    console.log("Creating JWT...");
    return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  } catch (error) {
    console.error("Error creating activation token:", error);
    throw new Error("Failed to generate activation token");
  }
};



//activate user
router.post("/activation",catchAsyncErrors(async(req,res,next)=>{
  try {
    console.log(req.body);
    const {activationToken} =req.body
    const user=jwt.verify(activationToken,process.env.ACTIVATION_SECRET)
    if(!user){
      return next(new ErrorHandler("invalid token",400))
    }
    const {name,email,password,avator}=user
    const newUser=new User({
      name,
      email,
      password,
      avator
    })
   await  newUser.save()
   sendToken(user,201,res)
  } catch (error) {
    return next(new ErrorHandler(error.message,500))
  }
}))


//user login
router.post("/login",async(req,res,next)=>{
  
  
 const  {email,password}=req.body
 try {
  const user= await User.findOne({email})

if(!user){
  console.log("no user found");
  
  return res.json({notExist:true,message:"user not exist"})
}
const isPasswordCorrect = await bcrypt.compare(password,user.password)
if(!isPasswordCorrect){
  return json({passwordNotMatch:true,message:"password not match"})
}
res.json({succes:true,user,message:"user loged in successfully"})
  
 } catch (error) {
  return next(new ErrorHandler(error.message,400))
 }


})







module.exports = router
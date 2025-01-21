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

// uer register
router.post("/create-user",upload.single("file"), async (req,res,next)=>{
try {
  console.log(req.body);
  const {name,email,password,conformPassword}=req.body
  
  console.log(req.body);
  
  const userEmail=await User.findOne({email})
  const checkPassword= password === conformPassword

 
  if (userEmail) {
    const filename=req.file.filename
    const filePath=`uploads/${filename}`
    fs.unlink(filePath,(err)=>{
      if(err){
        console.log(err);
        res.status(500).json({message:"Error deleting file"})
        
      }else{
        res.json({mesage:"file deleted successfully"})
      }
    })
    return  next(new ErrorHandler("user already exist ",400))
  }

  const filename=req.file.filename || "avator"
  const fileUrl=path.join(filename)


  const  newUser= new User({
      name:name,
      email:email,
      password:password,
      avator:fileUrl
  })
      
  const activationToken=createActivationToken(newUser)

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
    return next(new ErrorHandler(error.message))
  }
  
await newUser.save()
res.status(201).json({success:true,newUser})

} catch (error) {

  return next(new ErrorHandler(error.message,400))
}


})

// create activation token 
const createActivationToken=(user)=>{
   return jwt.sign(user,process.env.ACTIVATION_SECRET,{
    expiresIn:"5m"
   })
}


//activate user
router.post("/activation",catchAsyncErrors(async(req,res,next)=>{
  
}))


//user login
router.post("/login",async(req,res,next)=>{
  
  
 const  {email,password}=req.body
 try {
  const user= await User.findOne({email})
const isPasswordCorrect = password === user.password
if(!user){
  return console.log("user not exist")
}
if(!isPasswordCorrect){
  return console.log("incorrect password")
}
res.json({succes:true,user})
  
 } catch (error) {
  return next(new ErrorHandler(error.message,400))
 }


})







module.exports = router
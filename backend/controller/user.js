const express=require("express")
const path=require("path")
const router=express.Router()
const {upload} =require ("../multer")
const ErrorHandler = require("../utils/ErrorHandler")
const  User = require("../model/user")
const { fs } = require("fs")

router.post("/create-user",upload.single("file"), async (req,res,next)=>{
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
        
    console.log(newUser);
    
 await newUser.save()

 res.status(201).json({success:true,newUser})


})










module.exports = router
const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");



router.post("/create-coupon-code",catchAsyncErrors(async(req,res,next)=>{
    try {
        console.log("creattttttttttting coupn cooooooode",req.body);
      const coupon=await CouponCode.findOne({name:req.body.name})
      if(coupon){
        return  console.log("coupon code exist");
        
      }else{
        console.log("creaaaaaaaating");
        const newCoupon=await new CouponCode(req.body)
        console.log("creaaaaaaaated");
        
        await newCoupon.save()
        console.log("new coupon aved");
       return   res.status(201).json({
            message:"coupon created successfully"
        })
        
      }
        
    } catch (error) {
        console.log("error occured");
        
        
    }
}))


//getting coupons

router.get("/get-coupon/:id",catchAsyncErrors(async(req,res,next)=>{
    console.log("idddddddddd",req.params.id);

    
const coupons=await CouponCode.find({shopId:req.params.id})
   console.log("Coupons finded");
   
if(!coupons){
    console.log(" no coupons exit");
    
    return res.status(404).json({
        success:false,
        message :"no Coupon code exist"
    })
}else{
    console.log("Coupons finded sending ");
    return res.status(200).json({
        success:true,
       coupons

})}
   
}))
module.exports = router

//delete coupon
router.delete("/delete-coupon/:id",catchAsyncErrors(async(req,res,next)=>{
    const coupon=await CouponCode.findOneAndDelete({_id:req.params.id})
     console.log("coupon code deleted successfully");
     
  return   res.status(200).json({success:true,message:"coupon deleted successfully"})

}))


//applying coupon code for user
 // get coupon code value by its name
router.get(
    "/get-coupon-value/:name",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const couponCode = await CouponCode.findOne({ name: req.params.name });
  
        res.status(200).json({
          success: true,
          couponCode,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );
  
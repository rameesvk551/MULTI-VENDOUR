const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/auth");
const Shop = require("../model/shop");
const Product = require("../model/product");
const Event = require("../model/event");


//create vent
router.post(
  "/create-event",
  upload.array("images"),
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("eveeeeeeeent", req.body);
      const shopId = req.seller.id;

      const shop = await Shop.findById({ _id: shopId });
      if (!shop) {
        return console.log("no shop exists");
      }

      const files = req.files || []; // Ensure files is an array
      const imageUrls = files.map((file) => file.filename); 

      const eventData = req.body;
      eventData.images = imageUrls; // Fix the assignment
      eventData.shop = shop;

      const event = new Event(eventData);
      await event.save();

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  })
);

//getting all event of a hop
router.get("/get-all-events-of-shop/:id",catchAsyncErrors(async(req,res,next)=>{
  const events=await  Event.find({shopId:req.params.id}) 
  console.log("UUUUUUUUUUUUUUU");
  
if (!events.length) {
  return res.status(404).json({ success: false, message: "No events found for this shop" });
}
 console.log("finded events",events);
 
res.status(200).json({ success: true, count: events.length, events });

}))

//
//delete coupon
router.delete("/delete-shop-event/:id",catchAsyncErrors(async(req,res,next)=>{
    const coupon=await Event.findOneAndDelete({_id:req.params.id})
     console.log("event deleted successfully");
     
  return   res.status(200).json({success:true,message:"event deleted successfully"})

}))

//get all events

router.get("/get-all-events",catchAsyncErrors(async(req,res,next)=>{
 try {
  const allEvents=await  Event.find() 
  console.log("UUUUUUUUUUUUUUU",allEvents);
  
if (!allEvents.length) {
  return res.status(404).json({ success: false, message: "No events found " });
}
 console.log("finded events");
 
res.status(200).json({ success: true, count: allEvents.length, allEvents});
 } catch (error) {
  
 }

}))
module.exports = router;

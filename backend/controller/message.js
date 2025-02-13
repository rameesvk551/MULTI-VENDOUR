const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const  Conversation = require("../model/conversation");
const Messages = require("../model/messages");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const express=require("express")
const router=express.Router()

//create new message
router.post("/create-new-message",upload.array("images") ,catchAsyncErrors(async(req,res,next)=>{
    try {
        const messageData=req.body
       if(req.files) {
        const files=req.files
        const imageUrls=files.map((file)=> `${file.fileName}`)
        messageData.images=imageUrls
       }


       messageData.conversatonId=req.body.Conversation
       messageData.sender=req.body.sender


const message=new Messages({
    conversationId:messageData.conversationId,
    sender:messageData.sender,
    images:messageData.images ?   messageData.images :undefined

})
await message.save()
res.status(200).json({
    success:true,
    message,
});
    } catch (error) {
        return next(new ErrorHandler(error.response.message)) 
    }
}))

module.exports=router
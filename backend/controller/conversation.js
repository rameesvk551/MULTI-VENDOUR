const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const  Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const express=require("express")
const router=express.Router()



//create new conversation 

router.post("/create-new-conversation",isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
        const {groupTitle,userId,sellerId}=req.body
        const  isConversationExist=await Conversation.findOne({groupTitle})

        if(isConversationExist){
            const conversation=isConversationExist
            res.status(200).json({success:true,conversation})
        }
        else{
            const conversation = await new Conversation({
                members:[userId,sellerId],
                groupTitle:groupTitle
            })
            res.status(201).json({
                success:true,
                conversation
            })

        }
    } catch (error) {
        return next(new ErrorHandler(error.response.message))
        
    }
}))


//get seller conversation 
router.get("/get-all-converation-seller/:sellerId",isSeller,catchAsyncErrors,(async(reqres,next)=>{
   try {
    const conversations=await Conversation.find({members:{
        $in:[req.params.sellerId],}
    }).sort({updatedAt: -1 ,createdAt:-1})

res.status(200).json({
    success:true,
    conversations
})
   } catch (error) {
    return next(new ErrorHandler(error.response.message))
   }
}))


module.exports = router
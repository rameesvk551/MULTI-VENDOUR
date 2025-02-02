//create token and aving to cookies



const sendToken=(user,statusCode,res)=>{ 
    const token =user.getJwtToken()
        
    //options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    })

}
const sendShopToken=(seller,statusCode,res)=>{ 
    console.log(seller,statusCode);
    
   try {
    const token =seller.getJwtToken()
    console.log("tokkken",token);
    
//options for cookies
const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  console.log("options setted");
  
res.status(statusCode).cookie("sellerToken",token,options).json({
    success:true,
    seller,
    token,
})
   } catch (error) {
    console.log("error",error);
    
   }

}

module.exports={sendToken,sendShopToken}
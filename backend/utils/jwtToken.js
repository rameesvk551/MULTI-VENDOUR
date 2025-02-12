//create token and aving to cookies



const sendUserToken=(user,statusCode,res)=>{ 
    console.log(user,statusCode);
    
   try {
    const token =user.getJwtToken()
    console.log("tokkbbrgrfrken",token);
    
//options for cookies
const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  console.log("options setted");
  
res.status(statusCode).cookie("userToken",token,options).json({
    success:true,
    user,
    token,
})
   } catch (error) {
    console.log("error",error);
    
   }

}

const sendShopToken=(seller,statusCode,res)=>{ 
    console.log(seller,statusCode);
    
   try {
    const token =seller.getJwtToken()
    console.log("tokkbbrgrfrken",token);
    
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

module.exports={sendShopToken,sendUserToken}
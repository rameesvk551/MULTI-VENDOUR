const socketIo=require("socket.io")
const http=require("http")
const express=require("express")
const cors=require("cors")
const app=express()
const server=http.createServer(app)
require("dotenv").config({
    path:"./.env"
})
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hako")
})

let users=[]
const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId === userId && users.push({userId,socketId}))
}

const removeUser=(socketId)=>{
    users=users.filter((user)=> user.senderId !== socketId)
}
const getUser=(recieverId)=>{
    return users.find((user)=>user.userId === recieverId)
}

//define a mesage object with a seen proprerty

const createMessage=({senderId,recieverId,text,images})=>({
    senderId,recieverId,text,images,seen:false
})



io.on("connection",(socket)=>{
    //when connect
    console.log("a user is connected");

    //take userId and socketid from user
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })

    //send and get message
    const messages={} //object to track messagh

    socket.on("sendMessage",({senderId,recieverId,text,images})=>{
        const message =createMessage ({senderId,recieverId,text,images});
        const user=getUser(recieverId)

        //store the messages in messsages object 
        if(!messages [recieverId]){
            messages[recieverId]=message
        }else{
            
        }
    })
    
})

server.listen(process.env.PORT || 2000,()=>{
    console.log(`server is running on ${process.env.PORT || 2000}`);
    
})
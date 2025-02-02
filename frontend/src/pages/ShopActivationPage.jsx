import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server'

const ShopActivationPage= () => {
    const {activationToken}=useParams()
    const [error,setError]=useState(false)
    useEffect(()=>{
        if(activationToken){
           const activationEmail=async () =>{
          
               const res=await axios.post(`${server}/shop/activation`,{
                activationToken
               }).then((res)=>{
                console.log(res);
                
               }).catch((err)=>{
                setError(true)
               })
              
               
            
           }
           activationEmail()
        }

    },[])
  return (
    <div style={{
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}>
      {
        error ? (
            <p>Your Token is Expired</p> 
        ):(
            <p>your account ha been created successfully</p>
        )
      }
    </div>
  )
}

export default ShopActivationPage

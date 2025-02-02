import React, { useEffect, useState } from 'react'
import ProductDetails from '../components/products/ProductDetails';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import SuggestedProduct from '../components/products/SuggestedProduct';

const ProductDetailsPage = () => {
  const {name}=useParams()
  const productName=name.replace(/-/g," ")

  
  const [data,setData]=useState(null)
  useEffect(()=>{
    const data =productData.find((i)=> i.name === productName)
    setData(data)
    console.log("dataaaaaaaa",data);
  },[])
 
  
    return (
        <div>
          <Header/>
        <ProductDetails data={data} />
       
          <Footer />
        </div>
      );
}

export default ProductDetailsPage

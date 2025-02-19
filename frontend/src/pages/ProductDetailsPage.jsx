import React, { useEffect, useState } from 'react'
import ProductDetails from '../components/products/ProductDetails';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import SuggestedProduct from '../components/products/SuggestedProduct';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const { allProducts, isProductsLoading } = useSelector((state) => state.products);
  const {id}=useParams()
  const [data,setData]=useState(null)
  useEffect(() => {
   
      const product = allProducts.find((i) => i._id === id );
      setData(product);
  ;
    
  }, []);
 
  
    return (
        <div>
          <Header/>
        <ProductDetails data={data} />
       
          <Footer />
        </div>
      );
}

export default ProductDetailsPage

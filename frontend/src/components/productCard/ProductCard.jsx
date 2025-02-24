import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/style'
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHdd, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai'
import ProductDetailsCard from '../productDetailsCard/ProductDetailsCard'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/actions/cart'

const ProductCard = ({data}) => {
 const dispatch=useDispatch()
     const addToCartHandler=(id)=>{
    
        const isItemExist =cart && cart.find((i) => i._id === id)
        if(isItemExist){
          alert("item alread exist in cart")
        }else{
          
              const cartData={...data,qty:1}
              dispatch(addToCart(cartData))
              alert("addded to cart uccessfully ")
            }
        }
    
      
    

    
    const {cart}=useSelector((state)=> state.cart)
const[click,setClick]=useState(false)
const[open,setOpen]=useState(false)
    const d=data.name
    const product_name=d.replace(/\s+/g, "-")
  return (
   <>
    <div className='h-[370px] w-full bg-white rounded-lg  shadow-sm p-3 relative cursor-pointer' >
        <div className='flex justify-end'>

        </div>
<Link to={`/product/${data._id}`}>
<img src={data?.images} alt="" 
className='w-full h-[170px] object-contain' />
</Link>
<Link to="/">
<h5 className={`${styles.shop_name}`}>{data?.shopId?.name}</h5>
</Link>

<Link to={`/product/${data._id}`}>
<h4 className='pb-3 font-[500]'>
    {data.name.length >40 ? data.name.slice(0,40) + "..." : data.name}
</h4>

<div className="flex">
    <AiFillStar className="mr-2 cursor-pointer"  color='#f6BA00'size={20}/>
    <AiFillStar className="mr-2 cursor-pointer"  color='#f6BA00' size={20}/>
    <AiFillStar className="mr-2 cursor-pointer"  color='#f6BA00' size={20}/>
    <AiFillStar className="mr-2 cursor-pointer"  color='#f6BA00' size={20}/>
    <AiOutlineStar  className="mr-2 cursor-pointer"  color='#f6BA00' size={20}/>
</div>

<div className="flex py-2 items-center justify-between">
    <div className="flex">
        <h5 className={`${styles.productDiscountPrice}`}>
            {data.discountPrice === 0  ? data.OrginalPrice : data.discountPrice}
            $
        </h5>
        <h4 className={`${styles.price}`}>
            {data.originalPrice ? data.originalPrice + "$" :null}
        </h4>
    </div>

    <span className='font-[400] text-[17px] text-[#68d284]'>
        {data.sold_out}sold
    </span>
</div>
</Link>
{/*side options*/}
<div>
    {click ? (
        <AiFillHeart size={22} className='cursor-pointer absolute right-2 top-5'
        onClick={()=>setClick(!click)}
        color={ click ? "red" : "#333" }
        title='remove from wishlist '/>
    ): (
        <AiOutlineHeart size={22} className='cursor-pointer absolute right-2 top-5'
        onClick={()=>setClick(!click)}
        color={ click ? "red" : "#333" }
        title='Quick view '/>
    )
    }

<AiOutlineEye size={22} className='cursor-pointer absolute right-2 top-14'
        onClick={()=>setOpen(!open)}
        color="#333"
        title='remove from wishlist '/>
        
<AiOutlineShoppingCart
 size={25} className='cursor-pointer absolute right-2 top-24'
        onClick={()=>setOpen(!open) ||addToCartHandler(data) }
        color="#444"
        title='Add to cart '/>


        { open ? (
            <ProductDetailsCard open={open} setOpen={setOpen} data={data}  />
        ): null}
</div>

      
    </div>
   </>
  )
}

export default ProductCard

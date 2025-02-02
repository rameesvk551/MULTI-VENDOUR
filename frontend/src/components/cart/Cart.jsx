import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

import { Link } from "react-router-dom";
import styles from "../../styles/style";


const Cart = ({ setOpenCart }) => {

    const cartData=[
        {
            name:"Iphone 13 pro max 256 gb ssd and 8 gb ram silvor color",
            dicription:"hg35bvre",
            price:2400,
        },
        {
            name:"Iphone 14 pro max 256 gb ssd and 8 gb ram silvor color",
            dicription:"hg35bvre",
            price:2200,
        },
        {
            name:"Iphone 16 pro max 256 gb ssd and 8 gb ram silvor color",
            dicription:"hg35bvre",
            price:2400,
        }

    ]
 // const { cart } = useSelector((state) => state.cart);
  //const dispatch = useDispatch();

  //const removeFromCartHandler = (data) => {
 //   dispatch(removeFromCart(data));
 // };

 // const totalPrice = cart.reduce(
//(acc, item) => acc + item.qty * item.discountPrice,
  //  0
  //);

 // const quantityChangeHandler = (data) => {
 //   dispatch(addTocart(data));
 // };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
   
          {/*<div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>*/}
    
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                    2 items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {
                    cartData && cartData.map((i,index)=>(
                        <CartSingle key={index} data={i}/>
                    ))
                }
              
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD$ 10000)
                  </h1>
                </div>
              </Link>
            </div>
          </>
       
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value,setvalue]=useState(1)
  const totalPrice =data.price * value
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
           onClick={()=>setvalue(value + 1)} 
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
           onClick={()=>setvalue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img  
        src="https://bonik-react"
          alt="image"
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.price} x {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US$ {totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
         
        />
      </div>
    </div>
  );
};

export default Cart;

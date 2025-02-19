import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import axios from "axios";
import { addToCart } from "../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { getAllProductsShop } from "../../redux/actions/product";
import Ratings from "./Ratings";

const ProductDetails = ({ data }) => {

  console.log("producccccccct daata",data);
  
  const dispatch =useDispatch()
  const {cart} = useSelector((state) => state.cart);
  const {wishlist} = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shopId._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCartHandler=(id)=>{

    const isItemExist =cart && cart.find((i) => i._id === id)
    if(isItemExist){
      alert("item alread exist in cart")
    }else{
        if(data.stock < count){
       alert("product stock limited")
        }else{
          const cartData={...data,qty:count}
          dispatch(addToCart(cartData))
          alert("addded to cart uccessfully ")
        }
    }

  }
  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };


  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/converation/create-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/conversation/${res.data.conversation._id}`);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } else {
      alert("please login");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.image}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  <div
                    className={`${select === 0 ? "border" : ""} cursor-pointer`}
                  >
                    <img
                      src={`${data.images}`} 
                      alt=""
                      className="h-[200px] overflow-hidden mr-3 mt-3"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${select === 1 ? "border" : ""} cursor-pointer`}
                  >
                    <img
                      src={`${backend_url}${data.image}`} 
                      alt=""
                      className="h-[200px] overflow-hidden mr-3 mt-3"
                      onClick={() => setSelect(1)}
                    />
                  </div>

                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  ></div>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                        onClick={()=>removeFromWishlistHandler(data._id)}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                        onClick={()=>addToWishlistHandler(data._id)}
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={()=>addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shopId?._id}`}>
                   
                      <img
                  src={`${backend_url}${data.shopId.avatar}`}
                  className="w-[50px] h-[50px] rounded-full mr-2"
                  alt=""
                />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shopId?._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>{data.shopId.name}</h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                     15 Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    // onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <ProductDetailsInfo data={data} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
           {data?.description}
          </p>
        </>
      ) : null}

{active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={item.rating} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to="/">
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data.shopId.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shopId.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({data.shop.ratings}) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">
             {data.shopId.description}
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">{data.shopId.createdAt?.slice(0, 10)} </span>
              </h5>
             
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">556</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

//add to cart

export const addToCart = (data) => async (dispatch) => {
    dispatch({
      type: "addToCart",
      payload: data
    });
    return data;
  };
  


//remove from cart

export const removeFronCart =(data)=> async(dispatch,getState)=>{
    dispatch({
        type:"removeFromCart",
        payload:data._id

    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cart))
    return data
}
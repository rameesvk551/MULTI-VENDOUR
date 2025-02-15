import { createReducer } from "@reduxjs/toolkit";

const initialState = {
cart:localStorage.getItem("artItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("addToCart", (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i._id === item._id);
  
    if (isItemExist) {
      state.cart = state.cart.map((i) =>
        i._id === isItemExist._id ? item : i
      );
    } else {
      state.cart = [...state.cart, item];
    }
  
    // ✅ Update localStorage after modifying state
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
  })
  
    .addCase("removeFromCart", (state,action) => {
   return {
   ...state,
   cart:state.cart.filter((i)=>i._id !== action.payload)}

    })

})
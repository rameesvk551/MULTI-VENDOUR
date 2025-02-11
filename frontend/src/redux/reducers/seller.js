import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
  seller: null,
  error: null,
};

export const SellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
   
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.seller = action.payload;
      state.isSeller = !!action.payload; // Convert to boolean
      state.isLoading = false;
    })
    .addCase("LoadSellerFail", (state, action) => {
    
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    .addCase("ClearErrors", (state) => {
     
      state.error = null;
    });
});

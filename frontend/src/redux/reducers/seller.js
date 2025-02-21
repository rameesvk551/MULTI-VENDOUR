import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
  seller: null,
  error: null,
  sellers:[]
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
    .addCase("getAllSellersRequest", (state) => {
   
      state.isLoading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.sellers = action.payload;
      state.isLoading = false;
    })
    .addCase("getAllSellersFailed", (state, action) => {
    
      state.isLoading = false;
      state.error = action.payload;
      state.sellers = null;
    })
    .addCase("ClearErrors", (state) => {
     
      state.error = null;
    });
});

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequst", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })


  // for getting all products of a hop
  .addCase("getAllProductsOfShopRequst", (state) => {
    state.isLoading = true;
  })
  .addCase("getAllProductsOfShopSuccess", (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  })
  .addCase("getAllProductsOfShopFail", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

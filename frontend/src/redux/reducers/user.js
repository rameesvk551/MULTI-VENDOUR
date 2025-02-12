import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading:true,
};
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
         
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      console.log("action.payloaaaaad",action.payload,);

    })
    .addCase('LoadUserFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('UpdateUserInfoRequest', (state) => {
      state.loading = true;
    })
    .addCase('UpdateUserInfoSuccess', (state, action) => {
         
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      console.log(" updated action.payloaaaaad",action.payload,);

    })
    .addCase('UpdateUserInfoFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
   
    })
    .addCase('AddAddressRequest', (state) => {
      state.loading = true;
    })
    .addCase('AddAddressSuccess', (state, action) => {
         
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      console.log(" address .payloaaaaad",action.payload,);

    })
    .addCase('AddAddressFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
  
    })

    .addCase('DeleteAddressRequest', (state) => {
      state.loading = true;
    })
    .addCase('DeleteAddressSuccess', (state, action) => {
         
      state.isAuthenticated = true;
      state.loading = false;
      state.user=action.payload.user
      state.message = action.payload.message;
      console.log(" delete adress .payloaaaaad",action.payload,);

    })
    .addCase('DeleteAddressFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
  
    })
    .addCase('ClearErrors', (state) => {
      state.error = null;
    });
});


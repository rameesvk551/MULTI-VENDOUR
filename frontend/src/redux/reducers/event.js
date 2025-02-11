import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  event:null,
  events:null
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequst", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })


  // for getting all event  of a hop
  .addCase("getAllEventsOfShopRequst", (state) => {
    state.isLoading = true;
  })
  .addCase("getAllEventOfShopSuccess", (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
    state.success = true;
  })
  .addCase("getAllEventOfShopFail", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  })

  //delete  product
  .addCase("deleteEventRequst", (state) => {
    state.isLoading = true;
  })
  .addCase("deleteEventSuccess", (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
    state.success = true;
  })
  .addCase("deleteEventFail", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

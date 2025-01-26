import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; 
import { userReducer } from "./reducers/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add thunk explicitly if needed
});

export default store;

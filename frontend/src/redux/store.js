import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { SellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";


const store = configureStore({
  reducer: {
    user: userReducer,
    seller: SellerReducer,
    products: productReducer,
    events:eventReducer,
    cart:cartReducer,
    wishlist:wishlistReducer,
    order:orderReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enables DevTools in development
});

export default store;

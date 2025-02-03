import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  ActivationPage,
  BestSellingPage,
  ProductDetailsPage,
  EventPage,
  HomePage,
  LoginPage,
  ProductsPage,
  SignupPage,
  ShopCreatePage,
  ShopActivationPage,
} from "./ROUTES/Routes";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server";
import store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ROUTES/ProtectedRoutes";
import { TbShoppingBagDiscount } from "react-icons/tb";
import { ShopAllProducts, ShopCreateProduct, ShopDashbordPage } from "./ROUTES/ShopRoutes";
import SellerProtectedRoute from "./ROUTES/SellerProtectedRoute";

//import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(loadUser());  
    dispatch(loadSeller());
  }, [dispatch]);
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  // chech isseller and also destructure seller from tore and if seller navigate to seller profile
  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/activation/:activationToken"
              element={<ActivationPage />}
            />
            <Route
              path="/shop/activation/:activationToken"
              element={<ShopActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  {" "}
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  {" "}
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route
              path="/dashbord"
              element={
              
                  <ShopDashbordPage />
              
              }
            />
              <Route
              path="/dashbord-create-product"
              element={
              
                  <ShopCreateProduct/>
                
            
              }
              
            />

<Route
              path="/dashbord-products"
              element={
              
                  <ShopAllProducts/>
                
            
              }
              
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;

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
  ShopHomePage,
  CheckoutPage,
} from "./ROUTES/Routes";
import { useEffect } from "react";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ROUTES/ProtectedRoutes";
import {
  ShopAllCoupouns,
  ShopAllEvents,
  ShopAllProducts,
  ShopCreateEvents,
  ShopCreateProduct,
  ShopDashbordPage,
  ShopInboxPage,
  ShopLoginPage,
  ShopSettingsPage,
} from "./ROUTES/ShopRoutes";
import SellerProtectedRoute from "./ROUTES/SellerProtectedRoute";
import { getAllEvents } from "./redux/actions/event";

//import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSeller());
    dispatch(getAllEvents());
    dispatch(loadUser());
    dispatch(loadSeller());
    dispatch(loadUser());
  }, [dispatch]);

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, seller, isSeller } = useSelector((state) => state.seller);

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
            <Route path="/shop" element={<EventPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}isLoading={loading}>
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
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />

            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route
              path="/dashboard"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  {""}
                  <ShopDashbordPage />
                </SellerProtectedRoute>
              }
            />
               <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
            <Route
              path="/dashbord-create-product"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              }
            />

            <Route
              path="/dashboard-create-event"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  <ShopCreateEvents />
                </SellerProtectedRoute>
              }
            />
                <Route
              path="/dashboard-events"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  <ShopAllEvents/>
                </SellerProtectedRoute>
              }
            />

<Route
              path="/dashboard-coupouns"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  <ShopAllCoupouns/>
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  <ShopSettingsPage/>
                </SellerProtectedRoute>
              }
            />
{/**<Route
              path="/dashboard-messages"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  <ShopInboxPage/>
                </SellerProtectedRoute>
              }
            /> */}

            <Route path="/dashboard-products" element={<ShopAllProducts />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;

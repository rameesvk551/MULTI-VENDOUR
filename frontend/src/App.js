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
  PaymentPage,
  OrderSuccessPage,
  TrackOrderPage,
  OrderDetailsPage,
  AdminDashboardWithdraw,
  AdminDashboardSellers,
  AdminDashboardUsers,
  AdminDashboardPage,
  AdminDashboardOrders,
  AdminDashboardProducts,
  AdminDashboardEvents,
} from "./ROUTES/Routes";
import { useEffect } from "react";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ROUTES/ProtectedRoutes";
import {
  ShopAllCoupouns,
  ShopAllEvents,
  ShopAllOrders,
  ShopAllProducts,
  ShopCreateEvents,
  ShopCreateProduct,
  ShopDashbordPage,
  ShopInboxPage,
  ShopLoginPage,
  ShopOrderDetails,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
} from "./ROUTES/ShopRoutes";
import SellerProtectedRoute from "./ROUTES/SellerProtectedRoute";
import { getAllEvents } from "./redux/actions/event";
import { getAllProducts, getAllProductsShop } from "./redux/actions/product";
import Loader from "./components/Layout/Loader";
import ProtectedAdminRoute from "./ROUTES/ProtectedAdminRoute";

//import { useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const { isLoading, seller, isSeller } = useSelector((state) => state.seller);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(loadSeller());
    dispatch(getAllEvents());
    dispatch(loadUser());
  }, [dispatch]);
  
  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

 console.log("dddddddddataaaaaaa",allProducts);
 
  return (
    <>
      {loading ? <Loader/> : (
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
            <Route path="/product/:id" element={<ProductDetailsPage />} />
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
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute  isSeller={isSeller} isLoading={isLoading}>
              <ShopWithDrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
                 <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderDetailsPage />
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
               <Route
              path="/payment"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  {" "}
                  <PaymentPage />
                </ProtectedRoute>
              }
            />

<Route path="/order/success" element={<OrderSuccessPage />} />


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
              path="/dashboard-orders"
              element={
                <SellerProtectedRoute isSeller={isSeller} isLoading={isLoading}>
                  {""}
                  <ShopAllOrders />
                </SellerProtectedRoute>
              }
            />
                <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute  isSeller={isSeller} isLoading={isLoading}>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
            
            <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
          <Route
          path=""
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
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


            <Route path="/dashboard-products" element={<ShopAllProducts />} />
             {/* Admin Routes */}
                {/* Admin Routes */}
                <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;

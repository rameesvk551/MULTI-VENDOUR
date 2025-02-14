import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ isSeller, isLoading, children }) => {


  if (isLoading) {
    console.log("loading");
    
    return <Loader/> // Show a loading indicator
  }

  if (!isSeller) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;

  



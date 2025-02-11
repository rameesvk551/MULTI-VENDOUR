import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ isSeller, isLoading, children }) => {
  console.log("is seller", isSeller ,"isloadibf",isLoading);

  if (isLoading) {
    console.log("loading");
    
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!isSeller) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;

  



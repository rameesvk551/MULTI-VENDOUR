
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import { useSelector } from "react-redux";


const SellerProtectedRoute = ({ children }) => {
    /*
    const { seller, isSeller, isLoading } = useSelector((state) => state.seller);
  console.log("sellllllllller",seller,isSeller);
  
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
  }*/
};
export default SellerProtectedRoute;


import { Navigate } from "react-router-dom"
import Loader from "../components/Layout/Loader"

const ProtectedRoute=({isAuthenticated,isLoading,children})=>{
    console.log("is user", isAuthenticated ,"isloadibf",isLoading);
    if(isLoading){
      return  <Loader/>
    }
   

    if(!isAuthenticated){
        return <Navigate to="/login" replace />
    }
    return children 
}

export default ProtectedRoute
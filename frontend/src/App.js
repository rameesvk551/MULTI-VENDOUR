import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import { ActivationPage, BestSellingPage, EventPage, HomePage, LoginPage, ProductPage, SignupPage, } from "./Routes";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server";
import store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
//import { useSelector } from 'react-redux'






const App = () => {
 useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  const {loading}=useSelector((state)=>state.user)
  return (
 
  


<>

{ loading ? (
  null ):(
    
<BrowserRouter>
     <Routes>
     <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
    <Route path="/activation/:activationToken" element={<ActivationPage/>}/>
    <Route path="/products" element={<ProductPage/>}/>
    <Route path="/best-selling" element={<BestSellingPage/>}/>
    <Route path="/events" element={<EventPage/>}/>
  
     </Routes>
     </BrowserRouter>
  )
}
</>

  );
};

export default App;

import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import { ActivationPage, HomePage, LoginPage, SignupPage, } from "./Routes";
import { ToastContainer, toast } from 'react-toastify';




const App = () => {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
  <Route path="/activation/:activationToken" element={<ActivationPage/>}/>
   </Routes>
   </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import { LoginPage, SignupPage } from "./Routes";




const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
   </Routes>
   </BrowserRouter>
  );
};

export default App;

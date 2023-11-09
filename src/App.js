import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './components/SecurePage/Login'
import Signup from './components/SecurePage/Signup'
import SecurePage from './components/SecurePage/SecurePage'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from "./components/footer/Footer";
import Email from "./components/email/Email";

function App(){
  return (
   <BrowserRouter>
      <Routes>
        <Route path ='/' element={<SecurePage />} ></Route>  
        <Route path ='/Login' element={<Login />} ></Route>
        <Route path ='/signup' element={<Signup />} ></Route> 
        <Route path ='/footer' element={<Footer />} ></Route> 
        <Route path ='/email' element={<Email />} ></Route> 
      </Routes>
   </BrowserRouter>
  )
}

export default App
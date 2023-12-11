import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomerRouters from "./routers/CustomerRouters.jsx";
import './App.css';
import Login from "./pages/login-register/Login.jsx"
import Signup from "./pages/login-register/Signup.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/*' element={<CustomerRouters />} ></Route> 
        <Route path ='/Login' element={<Login />} ></Route>
        <Route path ='/signup' element={<Signup />} ></Route> 

      </Routes>
    </BrowserRouter>
  )
}

export default App;
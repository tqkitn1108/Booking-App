import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomerRouters from "./routers/CustomerRouters.jsx";
import './App.css';
import Login from "./pages/login-register/Login.jsx"
import Signup from "./pages/login-register/Signup.jsx"
import MailList from "./components/email/Email.jsx";
import ReservationPage from "./pages/reservation/ReservationPage.jsx";
import ReservationPage1 from "./components/reservation-page/ReservationPage1.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/*' element={<CustomerRouters />} ></Route> 
        <Route path ='/Login' element={<Login />} ></Route>
        <Route path ='/signup' element={<Signup />} ></Route> 
        <Route path ='/Email' element={<MailList />} ></Route> 
        <Route path ='/ReservationPage' element={<ReservationPage />} ></Route> 
        <Route path ='/ReservationPage1' element={<ReservationPage1 />} ></Route> 
       
      </Routes>
    </BrowserRouter>
  )
}

export default App;
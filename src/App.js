import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './components/reservation-page/Login'
import Signup from './components/reservation-page/Signup'
import ReservationPage from './components/reservation-page/ReservationPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App(){
  return (
   <BrowserRouter>
      <Routes>
        <Route path ='/' element={<ReservationPage />} ></Route>  
        <Route path ='/login' element={<Login />} ></Route>
        <Route path ='/signup' element={<Signup />} ></Route> 
      </Routes>
   </BrowserRouter>
  )
}

export default App
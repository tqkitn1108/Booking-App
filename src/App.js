import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './components/reservation-page/Login';
import Signup from './components/reservation-page/Signup';
import ReservationPge from './components/reservation-page/ReservationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Email from './components/email/Email';
import Footer from './components/footer/Footer';
import List from './pages/list/List';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ReservationPge />} ></Route>
        <Route path='/Login' element={<Login />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/footer' element={<Footer />} ></Route>
        <Route path='/email' element={<Email />} ></Route>
        <Route path='/list' element={<List />} ></Route>
        {/* <Route path='/header' element={<Header />} ></Route>
        <Route path='/navbar' element={<Navbar />} ></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/reservation-page/Login'
import Signup from './components/reservation-page/Signup'
import List from './pages/list/List';
import Home from './pages/home/Home';
// import Navbar from './components/navbar/Navbar';
// import Header from './components/header/Header';
// import PropertyType from './components/property-type/PropertyType';
// import Trending from './components/trending/Trending';
// import TripPlanner from './components/trip-planner/TripPlanner';
// import Explore from './components/explore/Explore';
import Footer from './components/footer/Footer';
import Email from './components/email/Email';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/footer' element={<Footer />} ></Route>
        <Route path='/email' element={<Email />} ></Route>
        <Route path='/list' element={<List />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
        {/* <Route path='/home' element={<Header />} ></Route>
        <Route path='/navbar' element={<Navbar />} ></Route>
        <Route path='/home' element={<PropertyType />} ></Route>
        <Route path='/home' element={<Trending />} ></Route>
        <Route path='/home' element={<TripPlanner />} ></Route>
        <Route path='/home' element={<Explore />} ></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
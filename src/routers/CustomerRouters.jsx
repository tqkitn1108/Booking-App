import Home from "../pages/home/Home";
import List from "../pages/list/List";
import Login from "../pages/login-register/Login";
import Signup from "../pages/login-register/Signup";
import Hotelpage from "../pages/hotel/Hotelpage";
import ReservationPage from "../pages/reservation/ReservationPage";
import Bookings from "../components/bookings/Bookings";
import FavoriteDestination from "../components/favoriteDestination/FavoriteDestination";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function CustomerRouters() {
  return (
    <div>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:hotelId" element={<Hotelpage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  )
}

export default CustomerRouters;
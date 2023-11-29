import Home from "../pages/home/Home";
import List from "../pages/list/List";
import Login from "../pages/login-register/Login";
import Signup from "../pages/login-register/Signup";
import Hotel from "../pages/hotel/Hotel";
import ReservationPage from "../pages/reservation/ReservationPage";
import FavoriteDestination from "../components/favoriteDestination/FavoriteDestination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../pages/list/Test";


function CustomerRouters() {
  return (
    <div>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:hotelId" element={<Hotel />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  )
}

export default CustomerRouters;
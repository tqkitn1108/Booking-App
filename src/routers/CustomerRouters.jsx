import Home from "../pages/home/Home";
import List from "../pages/list/List";
import Login from "../pages/login-register/Login";
import Signup from "../pages/login-register/Signup";
import Hotel from "../pages/hotel/Hotel";
import ReservationPage from "../pages/reservation/ReservationPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Test from "../pages/list/Test";
import Bookings from "../components/bookings/Bookings";
import { useAuth } from "../context/AuthContext";
import AuthProvider from "../context/AuthContext";


function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children
  }
  return <Navigate to="/" />
}

function CustomerRouters() {
  return (
    <div>
      <AuthProvider>
        {/* <BrowserRouter> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<List />} />
            <Route path="/bookings/:userId" element={<Bookings />} />
            <Route path="/hotels/:hotelId" element={<Hotel />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        {/* </BrowserRouter> */}
      </AuthProvider>
    </div>
  )
}

export default CustomerRouters;
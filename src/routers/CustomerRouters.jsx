import Home from "../pages/home/Home";
import List from "../pages/list/List";
import Login from "../pages/login-register/Login";
import Signup from "../pages/login-register/Signup";
import Hotel from "../pages/hotel/Hotel";
import ReservationPage from "../pages/reservation/ReservationPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookings from "../components/bookings/Bookings";
import { AuthContext, useAuth } from "../context/AuthContext";
import AuthProvider from "../context/AuthContext";
import { useContext } from "react";


function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children
  }
  return <Navigate to="/" />
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user !== null && user.userRole.name === "HOTEL") {
    return <Navigate to="/business/hotels" />;
  }
  return children;
};

function CustomerRouters() {
  return (
    <div>
      <AuthProvider>
        <ProtectedRoute>
          {/* <BrowserRouter> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="hotels/search" element={<List />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/hotels/:hotelId" element={<Hotel />} />
            <Route path="/hotels/:hotelId/reservation" element={<ReservationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          {/* </BrowserRouter> */}
        </ProtectedRoute>
      </AuthProvider>
    </div>
  )
}

export default CustomerRouters;
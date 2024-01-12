import { Navigate, Route, Routes } from "react-router-dom";
import Home from '../hotel-dashboard/pages/home/Home';
import Single from '../hotel-dashboard/pages/single/Single';
import New from '../hotel-dashboard/pages/new/New';
import List from '../hotel-dashboard/pages/list/List';
import HotelInput from '../hotel-dashboard/pages/newHotel/HotelInput';
import BusinessSignup from '../hotel-dashboard/pages/signup/BusinessSignup';
import { bookingColumns, hotelColumns, roomColumns, userColumns } from "../data/datatablesource";
import { userInputs } from "../data/formSource";
import { DarkModeContext } from "../hotel-dashboard/context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthProvider from "../context/AuthContext";
import { DarkModeContextProvider } from "../hotel-dashboard/context/darkModeContext";
import "../hotel-dashboard/style/dark.scss";
import RoomInput from "../hotel-dashboard/pages/newRoom/RoomInput";

function BusinessRouters() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user?.userRole.name !== "HOTEL") {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <DarkModeContextProvider>
          <Routes>
            <Route path="/">
              <Route path="register" element={<BusinessSignup />} />
              <Route path="hotels">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={hotelColumns} hideSideBar={true} />
                    </ProtectedRoute>
                  }
                />
                <Route path=":hotelId">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Single />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="rooms">
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <List columns={roomColumns} hideSideBar={false} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":roomId"
                      element={
                        <ProtectedRoute>
                          <Single />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="form"
                      element={
                        <ProtectedRoute>
                          <RoomInput />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route path="bookings">
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <List columns={bookingColumns} hideSideBar={false} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="pending"
                      element={
                        <ProtectedRoute>
                          <List columns={bookingColumns} hideSideBar={false} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path=":bookingId"
                      element={
                        <ProtectedRoute>
                          <Single />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="new"
                      element={
                        <ProtectedRoute>
                          <New inputs={userInputs} title="Add New User" />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route
                    path="stats"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route
                  path="form"
                  element={
                    <ProtectedRoute>
                      <HotelInput />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </DarkModeContextProvider>
      </AuthProvider>
    </div>
  )
}

export default BusinessRouters;
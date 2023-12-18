import { Navigate, Route, Routes } from "react-router-dom";
import Home from '../hotel-dashboard/pages/home/Home';
import Single from '../hotel-dashboard/pages/single/Single';
import NewRoom from '../hotel-dashboard/pages/newRoom/NewRoom';
import New from '../hotel-dashboard/pages/new/New';
import List from '../hotel-dashboard/pages/list/List';
import HotelInput from '../hotel-dashboard/pages/newHotel/HotelInput';
import BusinessSignup from '../hotel-dashboard/pages/signup/BusinessSignup';
import { hotelColumns, roomColumns, userColumns } from "../hotel-dashboard/datatablesource";
import { userInputs } from "../hotel-dashboard/formSource";
import { DarkModeContext } from "../hotel-dashboard/context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthProvider from "../context/AuthContext";
import { DarkModeContextProvider } from "../hotel-dashboard/context/darkModeContext";
import "../hotel-dashboard/style/dark.scss";

function BusinessRouters() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user.userRole.name !== "HOTEL") {
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
                <Route
                  path=":hotelId"
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
                      <HotelInput />
                    </ProtectedRoute>
                  }
                />
                <Route path="rooms">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <List columns={roomColumns} hideSideBar={false}/>
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
                    path="new"
                    element={
                      <ProtectedRoute>
                        <NewRoom />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="users">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <List columns={userColumns} hideSideBar={false}/>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path=":userId"
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
                path="statistics"
                element={
                  <ProtectedRoute>
                    <Home />
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
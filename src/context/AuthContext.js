import api from "../api/AxiosConfig";
import React, { createContext, useState, useContext } from "react"

export const AuthContext = createContext({
  user: JSON.parse(localStorage.getItem("user")) || null,
  handleLogin: (token) => { },
  handleLogout: () => { }
})

export const useAuth = () => useContext(AuthContext);

// Shared the created context with other components
function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  function handleLogin(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  function addAuthorizationHeader() {
    // Adding the authorization header automatically
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
        return config;
      }
    )
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, addAuthorizationHeader }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
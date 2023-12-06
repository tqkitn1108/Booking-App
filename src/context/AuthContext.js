import { loginUser } from "../api/ApiAuthService";
import api from "../api/AxiosConfig";
import React, { createContext, useState, useContext, useEffect } from "react"

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Shared the created context with other components
function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  async function handleLogin(credentials) {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userInfo));
      // Adding the authorization header automatically
      setUser(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
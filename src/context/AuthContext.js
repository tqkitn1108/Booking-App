import { useNavigate } from "react-router-dom";
import { getUserProfile, loginUser } from "../api/ApiAuthService";
import React, { createContext, useState, useContext, useEffect } from "react"
import { ACCESS_TOKEN } from "../api/UrlConstant";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Shared the created context with other components
function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  async function handleLogin(credentials) {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userInfo));
      setUser(user);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function handleOAuth2Login(token) {
    try {
      const response = await getUserProfile(token);
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem("user", JSON.stringify({ userId: response.data.id, userEmail: response.data.email, userFullName: response.data.fullName, userImage: response.data.imageUrl, userRole: response.data.role }));
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
      window.location.reload();
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleOAuth2Login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
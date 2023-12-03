import { createContext, useContext, useState } from "react";
import { executeJwtAuthentication } from "../api/ApiFunctions";
import api from "../api/AxiosConfig";

// Create a context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Shared the created context with other components
function AuthProvider({ children }) {
  // Put some state in the context
  const [isAuthenticated, setAuthentication] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  async function login(username, password) {
    try {
      const response = await executeJwtAuthentication(username, password);

      if (response.status === 200) {
        const token = 'Bearer ' + response.data.token;
        setAuthentication(true);
        setUsername(username);
        setToken(token);

        // Adding the authorization header automatically
        api.interceptors.request.use(
          (config) => {
            config.headers.Authorization = token;
            return config;
          }
        )
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthentication(false);
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
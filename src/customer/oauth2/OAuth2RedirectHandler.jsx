import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const authContext = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleLoginAsync = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
          await authContext.handleOAuth2Login(token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setError(error);
      }
    };
    handleLoginAsync();
  }, [location, authContext]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else if (error) {
    return <Navigate to={{
      pathname: "/login",
      state: { error: error }
    }} />;
  }
  return <LoadingSpinner />;
}
export default OAuth2RedirectHandler;
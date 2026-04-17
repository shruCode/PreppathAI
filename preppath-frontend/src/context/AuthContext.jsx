import { createContext, useContext, useState, useEffect } from "react";
import { setLogoutHandler } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const initializeAuth = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) return;

    try {
      setToken(storedToken);

      // 🔥 Fetch user from backend
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        logout();
      }

    } catch (error) {
      logout();
    }finally {
      setLoading(false);
    }
  };

  initializeAuth();
}, []);

  const login = (newToken,userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Inject logout into axios
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
        user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

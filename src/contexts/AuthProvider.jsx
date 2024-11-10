import React, { createContext, useContext, useState, useEffect } from "react";

// Create Auth context
const AuthContext = createContext();

// Custom hook for accessing the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth
      ? JSON.parse(savedAuth)
      : {
          isLoggedIn: false,
          accessToken: null,
          email: null,
          userId: null,
          isThirdPartySignUp: false,
          refreshToken: null,
        };
  });

  const updateAuth = (newAuth) => {
    localStorage.setItem("auth", JSON.stringify(newAuth));
    setAuth(newAuth);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedAuth = JSON.parse(localStorage.getItem("auth"));
      if (updatedAuth && updatedAuth.isLoggedIn !== auth.isLoggedIn) {
        setAuth(updatedAuth);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [auth.isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({
      isLoggedIn: false,
      accessToken: null,
      email: null,
      userId: null,
      isThirdPartySignUp: false,
      refreshToken: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{ auth, isLoggedIn: auth.isLoggedIn, logout, updateAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

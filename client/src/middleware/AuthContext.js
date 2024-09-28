import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Add userId to the state

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

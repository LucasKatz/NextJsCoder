"use client"

import { useState, createContext, useContext } from 'react';


const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    email: null,
    uid: null
  });

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
};

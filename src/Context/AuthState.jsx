import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
// import { Navigate } from "react-router-dom";

const AuthState = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  // const navigate = Navigate()

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(currentUser))
  },[currentUser])
  
  const logout = () => {
    setCurrentUser(null);
    alert("Logged out successfully");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{logout, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;

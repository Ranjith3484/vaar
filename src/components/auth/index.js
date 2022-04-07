import React from 'react';
import {Navigate } from "react-router-dom";

export function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = getAuth();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function getAuth(){
    const username = sessionStorage.getItem("username")
    const password = sessionStorage.getItem("password")
    if (username === "ivzuser" && password === "explore2022") {
        return true;
      } else if (username === "ivzcsr" && password === "explore2022") {
        return true;
      } else{
        return false;
      }
}
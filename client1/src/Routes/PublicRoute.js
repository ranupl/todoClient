import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLogin = localStorage.getItem("token");

  if (!isLogin) {
    return children;
  }

  return <Navigate to="/todos" />;
};

export default PublicRoute;

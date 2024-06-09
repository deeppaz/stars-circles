import Index from "layouts";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="login" replace />;
  }
  return (
    <Index>
      <Outlet />
    </Index>
  );
};

export default ProtectedRoutes;

import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const PublicRoutes = () => {
  const token = localStorage.getItem("access_token");

  return token ? <Navigate to="/login" replace /> : <Outlet />  
};
export default PrivateRoutes;
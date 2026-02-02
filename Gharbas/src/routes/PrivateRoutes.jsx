import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("access_token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoutes;
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const decodeToken = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (e) {
    return null;
  }
};

const HostRoute = () => {
  const token = localStorage.getItem("access_token");
  const location = useLocation();

  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;

  const payload = decodeToken(token);
  const user = payload?.user;
  if (!user || user.role !== "host") {
    toast.error("You dont have access");
    return <Navigate to="/home" replace />

  }

  return <Outlet />;
};

export default HostRoute;

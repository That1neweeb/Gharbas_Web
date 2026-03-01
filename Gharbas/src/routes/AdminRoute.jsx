import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../component/LoadingScreen/Spinner";

const AdminRoute = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");

  if (!token) {
    toast.error("You aren't logged in");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!user || user.role !== "admin") {
    toast.error("You don't have admin access");
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;

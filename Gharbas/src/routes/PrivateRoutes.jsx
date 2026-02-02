import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      toast.error("Please login to access this page");
    }
  }, [token]);

  if (!token) {
    return null; // stay on the current page 
  }

  return <Outlet />;
};

export default PrivateRoutes;

import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const token = localStorage.getItem("access_token");
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      toast.error("Login first");
    }
  }, [token]);

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PrivateRoutes;
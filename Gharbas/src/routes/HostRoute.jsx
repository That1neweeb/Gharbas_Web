import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../component/LoadingScreen/Spinner";

const HostRoute = () => {
  const location = useLocation();
  const { user,loading } = useAuth();
  const token = localStorage.getItem("access_token");

  // useEffect(()=>{
  //   if(!loading && user && user.role != "host"){
  //     toast.error("You dont have access");
  //   }
  // },[user,loading])

  if (!token) {
    toast.error("You arent logged in")
    return  <Navigate to="/login" state={{ from: location }} replace />
  }
  
  if(loading){
    return <Spinner/>
  }

  if (!user || user.role !== "host") {
    toast.error("You dont have host access")
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default HostRoute;

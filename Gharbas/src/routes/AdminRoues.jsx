import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../Context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
const {user} = useAuth();
const token = localStorage.getItem("access_token");

if(!token) return toast.error("Login first");

if(user.role != "admin") return toast.error("You dont have admin access");

return <Outlet/>;

}
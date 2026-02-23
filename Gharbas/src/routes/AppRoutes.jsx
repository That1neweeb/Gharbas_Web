import { Route,Routes, Navigate } from "react-router-dom";
import React,{ Suspense} from "react";
import PrivateRoutes from "../routes/PrivateRoutes";
import HostRoute from "../routes/HostRoute";
import Spinner from "../component/LoadingScreen/Spinner";

const HomePage = React.lazy(() => import ("../pages/public/Home"));
const ProductPage = React.lazy(() => import ("../pages/private/ProductDetails"));
const LoginPage = React.lazy(() => import ("../pages/public/Login"));
const RegisterPage = React.lazy(() => import("../pages/public/UserRegister"));
const HostPage = React.lazy(() => import("../pages/private/Host"));
const HostRegister = React.lazy(() => import("../pages/public/HostRegister"));

export default function AppRoutes(){
    return(
        <>
        
      <Suspense fallback={<Spinner />}>
        <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/HostRegister" element={<HostRegister />} />

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/listing/:id" element={<ProductPage />} />
            </Route>

            {/* Host-only routes */}
            <Route element={<HostRoute />}>
              <Route path="/host" element={<HostPage />} />
            </Route>
            

            {/* Admin routes */}
          
        </Routes>
      </Suspense>
    </>
    )
    
}
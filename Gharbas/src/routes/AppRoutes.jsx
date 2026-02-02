import { Route,Routes, Navigate } from "react-router-dom";
import React,{ Suspense} from "react";
import PrivateRoutes from "../routes/PrivateRoutes";
import Spinner from "../component/LoadingScreen/Spinner";

const HomePage = React.lazy(() => import ("../pages/public/Home"));
const ProductPage = React.lazy(() => import ("../pages/private/ProductDetails"));
const LoginPage = React.lazy(() => import ("../pages/public/Login"));
const RegisterPage = React.lazy(() => import("../pages/public/UserRegister"));

export default function AppRoutes(){
    return(
        <>
        
      <Suspense fallback={<Spinner />}>
        <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
            <Route path="/product/:id" element={<ProductPage />} />



            </Route>
          
        </Routes>
      </Suspense>
    </>
    )
    
}
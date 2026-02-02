import { Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import React from "react";
import PrivateRoutes from "./routes/PublicRoutes";

const HomePage = React.lazy(() => import ("./pages/public/Home"));
const ProductPage = React.lazy(() => import ("./pages/public/ProductDetails"));

export default function AppRoutes(){
    return(
        <>
        
      <Suspense fallback={<div>.....loading</div>}>
        <Routes>
            {/* Public Routes */}
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/home" element={<HomePage />}/>
            <Route path="*" element={<Navigate to="/product" />} />

            <Route element={<PublicRoutes />}>

            
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>

            </Route>
          
        </Routes>
      </Suspense>
    </>
    )
    
}
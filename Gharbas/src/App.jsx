import { ToastContainer } from 'react-toastify';
import './App.css'
import Navbar from './component/Navbar'
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './Context/AuthContext';


function App() {
  return (
    <>
    <AuthProvider>
      <ToastContainer />
      <Navbar />
      <AppRoutes />
    </AuthProvider>
      
    </>
  );
}

export default App

//  
import { ToastContainer } from 'react-toastify';
import './App.css'
import Navbar from './component/Navbar'
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App

//  
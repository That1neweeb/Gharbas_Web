import { ToastContainer } from 'react-toastify';
import './App.css'
import Navbar from './component/Navbar'
import AppRoutes from './routes/AppRoutes';
import { AuthProvider, useAuth } from './Context/AuthContext';
import Spinner from './component/LoadingScreen/Spinner';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App

//  
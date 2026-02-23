import { useState, useEffect, createContext, useContext } from "react";
import useApi from "../hooks/useAPI";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  const { callApi } = useApi();

  const fetchUser = async () => {
    try {
      const res = await callApi("GET", "/auth/me");
      setUser(res.user);
    } catch (err) {
      setUser(null);
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
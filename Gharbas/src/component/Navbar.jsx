import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-orange-500 px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <ul className="flex justify-center gap-8 flex-1">
          <li>
            <Link
              to="/home"  
              className="text-white font-semibold hover:text-orange-100 transition"
            >
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link
                to="/my-bookings"
                className="text-white font-semibold hover:text-orange-100 transition"
              >
                My Bookings
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/host"
              className="text-white font-semibold hover:text-orange-200 transition"
            >
              For Hosts
            </Link>
          </li>
          {
            user?.role === "admin" && (
                <li>
                    <Link to="/admin"
                    className="text-white font-semibold hover:text-orange-200 transition"
                    >
                      Admin Board
                    </Link>
              </li>    
            )
          }
          
        </ul>
        {user && (
          <button
            onClick={handleLogout}
            className="text-white font-semibold hover:text-orange-100 transition bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Logout
          </button>
        )}

        {!user && (
          <Link to="/login">
            <button
              className="text-white font-semibold hover:text-orange-100 transition bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

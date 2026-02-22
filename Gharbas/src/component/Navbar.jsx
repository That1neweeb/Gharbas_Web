import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-orange-500 px-6 py-4 shadow-md">
      <ul className="flex justify-center gap-8">
        <li>
          <Link
            to="/home"
            className="text-white font-semibold hover:text-orange-100 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="text-white font-semibold hover:text-orange-100 transition"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/host"
            className="text-white font-semibold hover:text-orange-200 transition"
          >
            For Hosts
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

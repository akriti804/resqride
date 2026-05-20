import { Link, useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-slate-950 text-white">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="ResQRide Logo"
          className="w-12 h-12 object-contain"
        />

        <div>
          <Link to="/" className="text-2xl font-bold text-red-400">
            ResQRide
          </Link>

          <p className="text-slate-400 text-sm">
            {title || "Roadside Assistance Platform"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-slate-300 hover:text-white">
          Home
        </Link>

        {user?.role === "USER" && (
          <Link to="/user-dashboard" className="text-slate-300 hover:text-white">
            User Dashboard
          </Link>
        )}

        {user?.role === "MECHANIC" && (
          <Link
            to="/mechanic-dashboard"
            className="text-slate-300 hover:text-white"
          >
            Mechanic Dashboard
          </Link>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/admin-dashboard" className="text-slate-300 hover:text-white">
            Admin Dashboard
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
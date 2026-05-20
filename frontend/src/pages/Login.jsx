import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      const userData = res.data.data;

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "USER") {
        navigate("/user-dashboard");
      } else if (userData.role === "MECHANIC") {
        navigate("/mechanic-dashboard");
      } else if (userData.role === "ADMIN") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-red-400 mb-2">Welcome Back</h1>
        <p className="text-slate-400 mb-6">
          Login to manage your roadside assistance requests.
        </p>

        {message && (
          <div className="mb-4 bg-red-500/20 border border-red-500/30 text-red-200 p-3 rounded-xl">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-slate-400 mt-5 text-center">
          New to ResQRide?{" "}
          <Link to="/register" className="text-red-400">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
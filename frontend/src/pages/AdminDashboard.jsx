import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { getStatusBadge, formatStatus } from "../utils/statusStyles";

function AdminDashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [requests, setRequests] = useState([]);
  const [revenueReport, setRevenueReport] = useState(null);
  const [message, setMessage] = useState("");

  const loadDashboard = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data.data);
      setMessage("Dashboard stats loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load dashboard stats");
    }
  };

  const loadUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data.data || []);
      setMessage("Users loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load users");
    }
  };

  const loadMechanics = async () => {
    try {
      const res = await API.get("/admin/mechanics");
      setMechanics(res.data.data || []);
      setMessage("Mechanics loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load mechanics");
    }
  };

  const loadRequests = async () => {
    try {
      const res = await API.get("/admin/requests");
      setRequests(res.data.data || []);
      setMessage("Requests loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load requests");
    }
  };

  const loadRevenueReport = async () => {
    try {
      const res = await API.get("/admin/revenue/report");
      setRevenueReport(res.data);
      setMessage("Revenue report loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load revenue report");
    }
  };

  const verifyMechanic = async (mechanicProfileId) => {
    try {
      await API.put(`/admin/mechanics/${mechanicProfileId}/verify`);
      setMessage("Mechanic verified successfully");
      loadMechanics();
      loadDashboard();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to verify mechanic");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar title="Admin Dashboard" />

      <main className="p-8">
        <h1 className="text-3xl font-bold text-red-400">Admin Dashboard</h1>

        <p className="text-slate-300 mt-2">
          Welcome, {user?.fullName || "Admin"}
        </p>

        {message && <p className="mt-4 text-yellow-300">{message}</p>}

        <div className="grid md:grid-cols-5 gap-5 mt-8">
          <button
            onClick={loadDashboard}
            className="bg-red-500 hover:bg-red-600 p-4 rounded-2xl font-semibold"
          >
            Load Dashboard
          </button>

          <button
            onClick={loadUsers}
            className="bg-blue-500 hover:bg-blue-600 p-4 rounded-2xl font-semibold"
          >
            Load Users
          </button>

          <button
            onClick={loadMechanics}
            className="bg-green-500 hover:bg-green-600 p-4 rounded-2xl font-semibold"
          >
            Load Mechanics
          </button>

          <button
            onClick={loadRequests}
            className="bg-purple-500 hover:bg-purple-600 p-4 rounded-2xl font-semibold"
          >
            Load Requests
          </button>

          <button
            onClick={loadRevenueReport}
            className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-2xl font-semibold text-slate-950"
          >
            Load Revenue
          </button>
        </div>

        {stats && (
          <div className="grid md:grid-cols-4 gap-5 mt-8">
            <StatCard title="Total Users" value={stats.totalUsers} />
            <StatCard title="Total Mechanics" value={stats.totalMechanics} />
            <StatCard
              title="Verified Mechanics"
              value={stats.verifiedMechanics}
            />
            <StatCard
              title="Pending Mechanics"
              value={stats.pendingMechanics}
            />
            <StatCard title="Total Requests" value={stats.totalRequests} />
            <StatCard title="Pending Requests" value={stats.pendingRequests} />
            <StatCard
              title="Completed Requests"
              value={stats.completedRequests}
            />
            <StatCard
              title="Estimated Revenue"
              value={`₹${stats.estimatedRevenue}`}
            />
          </div>
        )}

        {revenueReport && (
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 mt-8">
            <h2 className="text-2xl font-bold mb-5 text-yellow-300">
              Revenue Dashboard
            </h2>

            <div className="grid md:grid-cols-4 gap-5">
              <StatCard
                title="Service Revenue"
                value={`₹${revenueReport.totalServiceRevenue}`}
              />

              <StatCard
                title="Platform Commission"
                value={`₹${revenueReport.totalPlatformCommission}`}
              />

              <StatCard
                title="Mechanic Earnings"
                value={`₹${revenueReport.totalMechanicEarnings}`}
              />

              <StatCard
                title="Cancellation Fees"
                value={`₹${revenueReport.totalCancellationFees}`}
              />

              <StatCard
                title="Subscription Revenue"
                value={`₹${revenueReport.totalSubscriptionRevenue}`}
              />

              <StatCard
                title="Emergency Plan Revenue"
                value={`₹${revenueReport.totalEmergencyPlanRevenue}`}
              />

              <StatCard
                title="Featured Listing Revenue"
                value={`₹${revenueReport.totalFeaturedListingRevenue}`}
              />

              <StatCard
                title="Total Business Revenue"
                value={`₹${revenueReport.totalBusinessRevenue}`}
              />
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold mb-4">Users</h2>

            {users.length === 0 ? (
              <p className="text-slate-400">No users loaded.</p>
            ) : (
              <div className="space-y-4">
                {users.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 hover:border-red-400/40 transition"
                  >
                    <h3 className="text-xl font-bold">{item.fullName}</h3>
                    <p className="text-slate-400">Email: {item.email}</p>
                    <p className="text-slate-400">Phone: {item.phone}</p>
                    <p className="text-slate-400">Role: {item.role}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold mb-4">Mechanics</h2>

            {mechanics.length === 0 ? (
              <p className="text-slate-400">No mechanics loaded.</p>
            ) : (
              <div className="space-y-4">
                {mechanics.map((mechanic) => (
                  <div
                    key={mechanic.id}
                    className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 hover:border-red-400/40 transition"
                  >
                    <div className="flex justify-between gap-4">
                      <h3 className="text-xl font-bold">
                        {mechanic.garageName}
                      </h3>

                      <span
                        className={
                          mechanic.verified
                            ? "border px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 border-green-500/30"
                            : "border px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        }
                      >
                        {mechanic.verified ? "VERIFIED" : "PENDING"}
                      </span>
                    </div>

                    <p className="text-slate-400 mt-2">
                      Experience: {mechanic.experience}
                    </p>
                    <p className="text-slate-400">
                      Services: {mechanic.servicesOffered}
                    </p>
                    <p className="text-slate-400">
                      Base Price: ₹{mechanic.basePrice}
                    </p>
                    <p className="text-slate-400">
                      Location: {mechanic.location}
                    </p>

                    {!mechanic.verified && (
                      <button
                        onClick={() => verifyMechanic(mechanic.id)}
                        className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold"
                      >
                        Verify Mechanic
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20 mt-8">
          <h2 className="text-2xl font-bold mb-4">All Service Requests</h2>

          {requests.length === 0 ? (
            <p className="text-slate-400">No requests loaded.</p>
          ) : (
            <div className="grid lg:grid-cols-2 gap-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 hover:border-red-400/40 transition"
                >
                  <div className="flex justify-between gap-4">
                    <h3 className="text-xl font-bold">
                      {formatStatus(request.serviceType)}
                    </h3>

                    <span
                      className={`border px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                        request.status
                      )}`}
                    >
                      {formatStatus(request.status)}
                    </span>
                  </div>

                  <p className="text-slate-400 mt-2">
                    Location: {request.breakdownLocation}
                  </p>

                  <p className="text-slate-400">
                    Issue: {request.issueDescription || "Not provided"}
                  </p>

                  <p className="text-slate-400">
                    Estimated Price: ₹{request.estimatedPrice}
                  </p>

                  {request.user && (
                    <p className="text-slate-400">
                      User: {request.user.fullName}
                    </p>
                  )}

                  {request.mechanicProfile && (
                    <p className="text-slate-400">
                      Mechanic: {request.mechanicProfile.garageName}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-3xl p-5 shadow-xl shadow-black/20">
      <p className="text-slate-400">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default AdminDashboard;
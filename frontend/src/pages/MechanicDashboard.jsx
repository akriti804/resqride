import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { getStatusBadge, formatStatus } from "../utils/statusStyles";

function MechanicDashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [profile, setProfile] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [message, setMessage] = useState("");

  const loadProfile = async () => {
    try {
      const userId = user?.id || 2;
      const res = await API.get(`/mechanics/profile/${userId}`);
      setProfile(res.data.data);
      setMessage("Mechanic profile loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Profile not found. Please create mechanic profile first.");
    }
  };

  const loadPendingRequests = async () => {
    try {
      const res = await API.get("/requests/pending");
      setPendingRequests(res.data.data || []);
      setMessage("Pending requests loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load pending requests");
    }
  };

  const loadMyJobs = async () => {
    try {
      if (!profile?.id) {
        setMessage("Please load mechanic profile first");
        return;
      }

      const res = await API.get(`/requests/mechanic/${profile.id}`);
      setMyJobs(res.data.data || []);
      setMessage("My jobs loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load mechanic jobs");
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      if (!profile?.id) {
        setMessage("Please load mechanic profile first");
        return;
      }

      await API.put(`/requests/${requestId}/accept/${profile.id}`);
      setMessage("Request accepted successfully");
      loadPendingRequests();
      loadMyJobs();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to accept request");
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await API.put(`/requests/${requestId}/reject`);
      setMessage("Request rejected successfully");
      loadPendingRequests();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to reject request");
    }
  };

  const updateStatus = async (requestId, status) => {
    try {
      await API.put(`/requests/${requestId}/status`, { status });
      setMessage("Status updated successfully");
      loadMyJobs();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar title="Mechanic Dashboard" />

      <main className="p-8">
        <h1 className="text-3xl font-bold text-red-400">Mechanic Dashboard</h1>

        <p className="text-slate-300 mt-2">
          Welcome, {user?.fullName || "Mechanic"}
        </p>

        {message && <p className="mt-4 text-yellow-300">{message}</p>}

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-xl font-bold mb-4">Profile</h2>

            <button
              onClick={loadProfile}
              className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl font-semibold"
            >
              Load Profile
            </button>

            {profile && (
              <div className="mt-5 space-y-2 text-slate-300">
                <p>Garage: {profile.garageName}</p>
                <p>Experience: {profile.experience}</p>
                <p>Services: {profile.servicesOffered}</p>
                <p>Base Price: ₹{profile.basePrice}</p>
                <p>Verified: {profile.verified ? "Yes" : "No"}</p>
                <p>Available: {profile.available ? "Yes" : "No"}</p>
              </div>
            )}
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-xl font-bold mb-4">Pending Requests</h2>

            <button
              onClick={loadPendingRequests}
              className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl font-semibold"
            >
              Load Pending Requests
            </button>

            <p className="text-slate-400 mt-4">
              Total Pending: {pendingRequests.length}
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-xl font-bold mb-4">My Jobs</h2>

            <button
              onClick={loadMyJobs}
              className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl font-semibold"
            >
              Load My Jobs
            </button>

            <p className="text-slate-400 mt-4">Total Jobs: {myJobs.length}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold mb-4">New Pending Requests</h2>

            {pendingRequests.length === 0 ? (
              <p className="text-slate-400">No pending requests loaded.</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
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

                    {request.vehicle && (
                      <p className="text-slate-400">
                        Vehicle: {request.vehicle.brand} {request.vehicle.model}
                      </p>
                    )}

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => acceptRequest(request.id)}
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => rejectRequest(request.id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold mb-4">Accepted Jobs</h2>

            {myJobs.length === 0 ? (
              <p className="text-slate-400">No jobs loaded.</p>
            ) : (
              <div className="space-y-4">
                {myJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 hover:border-red-400/40 transition"
                  >
                    <div className="flex justify-between gap-4">
                      <h3 className="text-xl font-bold">
                        {formatStatus(job.serviceType)}
                      </h3>

                      <span
                        className={`border px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                          job.status
                        )}`}
                      >
                        {formatStatus(job.status)}
                      </span>
                    </div>

                    <p className="text-slate-400 mt-2">
                      Location: {job.breakdownLocation}
                    </p>

                    <p className="text-slate-400">
                      Issue: {job.issueDescription || "Not provided"}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button
                        onClick={() => updateStatus(job.id, "ON_THE_WAY")}
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-xl font-semibold"
                      >
                        On The Way
                      </button>

                      <button
                        onClick={() => updateStatus(job.id, "REACHED")}
                        className="bg-purple-500 hover:bg-purple-600 px-3 py-2 rounded-xl font-semibold"
                      >
                        Reached
                      </button>

                      <button
                        onClick={() => updateStatus(job.id, "IN_PROGRESS")}
                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-xl font-semibold"
                      >
                        In Progress
                      </button>

                      <button
                        onClick={() => updateStatus(job.id, "COMPLETED")}
                        className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-xl font-semibold"
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MechanicDashboard;
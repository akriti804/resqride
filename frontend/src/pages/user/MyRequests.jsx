import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/api";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadRequests() {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/service-requests/user/1`);

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      alert("Requests load nahi ho paayi. Backend check karo.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    if (status === "PENDING") return "bg-yellow-600";
    if (status === "ACCEPTED") return "bg-blue-600";
    if (status === "MECHANIC_ON_THE_WAY") return "bg-purple-600";
    if (status === "WORK_STARTED") return "bg-orange-600";
    if (status === "COMPLETED") return "bg-green-600";
    if (status === "REJECTED") return "bg-red-600";
    return "bg-slate-600";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Service Requests</h1>
            <p className="text-slate-400 mt-2">
              Track all your roadside assistance requests.
            </p>
          </div>

          <button
            onClick={loadRequests}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-5 py-3 rounded-xl font-semibold"
          >
            {loading ? "Loading..." : "Load Requests"}
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            No service requests found. Click “Load Requests”.
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    {request.serviceType || "Service Request"}
                  </h2>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status || "PENDING"}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Vehicle:</span>{" "}
                    {request.vehicleType || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Vehicle Number:
                    </span>{" "}
                    {request.vehicleNumber || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold text-white">Location:</span>{" "}
                    {request.userLocation || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Mechanic ID:
                    </span>{" "}
                    {request.mechanicId || "Not Assigned"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-white mb-2">
                    Problem Description
                  </p>
                  <p className="text-slate-400">
                    {request.description || "No description"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRequests;
import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/api";

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPendingRequests() {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/service-requests/pending`);

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      alert("Pending requests load nahi ho paayi. Backend check karo.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  async function acceptRequest(requestId) {
    try {
      const mechanicId = localStorage.getItem("mechanicId") || 1;

      const response = await fetch(
        `${API_BASE_URL}/service-requests/${requestId}/accept?mechanicId=${mechanicId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Request accepted successfully!");
        loadPendingRequests();
      } else {
        alert("Accept failed.");
      }
    } catch {
      alert("Something went wrong.");
    }
  }

  async function rejectRequest(requestId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/service-requests/${requestId}/reject`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert("Request rejected.");
        loadPendingRequests();
      } else {
        alert("Reject failed.");
      }
    } catch {
      alert("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Incoming Service Requests</h1>
            <p className="text-slate-400 mt-2">
              View pending roadside assistance requests and accept nearby jobs.
            </p>
          </div>

          <button
            onClick={loadPendingRequests}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-5 py-3 rounded-xl font-semibold"
          >
            {loading ? "Loading..." : "Load Requests"}
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            No pending requests found. Click “Load Requests”.
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold">
                      {request.serviceType || "Service Request"}
                    </h2>
                    <p className="text-slate-400">
                      Request ID: #{request.id}
                    </p>
                  </div>

                  <span className="bg-yellow-600 px-4 py-2 rounded-full text-sm font-semibold">
                    {request.status || "PENDING"}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-slate-300 mb-5">
                  <p>
                    <span className="font-semibold text-white">User ID:</span>{" "}
                    {request.userId || "N/A"}
                  </p>

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
                </div>

                <div className="mb-5">
                  <p className="font-semibold text-white mb-2">
                    Problem Description
                  </p>
                  <p className="text-slate-400">
                    {request.description || "No description available"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => acceptRequest(request.id)}
                    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
                  >
                    Accept Request
                  </button>

                  <button
                    onClick={() => rejectRequest(request.id)}
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default IncomingRequests;
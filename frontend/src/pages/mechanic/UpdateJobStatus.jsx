import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/api";

function UpdateJobStatus() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusFlow = [
    "ACCEPTED",
    "MECHANIC_ON_THE_WAY",
    "WORK_STARTED",
    "COMPLETED",
  ];

  async function loadMyJobs() {
    try {
      setLoading(true);

      const mechanicId = localStorage.getItem("mechanicId") || 1;

      const response = await fetch(
        `${API_BASE_URL}/service-requests/mechanic/${mechanicId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load jobs");
      }

      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      alert("Jobs load nahi ho paayi. Backend check karo.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  function getNextStatus(currentStatus) {
    const currentIndex = statusFlow.indexOf(currentStatus);

    if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
      return null;
    }

    return statusFlow[currentIndex + 1];
  }

  async function updateStatus(requestId, nextStatus) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/service-requests/${requestId}/status?status=${nextStatus}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        alert(`Status updated to ${nextStatus}`);
        loadMyJobs();
      } else {
        alert("Status update failed.");
      }
    } catch {
      alert("Something went wrong.");
    }
  }

  function getStatusColor(status) {
    if (status === "ACCEPTED") return "bg-blue-600";
    if (status === "MECHANIC_ON_THE_WAY") return "bg-purple-600";
    if (status === "WORK_STARTED") return "bg-orange-600";
    if (status === "COMPLETED") return "bg-green-600";
    return "bg-slate-600";
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Update Job Status</h1>
            <p className="text-slate-400 mt-2">
              Manage accepted service requests and update live work progress.
            </p>
          </div>

          <button
            onClick={loadMyJobs}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-5 py-3 rounded-xl font-semibold"
          >
            {loading ? "Loading..." : "Load My Jobs"}
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            No active jobs found. Click “Load My Jobs”.
          </div>
        ) : (
          <div className="grid gap-5">
            {jobs.map((job) => {
              const nextStatus = getNextStatus(job.status);

              return (
                <div
                  key={job.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-bold">
                        {job.serviceType || "Service Job"}
                      </h2>
                      <p className="text-slate-400">Request ID: #{job.id}</p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status || "UNKNOWN"}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-slate-300 mb-5">
                    <p>
                      <span className="font-semibold text-white">User ID:</span>{" "}
                      {job.userId || "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold text-white">Vehicle:</span>{" "}
                      {job.vehicleType || "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold text-white">
                        Vehicle Number:
                      </span>{" "}
                      {job.vehicleNumber || "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold text-white">Location:</span>{" "}
                      {job.userLocation || "N/A"}
                    </p>
                  </div>

                  <div className="mb-5">
                    <p className="font-semibold text-white mb-2">
                      Problem Description
                    </p>
                    <p className="text-slate-400">
                      {job.description || "No description available"}
                    </p>
                  </div>

                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-5">
                    <p className="text-slate-400 mb-2">Progress Flow</p>
                    <div className="flex flex-wrap gap-2">
                      {statusFlow.map((status) => (
                        <span
                          key={status}
                          className={`px-3 py-2 rounded-full text-xs font-semibold ${
                            status === job.status
                              ? "bg-green-600 text-white"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {status.replaceAll("_", " ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {job.status === "COMPLETED" ? (
                    <button
                      disabled
                      className="bg-green-700 px-5 py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      Job Completed
                    </button>
                  ) : nextStatus ? (
                    <button
                      onClick={() => updateStatus(job.id, nextStatus)}
                      className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
                    >
                      Move to {nextStatus.replaceAll("_", " ")}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-slate-700 px-5 py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      No Next Status
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateJobStatus;
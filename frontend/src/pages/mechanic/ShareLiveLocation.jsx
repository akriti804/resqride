import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/api";

function ShareLiveLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);

  async function updateLocation(latitude, longitude) {
    try {
      const mechanicId = localStorage.getItem("mechanicId") || 1;

      const response = await fetch(`${API_BASE_URL}/location/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mechanicId: Number(mechanicId),
          latitude,
          longitude,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }
    } catch {
      alert("Location update failed.");
    }
  }

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        await updateLocation(latitude, longitude);

        setLoading(false);
      },
      () => {
        alert("Unable to fetch location.");
        setLoading(false);
      }
    );
  }

  function startLiveSharing() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setSharing(true);

    navigator.geolocation.watchPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
        });

        await updateLocation(latitude, longitude);
      },
      () => {
        alert("Live location failed.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Share Live Location
          </h1>

          <p className="text-slate-400 mt-2">
            Share your real-time location with users for live roadside tracking.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-5 py-3 rounded-xl font-semibold"
            >
              {loading ? "Fetching..." : "Get Current Location"}
            </button>

            <button
              onClick={startLiveSharing}
              disabled={sharing}
              className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 px-5 py-3 rounded-xl font-semibold"
            >
              {sharing ? "Live Sharing Started" : "Start Live Sharing"}
            </button>
          </div>

          {location ? (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">
                Current Coordinates
              </h2>

              <div className="space-y-3 text-slate-300">
                <p>
                  <span className="text-white font-semibold">
                    Latitude:
                  </span>{" "}
                  {location.latitude}
                </p>

                <p>
                  <span className="text-white font-semibold">
                    Longitude:
                  </span>{" "}
                  {location.longitude}
                </p>

                <p className="text-green-400 font-semibold mt-4">
                  Live location is updating to backend successfully.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-slate-400">
              No location data available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShareLiveLocation;
import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { getStatusBadge, formatStatus } from "../utils/statusStyles";

function UserDashboard() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [vehicles, setVehicles] = useState([]);
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const [vehicleForm, setVehicleForm] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    registrationNumber: "",
    fuelType: "",
  });

  const [requestForm, setRequestForm] = useState({
    vehicleId: "",
    serviceType: "",
    breakdownLocation: "",
    latitude: "",
    longitude: "",
    issueDescription: "",
  });

  const handleVehicleChange = (e) => {
    setVehicleForm({ ...vehicleForm, [e.target.name]: e.target.value });
  };

  const handleRequestChange = (e) => {
    setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setRequestForm((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          breakdownLocation: `Current Location - Lat: ${lat}, Lng: ${lng}`,
        }));

        setMessage("Location detected successfully");
      },
      () => {
        setMessage("Unable to fetch location. Please allow location access.");
      }
    );
  };

  const loadVehicles = async () => {
    try {
      const userId = user?.id || 1;
      const res = await API.get(`/vehicles/user/${userId}`);
      setVehicles(res.data.data || []);
      setMessage("Vehicles loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load vehicles");
    }
  };

  const loadRequests = async () => {
    try {
      const userId = user?.id || 1;
      const res = await API.get(`/requests/user/${userId}`);
      setRequests(res.data.data || []);
      setMessage("Service history loaded successfully");
    } catch (error) {
      console.log(error);
      setMessage("Failed to load service history");
    }
  };

  const addVehicle = async (e) => {
    e.preventDefault();

    try {
      const userId = user?.id || 1;
      await API.post(`/vehicles/add/${userId}`, vehicleForm);

      setMessage("Vehicle added successfully");
      setVehicleForm({
        vehicleType: "",
        brand: "",
        model: "",
        registrationNumber: "",
        fuelType: "",
      });

      loadVehicles();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to add vehicle");
    }
  };

  const createRequest = async (e) => {
    e.preventDefault();

    try {
      const userId = user?.id || 1;

      const payload = {
        userId,
        vehicleId: Number(requestForm.vehicleId),
        serviceType: requestForm.serviceType,
        breakdownLocation: requestForm.breakdownLocation,
        latitude: requestForm.latitude ? Number(requestForm.latitude) : null,
        longitude: requestForm.longitude ? Number(requestForm.longitude) : null,
        issueDescription: requestForm.issueDescription,
      };

      await API.post("/requests/create", payload);

      setMessage("Service request created successfully");
      setRequestForm({
        vehicleId: "",
        serviceType: "",
        breakdownLocation: "",
        latitude: "",
        longitude: "",
        issueDescription: "",
      });

      loadRequests();
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to create request");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar title="User Dashboard" />

      <main className="p-8">
        <h1 className="text-3xl font-bold text-red-400">User Dashboard</h1>
        <p className="text-slate-300 mt-2">Welcome, {user?.fullName || "User"}</p>

        {message && <p className="mt-4 text-yellow-300">{message}</p>}

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>

            <form onSubmit={addVehicle} className="space-y-4">
              <input name="vehicleType" placeholder="Vehicle Type e.g. Car, Bike, SUV" value={vehicleForm.vehicleType} onChange={handleVehicleChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required />
              <input name="brand" placeholder="Brand e.g. Hyundai" value={vehicleForm.brand} onChange={handleVehicleChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required />
              <input name="model" placeholder="Model e.g. i20" value={vehicleForm.model} onChange={handleVehicleChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required />
              <input name="registrationNumber" placeholder="Registration Number e.g. BR45RT6789" value={vehicleForm.registrationNumber} onChange={handleVehicleChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required />

              <select name="fuelType" value={vehicleForm.fuelType} onChange={handleVehicleChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required>
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
              </select>

              <button className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl font-semibold">
                Add Vehicle
              </button>
            </form>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">My Vehicles</h2>
              <button onClick={loadVehicles} className="bg-red-500 px-4 py-2 rounded-xl font-semibold">
                Load Vehicles
              </button>
            </div>

            {vehicles.length === 0 ? (
              <p className="text-slate-400">No vehicles loaded yet.</p>
            ) : (
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 hover:border-red-400/40 transition">
                    <h3 className="text-xl font-bold">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-slate-400">Type: {vehicle.vehicleType}</p>
                    <p className="text-slate-400">Registration: {vehicle.registrationNumber}</p>
                    <p className="text-slate-400">Fuel: {vehicle.fuelType}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold mb-4">Request Roadside Assistance</h2>

            <form onSubmit={createRequest} className="space-y-4">
              <select name="vehicleId" value={requestForm.vehicleId} onChange={handleRequestChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required>
                <option value="">Select Vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.brand} {vehicle.model} - {vehicle.registrationNumber}
                  </option>
                ))}
              </select>

              <select name="serviceType" value={requestForm.serviceType} onChange={handleRequestChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required>
                <option value="">Select Service Type</option>
                <option value="BREAKDOWN_REPAIR">Breakdown Repair</option>
                <option value="TOWING">Towing</option>
                <option value="BATTERY_JUMP_START">Battery Jump-start</option>
                <option value="FLAT_TIRE_REPAIR">Flat Tire Repair</option>
                <option value="FUEL_DELIVERY">Fuel Delivery</option>
              </select>

              <input name="breakdownLocation" placeholder="Click Detect My Location" value={requestForm.breakdownLocation} readOnly className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none" required />

              <button type="button" onClick={detectLocation} className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-xl font-semibold">
                Detect My Location
              </button>

              {requestForm.latitude && requestForm.longitude && (
                <div className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-slate-300">
                  <p>Latitude: {requestForm.latitude}</p>
                  <p>Longitude: {requestForm.longitude}</p>
                </div>
              )}

              <textarea name="issueDescription" placeholder="Describe issue e.g. Car battery is dead" value={requestForm.issueDescription} onChange={handleRequestChange} className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none min-h-28" />

              <button className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl font-semibold">
                Create Service Request
              </button>
            </form>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl shadow-black/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Service History</h2>
              <button onClick={loadRequests} className="bg-red-500 px-4 py-2 rounded-xl font-semibold">
                Load History
              </button>
            </div>

            {requests.length === 0 ? (
              <p className="text-slate-400">No service requests loaded yet.</p>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="bg-slate-900/90 border border-white/10 rounded-2xl p-5 hover:border-red-400/40 transition">
                    <div className="flex justify-between gap-4">
                      <h3 className="text-xl font-bold">{request.serviceType}</h3>
                      <span className={`border px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(request.status)}`}>
                        {formatStatus(request.status)}
                      </span>
                    </div>

                    <p className="text-slate-400 mt-2">Location: {request.breakdownLocation}</p>
                    <p className="text-slate-400">Issue: {request.issueDescription || "Not provided"}</p>
                    <p className="text-slate-400">Estimated Price: ₹{request.estimatedPrice}</p>

                    {request.latitude && request.longitude && (
                      <p className="text-slate-400">
                        Coordinates: {request.latitude}, {request.longitude}
                      </p>
                    )}

                    <TrackingTimeline status={request.status} />

                    {request.status === "COMPLETED" && <InvoiceSummary request={request} />}
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

function TrackingTimeline({ status }) {
  const steps = ["PENDING", "ACCEPTED", "ON_THE_WAY", "REACHED", "IN_PROGRESS", "COMPLETED"];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="mt-5">
      <p className="text-sm text-slate-400 mb-3">Live Tracking Timeline</p>
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          return (
            <div key={step} className="flex items-center gap-3">
              <div className={isCompleted ? "w-4 h-4 rounded-full bg-green-400" : "w-4 h-4 rounded-full bg-slate-600"}></div>
              <p className={isCompleted ? "text-green-300 font-semibold" : "text-slate-500"}>
                {formatStatus(step)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InvoiceSummary({ request }) {
  return (
    <div className="mt-5 bg-white/10 border border-white/10 rounded-2xl p-4">
      <h4 className="text-lg font-bold text-red-400 mb-3">Service Invoice</h4>
      <div className="space-y-2 text-slate-300 text-sm">
        <p><span className="font-semibold text-white">Invoice ID:</span> INV-{request.id}</p>
        <p><span className="font-semibold text-white">Service:</span> {formatStatus(request.serviceType)}</p>
        <p><span className="font-semibold text-white">Status:</span> {formatStatus(request.status)}</p>
        <p><span className="font-semibold text-white">Location:</span> {request.breakdownLocation}</p>
        <p><span className="font-semibold text-white">Issue:</span> {request.issueDescription || "Not provided"}</p>
        <p><span className="font-semibold text-white">Estimated Price:</span> ₹{request.estimatedPrice}</p>
        <p><span className="font-semibold text-white">Payment:</span> Cash / Offline</p>
      </div>
      <button onClick={() => window.print()} className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl font-semibold">
        Print Invoice
      </button>
    </div>
  );
}

export default UserDashboard;
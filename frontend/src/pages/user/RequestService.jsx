import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/api";

function RequestService() {
  const [formData, setFormData] = useState({
    serviceType: "",
    vehicleType: "",
    vehicleNumber: "",
    userLocation: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const serviceTypes = [
    "Towing",
    "Battery Jumpstart",
    "Flat Tire",
    "Fuel Delivery",
    "Engine Repair",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const requestBody = {
        userId: 1,
        serviceType: formData.serviceType,
        vehicleType: formData.vehicleType,
        vehicleNumber: formData.vehicleNumber,
        userLocation: formData.userLocation,
        description: formData.description,
      };

      const response = await fetch(`${API_BASE_URL}/service-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Service request created successfully!");

        setFormData({
          serviceType: "",
          vehicleType: "",
          vehicleNumber: "",
          userLocation: "",
          description: "",
        });
      } else {
        alert("Failed to create request");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Request Roadside Assistance</h1>

          <p className="text-slate-400 mt-2">
            Get instant roadside help from nearby verified mechanics.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5"
        >
          <div>
            <label className="block mb-2 text-slate-300">
              Service Type
            </label>

            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
            >
              <option value="">Select Service</option>

              {serviceTypes.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Vehicle Type
            </label>

            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              placeholder="Car / Bike / Truck"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Vehicle Number
            </label>

            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="BR01AB1234"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Current Location
            </label>

            <input
              type="text"
              name="userLocation"
              value={formData.userLocation}
              onChange={handleChange}
              placeholder="Patna, Bihar"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Problem Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue..."
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating Request..." : "Request Assistance"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestService;
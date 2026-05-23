import { useState } from "react";

const API_BASE_URL = "http://localhost:8081/api";

function FeaturedListing() {
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(false);

  const pricePerDay = 49;
  const totalPrice = days * pricePerDay;

  const handleFeaturedListing = async () => {
    try {
      setLoading(true);

      const mechanicId = localStorage.getItem("mechanicId") || 1;

      const response = await fetch(`${API_BASE_URL}/featured-listing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mechanicId: mechanicId,
          days: days,
          amount: totalPrice,
        }),
      });

      if (response.ok) {
        alert("Your profile is now featured successfully!");
      } else {
        alert("Featured listing request failed.");
      }
    } catch (error) {
      console.error("Featured listing error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Featured Mechanic Listing</h1>
          <p className="text-slate-400">
            Promote your mechanic profile and appear higher in customer search
            results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Why Featured Listing?</h2>

            <ul className="space-y-4 text-slate-300">
              <li>🚀 Higher visibility to nearby users</li>
              <li>📍 Better ranking in emergency searches</li>
              <li>💰 More chances of paid bookings</li>
              <li>⭐ Professional highlighted profile</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-blue-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-5">Create Featured Listing</h2>

            <label className="block text-slate-300 mb-2">
              Select listing duration
            </label>

            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 mb-5 text-white"
            >
              <option value={7}>7 Days</option>
              <option value={15}>15 Days</option>
              <option value={30}>30 Days</option>
            </select>

            <div className="bg-slate-800 rounded-xl p-4 mb-5">
              <p className="text-slate-400">Price per day</p>
              <p className="text-xl font-semibold">₹{pricePerDay}</p>

              <p className="text-slate-400 mt-4">Total Amount</p>
              <p className="text-3xl font-bold text-blue-400">₹{totalPrice}</p>
            </div>

            <button
              onClick={handleFeaturedListing}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 font-semibold transition"
            >
              {loading ? "Processing..." : "Pay & Feature My Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedListing;
import { useState } from "react";

function MechanicSubscription() {
  const [mechanicId, setMechanicId] = useState("");

  const plans = [
    {
      name: "BASIC",
      price: 499,
      durationDays: 30,
      features: ["Profile visibility", "Accept service requests"],
    },
    {
      name: "PRO",
      price: 999,
      durationDays: 30,
      features: ["Higher ranking", "More leads", "Priority support"],
    },
    {
      name: "PREMIUM",
      price: 1499,
      durationDays: 30,
      features: ["Top ranking", "Featured badge", "Maximum customer reach"],
    },
  ];

  const handleBuyPlan = (planName) => {
    if (!mechanicId) {
      alert("Please enter Mechanic ID");
      return;
    }

    alert(`${planName} plan selected for Mechanic ID ${mechanicId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-blue-400 text-sm font-semibold">
            ResQRide Mechanic Panel
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Mechanic Subscription Plans
          </h1>

          <p className="text-slate-400 mt-3">
            Upgrade your plan to increase visibility, get more bookings, and
            grow your earnings.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-10">
          <label className="block text-slate-300 mb-3">Mechanic ID</label>

          <input
            type="number"
            value={mechanicId}
            onChange={(e) => setMechanicId(e.target.value)}
            placeholder="Enter mechanic id"
            className="w-full md:w-80 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-7 hover:border-blue-500 transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{plan.name}</h2>

                {plan.name === "PREMIUM" && (
                  <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                    BEST
                  </span>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-5xl font-extrabold">₹{plan.price}</h3>

                <p className="text-slate-400 mt-2">
                  {plan.durationDays} Days
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleBuyPlan(plan.name)}
                className="w-full mt-10 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-semibold transition"
              >
                Buy Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MechanicSubscription;
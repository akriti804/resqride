import { Link } from "react-router-dom";
import { MapPin, ShieldCheck, Wrench, Clock, Car, UserCheck } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-red-400">ResQRide</h1>

        <div className="flex gap-4">
          <Link to="/login" className="text-slate-300 hover:text-white">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-red-400 font-semibold mb-4">
            24/7 Roadside Assistance Platform
          </p>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Get instant help when your vehicle breaks down.
          </h2>

          <p className="text-slate-300 text-lg mb-8">
            ResQRide connects vehicle owners with verified mechanics and towing
            partners for emergency repair, towing, flat tire, fuel delivery and
            battery jump-start services.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold"
            >
              Request Assistance
            </Link>

            <Link
              to="/login"
              className="border border-white/20 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="grid gap-5">
            <FeatureCard
              icon={<MapPin className="text-red-400" />}
              title="Auto Location Detection"
              text="Users can detect their breakdown location automatically."
            />

            <FeatureCard
              icon={<ShieldCheck className="text-green-400" />}
              title="Verified Mechanics"
              text="Admin verifies mechanics before they accept service jobs."
            />

            <FeatureCard
              icon={<Clock className="text-yellow-400" />}
              title="Live Status Updates"
              text="Track request status from pending to completed."
            />
          </div>
        </div>
      </section>

      <section className="px-8 pb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          How ResQRide Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <StepCard
            number="01"
            title="User Requests Help"
            text="Vehicle owner selects service type, vehicle and location."
          />

          <StepCard
            number="02"
            title="Mechanic Accepts"
            text="Verified mechanic accepts the request and updates job status."
          />

          <StepCard
            number="03"
            title="Service Completed"
            text="User can view service history and admin can monitor reports."
          />
        </div>
      </section>

      <section className="px-8 pb-20">
        <div className="grid md:grid-cols-4 gap-5">
          <ServiceCard icon={<Car />} title="Breakdown Repair" />
          <ServiceCard icon={<Wrench />} title="Towing Service" />
          <ServiceCard icon={<Clock />} title="Battery Jump-start" />
          <ServiceCard icon={<UserCheck />} title="Flat Tire Repair" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex gap-4">
      {icon}
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-slate-400 mt-1">{text}</p>
      </div>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
      <p className="text-red-400 font-bold mb-3">{number}</p>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400">{text}</p>
    </div>
  );
}

function ServiceCard({ icon, title }) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-3">
      <div className="text-red-400">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}

export default Home;
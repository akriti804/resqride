export function getStatusBadge(status) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";

    case "ACCEPTED":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";

    case "ON_THE_WAY":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";

    case "REACHED":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30";

    case "IN_PROGRESS":
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";

    case "COMPLETED":
      return "bg-green-500/20 text-green-300 border-green-500/30";

    case "REJECTED":
      return "bg-red-500/20 text-red-300 border-red-500/30";

    case "CANCELLED":
      return "bg-red-500/20 text-red-300 border-red-500/30";

    default:
      return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  }
}

export function formatStatus(status) {
  return status ? status.replaceAll("_", " ") : "UNKNOWN";
}
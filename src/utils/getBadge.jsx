// src/utils/statusBadge.js

export const STATUS_CONFIG = {
  available: {
    label: "Available",
    style: "bg-blue-100 text-blue-700",
  },
  "in-transit": {
    label: "In Transit",
    style: "bg-purple-100 text-purple-700",
  },
  approved: {
    label: "Approved",
    style: "bg-green-100 text-green-700",
  },
  rejected: {
    label: "Rejected",
    style: "bg-red-100 text-red-600",
  },
  pending: {
    label: "Pending-pickup",
    style: "bg-yellow-100 text-yellow-700",
  },
};

export const getBadge = (key) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap";

  const config = STATUS_CONFIG[key] || {
    label: "N/A",
    style: "bg-gray-100 text-gray-600",
  };

  return (
    <span className={`${base} ${config.style}`}>
      {config.label}
    </span>
  );
};
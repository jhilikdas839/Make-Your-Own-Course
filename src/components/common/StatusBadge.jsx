const COLORS = {
  green: "bg-green-50 text-green-600",
  yellow: "bg-yellow-50 text-yellow-700",
  red: "bg-red-50 text-red-600",
  blue: "bg-primary/10 text-primary",
  gray: "bg-gray-100 text-gray-600",
};

const STATUS_COLOR = {
  Published: "green", Active: "green", Paid: "green", Completed: "green", Approved: "green",
  Resolved: "green", Visible: "green", Live: "green", Success: "green",
  Pending: "yellow", Draft: "yellow", "In Progress": "yellow", Open: "yellow", Processing: "yellow",
  Upcoming: "blue", Scheduled: "blue", New: "blue",
  Rejected: "red", Blocked: "red", Failed: "red", Refunded: "red", Hidden: "red", Cancelled: "red",
  Closed: "gray",
};

function StatusBadge({ status }) {
  const color = COLORS[STATUS_COLOR[status] || "gray"];
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${color}`}>
      {status}
    </span>
  );
}

export default StatusBadge;

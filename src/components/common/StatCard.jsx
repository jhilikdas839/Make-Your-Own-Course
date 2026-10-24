const TONES = {
  primary: "bg-primary/10 text-primary",
  blue: "bg-blue-50 text-blue-500",
  green: "bg-green-50 text-green-500",
  yellow: "bg-yellow-50 text-yellow-500",
  purple: "bg-purple-50 text-purple-500",
  red: "bg-red-50 text-red-500",
  orange: "bg-orange-50 text-orange-500",
};

function StatCard({ label, value, icon, tone = "primary", hint }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-400">{label}</p>
          <h3 className="mt-2 truncate text-2xl font-semibold text-[#10131d] md:text-3xl">{value}</h3>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
      {hint && <p className="mt-3 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export default StatCard;

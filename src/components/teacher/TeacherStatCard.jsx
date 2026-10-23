
function TeacherStatCard({ title, value, change, icon, color, bgColor }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">

      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor} ${color}`}
        >
          <i className={`${icon} text-2xl`}></i>
        </div>
      </div>

      {/* Bottom Section */}
      {change && (
        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
            <i className="ri-arrow-up-line"></i>
            {change}
          </span>

          <span className="text-xs text-gray-400">
            vs last month
          </span>
        </div>
      )}

    </div>
  );
}

export default TeacherStatCard;

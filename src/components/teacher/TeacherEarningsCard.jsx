
function TeacherEarningsCard({
  totalEarnings = 85400,
  monthlyEarnings = 12500,
  pendingPayout = 4500,
  growth = 18.5,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Earnings Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your course revenue
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <i className="ri-wallet-3-line text-2xl"></i>
        </div>
      </div>

      {/* Total Earnings */}
      <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">
        <p className="text-sm text-blue-100">
          Total Earnings
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          ₹{Number(totalEarnings).toLocaleString("en-IN")}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1">
            <i className="ri-arrow-up-line"></i>
            {growth}%
          </span>

          <span className="text-blue-100">
            Growth this month
          </span>
        </div>
      </div>

      {/* Earnings Details */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Monthly Earnings */}
        <div className="rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <i className="ri-calendar-line text-lg text-blue-600"></i>

            <p className="text-sm text-gray-500">
              This Month
            </p>
          </div>

          <h4 className="mt-3 text-xl font-bold text-gray-900">
            ₹{Number(monthlyEarnings).toLocaleString("en-IN")}
          </h4>
        </div>

        {/* Pending Payout */}
        <div className="rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <i className="ri-time-line text-lg text-orange-500"></i>

            <p className="text-sm text-gray-500">
              Pending Payout
            </p>
          </div>

          <h4 className="mt-3 text-xl font-bold text-gray-900">
            ₹{Number(pendingPayout).toLocaleString("en-IN")}
          </h4>
        </div>

      </div>

      {/* Footer */}
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
      >
        View Earnings Details
        <i className="ri-arrow-right-line"></i>
      </button>

    </div>
  );
}

export default TeacherEarningsCard;

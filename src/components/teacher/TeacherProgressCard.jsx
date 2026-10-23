
const progressData = [
  {
    title: "Completed",
    students: 156,
    percentage: 65,
    color: "bg-green-500",
    textColor: "text-green-600",
  },
  {
    title: "In Progress",
    students: 72,
    percentage: 25,
    color: "bg-blue-500",
    textColor: "text-blue-600",
  },
  {
    title: "Needs Attention",
    students: 18,
    percentage: 10,
    color: "bg-orange-500",
    textColor: "text-orange-600",
  },
];

function TeacherProgressCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Student Progress
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your students' learning progress
        </p>
      </div>

      {/* Total Students */}
      <div className="mb-6 rounded-xl bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-600">
          Total Students
        </p>

        <h3 className="mt-1 text-3xl font-bold text-gray-900">
          246
        </h3>
      </div>

      {/* Progress List */}
      <div className="space-y-5">
        {progressData.map((item) => (
          <div key={item.title}>

            {/* Title and Percentage */}
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                ></span>

                <span className="text-sm font-medium text-gray-700">
                  {item.title}
                </span>
              </div>

              <span className={`text-sm font-semibold ${item.textColor}`}>
                {item.percentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>

            {/* Student Count */}
            <p className="mt-2 text-xs text-gray-400">
              {item.students} students
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}

export default TeacherProgressCard;

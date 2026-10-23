
const activities = [
  {
    id: 1,
    name: "Rahul Sharma",
    action: "enrolled in your course",
    target: "React JS Complete Course",
    time: "5 minutes ago",
    icon: "ri-user-add-line",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    name: "Priya Das",
    action: "submitted an assignment",
    target: "JavaScript Basics",
    time: "20 minutes ago",
    icon: "ri-file-check-line",
    color: "bg-green-50 text-green-600",
  },
  {
    id: 3,
    name: "Amit Roy",
    action: "gave a new review",
    target: "HTML & CSS Masterclass",
    time: "1 hour ago",
    icon: "ri-star-line",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    id: 4,
    name: "Sneha Paul",
    action: "completed your course",
    target: "Web Design Fundamentals",
    time: "2 hours ago",
    icon: "ri-checkbox-circle-line",
    color: "bg-purple-50 text-purple-600",
  },
];

function TeacherActivity() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            What's happening in your courses
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">

            {/* Activity Icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}
            >
              <i className={`${activity.icon} text-lg`}></i>
            </div>

            {/* Activity Details */}
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-6 text-gray-600">
                <span className="font-semibold text-gray-900">
                  {activity.name}
                </span>{" "}
                {activity.action}
              </p>

              <p className="truncate text-sm font-medium text-blue-600">
                {activity.target}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {activity.time}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default TeacherActivity;

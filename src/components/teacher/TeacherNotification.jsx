
const notifications = [
  {
    id: 1,
    title: "New Student Enrolled",
    message: "A new student joined your React JS course.",
    time: "5 minutes ago",
    icon: "ri-user-add-line",
    color: "bg-blue-50 text-blue-600",
    unread: true,
  },
  {
    id: 2,
    title: "Assignment Submitted",
    message: "A student submitted a JavaScript assignment.",
    time: "20 minutes ago",
    icon: "ri-file-check-line",
    color: "bg-green-50 text-green-600",
    unread: true,
  },
  {
    id: 3,
    title: "New Course Review",
    message: "Your course received a new 5-star review.",
    time: "1 hour ago",
    icon: "ri-star-line",
    color: "bg-yellow-50 text-yellow-600",
    unread: false,
  },
  {
    id: 4,
    title: "Payment Update",
    message: "Your latest payout is being processed.",
    time: "3 hours ago",
    icon: "ri-wallet-3-line",
    color: "bg-purple-50 text-purple-600",
    unread: false,
  },
];

function TeacherNotification() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Notifications
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your activities
          </p>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
          {notifications.filter((item) => item.unread).length}
        </span>
      </div>

      {/* Notification List */}
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-3 py-4 first:pt-0 last:pb-0 ${
              notification.unread ? "bg-blue-50/40" : ""
            }`}
          >

            {/* Icon */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notification.color}`}
            >
              <i className={`${notification.icon} text-xl`}></i>
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-800">
                  {notification.title}
                </h3>

                {notification.unread && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600"></span>
                )}
              </div>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                {notification.message}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {notification.time}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Footer */}
      <button
        type="button"
        className="mt-5 w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
      >
        View All Notifications
      </button>

    </div>
  );
}

export default TeacherNotification;


import { Link } from "react-router-dom";

const actions = [
  {
    title: "Create Course",
    description: "Create a new course",
    icon: "ri-add-circle-line",
    path: "/teacher/create-course",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Live Class",
    description: "Schedule a live class",
    icon: "ri-live-line",
    path: "/teacher/live-classes",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Assignment",
    description: "Create an assignment",
    icon: "ri-file-list-3-line",
    path: "/teacher/assignments",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Announcement",
    description: "Share an announcement",
    icon: "ri-megaphone-line",
    path: "/teacher/announcements",
    color: "bg-green-50 text-green-600",
  },
];

function TeacherQuickAction() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.path}
            className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color}`}
            >
              <i className={`${action.icon} text-2xl`}></i>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-800 transition group-hover:text-blue-600">
                {action.title}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {action.description}
              </p>
            </div>

            <i className="ri-arrow-right-line text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600"></i>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default TeacherQuickAction;

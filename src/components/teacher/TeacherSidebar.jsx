
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: "ri-dashboard-line", path: "/teacher" },
      { name: "My Courses", icon: "ri-book-open-line", path: "/teacher/courses" },
      { name: "Create Course", icon: "ri-add-circle-line", path: "/teacher/create-course" },
      { name: "Students", icon: "ri-group-line", path: "/teacher/students" },
      { name: "Assignments", icon: "ri-file-list-3-line", path: "/teacher/assignments" },
      { name: "Assessments", icon: "ri-survey-line", path: "/teacher/assessments" },
      { name: "Live Classes", icon: "ri-live-line", path: "/teacher/live-classes" },
      { name: "Recordings", icon: "ri-video-line", path: "/teacher/recordings" },
      { name: "Discussions", icon: "ri-chat-3-line", path: "/teacher/discussions" },
      { name: "Announcements", icon: "ri-megaphone-line", path: "/teacher/announcements" },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { name: "Course Analytics", icon: "ri-bar-chart-box-line", path: "/teacher/analytics" },
      { name: "Student Progress", icon: "ri-line-chart-line", path: "/teacher/student-progress" },
      { name: "Reviews & Ratings", icon: "ri-star-line", path: "/teacher/reviews" },
    ],
  },
  {
    title: "EARNINGS",
    items: [
      { name: "Earnings Overview", icon: "ri-wallet-3-line", path: "/teacher/earnings" },
      { name: "Transactions", icon: "ri-exchange-dollar-line", path: "/teacher/transactions" },
      { name: "Payouts", icon: "ri-bank-card-line", path: "/teacher/payouts" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { name: "Profile", icon: "ri-user-line", path: "/teacher/profile" },
      { name: "Settings", icon: "ri-settings-3-line", path: "/teacher/settings" },
      { name: "Help & Support", icon: "ri-customer-service-2-line", path: "/teacher/support" },
    ],
  },
];

function TeacherSidebar() {
  return (
    <aside className="flex h-screen w-[270px] shrink-0 flex-col border-r border-gray-200 bg-white">

      {/* Logo */}
      <div className="flex h-[76px] items-center gap-3 border-b border-gray-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
          <i className="ri-graduation-cap-line"></i>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            MYOC
          </h2>
          <p className="text-xs text-gray-500">Teacher Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {menuItems.map((section) => (
          <div key={section.title}>
            <p className="mb-3 px-3 text-[11px] font-semibold tracking-[1.5px] text-gray-400">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/teacher"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`
                  }
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Teacher Profile */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            T
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">
              Teacher Name
            </p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>

          <i className="ri-more-2-fill text-lg text-gray-500"></i>
        </div>
      </div>

    </aside>
  );
}

export default TeacherSidebar;

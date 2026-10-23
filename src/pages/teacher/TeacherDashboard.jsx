
import { useNavigate } from "react-router-dom";

import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";
import TeacherStatCard from "../../components/teacher/TeacherStatCard";
import TeacherCourseCard from "../../components/teacher/TeacherCourseCard";

function TeacherDashboard() {
  const navigate = useNavigate();

  // Demo data: later connect with backend
  const courses = [
    {
      id: 1,
      title: "React JS Masterclass",
      category: "Development",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      students: 86,
      rating: 4.8,
      progress: 78,
      status: "Published",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
      students: 64,
      rating: 4.9,
      progress: 65,
      status: "Published",
    },
    {
      id: 3,
      title: "JavaScript for Beginners",
      category: "Development",
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
      students: 96,
      rating: 4.7,
      progress: 88,
      status: "Published",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "New student enrolled",
      description: "A student joined React JS Masterclass.",
      time: "10 minutes ago",
      icon: "ri-user-add-line",
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      title: "New assignment submitted",
      description: "A student submitted a JavaScript assignment.",
      time: "1 hour ago",
      icon: "ri-file-list-3-line",
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: 3,
      title: "New course review",
      description: "You received a new 5-star review.",
      time: "3 hours ago",
      icon: "ri-star-line",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="min-h-full space-y-8 bg-[#f8f8f5] pb-6">
      {/* Welcome Header */}
      <TeacherPageHeader
        title="Welcome Back, Teacher! 👋"
        description="Here's what's happening with your courses today."
        buttonText="Create Course"
        buttonIcon="ri-add-line"
        onButtonClick={() => navigate("/teacher/create-course")}
      />

      {/* Overview */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your teaching performance at a glance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <TeacherStatCard
            title="Total Courses"
            value="12"
            change="12%"
            icon="ri-book-open-line"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />

          <TeacherStatCard
            title="Total Students"
            value="246"
            change="18%"
            icon="ri-group-line"
            color="text-purple-600"
            bgColor="bg-purple-50"
          />

          <TeacherStatCard
            title="Total Earnings"
            value="₹85,400"
            change="15%"
            icon="ri-wallet-3-line"
            color="text-green-600"
            bgColor="bg-green-50"
          />

          <TeacherStatCard
            title="Average Rating"
            value="4.8/5"
            change="5%"
            icon="ri-star-line"
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>
      </section>

      {/* My Courses */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-blue-600">
              Keep Teaching
            </p>

            <h2 className="text-xl font-semibold text-gray-900">
              My Courses
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your courses and track enrollment.
            </p>
          </div>

          <button
            onClick={() => navigate("/teacher/courses")}
            className="shrink-0 text-sm font-medium text-blue-600 transition hover:text-blue-800"
          >
            View All <i className="ri-arrow-right-line ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <TeacherCourseCard key={course.id} {...course} />
          ))}
        </div>
      </section>

      {/* Student Progress & Recent Activity */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Student Progress */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Student Progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track how your students are learning.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
              <i className="ri-bar-chart-grouped-line" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Course Completion
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  78%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Assignment Completion
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  64%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{ width: "64%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Assessment Success
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  86%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: "86%" }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/teacher/student-progress")}
            className="mt-6 w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            View Student Progress
          </button>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest updates from your courses.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
              <i className="ri-notification-3-line" />
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                >
                  <i className={activity.icon} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {activity.description}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/teacher/announcements")}
            className="mt-5 text-sm font-medium text-blue-600 transition hover:text-blue-800"
          >
            View All Activity
            <i className="ri-arrow-right-line ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default TeacherDashboard;

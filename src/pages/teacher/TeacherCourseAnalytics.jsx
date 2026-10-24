import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const enrollmentData = [
  { month: "May", students: 28 },
  { month: "Jun", students: 42 },
  { month: "Jul", students: 36 },
  { month: "Aug", students: 58 },
  { month: "Sep", students: 72 },
  { month: "Oct", students: 94 },
];

const initialCourses = [
  {
    id: 1,
    name: "React JS Masterclass",
    category: "Development",
    students: 245,
    views: 1840,
    completion: 78,
    rating: 4.8,
    engagement: 86,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "JavaScript Fundamentals",
    category: "Development",
    students: 198,
    views: 1520,
    completion: 72,
    rating: 4.7,
    engagement: 79,
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "UI/UX Design",
    category: "Design",
    students: 156,
    views: 1260,
    completion: 68,
    rating: 4.9,
    engagement: 91,
    color: "bg-orange-500",
  },
  {
    id: 4,
    name: "Frontend Development",
    category: "Development",
    students: 132,
    views: 980,
    completion: 61,
    rating: 4.6,
    engagement: 74,
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Tailwind CSS Basics",
    category: "Development",
    students: 104,
    views: 760,
    completion: 83,
    rating: 4.8,
    engagement: 88,
    color: "bg-pink-500",
  },
];

function StatCard({ title, value, subtitle, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${colorClasses[color]}`}
        >
          <i className={icon} />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function TeacherCourseAnalytics() {
  const [courses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortBy, setSortBy] = useState("students");

  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0
  );

  const totalViews = courses.reduce(
    (sum, course) => sum + course.views,
    0
  );

  const averageCompletion = courses.length
    ? Math.round(
        courses.reduce(
          (sum, course) => sum + course.completion,
          0
        ) / courses.length
      )
    : 0;

  const averageRating = courses.length
    ? (
        courses.reduce((sum, course) => sum + course.rating, 0) /
        courses.length
      ).toFixed(1)
    : "0.0";

  const filteredCourses = useMemo(() => {
    const result = courses.filter((course) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All Categories" ||
        course.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "students") {
        return b.students - a.students;
      }

      if (sortBy === "views") {
        return b.views - a.views;
      }

      if (sortBy === "completion") {
        return b.completion - a.completion;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return a.name.localeCompare(b.name);
    });
  }, [courses, search, categoryFilter, sortBy]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      <TeacherPageHeader
        title="Course Analytics"
        description="Understand course performance, student engagement and enrollment trends."
      />

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={courses.length}
          subtitle="Courses being tracked"
          icon="ri-book-open-line"
          color="blue"
        />

        <StatCard
          title="Total Enrollments"
          value={totalStudents.toLocaleString("en-IN")}
          subtitle="Across all listed courses"
          icon="ri-user-add-line"
          color="green"
        />

        <StatCard
          title="Average Completion"
          value={`${averageCompletion}%`}
          subtitle="Average across courses"
          icon="ri-checkbox-circle-line"
          color="purple"
        />

        <StatCard
          title="Total Views"
          value={totalViews.toLocaleString("en-IN")}
          subtitle="Combined course views"
          icon="ri-eye-line"
          color="orange"
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[#172033]">
                Enrollment Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monthly enrollment trend
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
              Last 6 months
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={enrollmentData}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="enrollmentGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                      stopOpacity={0.2}
                    />

                    <stop
                      offset="95%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#edf0f4"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b93a1", fontSize: 12 }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b93a1", fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="students"
                  name="Enrollments"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#enrollmentGradient)"
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course performance chart */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#172033]">
            Course Completion
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Completion percentage
          </p>

          <div className="mt-5 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courses}
                layout="vertical"
                margin={{ top: 0, right: 12, left: 4, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#edf0f4"
                />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "#8b93a1", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={105}
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value) => [`${value}%`, "Completion"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />

                <Bar
                  dataKey="completion"
                  fill="#2563eb"
                  radius={[0, 6, 6, 0]}
                  barSize={17}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Course performance list */}
      <section className="rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#172033]">
            Course Performance
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Compare student engagement and performance across courses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:p-5 lg:flex-row">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-xl border border-gray-200 bg-[#f8f8f5] py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option>All Categories</option>
            <option>Development</option>
            <option>Design</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="students">Most Students</option>
            <option value="views">Most Views</option>
            <option value="completion">Highest Completion</option>
            <option value="rating">Highest Rating</option>
            <option value="name">Course Name</option>
          </select>
        </div>

        {/* Responsive course cards */}
        <div className="space-y-4 p-4 sm:p-5">
          {filteredCourses.length === 0 ? (
            <div className="py-12 text-center">
              <i className="ri-bar-chart-box-line text-4xl text-gray-300" />

              <h3 className="mt-3 font-semibold text-gray-800">
                No courses found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or category.
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <article
                key={course.id}
                className="rounded-2xl border border-gray-200 p-4 transition hover:border-gray-300 sm:p-5"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl text-white ${course.color}`}
                    >
                      <i className="ri-book-open-line" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#172033]">
                        {course.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {course.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-medium text-amber-700">
                      <i className="ri-star-fill" />
                      {course.rating.toFixed(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Metric
                      label="Students"
                      value={course.students.toLocaleString("en-IN")}
                      icon="ri-user-line"
                    />

                    <Metric
                      label="Course Views"
                      value={course.views.toLocaleString("en-IN")}
                      icon="ri-eye-line"
                    />

                    <Metric
                      label="Completion"
                      value={`${course.completion}%`}
                      icon="ri-checkbox-circle-line"
                    />

                    <Metric
                      label="Engagement"
                      value={`${course.engagement}%`}
                      icon="ri-pulse-line"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="text-gray-500">
                        Student completion
                      </span>

                      <span className="font-semibold text-[#172033]">
                        {course.completion}%
                      </span>
                    </div>

                    <div
                      className="h-2 overflow-hidden rounded-full bg-gray-100"
                      role="progressbar"
                      aria-label={`${course.name} completion`}
                      aria-valuenow={course.completion}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full rounded-full transition-all ${course.color}`}
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-blue-600">
            <i className="ri-lightbulb-line" />
          </div>

          <div>
            <h3 className="font-semibold text-[#172033]">
              Analytics Summary
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Your courses have an average completion rate of{" "}
              <strong>{averageCompletion}%</strong> and an average rating of{" "}
              <strong>{averageRating}/5</strong>. Use these insights to identify
              courses that may need additional lessons, resources or student
              support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, icon }) {
  return (
    <div className="rounded-xl bg-[#f8f8f5] p-3">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <i className={`${icon} text-sm`} />
        {label}
      </div>

      <p className="mt-2 text-lg font-semibold text-[#172033]">
        {value}
      </p>
    </div>
  );
}

export default TeacherCourseAnalytics;
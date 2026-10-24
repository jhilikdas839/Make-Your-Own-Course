import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/common/PageHeader";

const studentsData = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    course: "React JS Masterclass",
    progress: 78,
    joined: "12 Oct 2026",
    status: "Active",
    avatar: "AS",
  },
  {
    id: 2,
    name: "Priya Das",
    email: "priya.das@example.com",
    course: "UI/UX Design",
    progress: 92,
    joined: "10 Oct 2026",
    status: "Active",
    avatar: "PD",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    course: "JavaScript Fundamentals",
    progress: 45,
    joined: "08 Oct 2026",
    status: "Active",
    avatar: "RV",
  },
  {
    id: 4,
    name: "Sneha Roy",
    email: "sneha.roy@example.com",
    course: "React JS Masterclass",
    progress: 100,
    joined: "05 Oct 2026",
    status: "Completed",
    avatar: "SR",
  },
  {
    id: 5,
    name: "Aditya Singh",
    email: "aditya.singh@example.com",
    course: "UI/UX Design",
    progress: 28,
    joined: "03 Oct 2026",
    status: "Active",
    avatar: "AS",
  },
  {
    id: 6,
    name: "Riya Mukherjee",
    email: "riya.m@example.com",
    course: "JavaScript Fundamentals",
    progress: 65,
    joined: "01 Oct 2026",
    status: "Active",
    avatar: "RM",
  },
];

function TeacherStudents() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const courses = [
    "All Courses",
    ...new Set(studentsData.map((student) => student.course)),
  ];

  const filteredStudents = useMemo(() => {
    return studentsData.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchesCourse =
        selectedCourse === "All Courses" ||
        student.course === selectedCourse;

      const matchesStatus =
        selectedStatus === "All Status" ||
        student.status === selectedStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [search, selectedCourse, selectedStatus]);

  const totalStudents = studentsData.length;

  const activeStudents = studentsData.filter(
    (student) => student.status === "Active"
  ).length;

  const completedStudents = studentsData.filter(
    (student) => student.progress === 100
  ).length;

  const averageProgress = Math.round(
    studentsData.reduce((total, student) => total + student.progress, 0) /
      totalStudents
  );

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: "ri-group-line",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Active Learners",
      value: activeStudents,
      icon: "ri-user-follow-line",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Course Completed",
      value: completedStudents,
      icon: "ri-checkbox-circle-line",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Average Progress",
      value: `${averageProgress}%`,
      icon: "ri-bar-chart-line",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* Page Header */}
      <TeacherPageHeader
        title="Students"
        description="Manage your learners and track their course progress."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <i className={`${stat.icon} text-xl`} />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Student Table */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Students
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View student details and learning progress.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary/40 sm:w-60"
                />
              </div>

              {/* Course Filter */}
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-primary/40"
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-primary/40"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {student.avatar}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.course}
                  </td>

                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-gray-500">Completed</span>
                        <span className="font-medium text-gray-700">
                          {student.progress}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {student.joined}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        student.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="px-6 py-12 text-center">
              <i className="ri-user-search-line text-3xl text-gray-300" />
              <p className="mt-3 text-sm font-medium text-gray-700">
                No students found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try another search term or filter.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Student Cards */}
        <div className="space-y-3 p-4 md:hidden">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {student.avatar}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {student.name}
                  </h3>
                  <p className="mt-1 break-all text-xs text-gray-500">
                    {student.email}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {student.course}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    student.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs text-gray-500">
                  <span>Course Progress</span>
                  <span className="font-medium text-gray-700">
                    {student.progress}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(student)}
                className="mt-4 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                View Details
              </button>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-gray-700">
                No students found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {filteredStudents.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-800">
              {totalStudents}
            </span>{" "}
            students
          </p>
        </div>
      </section>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {selectedStudent.avatar}
                </div>

                <div>
                  <h2
                    id="student-modal-title"
                    className="font-semibold text-gray-900"
                  >
                    {selectedStudent.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Student ID: {selectedStudent.id}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                aria-label="Close student details"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="mt-1 break-all text-sm font-medium text-gray-800">
                  {selectedStudent.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Enrolled Course</p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {selectedStudent.course}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Joined Date</p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {selectedStudent.joined}
                </p>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Course Progress</span>
                  <span className="font-semibold text-gray-900">
                    {selectedStudent.progress}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${selectedStudent.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-sm text-gray-500">Current Status</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    selectedStudent.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherStudents;
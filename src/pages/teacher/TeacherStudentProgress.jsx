import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/common/PageHeader";

const initialStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    initials: "AS",
    course: "React JS Masterclass",
    completedLessons: 32,
    totalLessons: 40,
    lastActive: "Today",
    enrolledDate: "Oct 10, 2026",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    initials: "PV",
    course: "JavaScript Fundamentals",
    completedLessons: 18,
    totalLessons: 30,
    lastActive: "Yesterday",
    enrolledDate: "Oct 08, 2026",
  },
  {
    id: 3,
    name: "Rahul Das",
    email: "rahul.das@example.com",
    initials: "RD",
    course: "React JS Masterclass",
    completedLessons: 8,
    totalLessons: 40,
    lastActive: "12 days ago",
    enrolledDate: "Sep 25, 2026",
  },
  {
    id: 4,
    name: "Ananya Singh",
    email: "ananya.singh@example.com",
    initials: "AS",
    course: "UI/UX Design",
    completedLessons: 24,
    totalLessons: 24,
    lastActive: "Today",
    enrolledDate: "Sep 12, 2026",
  },
  {
    id: 5,
    name: "Rohan Gupta",
    email: "rohan.gupta@example.com",
    initials: "RG",
    course: "JavaScript Fundamentals",
    completedLessons: 12,
    totalLessons: 30,
    lastActive: "8 days ago",
    enrolledDate: "Oct 02, 2026",
  },
  {
    id: 6,
    name: "Sneha Roy",
    email: "sneha.roy@example.com",
    initials: "SR",
    course: "UI/UX Design",
    completedLessons: 15,
    totalLessons: 24,
    lastActive: "Today",
    enrolledDate: "Oct 14, 2026",
  },
  {
    id: 7,
    name: "Aditya Kumar",
    email: "aditya.kumar@example.com",
    initials: "AK",
    course: "React JS Masterclass",
    completedLessons: 40,
    totalLessons: 40,
    lastActive: "Yesterday",
    enrolledDate: "Sep 05, 2026",
  },
  {
    id: 8,
    name: "Meera Das",
    email: "meera.das@example.com",
    initials: "MD",
    course: "JavaScript Fundamentals",
    completedLessons: 5,
    totalLessons: 30,
    lastActive: "15 days ago",
    enrolledDate: "Oct 01, 2026",
  },
];

const getProgress = (student) =>
  Math.round(
    (student.completedLessons / student.totalLessons) * 100
  );

const getProgressStatus = (student) => {
  const progress = getProgress(student);

  if (progress === 100) return "Completed";
  if (
    student.lastActive.includes("days ago") &&
    parseInt(student.lastActive) >= 7
  ) {
    return "At Risk";
  }
  if (progress >= 70) return "On Track";

  return "In Progress";
};

function TeacherStudentProgress() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("progress-low");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const courses = [
    "All Courses",
    ...new Set(students.map((student) => student.course)),
  ];

  const stats = useMemo(() => {
    const total = students.length;

    const averageProgress = total
      ? Math.round(
          students.reduce(
            (sum, student) => sum + getProgress(student),
            0
          ) / total
        )
      : 0;

    const atRisk = students.filter(
      (student) => getProgressStatus(student) === "At Risk"
    ).length;

    const completed = students.filter(
      (student) => getProgressStatus(student) === "Completed"
    ).length;

    return {
      total,
      averageProgress,
      atRisk,
      completed,
    };
  }, [students]);

  const filteredStudents = useMemo(() => {
    const result = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchesCourse =
        selectedCourse === "All Courses" ||
        student.course === selectedCourse;

      const matchesStatus =
        selectedStatus === "All Status" ||
        getProgressStatus(student) === selectedStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "progress-low") {
        return getProgress(a) - getProgress(b);
      }

      if (sortBy === "progress-high") {
        return getProgress(b) - getProgress(a);
      }

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });
  }, [students, search, selectedCourse, selectedStatus, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCourse("All Courses");
    setSelectedStatus("All Status");
    setSortBy("progress-low");
  };

  const handleExportCSV = () => {
    const headers = [
      "Student Name",
      "Email",
      "Course",
      "Completed Lessons",
      "Total Lessons",
      "Progress",
      "Status",
      "Last Active",
    ];

    const rows = filteredStudents.map((student) => [
      student.name,
      student.email,
      student.course,
      student.completedLessons,
      student.totalLessons,
      `${getProgress(student)}%`,
      getProgressStatus(student),
      student.lastActive,
    ]);

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "student-progress.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleMarkCompleted = (studentId) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              completedLessons: student.totalLessons,
            }
          : student
      )
    );

    setSelectedStudent((previousStudent) =>
      previousStudent?.id === studentId
        ? {
            ...previousStudent,
            completedLessons: previousStudent.totalLessons,
          }
        : previousStudent
    );
  };

  const getStatusStyle = (status) => {
    const styles = {
      Completed: "bg-emerald-50 text-emerald-700",
      "On Track": "bg-primary/10 text-primary",
      "In Progress": "bg-amber-50 text-amber-700",
      "At Risk": "bg-red-50 text-red-600",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-emerald-500";
    if (progress < 30) return "bg-red-400";
    if (progress < 60) return "bg-amber-400";

    return "bg-primary";
  };

  const statCards = [
    {
      title: "Students Tracked",
      value: stats.total,
      subtitle: "Across all courses",
      icon: "ri-group-line",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      title: "Average Completion",
      value: `${stats.averageProgress}%`,
      subtitle: "Overall course progress",
      icon: "ri-bar-chart-box-line",
      iconBg: "bg-violet-50 text-violet-600",
    },
    {
      title: "At-Risk Students",
      value: stats.atRisk,
      subtitle: "May need your attention",
      icon: "ri-error-warning-line",
      iconBg: "bg-red-50 text-red-500",
    },
    {
      title: "Completed Courses",
      value: stats.completed,
      subtitle: "Students finished a course",
      icon: "ri-checkbox-circle-line",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-8">
      {/* Page Header */}
      <TeacherPageHeader
        title="Student Progress"
        description="Track student learning progress and identify students who may need extra support."
      />

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                  {card.value}
                </h2>

                <p className="mt-2 text-xs text-gray-500">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${card.iconBg}`}
              >
                <i className={card.icon}></i>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Overview */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Learning Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Average completion across your current student list.
            </p>
          </div>

          <span className="text-2xl font-bold text-primary">
            {stats.averageProgress}%
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${stats.averageProgress}%` }}
          ></div>
        </div>

        <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-gray-500">
          <span>0% Complete</span>
          <span>100% Complete</span>
        </div>
      </section>

      {/* Student List */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Individual Student Progress
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Search, filter and review individual learning activity.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            disabled={filteredStudents.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="ri-download-2-line text-lg"></i>
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <select
            value={selectedCourse}
            onChange={(event) => setSelectedCourse(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-primary/40"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-primary/40"
          >
            {[
              "All Status",
              "Completed",
              "On Track",
              "In Progress",
              "At Risk",
            ].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-primary/40"
          >
            <option value="progress-low">Lowest Progress</option>
            <option value="progress-high">Highest Progress</option>
            <option value="name">Student Name</option>
          </select>

          <button
            type="button"
            onClick={handleResetFilters}
            className="text-left text-sm font-medium text-primary hover:text-primary sm:col-span-2 lg:col-span-4"
          >
            <i className="ri-refresh-line mr-1"></i>
            Reset filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Course
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Progress
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Last Active
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => {
                const progress = getProgress(student);
                const status = getProgressStatus(student);

                return (
                  <tr
                    key={student.id}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {student.initials}
                        </div>

                        <div>
                          <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                            {student.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="max-w-[180px] text-sm text-gray-700">
                        {student.course}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {student.enrolledDate}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="w-36">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-gray-800">
                            {progress}%
                          </span>

                          <span className="text-xs text-gray-500">
                            {student.completedLessons}/{student.totalLessons}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all ${getProgressColor(progress)}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>

                        <p className="mt-1.5 text-[11px] text-gray-500">
                          Lessons completed
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.lastActive}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(status)}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
                      >
                        View Details
                        <i className="ri-arrow-right-line"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-400">
                <i className="ri-user-search-line"></i>
              </div>

              <h3 className="mt-4 text-base font-semibold text-gray-900">
                No students found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {filteredStudents.length} of {students.length} students
          </span>

          <span>Sorted by your selected preference</span>
        </div>
      </section>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900/50 p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
                  {selectedStudent.initials}
                </div>

                <div>
                  <h2
                    id="student-modal-title"
                    className="text-lg font-bold text-gray-900"
                  >
                    {selectedStudent.name}
                  </h2>

                  <p className="mt-1 break-all text-sm text-gray-500">
                    {selectedStudent.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close student details"
                onClick={() => setSelectedStudent(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mt-7 rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Enrolled Course</p>

              <h3 className="mt-1 font-semibold text-gray-900">
                {selectedStudent.course}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Enrolled on {selectedStudent.enrolledDate}
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-600">
                  Course Completion
                </span>

                <span className="text-xl font-bold text-primary">
                  {getProgress(selectedStudent)}%
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${getProgressColor(getProgress(selectedStudent))}`}
                  style={{
                    width: `${getProgress(selectedStudent)}%`,
                  }}
                ></div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Lessons Completed
                  </p>

                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {selectedStudent.completedLessons}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Total Lessons
                  </p>

                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {selectedStudent.totalLessons}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-4">
              <div>
                <p className="text-xs text-gray-500">Progress Status</p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(getProgressStatus(selectedStudent))}`}
                >
                  {getProgressStatus(selectedStudent)}
                </span>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Last Active</p>

                <p className="mt-2 text-sm font-semibold text-gray-800">
                  {selectedStudent.lastActive}
                </p>
              </div>
            </div>

            {getProgress(selectedStudent) < 100 && (
              <button
                type="button"
                onClick={() => handleMarkCompleted(selectedStudent.id)}
                className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <i className="ri-checkbox-circle-line mr-2"></i>
                Demo: Mark Course Completed
              </button>
            )}

            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherStudentProgress;
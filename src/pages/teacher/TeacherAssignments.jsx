import React, { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const initialAssignments = [
  {
    id: 1,
    title: "Build a React Todo App",
    course: "React JS Masterclass",
    dueDate: "2026-10-28",
    submissions: 18,
    totalStudents: 24,
    status: "Published",
    description: "Create a Todo application using React components and hooks.",
  },
  {
    id: 2,
    title: "JavaScript Array Methods",
    course: "JavaScript Fundamentals",
    dueDate: "2026-10-25",
    submissions: 12,
    totalStudents: 20,
    status: "Published",
    description: "Solve practical problems using map, filter and reduce.",
  },
  {
    id: 3,
    title: "Landing Page Design",
    course: "UI/UX Design",
    dueDate: "2026-11-02",
    submissions: 8,
    totalStudents: 18,
    status: "Published",
    description: "Design a responsive landing page in Figma.",
  },
  {
    id: 4,
    title: "React Props Practice",
    course: "React JS Masterclass",
    dueDate: "2026-11-05",
    submissions: 0,
    totalStudents: 24,
    status: "Draft",
    description: "Practice passing data between React components.",
  },
];

const emptyForm = {
  title: "",
  course: "React JS Masterclass",
  dueDate: "",
  description: "",
};

function TeacherAssignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const publishedAssignments = assignments.filter(
    (item) => item.status === "Published"
  ).length;

  const totalSubmissions = assignments.reduce(
    (total, item) => total + item.submissions,
    0
  );

  const pendingSubmissions = assignments.reduce(
    (total, item) =>
      total +
      (item.status === "Published"
        ? Math.max(item.totalStudents - item.submissions, 0)
        : 0),
    0
  );

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assignments, search, statusFilter]);

  const stats = [
    {
      title: "Total Assignments",
      value: assignments.length,
      icon: "ri-file-list-3-line",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Published",
      value: publishedAssignments,
      icon: "ri-checkbox-circle-line",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Submissions",
      value: totalSubmissions,
      icon: "ri-upload-cloud-2-line",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Pending Submissions",
      value: pendingSubmissions,
      icon: "ri-time-line",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setShowForm(true);
  };

  const openEditForm = (assignment) => {
    setEditingId(assignment.id);
    setForm({
      title: assignment.title,
      course: assignment.course,
      dueDate: assignment.dueDate,
      description: assignment.description,
    });
    setMessage("");
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.dueDate || !form.description.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (editingId !== null) {
      setAssignments((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, ...form }
            : item
        )
      );
      setMessage("Assignment updated successfully.");
    } else {
      const newAssignment = {
        id: Date.now(),
        ...form,
        submissions: 0,
        totalStudents: 24,
        status: "Draft",
      };

      setAssignments((previous) => [newAssignment, ...previous]);
      setMessage("Assignment created as a draft.");
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const togglePublish = (id) => {
    setAssignments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  const deleteAssignment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    setAssignments((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setSelectedAssignment(null);
  };

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isOverdue = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return new Date(`${date}T00:00:00`) < today;
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* Header */}
      <TeacherPageHeader
        title="Assignments"
        description="Create assignments, manage deadlines and track student submissions."
        buttonText="Create Assignment"
        buttonIcon="ri-add-line"
        onButtonClick={openCreateForm}
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

      {/* Assignment List */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Assignments
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your course assignments in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assignments..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 xl:grid-cols-2">
          {filteredAssignments.map((assignment) => {
            const submissionPercentage =
              assignment.totalStudents > 0
                ? Math.round(
                    (assignment.submissions / assignment.totalStudents) * 100
                  )
                : 0;

            return (
              <article
                key={assignment.id}
                className="rounded-2xl border border-gray-100 p-5 transition hover:border-blue-100 hover:shadow-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <i className="ri-file-text-line text-xl" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {assignment.course}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      assignment.status === "Published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
                  {assignment.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <i className="ri-calendar-line text-base" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>

                  {assignment.status === "Published" &&
                    isOverdue(assignment.dueDate) && (
                      <span className="text-xs font-medium text-red-600">
                        Deadline passed
                      </span>
                    )}
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Student submissions</span>
                    <span className="font-medium text-gray-800">
                      {assignment.submissions}/{assignment.totalStudents}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${submissionPercentage}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    {submissionPercentage}% submitted
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedAssignment(assignment)}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <i className="ri-eye-line mr-1.5" />
                    View
                  </button>

                  <button
                    onClick={() => openEditForm(assignment)}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <i className="ri-edit-line mr-1.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => togglePublish(assignment.id)}
                    className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      assignment.status === "Published"
                        ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {assignment.status === "Published"
                      ? "Unpublish"
                      : "Publish"}
                  </button>
                </div>

                <button
                  onClick={() => deleteAssignment(assignment.id)}
                  className="mt-3 w-full rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  <i className="ri-delete-bin-line mr-1.5" />
                  Delete Assignment
                </button>
              </article>
            );
          })}

          {filteredAssignments.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <i className="ri-file-search-line text-4xl text-gray-300" />
              <p className="mt-3 font-medium text-gray-700">
                No assignments found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try another search or create a new assignment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Create / Edit Assignment Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId !== null ? "Edit Assignment" : "Create Assignment"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add assignment details and set a deadline.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setMessage("");
                }}
                aria-label="Close form"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Assignment Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="e.g. Build a React Todo App"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  value={form.course}
                  onChange={(e) =>
                    setForm({ ...form, course: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>React JS Masterclass</option>
                  <option>JavaScript Fundamentals</option>
                  <option>UI/UX Design</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description / Instructions
                </label>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Explain what students need to complete..."
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>

              {message && (
                <p className="text-sm text-red-600">{message}</p>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setMessage("");
                  }}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {editingId !== null ? "Save Changes" : "Create Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onClick={() => setSelectedAssignment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="assignment-details-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  Assignment Details
                </p>
                <h2
                  id="assignment-details-title"
                  className="mt-2 text-xl font-semibold text-gray-900"
                >
                  {selectedAssignment.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedAssignment.course}
                </p>
              </div>

              <button
                onClick={() => setSelectedAssignment(null)}
                aria-label="Close assignment details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Instructions</p>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {selectedAssignment.description}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  {formatDate(selectedAssignment.dueDate)}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs text-gray-500">Status</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  {selectedAssignment.status}
                </p>
              </div>

              <div className="col-span-2 rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-gray-600">Submissions received</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedAssignment.submissions} /{" "}
                    {selectedAssignment.totalStudents}
                  </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${
                        selectedAssignment.totalStudents > 0
                          ? (selectedAssignment.submissions /
                              selectedAssignment.totalStudents) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedAssignment(null)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAssignments;
import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/common/PageHeader";

const initialClasses = [
  {
    id: 1,
    title: "React Hooks Explained",
    course: "React JS Masterclass",
    date: "2026-10-25",
    time: "18:00",
    duration: 60,
    meetingLink: "https://meet.google.com/",
    status: "Scheduled",
    description: "Learn useState, useEffect and custom hooks.",
  },
  {
    id: 2,
    title: "JavaScript Interview Preparation",
    course: "JavaScript Fundamentals",
    date: "2026-10-26",
    time: "19:00",
    duration: 45,
    meetingLink: "https://meet.google.com/",
    status: "Scheduled",
    description: "Practice common JavaScript interview questions.",
  },
  {
    id: 3,
    title: "UI Design Principles",
    course: "UI/UX Design",
    date: "2026-10-20",
    time: "17:00",
    duration: 60,
    meetingLink: "https://meet.google.com/",
    status: "Completed",
    description: "Understand spacing, typography and visual hierarchy.",
  },
];

const emptyForm = {
  title: "",
  course: "React JS Masterclass",
  date: "",
  time: "18:00",
  duration: "60",
  meetingLink: "",
  description: "",
};

function TeacherLiveClasses() {
  const [classes, setClasses] = useState(initialClasses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  const filteredClasses = useMemo(() => {
    return classes.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [classes, search, statusFilter]);

  const scheduledCount = classes.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const completedCount = classes.filter(
    (item) => item.status === "Completed"
  ).length;

  const totalMinutes = classes.reduce(
    (total, item) =>
      item.status === "Completed" ? total + Number(item.duration) : total,
    0
  );

  const stats = [
    {
      title: "Total Classes",
      value: classes.length,
      icon: "ri-live-line",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Upcoming Classes",
      value: scheduledCount,
      icon: "ri-calendar-event-line",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Completed Classes",
      value: completedCount,
      icon: "ri-checkbox-circle-line",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Teaching Hours",
      value: `${(totalMinutes / 60).toFixed(1)} hrs`,
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

  const openEditForm = (liveClass) => {
    setEditingId(liveClass.id);
    setForm({
      title: liveClass.title,
      course: liveClass.course,
      date: liveClass.date,
      time: liveClass.time,
      duration: String(liveClass.duration),
      meetingLink: liveClass.meetingLink,
      description: liveClass.description,
    });
    setMessage("");
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const duration = Number(form.duration);

    if (!form.title.trim() || !form.date || !form.time || duration <= 0) {
      setMessage("Please fill in all required fields correctly.");
      return;
    }

    if (form.meetingLink.trim()) {
      try {
        const parsedUrl = new URL(form.meetingLink);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          setMessage("Please enter a valid HTTP or HTTPS meeting link.");
          return;
        }
      } catch {
        setMessage("Please enter a valid meeting URL.");
        return;
      }
    }

    const updatedClass = {
      ...form,
      duration,
      status:
        editingId !== null
          ? classes.find((item) => item.id === editingId)?.status || "Scheduled"
          : "Scheduled",
    };

    if (editingId !== null) {
      setClasses((previous) =>
        previous.map((item) =>
          item.id === editingId ? { ...item, ...updatedClass } : item
        )
      );
    } else {
      setClasses((previous) => [
        {
          id: Date.now(),
          ...updatedClass,
        },
        ...previous,
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  };

  const deleteClass = (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    setClasses((previous) => previous.filter((item) => item.id !== id));
    setSelectedClass(null);
  };

  const markCompleted = (id) => {
    setClasses((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "Completed" } : item
      )
    );

    setSelectedClass((previous) =>
      previous && previous.id === id
        ? { ...previous, status: "Completed" }
        : previous
    );
  };

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isUpcoming = (liveClass) => {
    if (liveClass.status !== "Scheduled") return false;

    const classDate = new Date(
      `${liveClass.date}T${liveClass.time}:00`
    );

    return classDate >= new Date();
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* Page Header */}
      <TeacherPageHeader
        title="Live Classes"
        description="Schedule online classes and manage your live teaching sessions."
        buttonText="Schedule Class"
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

      {/* Classes Section */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Your Classes
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your scheduled sessions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search classes..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary/40 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-primary/40"
            >
              <option value="All">All Classes</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 xl:grid-cols-2">
          {filteredClasses.map((liveClass) => (
            <article
              key={liveClass.id}
              className="rounded-2xl border border-gray-100 p-5 transition hover:border-primary/40 hover:shadow-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <i className="ri-video-chat-line text-xl" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {liveClass.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {liveClass.course}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    liveClass.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {liveClass.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {liveClass.description}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <i className="ri-calendar-line text-lg text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {formatDate(liveClass.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <i className="ri-time-line text-lg text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Time & Duration</p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {formatTime(liveClass.time)} · {liveClass.duration} min
                    </p>
                  </div>
                </div>
              </div>

              {liveClass.status === "Scheduled" && (
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <i className="ri-information-line" />
                  {isUpcoming(liveClass)
                    ? "Upcoming session"
                    : "Scheduled time has passed"}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                <button
                  onClick={() => setSelectedClass(liveClass)}
                  className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <i className="ri-eye-line mr-1.5" />
                  Details
                </button>

                <button
                  onClick={() => openEditForm(liveClass)}
                  className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <i className="ri-edit-line mr-1.5" />
                  Edit
                </button>

                {liveClass.status === "Scheduled" && (
                  <button
                    onClick={() => markCompleted(liveClass.id)}
                    className="flex-1 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                  >
                    Mark Completed
                  </button>
                )}
              </div>

              <button
                onClick={() => deleteClass(liveClass.id)}
                className="mt-3 w-full rounded-xl px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <i className="ri-delete-bin-line mr-1.5" />
                Delete Class
              </button>
            </article>
          ))}

          {filteredClasses.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <i className="ri-calendar-close-line text-4xl text-gray-300" />
              <p className="mt-3 font-medium text-gray-700">
                No classes found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try another search or schedule a new class.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Schedule / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId !== null ? "Edit Live Class" : "Schedule Live Class"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the session details below.
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Class Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="e.g. React Hooks Explained"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Course *
                </label>
                <select
                  value={form.course}
                  onChange={(e) =>
                    setForm({ ...form, course: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
                >
                  <option>React JS Masterclass</option>
                  <option>JavaScript Fundamentals</option>
                  <option>UI/UX Design</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) =>
                      setForm({ ...form, time: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    value={form.meetingLink}
                    onChange={(e) =>
                      setForm({ ...form, meetingLink: e.target.value })
                    }
                    placeholder="https://meet.google.com/..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="What will students learn in this session?"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40"
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
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/90"
                >
                  {editingId !== null ? "Save Changes" : "Schedule Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onClick={() => setSelectedClass(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="live-class-details-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-primary">
                  Live Session
                </p>
                <h2
                  id="live-class-details-title"
                  className="mt-2 text-xl font-semibold text-gray-900"
                >
                  {selectedClass.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedClass.course}
                </p>
              </div>

              <button
                onClick={() => setSelectedClass(null)}
                aria-label="Close class details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Description</p>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {selectedClass.description || "No description added."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    {formatDate(selectedClass.date)}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Start Time</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    {formatTime(selectedClass.time)}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    {selectedClass.duration} minutes
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    {selectedClass.status}
                  </p>
                </div>
              </div>

              {selectedClass.meetingLink && (
                <a
                  href={selectedClass.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90"
                >
                  <i className="ri-external-link-line" />
                  Open Meeting Link
                </a>
              )}

              {selectedClass.status === "Scheduled" && (
                <button
                  onClick={() => markCompleted(selectedClass.id)}
                  className="w-full rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                >
                  <i className="ri-checkbox-circle-line mr-1.5" />
                  Mark as Completed
                </button>
              )}
            </div>

            <button
              onClick={() => setSelectedClass(null)}
              className="mt-4 w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherLiveClasses;
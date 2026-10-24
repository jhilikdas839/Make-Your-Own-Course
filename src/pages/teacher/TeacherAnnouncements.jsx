import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const initialAnnouncements = [
  {
    id: 1,
    title: "Welcome to the React JS Masterclass!",
    course: "React JS Masterclass",
    category: "General",
    priority: "Important",
    status: "Published",
    date: "2026-10-23",
    message:
      "Welcome everyone! We are excited to have you in this course. Please review the course outline and complete the first lesson before our next live class.",
    pinned: true,
  },
  {
    id: 2,
    title: "Live Class Scheduled for Tomorrow",
    course: "JavaScript Fundamentals",
    category: "Class Update",
    priority: "Normal",
    status: "Published",
    date: "2026-10-22",
    message:
      "Our next live class will cover JavaScript functions and array methods. Please bring your questions and revise the previous lessons.",
    pinned: true,
  },
  {
    id: 3,
    title: "Assignment Submission Reminder",
    course: "Frontend Development",
    category: "Deadline",
    priority: "Important",
    status: "Published",
    date: "2026-10-21",
    message:
      "Please review your pending assignments and submit your work before the deadline mentioned on the assignment page.",
    pinned: false,
  },
  {
    id: 4,
    title: "New Learning Resources",
    course: "UI/UX Design",
    category: "Resources",
    priority: "Normal",
    status: "Draft",
    date: "2026-10-20",
    message:
      "Additional design resources and practice files will be shared with you shortly.",
    pinned: false,
  },
];

const emptyForm = {
  title: "",
  course: "",
  category: "General",
  priority: "Normal",
  status: "Draft",
  date: new Date().toISOString().slice(0, 10),
  message: "",
  pinned: false,
};

const statusStyles = {
  Published: "bg-green-50 text-green-700",
  Draft: "bg-gray-100 text-gray-700",
};

const categoryStyles = {
  General: "bg-blue-50 text-blue-700",
  "Class Update": "bg-purple-50 text-purple-700",
  Deadline: "bg-orange-50 text-orange-700",
  Resources: "bg-teal-50 text-teal-700",
};

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TeacherAnnouncements() {
  const [announcements, setAnnouncements] = useState(
    initialAnnouncements
  );

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const courses = useMemo(
    () => [...new Set(announcements.map((item) => item.course))],
    [announcements]
  );

  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((item) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
          item.title.toLowerCase().includes(searchValue) ||
          item.message.toLowerCase().includes(searchValue) ||
          item.course.toLowerCase().includes(searchValue);

        const matchesCourse =
          courseFilter === "All Courses" ||
          item.course === courseFilter;

        const matchesStatus =
          statusFilter === "All Status" ||
          item.status === statusFilter;

        return matchesSearch && matchesCourse && matchesStatus;
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [announcements, search, courseFilter, statusFilter]);

  const publishedCount = announcements.filter(
    (item) => item.status === "Published"
  ).length;

  const draftCount = announcements.filter(
    (item) => item.status === "Draft"
  ).length;

  const pinnedCount = announcements.filter(
    (item) => item.pinned
  ).length;

  const openCreateForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
  };

  const openEditForm = (announcement) => {
    setEditingId(announcement.id);

    setForm({
      title: announcement.title,
      course: announcement.course,
      category: announcement.category,
      priority: announcement.priority,
      status: announcement.status,
      date: announcement.date,
      message: announcement.message,
      pinned: announcement.pinned,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.course.trim() || !form.message.trim()) {
      alert("Please complete the title, course and message.");
      return;
    }

    const announcementData = {
      ...form,
      title: form.title.trim(),
      course: form.course.trim(),
      message: form.message.trim(),
    };

    if (editingId !== null) {
      setAnnouncements((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, ...announcementData }
            : item
        )
      );
    } else {
      setAnnouncements((previous) => [
        {
          id: Date.now(),
          ...announcementData,
        },
        ...previous,
      ]);
    }

    closeForm();
  };

  const togglePublish = (id) => {
    setAnnouncements((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  const togglePin = (id) => {
    setAnnouncements((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      )
    );
  };

  const deleteAnnouncement = (announcement) => {
    const confirmed = window.confirm(
      `Delete "${announcement.title}"?`
    );

    if (!confirmed) return;

    setAnnouncements((previous) =>
      previous.filter((item) => item.id !== announcement.id)
    );
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      <TeacherPageHeader
        title="Announcements"
        description="Share important updates, reminders and learning information with your students."
        buttonText="Create Announcement"
        buttonIcon="ri-add-line"
        onButtonClick={openCreateForm}
      />

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Announcements"
          value={announcements.length}
          icon="ri-megaphone-line"
          color="blue"
        />

        <StatCard
          title="Published"
          value={publishedCount}
          icon="ri-checkbox-circle-line"
          color="green"
        />

        <StatCard
          title="Drafts"
          value={draftCount}
          icon="ri-draft-line"
          color="orange"
        />

        <StatCard
          title="Pinned"
          value={pinnedCount}
          icon="ri-pushpin-line"
          color="purple"
        />
      </section>

      {/* Search and filters */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search announcements..."
              className="w-full rounded-xl border border-gray-200 bg-[#f8f8f5] py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option>All Courses</option>

            {courses.map((course) => (
              <option key={course}>{course}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </section>

      {/* Announcement list */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#172033]">
            All Announcements
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredAnnouncements.length} announcements found
          </p>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <i className="ri-megaphone-line text-4xl text-gray-300" />

            <h3 className="mt-3 font-semibold text-gray-800">
              No announcements found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing the search or filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCourseFilter("All Courses");
                setStatusFilter("All Status");
              }}
              className="mt-4 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <article
                key={announcement.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                    <i className="ri-megaphone-line" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-[#172033]">
                        {announcement.title}
                      </h3>

                      {announcement.pinned && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                          <i className="ri-pushpin-fill" />
                          Pinned
                        </span>
                      )}

                      {announcement.priority === "Important" && (
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                          Important
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          categoryStyles[announcement.category] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {announcement.category}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[announcement.status]}`}
                      >
                        {announcement.status}
                      </span>
                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {announcement.message}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <i className="ri-book-open-line text-sm" />
                        {announcement.course}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <i className="ri-calendar-line text-sm" />
                        {formatDate(announcement.date)}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(announcement)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <i className="ri-edit-line" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePublish(announcement.id)}
                        className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                          announcement.status === "Published"
                            ? "border border-gray-200 text-gray-700 hover:bg-gray-50"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        <i
                          className={
                            announcement.status === "Published"
                              ? "ri-eye-off-line"
                              : "ri-send-plane-line"
                          }
                        />

                        {announcement.status === "Published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => togglePin(announcement.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <i
                          className={
                            announcement.pinned
                              ? "ri-pushpin-fill"
                              : "ri-pushpin-line"
                          }
                        />

                        {announcement.pinned ? "Unpin" : "Pin"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteAnnouncement(announcement)}
                        className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <i className="ri-delete-bin-line" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Create / Edit modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-semibold text-[#172033]">
                  {editingId !== null
                    ? "Edit Announcement"
                    : "Create Announcement"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Share an update with your students.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Announcement Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter announcement title"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course Name *
                  </label>

                  <input
                    type="text"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    list="announcement-courses"
                    required
                    placeholder="Enter course name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                  <datalist id="announcement-courses">
                    {courses.map((course) => (
                      <option key={course} value={course} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option>General</option>
                    <option>Class Update</option>
                    <option>Deadline</option>
                    <option>Resources</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option>Normal</option>
                    <option>Important</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Announcement Message *
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Write your announcement here..."
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-500"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="pinned"
                  checked={form.pinned}
                  onChange={handleChange}
                  className="h-4 w-4 accent-blue-600"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-800">
                    Pin this announcement
                  </span>

                  <span className="mt-1 block text-xs text-gray-500">
                    Pinned announcements appear at the top of the list.
                  </span>
                </span>
              </label>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  {editingId !== null
                    ? "Save Changes"
                    : "Create Announcement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
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
    </div>
  );
}

export default TeacherAnnouncements;
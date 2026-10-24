import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const initialRecordings = [
  {
    id: 1,
    title: "React Hooks Explained",
    course: "React JS Masterclass",
    date: "2026-10-20",
    duration: 45,
    views: 128,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=dpw9EHDh2bM",
    description: "Understanding React Hooks and their practical usage.",
  },
  {
    id: 2,
    title: "JavaScript Array Methods",
    course: "JavaScript Fundamentals",
    date: "2026-10-18",
    duration: 38,
    views: 96,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=R8rmfD9Y5-c",
    description: "Learn commonly used JavaScript array methods.",
  },
  {
    id: 3,
    title: "UI Design Fundamentals",
    course: "UI/UX Design",
    date: "2026-10-15",
    duration: 52,
    views: 0,
    status: "Draft",
    videoUrl: "",
    description: "An introduction to UI design fundamentals.",
  },
  {
    id: 4,
    title: "Tailwind CSS Basics",
    course: "Frontend Development",
    date: "2026-10-12",
    duration: 35,
    views: 74,
    status: "Published",
    videoUrl: "https://www.youtube.com/watch?v=ft30zcMlFao",
    description: "Build responsive interfaces using Tailwind CSS.",
  },
];

const emptyForm = {
  title: "",
  course: "",
  date: new Date().toISOString().slice(0, 10),
  duration: "",
  videoUrl: "",
  description: "",
  status: "Draft",
};

function getVideoEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com"
    ) {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : "";
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    if (hostname === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id && /^\d+$/.test(id)
        ? `https://player.vimeo.com/video/${id}`
        : "";
    }

    if (hostname === "player.vimeo.com") {
      return url;
    }

    if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
      return url;
    }

    return "";
  } catch {
    return "";
  }
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TeacherRecordings() {
  const [recordings, setRecordings] = useState(initialRecordings);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);

  const courses = useMemo(
    () => [...new Set(recordings.map((item) => item.course))],
    [recordings]
  );

  const filteredRecordings = useMemo(() => {
    return recordings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase());

      const matchesCourse =
        courseFilter === "All Courses" || item.course === courseFilter;

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [recordings, search, courseFilter, statusFilter]);

  const totalViews = recordings.reduce((sum, item) => sum + item.views, 0);

  const totalMinutes = recordings.reduce(
    (sum, item) => sum + Number(item.duration || 0),
    0
  );

  const publishedCount = recordings.filter(
    (item) => item.status === "Published"
  ).length;

  const openCreateForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
  };

  const openEditForm = (recording) => {
    setEditingId(recording.id);

    setForm({
      title: recording.title,
      course: recording.course,
      date: recording.date,
      duration: String(recording.duration),
      videoUrl: recording.videoUrl,
      description: recording.description,
      status: recording.status,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.course.trim()) {
      alert("Please enter the recording title and course.");
      return;
    }

    if (!form.videoUrl.trim()) {
      alert("Please enter a video URL.");
      return;
    }

    const isSupportedVideo = getVideoEmbedUrl(form.videoUrl);

    if (!isSupportedVideo) {
      alert(
        "Please enter a valid YouTube, Vimeo, MP4, WebM or OGG video URL."
      );
      return;
    }

    const duration = Number(form.duration);

    if (!Number.isFinite(duration) || duration <= 0) {
      alert("Please enter a valid duration in minutes.");
      return;
    }

    const recordingData = {
      ...form,
      title: form.title.trim(),
      course: form.course.trim(),
      duration,
      videoUrl: form.videoUrl.trim(),
      description: form.description.trim(),
    };

    if (editingId !== null) {
      setRecordings((previous) =>
        previous.map((item) =>
          item.id === editingId ? { ...item, ...recordingData } : item
        )
      );
    } else {
      setRecordings((previous) => [
        {
          id: Date.now(),
          ...recordingData,
          views: 0,
        },
        ...previous,
      ]);
    }

    closeForm();
  };

  const togglePublish = (id) => {
    setRecordings((previous) =>
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

  const deleteRecording = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recording?"
    );

    if (!confirmed) return;

    setRecordings((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (preview?.id === id) {
      setPreview(null);
    }
  };

  const playRecording = (recording) => {
    setPreview(recording);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      <TeacherPageHeader
        title="Recordings"
        description="Manage your recorded lectures and share them with your students."
        buttonText="Add Recording"
        buttonIcon="ri-add-line"
        onButtonClick={openCreateForm}
      />

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Recordings"
          value={recordings.length}
          icon="ri-video-line"
          color="blue"
          subtitle="All recorded lectures"
        />

        <StatCard
          title="Published"
          value={publishedCount}
          icon="ri-checkbox-circle-line"
          color="green"
          subtitle="Available to students"
        />

        <StatCard
          title="Total Views"
          value={totalViews.toLocaleString("en-IN")}
          icon="ri-eye-line"
          color="purple"
          subtitle="Across all recordings"
        />

        <StatCard
          title="Total Duration"
          value={`${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`}
          icon="ri-time-line"
          color="orange"
          subtitle="Combined lecture duration"
        />
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search recordings or courses..."
              className="w-full rounded-xl border border-gray-200 bg-[#f8f8f5] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
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

      {/* Recording list */}
      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#172033]">
              Your Recordings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredRecordings.length} recordings found
            </p>
          </div>
        </div>

        {filteredRecordings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
              <i className="ri-video-line" />
            </div>

            <h3 className="mt-4 font-semibold text-gray-800">
              No recordings found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or add a new recording.
            </p>

            <button
              onClick={openCreateForm}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Add Recording
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRecordings.map((recording) => (
              <article
                key={recording.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-blue-700">
                  <div className="absolute left-4 top-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        recording.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {recording.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => playRecording(recording)}
                    aria-label={`Preview ${recording.title}`}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-2xl text-blue-700 shadow-lg transition hover:scale-110"
                  >
                    <i className="ri-play-fill" />
                  </button>

                  <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 text-xs text-white">
                    {recording.duration} min
                  </span>
                </div>

                <div className="p-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-blue-600">
                    {recording.course}
                  </p>

                  <h3 className="line-clamp-1 text-base font-semibold text-[#172033]">
                    {recording.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {recording.description || "No description added."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-100 pb-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <i className="ri-calendar-line text-sm" />
                      {formatDate(recording.date)}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <i className="ri-eye-line text-sm" />
                      {recording.views} views
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => playRecording(recording)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      <i className="ri-play-circle-line text-base" />
                      Preview
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditForm(recording)}
                      title="Edit recording"
                      aria-label="Edit recording"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      <i className="ri-edit-line" />
                    </button>

                    <button
                      type="button"
                      onClick={() => togglePublish(recording.id)}
                      title={
                        recording.status === "Published"
                          ? "Unpublish recording"
                          : "Publish recording"
                      }
                      aria-label={
                        recording.status === "Published"
                          ? "Unpublish recording"
                          : "Publish recording"
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    >
                      <i
                        className={
                          recording.status === "Published"
                            ? "ri-eye-off-line"
                            : "ri-send-plane-line"
                        }
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteRecording(recording.id)}
                      title="Delete recording"
                      aria-label="Delete recording"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
                    >
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Add / Edit recording modal */}
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
                  {editingId !== null ? "Edit Recording" : "Add Recording"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add the details of your recorded lecture.
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
                  Recording Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Introduction to React Hooks"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course Name *
                  </label>

                  <input
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    list="recording-courses"
                    required
                    placeholder="Enter course name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                  <datalist id="recording-courses">
                    {courses.map((course) => (
                      <option key={course} value={course} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Recording Date *
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
                    Duration (minutes) *
                  </label>

                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={form.duration}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 45"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
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
                  Video URL *
                </label>

                <input
                  type="url"
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Supported: YouTube, Vimeo, or a direct MP4, WebM or OGG URL.
                  The video must allow embedding or playback.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="What will students learn in this recording?"
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

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
                  {editingId !== null ? "Save Changes" : "Add Recording"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/80 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPreview(null);
          }}
        >
          <div className="my-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
              <div className="min-w-0">
                <h2 className="truncate font-semibold text-gray-900">
                  {preview.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {preview.course}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreview(null)}
                aria-label="Close preview"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="aspect-video bg-black">
              {getVideoEmbedUrl(preview.videoUrl).includes("/embed/") ||
              getVideoEmbedUrl(preview.videoUrl).includes(
                "player.vimeo.com/video/"
              ) ? (
                <iframe
                  src={getVideoEmbedUrl(preview.videoUrl)}
                  title={preview.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : getVideoEmbedUrl(preview.videoUrl) ? (
                <video
                  src={getVideoEmbedUrl(preview.videoUrl)}
                  controls
                  playsInline
                  className="h-full w-full"
                >
                  Your browser does not support HTML video.
                </video>
              ) : (
                <div className="flex h-full items-center justify-center p-5 text-center text-white">
                  This video URL cannot be previewed.
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5">
              <p className="text-sm leading-6 text-gray-600">
                {preview.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color, subtitle }) {
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
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${
            colorClasses[color]
          }`}
        >
          <i className={icon} />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

export default TeacherRecordings;

import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/common/PageHeader";

const initialDiscussions = [
  {
    id: 1,
    student: "Aarav Sharma",
    initials: "AS",
    color: "bg-primary/15 text-primary",
    course: "React JS Masterclass",
    title: "Why do we use useEffect?",
    question:
      "Can someone explain why we use useEffect instead of calling an API directly inside a component?",
    date: "2026-10-23T09:30:00",
    status: "Unanswered",
    replies: [],
  },
  {
    id: 2,
    student: "Priya Singh",
    initials: "PS",
    color: "bg-pink-100 text-pink-700",
    course: "JavaScript Fundamentals",
    title: "Difference between map and forEach",
    question:
      "I understand both methods loop through an array, but when should I use map instead of forEach?",
    date: "2026-10-22T14:20:00",
    status: "Answered",
    replies: [
      {
        id: 201,
        author: "You",
        message:
          "Use map when you want to create a new array from the results. Use forEach when you want to perform an action for each item without creating a new array.",
        date: "2026-10-22T15:00:00",
      },
    ],
  },
  {
    id: 3,
    student: "Rohan Das",
    initials: "RD",
    color: "bg-purple-100 text-purple-700",
    course: "Frontend Development",
    title: "Tailwind responsive classes",
    question:
      "How do sm:, md: and lg: classes work in Tailwind CSS? Which one should I use for mobile screens?",
    date: "2026-10-21T11:10:00",
    status: "Resolved",
    replies: [
      {
        id: 301,
        author: "You",
        message:
          "Tailwind uses mobile-first breakpoints. Base classes apply by default, while sm:, md: and lg: apply at their respective minimum screen widths.",
        date: "2026-10-21T12:00:00",
      },
    ],
  },
  {
    id: 4,
    student: "Ananya Roy",
    initials: "AR",
    color: "bg-orange-100 text-orange-700",
    course: "React JS Masterclass",
    title: "When should I use Context API?",
    question:
      "Should I use Context API for all state management, or only for some types of data?",
    date: "2026-10-20T16:40:00",
    status: "Unanswered",
    replies: [],
  },
  {
    id: 5,
    student: "Rahul Verma",
    initials: "RV",
    color: "bg-green-100 text-green-700",
    course: "UI/UX Design",
    title: "Figma Auto Layout question",
    question:
      "How can I keep equal spacing between cards when the screen size changes?",
    date: "2026-10-19T10:15:00",
    status: "Answered",
    replies: [
      {
        id: 501,
        author: "You",
        message:
          "Use Auto Layout with an appropriate spacing value. For responsive layouts, also check the resizing settings and constraints of each child element.",
        date: "2026-10-19T11:00:00",
      },
    ],
  },
];

const statusStyles = {
  Unanswered: "bg-amber-50 text-amber-700",
  Answered: "bg-primary/10 text-primary",
  Resolved: "bg-green-50 text-green-700",
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TeacherDiscussions() {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeDiscussion, setActiveDiscussion] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editingReplyText, setEditingReplyText] = useState("");

  const courses = useMemo(
    () => [...new Set(discussions.map((item) => item.course))],
    [discussions]
  );

  const filteredDiscussions = useMemo(() => {
    return discussions.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.question.toLowerCase().includes(searchValue) ||
        item.student.toLowerCase().includes(searchValue);

      const matchesCourse =
        courseFilter === "All Courses" || item.course === courseFilter;

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [discussions, search, courseFilter, statusFilter]);

  const unansweredCount = discussions.filter(
    (item) => item.status === "Unanswered"
  ).length;

  const answeredCount = discussions.filter(
    (item) => item.status === "Answered"
  ).length;

  const resolvedCount = discussions.filter(
    (item) => item.status === "Resolved"
  ).length;

  const openDiscussion = (discussion) => {
    setActiveDiscussion(discussion);
    setReplyText("");
    setEditingReplyId(null);
    setEditingReplyText("");
  };

  const closeDiscussion = () => {
    setActiveDiscussion(null);
    setReplyText("");
    setEditingReplyId(null);
    setEditingReplyText("");
  };

  const updateDiscussion = (id, updates) => {
    setDiscussions((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );

    setActiveDiscussion((previous) =>
      previous && previous.id === id
        ? { ...previous, ...updates }
        : previous
    );
  };

  const submitReply = (event) => {
    event.preventDefault();

    if (!activeDiscussion || !replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      author: "You",
      message: replyText.trim(),
      date: new Date().toISOString(),
    };

    const updatedReplies = [...activeDiscussion.replies, newReply];

    updateDiscussion(activeDiscussion.id, {
      replies: updatedReplies,
      status: "Answered",
    });

    setReplyText("");
  };

  const saveEditedReply = (replyId) => {
    if (!activeDiscussion || !editingReplyText.trim()) return;

    const updatedReplies = activeDiscussion.replies.map((reply) =>
      reply.id === replyId
        ? { ...reply, message: editingReplyText.trim() }
        : reply
    );

    updateDiscussion(activeDiscussion.id, {
      replies: updatedReplies,
    });

    setEditingReplyId(null);
    setEditingReplyText("");
  };

  const deleteReply = (replyId) => {
    if (!activeDiscussion) return;

    const confirmed = window.confirm("Delete this reply?");

    if (!confirmed) return;

    const updatedReplies = activeDiscussion.replies.filter(
      (reply) => reply.id !== replyId
    );

    updateDiscussion(activeDiscussion.id, {
      replies: updatedReplies,
      status:
        updatedReplies.length === 0 ? "Unanswered" : activeDiscussion.status,
    });
  };

  const toggleResolved = (discussion) => {
    const nextStatus =
      discussion.status === "Resolved" ? "Answered" : "Resolved";

    updateDiscussion(discussion.id, {
      status: nextStatus,
    });
  };

  const deleteDiscussion = (discussion) => {
    const confirmed = window.confirm(
      `Delete "${discussion.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDiscussions((previous) =>
      previous.filter((item) => item.id !== discussion.id)
    );

    if (activeDiscussion?.id === discussion.id) {
      closeDiscussion();
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      <TeacherPageHeader
        title="Discussions"
        description="Answer student questions and keep your course community active."
        buttonText="View Unanswered"
        buttonIcon="ri-question-answer-line"
        onButtonClick={() => {
          setStatusFilter("Unanswered");
          setSearch("");
          setCourseFilter("All Courses");
        }}
      />

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Discussions"
          value={discussions.length}
          icon="ri-chat-3-line"
          color="blue"
        />

        <StatCard
          title="Unanswered"
          value={unansweredCount}
          icon="ri-question-line"
          color="orange"
        />

        <StatCard
          title="Answered"
          value={answeredCount}
          icon="ri-chat-check-line"
          color="purple"
        />

        <StatCard
          title="Resolved"
          value={resolvedCount}
          icon="ri-checkbox-circle-line"
          color="green"
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
              placeholder="Search questions or students..."
              className="w-full rounded-xl border border-gray-200 bg-[#f8f8f5] py-3 pl-11 pr-4 text-sm outline-none focus:border-primary/40 focus:bg-white"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
          >
            <option>All Courses</option>
            {courses.map((course) => (
              <option key={course}>{course}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary/40"
          >
            <option>All Status</option>
            <option>Unanswered</option>
            <option>Answered</option>
            <option>Resolved</option>
          </select>
        </div>
      </section>

      {/* Discussion list */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#172033]">
              Student Questions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredDiscussions.length} discussions found
            </p>
          </div>
        </div>

        {filteredDiscussions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <i className="ri-chat-3-line text-4xl text-gray-300" />

            <h3 className="mt-3 font-semibold text-gray-800">
              No discussions found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or change your filters.
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
          filteredDiscussions.map((discussion) => (
            <article
              key={discussion.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${discussion.color}`}
                >
                  {discussion.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[#172033]">
                      {discussion.title}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[discussion.status]}`}
                    >
                      {discussion.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">
                      {discussion.student}
                    </span>

                    <span>•</span>

                    <span>{discussion.course}</span>

                    <span>•</span>

                    <span>{formatDate(discussion.date)}</span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {discussion.question}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openDiscussion(discussion)}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
                    >
                      <i className="ri-reply-line" />
                      {discussion.replies.length > 0
                        ? "View / Reply"
                        : "Answer Question"}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleResolved(discussion)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                      <i
                        className={
                          discussion.status === "Resolved"
                            ? "ri-arrow-go-back-line"
                            : "ri-checkbox-circle-line"
                        }
                      />

                      {discussion.status === "Resolved"
                        ? "Reopen"
                        : "Mark Resolved"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteDiscussion(discussion)}
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      <i className="ri-delete-bin-line" />
                      Delete
                    </button>
                  </div>

                  {discussion.replies.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                      <i className="ri-chat-1-line text-sm" />
                      {discussion.replies.length}{" "}
                      {discussion.replies.length === 1 ? "reply" : "replies"}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Discussion detail and reply modal */}
      {activeDiscussion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDiscussion();
          }}
        >
          <div className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-gray-100 bg-white p-5 sm:p-6">
              <div className="min-w-0">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[activeDiscussion.status]}`}
                >
                  {activeDiscussion.status}
                </span>

                <h2 className="mt-3 text-xl font-semibold text-[#172033]">
                  {activeDiscussion.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {activeDiscussion.student} · {activeDiscussion.course}
                </p>
              </div>

              <button
                type="button"
                onClick={closeDiscussion}
                aria-label="Close discussion"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div className="rounded-2xl bg-[#f8f8f5] p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Student Question
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-700">
                  {activeDiscussion.question}
                </p>

                <p className="mt-3 text-xs text-gray-500">
                  Posted on {formatDate(activeDiscussion.date)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#172033]">
                  Replies ({activeDiscussion.replies.length})
                </h3>

                {activeDiscussion.replies.length === 0 ? (
                  <div className="mt-3 rounded-xl border border-dashed border-gray-200 p-5 text-center">
                    <i className="ri-chat-3-line text-2xl text-gray-300" />

                    <p className="mt-2 text-sm text-gray-500">
                      No replies yet. Be the first to answer.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    {activeDiscussion.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="rounded-2xl border border-gray-200 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              <i className="ri-user-line" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                {reply.author}
                              </p>

                              <p className="text-xs text-gray-500">
                                {formatDate(reply.date)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingReplyId(reply.id);
                                setEditingReplyText(reply.message);
                              }}
                              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                              title="Edit reply"
                              aria-label="Edit reply"
                            >
                              <i className="ri-edit-line" />
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteReply(reply.id)}
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                              title="Delete reply"
                              aria-label="Delete reply"
                            >
                              <i className="ri-delete-bin-line" />
                            </button>
                          </div>
                        </div>

                        {editingReplyId === reply.id ? (
                          <div className="mt-4 space-y-3">
                            <textarea
                              value={editingReplyText}
                              onChange={(event) =>
                                setEditingReplyText(event.target.value)
                              }
                              rows="3"
                              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40"
                            />

                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReplyId(null);
                                  setEditingReplyText("");
                                }}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600"
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                onClick={() => saveEditedReply(reply.id)}
                                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
                              >
                                Save Reply
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                            {reply.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={submitReply} className="border-t border-gray-100 pt-5">
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                  Write a Reply
                </label>

                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  rows="4"
                  placeholder="Write a helpful answer for your student..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 outline-none focus:border-primary/40"
                />

                <div className="mt-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={closeDiscussion}
                    className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <i className="ri-send-plane-line" />
                    Send Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-primary/10 text-primary",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
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

export default TeacherDiscussions;
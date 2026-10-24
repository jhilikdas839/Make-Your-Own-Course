
import { useEffect, useMemo, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const initialTickets = [
  {
    id: "MYOC-1001",
    subject: "Course video upload issue",
    category: "Technical Issue",
    priority: "High",
    status: "In Progress",
    message:
      "I am unable to upload a video lesson to my React course.",
    date: "2026-10-22",
    reply:
      "Our team is checking the video upload issue. Please try a smaller video file.",
  },
  {
    id: "MYOC-1002",
    subject: "Payment not received",
    category: "Payment & Earnings",
    priority: "Medium",
    status: "Open",
    message:
      "My latest course payment is not showing in the earnings dashboard.",
    date: "2026-10-21",
    reply: "",
  },
  {
    id: "MYOC-1003",
    subject: "Update teacher profile",
    category: "Account & Profile",
    priority: "Low",
    status: "Resolved",
    message:
      "I need help updating my teacher profile information.",
    date: "2026-10-18",
    reply:
      "You can update your profile from Teacher Panel → Profile.",
  },
];

const categories = [
  "Technical Issue",
  "Account & Profile",
  "Payment & Earnings",
  "Courses & Content",
  "Live Classes",
  "Students & Assessments",
  "Other",
];

const statusStyles = {
  Open: "bg-blue-50 text-blue-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Resolved: "bg-emerald-50 text-emerald-700",
  Closed: "bg-gray-100 text-gray-600",
};

const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-700",
  Low: "bg-gray-100 text-gray-600",
};

function TeacherSupport() {
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem("teacherSupportTickets");
      return saved ? JSON.parse(saved) : initialTickets;
    } catch {
      return initialTickets;
    }
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    subject: "",
    category: "Technical Issue",
    priority: "Medium",
    message: "",
  });

  useEffect(() => {
    localStorage.setItem("teacherSupportTickets", JSON.stringify(tickets));
  }, [tickets]);

  const stats = useMemo(
    () => [
      {
        label: "Total Tickets",
        value: tickets.length,
        icon: "ri-customer-service-2-line",
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Open",
        value: tickets.filter((ticket) => ticket.status === "Open").length,
        icon: "ri-inbox-line",
        color: "bg-indigo-50 text-indigo-600",
      },
      {
        label: "In Progress",
        value: tickets.filter(
          (ticket) => ticket.status === "In Progress"
        ).length,
        icon: "ri-time-line",
        color: "bg-amber-50 text-amber-600",
      },
      {
        label: "Resolved",
        value: tickets.filter(
          (ticket) => ticket.status === "Resolved"
        ).length,
        icon: "ri-checkbox-circle-line",
        color: "bg-emerald-50 text-emerald-600",
      },
    ],
    [tickets]
  );

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const createTicket = (event) => {
    event.preventDefault();
    setFormError("");

    if (!form.subject.trim() || !form.message.trim()) {
      setFormError("Please enter both a subject and a description.");
      return;
    }

    if (form.subject.trim().length < 5) {
      setFormError("Subject must contain at least 5 characters.");
      return;
    }

    if (form.message.trim().length < 10) {
      setFormError("Description must contain at least 10 characters.");
      return;
    }

    const ticket = {
      id: `MYOC-${Date.now().toString().slice(-6)}`,
      subject: form.subject.trim(),
      category: form.category,
      priority: form.priority,
      status: "Open",
      message: form.message.trim(),
      date: new Date().toISOString().slice(0, 10),
      reply: "",
    };

    setTickets((previous) => [ticket, ...previous]);

    setForm({
      subject: "",
      category: "Technical Issue",
      priority: "Medium",
      message: "",
    });

    setShowForm(false);
  };

  const exportTickets = () => {
    const headers = [
      "Ticket ID",
      "Subject",
      "Category",
      "Priority",
      "Status",
      "Date",
    ];

    const rows = filteredTickets.map((ticket) => [
      ticket.id,
      ticket.subject,
      ticket.category,
      ticket.priority,
      ticket.status,
      ticket.date,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "myoc-support-tickets.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const closeTicket = (ticketId) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: "Closed" }
          : ticket
      )
    );

    setSelectedTicket((previous) =>
      previous?.id === ticketId
        ? { ...previous, status: "Closed" }
        : previous
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <TeacherPageHeader
        title="Help & Support"
        description="Get help with your teaching dashboard, courses and account."
      />

      {/* Support banner */}
      <section className="overflow-hidden rounded-2xl bg-[#172b4d] p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              <i className="ri-customer-service-2-line"></i>
              Teacher Support Center
            </span>

            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
              How can we help you?
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-100/80">
              Having trouble with your courses, payments or live classes?
              Create a support ticket and keep track of your request here.
            </p>

            <button
              onClick={() => {
                setFormError("");
                setShowForm(true);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#172b4d] transition hover:bg-blue-50"
            >
              <i className="ri-add-line text-lg"></i>
              Create Support Ticket
            </button>
          </div>

          <div className="hidden h-36 w-36 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 md:flex">
            <i className="ri-customer-service-2-line text-7xl text-blue-100"></i>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
              >
                <i className={`${stat.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Tickets */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              My Support Tickets
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your previous support requests.
            </p>
          </div>

          <button
            onClick={exportTickets}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <i className="ri-download-2-line"></i>
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative sm:col-span-2 lg:col-span-2">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by ticket ID, subject or category..."
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-400"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Responsive ticket list */}
        {filteredTickets.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
              <i className="ri-inbox-line text-2xl"></i>
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              No tickets found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your filters or create a new support ticket.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-gray-50/70">
                  <tr className="text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-6 py-4 font-medium">Ticket</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Priority</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Created</th>
                    <th className="px-6 py-4 text-right font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="transition hover:bg-gray-50/60"
                    >
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-400">{ticket.id}</p>
                        <p className="mt-1 max-w-xs truncate text-sm font-medium text-gray-900">
                          {ticket.subject}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ticket.category}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[ticket.status]}`}
                        >
                          {ticket.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {ticket.date}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filteredTickets.map((ticket) => (
                <article
                  key={ticket.id}
                  className="rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">{ticket.id}</p>
                      <h3 className="mt-1 break-words text-sm font-semibold text-gray-900">
                        {ticket.subject}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {ticket.category}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[ticket.status]}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[ticket.priority]}`}
                    >
                      {ticket.priority} Priority
                    </span>

                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </div>
      </section>

      {/* Create Ticket Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Create Support Ticket
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Tell us what you need help with.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={createTicket} className="space-y-5 p-5 sm:p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={updateForm}
                  placeholder="Briefly describe your issue"
                  maxLength={120}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={updateForm}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-400"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Priority *
                  </label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={updateForm}
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  rows={5}
                  maxLength={2000}
                  placeholder="Explain the issue and what you were trying to do..."
                  className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {form.message.length}/2000 characters
                </p>
              </div>

              {formError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <i className="ri-send-plane-line"></i>
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTicket(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-medium text-gray-400">
                  {selectedTicket.id}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">
                  {selectedTicket.subject}
                </h2>
              </div>

              <button
                onClick={() => setSelectedTicket(null)}
                aria-label="Close details"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[selectedTicket.status]}`}
                >
                  {selectedTicket.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[selectedTicket.priority]}`}
                >
                  {selectedTicket.priority} Priority
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedTicket.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Created on</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedTicket.date}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Your message
                </p>
                <p className="whitespace-pre-wrap rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                  {selectedTicket.message}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Support response
                </p>

                {selectedTicket.reply ? (
                  <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                      <i className="ri-customer-service-2-line"></i>
                      Support Team
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {selectedTicket.reply}
                    </p>
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-gray-200 p-4 text-sm text-gray-500">
                    No response yet. Your request is waiting for a support
                    response.
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                {selectedTicket.status !== "Closed" &&
                  selectedTicket.status !== "Resolved" && (
                    <button
                      onClick={() => closeTicket(selectedTicket.id)}
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Close Ticket
                    </button>
                  )}

                <button
                  onClick={() => setSelectedTicket(null)}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <i className="ri-information-line mt-0.5 text-lg text-amber-600"></i>
        <div>
          <p className="text-sm font-medium text-amber-900">
            Support system preview
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-800/80">
            Tickets are saved in this browser using localStorage. This demo
            does not send tickets to a real support team or send email
            notifications. Connect a backend to enable real support handling.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeacherSupport;

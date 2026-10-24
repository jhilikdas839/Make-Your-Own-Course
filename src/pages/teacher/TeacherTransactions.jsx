import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const initialTransactions = [
  {
    id: "TXN-2026-1001",
    student: "Aarav Sharma",
    email: "aarav@example.com",
    course: "React JS Masterclass",
    amount: 799,
    method: "UPI",
    status: "Completed",
    date: "2026-10-23",
    time: "10:25 AM",
  },
  {
    id: "TXN-2026-1002",
    student: "Priya Das",
    email: "priya@example.com",
    course: "JavaScript Fundamentals",
    amount: 1199,
    method: "Card",
    status: "Pending",
    date: "2026-10-23",
    time: "11:40 AM",
  },
  {
    id: "TXN-2026-1003",
    student: "Rahul Verma",
    email: "rahul@example.com",
    course: "UI/UX Design",
    amount: 999,
    method: "Net Banking",
    status: "Completed",
    date: "2026-10-22",
    time: "02:15 PM",
  },
  {
    id: "TXN-2026-1004",
    student: "Ananya Roy",
    email: "ananya@example.com",
    course: "Frontend Development",
    amount: 1499,
    method: "UPI",
    status: "Refunded",
    date: "2026-10-21",
    time: "04:30 PM",
  },
  {
    id: "TXN-2026-1005",
    student: "Sourav Ghosh",
    email: "sourav@example.com",
    course: "React JS Masterclass",
    amount: 799,
    method: "Card",
    status: "Completed",
    date: "2026-10-20",
    time: "09:20 AM",
  },
  {
    id: "TXN-2026-1006",
    student: "Neha Singh",
    email: "neha@example.com",
    course: "JavaScript Fundamentals",
    amount: 1199,
    method: "UPI",
    status: "Failed",
    date: "2026-10-19",
    time: "06:10 PM",
  },
  {
    id: "TXN-2026-1007",
    student: "Rohan Patel",
    email: "rohan@example.com",
    course: "UI/UX Design",
    amount: 999,
    method: "Net Banking",
    status: "Pending",
    date: "2026-10-18",
    time: "12:45 PM",
  },
  {
    id: "TXN-2026-1008",
    student: "Ishita Sen",
    email: "ishita@example.com",
    course: "Frontend Development",
    amount: 1499,
    method: "Card",
    status: "Completed",
    date: "2026-10-17",
    time: "03:35 PM",
  },
];

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Refunded: "bg-purple-50 text-purple-700",
  Failed: "bg-red-50 text-red-600",
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TeacherTransactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.id.toLowerCase().includes(searchText) ||
        transaction.student.toLowerCase().includes(searchText) ||
        transaction.email.toLowerCase().includes(searchText) ||
        transaction.course.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || transaction.method === methodFilter;

      const matchesDate =
        !dateFilter || transaction.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMethod &&
        matchesDate
      );
    });
  }, [transactions, search, statusFilter, methodFilter, dateFilter]);

  const stats = useMemo(() => {
    const completed = transactions.filter(
      (transaction) => transaction.status === "Completed"
    );

    const pending = transactions.filter(
      (transaction) => transaction.status === "Pending"
    );

    const refunded = transactions.filter(
      (transaction) => transaction.status === "Refunded"
    );

    return {
      total: transactions.length,
      completedCount: completed.length,
      completedAmount: completed.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
      pendingCount: pending.length,
      pendingAmount: pending.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
      refundedCount: refunded.length,
      refundedAmount: refunded.reduce(
        (total, transaction) => total + transaction.amount,
        0
      ),
    };
  }, [transactions]);

  const exportCSV = () => {
    const headers = [
      "Transaction ID",
      "Student",
      "Email",
      "Course",
      "Amount",
      "Payment Method",
      "Status",
      "Date",
      "Time",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.id,
      transaction.student,
      transaction.email,
      transaction.course,
      transaction.amount,
      transaction.method,
      transaction.status,
      transaction.date,
      transaction.time,
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "teacher-transactions.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setMethodFilter("All");
    setDateFilter("");
  };

  // Demo action only — this does not verify or process an actual payment.
  const markAsCompleted = (transactionId) => {
    setTransactions((previousTransactions) =>
      previousTransactions.map((transaction) =>
        transaction.id === transactionId &&
        transaction.status === "Pending"
          ? { ...transaction, status: "Completed" }
          : transaction
      )
    );

    setSelectedTransaction((previous) =>
      previous && previous.id === transactionId
        ? { ...previous, status: "Completed" }
        : previous
    );
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconBg,
    iconColor,
  }) => (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
            {value}
          </h3>
          <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <i className={`${icon} text-xl`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Page Header */}
      <TeacherPageHeader
        title="Transactions"
        description="View and manage payment transaction records for your courses."
        buttonText="Export CSV"
        buttonIcon="ri-download-2-line"
        onButtonClick={exportCSV}
      />

      {/* Demo Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <i className="ri-information-line mt-0.5 text-lg text-blue-600" />

        <div>
          <p className="text-sm font-semibold text-blue-900">
            Demo transaction records
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            These are sample transactions for the dashboard preview.
            Actual payments, refunds and payment verification require
            a connected payment gateway and backend.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Transactions"
          value={stats.total}
          subtitle="All recorded transactions"
          icon="ri-exchange-funds-line"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Completed Payments"
          value={formatCurrency(stats.completedAmount)}
          subtitle={`${stats.completedCount} completed transactions`}
          icon="ri-checkbox-circle-line"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <StatCard
          title="Pending Payments"
          value={formatCurrency(stats.pendingAmount)}
          subtitle={`${stats.pendingCount} pending transactions`}
          icon="ri-time-line"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

        <StatCard
          title="Refunded Amount"
          value={formatCurrency(stats.refundedAmount)}
          subtitle={`${stats.refundedCount} refunded transactions`}
          icon="ri-refund-2-line"
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Transactions Table */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Transactions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </p>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <i className="ri-file-download-line text-lg" />
            Export report
          </button>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="relative sm:col-span-2 xl:col-span-1">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search ID, student, course..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            value={methodFilter}
            onChange={(event) => setMethodFilter(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400"
          >
            <option value="All">All Payment Methods</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>

          <div className="flex gap-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              aria-label="Filter by transaction date"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400"
            />

            <button
              type="button"
              onClick={clearFilters}
              title="Clear filters"
              aria-label="Clear filters"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
            >
              <i className="ri-refresh-line text-lg" />
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Transaction</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Payment Method</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                      {transaction.id}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {transaction.time}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                      {transaction.student}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {transaction.email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-700">
                      {transaction.course}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-gray-600">
                      <i
                        className={`${
                          transaction.method === "UPI"
                            ? "ri-smartphone-line"
                            : transaction.method === "Card"
                              ? "ri-bank-card-line"
                              : "ri-bank-line"
                        } text-lg text-gray-400`}
                      />
                      {transaction.method}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {formatDate(transaction.date)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
                        statusStyles[transaction.status]
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedTransaction(transaction)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <i className="ri-eye-line" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                      <i className="ri-search-line text-2xl text-gray-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-gray-900">
                      No transactions found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Try changing your search or filters.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {filteredTransactions.length} transaction
            {filteredTransactions.length !== 1 ? "s" : ""} displayed
          </p>

          <p className="text-xs text-gray-400">
            Sample data for demonstration
          </p>
        </div>
      </section>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTransaction(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <h2
                  id="transaction-modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Transaction Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Complete payment record
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                aria-label="Close transaction details"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            {/* Amount and Status */}
            <div className="border-b border-gray-100 px-5 py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <i className="ri-secure-payment-line text-2xl text-blue-600" />
              </div>

              <p className="mt-4 text-sm text-gray-500">Transaction Amount</p>

              <h3 className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(selectedTransaction.amount)}
              </h3>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                  statusStyles[selectedTransaction.status]
                }`}
              >
                {selectedTransaction.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-4 p-5">
              {[
                ["Transaction ID", selectedTransaction.id],
                ["Student Name", selectedTransaction.student],
                ["Email Address", selectedTransaction.email],
                ["Course Name", selectedTransaction.course],
                ["Payment Method", selectedTransaction.method],
                ["Transaction Date", formatDate(selectedTransaction.date)],
                ["Transaction Time", selectedTransaction.time],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-sm text-gray-500">{label}</span>

                  <span className="max-w-[60%] break-words text-right text-sm font-medium text-gray-800">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-end">
              {selectedTransaction.status === "Pending" && (
                <button
                  type="button"
                  onClick={() =>
                    markAsCompleted(selectedTransaction.id)
                  }
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  Mark as Completed (Demo)
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherTransactions;
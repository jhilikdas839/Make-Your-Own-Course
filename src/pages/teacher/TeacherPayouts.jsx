
import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/common/PageHeader";

const initialPayouts = [
  {
    id: "PAY-2026-1001",
    date: "2026-10-22",
    amount: 12500,
    method: "Bank Transfer",
    account: "XXXX XXXX 4521",
    status: "Completed",
    reference: "UTR202610221001",
  },
  {
    id: "PAY-2026-1002",
    date: "2026-10-18",
    amount: 8500,
    method: "Bank Transfer",
    account: "XXXX XXXX 4521",
    status: "Pending",
    reference: "Not generated",
  },
  {
    id: "PAY-2026-1003",
    date: "2026-10-12",
    amount: 6000,
    method: "Bank Transfer",
    account: "XXXX XXXX 4521",
    status: "Completed",
    reference: "UTR202610121003",
  },
  {
    id: "PAY-2026-1004",
    date: "2026-10-05",
    amount: 3500,
    method: "Bank Transfer",
    account: "XXXX XXXX 4521",
    status: "Failed",
    reference: "Not generated",
  },
  {
    id: "PAY-2026-1005",
    date: "2026-09-28",
    amount: 10000,
    method: "Bank Transfer",
    account: "XXXX XXXX 4521",
    status: "Completed",
    reference: "UTR202609281005",
  },
];

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-600",
  Processing: "bg-primary/10 text-primary",
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
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

function TeacherPayouts() {
  const [payouts, setPayouts] = useState(initialPayouts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");
  const [requestError, setRequestError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Demo balance values. A real application must calculate these
  // using verified backend records.
  const [availableBalance, setAvailableBalance] = useState(18000);

  const stats = useMemo(() => {
    const completed = payouts.filter(
      (payout) => payout.status === "Completed"
    );

    const pending = payouts.filter(
      (payout) =>
        payout.status === "Pending" ||
        payout.status === "Processing"
    );

    const failed = payouts.filter(
      (payout) => payout.status === "Failed"
    );

    return {
      completedAmount: completed.reduce(
        (total, payout) => total + payout.amount,
        0
      ),
      completedCount: completed.length,
      pendingAmount: pending.reduce(
        (total, payout) => total + payout.amount,
        0
      ),
      pendingCount: pending.length,
      failedCount: failed.length,
    };
  }, [payouts]);

  const filteredPayouts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return payouts.filter((payout) => {
      const matchesSearch =
        payout.id.toLowerCase().includes(searchText) ||
        payout.method.toLowerCase().includes(searchText) ||
        payout.status.toLowerCase().includes(searchText) ||
        payout.reference.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || payout.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payouts, search, statusFilter]);

  const handleRequestPayout = (event) => {
    event.preventDefault();
    setRequestError("");
    setSuccessMessage("");

    const amount = Number(requestAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setRequestError("Please enter a valid payout amount.");
      return;
    }

    if (amount < 500) {
      setRequestError("The minimum payout request is ₹500.");
      return;
    }

    if (amount > availableBalance) {
      setRequestError("Your requested amount exceeds the available balance.");
      return;
    }

    const newPayout = {
      id: `PAY-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      amount,
      method: "Bank Transfer",
      account: "XXXX XXXX 4521",
      status: "Pending",
      reference: "Not generated",
    };

    setPayouts((previous) => [newPayout, ...previous]);
    setAvailableBalance((previous) => previous - amount);
    setShowRequestModal(false);
    setRequestAmount("");
    setSuccessMessage(
      "Demo payout request created successfully. No actual bank transfer was initiated."
    );
  };

  const exportCSV = () => {
    const headers = [
      "Payout ID",
      "Date",
      "Amount",
      "Payment Method",
      "Bank Account",
      "Status",
      "Reference",
    ];

    const rows = filteredPayouts.map((payout) => [
      payout.id,
      payout.date,
      payout.amount,
      payout.method,
      payout.account,
      payout.status,
      payout.reference,
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
    link.download = "teacher-payouts.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Page Header */}
      <TeacherPageHeader
        title="Payouts"
        description="Manage your instructor payouts and track payment history."
        buttonText="Request Payout"
        buttonIcon="ri-bank-card-line"
        onButtonClick={() => {
          setRequestError("");
          setSuccessMessage("");
          setShowRequestModal(true);
        }}
      />

      {/* Demo Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/10 p-4">
        <i className="ri-information-line mt-0.5 text-lg text-primary" />

        <div>
          <p className="text-sm font-semibold text-primary">
            Payout dashboard preview
          </p>
          <p className="mt-1 text-sm leading-6 text-primary">
            All amounts and bank details on this page are demonstration data.
            Payout requests do not initiate real bank transfers.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
        >
          <i className="ri-checkbox-circle-line mt-0.5 text-lg text-emerald-600" />

          <div className="flex-1 text-sm leading-6 text-emerald-800">
            {successMessage}
          </div>

          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss message"
            className="text-emerald-700 hover:text-emerald-900"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>
      )}

      {/* Balance Card */}
      <section className="relative overflow-hidden rounded-2xl bg-[#172554] p-6 text-white shadow-sm sm:p-8">
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute -right-2 -top-8 h-40 w-40 rounded-full border border-white/10" />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-primary">
              <i className="ri-wallet-3-line text-lg" />
              Available Balance
            </div>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {formatCurrency(availableBalance)}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-primary">
              Demo balance available for a payout request. Actual payable
              earnings must be calculated and verified by the backend.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setRequestError("");
              setSuccessMessage("");
              setShowRequestModal(true);
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#172554] transition hover:bg-primary/10"
          >
            <i className="ri-arrow-right-up-line text-lg" />
            Request Payout
          </button>
        </div>

        <div className="relative z-10 mt-7 grid grid-cols-1 gap-4 border-t border-white/15 pt-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-primary">Completed Payouts</p>
            <p className="mt-2 text-lg font-semibold">
              {formatCurrency(stats.completedAmount)}
            </p>
          </div>

          <div>
            <p className="text-xs text-primary">Pending Payouts</p>
            <p className="mt-2 text-lg font-semibold">
              {formatCurrency(stats.pendingAmount)}
            </p>
          </div>

          <div>
            <p className="text-xs text-primary">Completed Requests</p>
            <p className="mt-2 text-lg font-semibold">
              {stats.completedCount}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Available Balance"
          value={formatCurrency(availableBalance)}
          subtitle="Demo available amount"
          icon="ri-wallet-3-line"
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />

        <StatCard
          title="Total Paid"
          value={formatCurrency(stats.completedAmount)}
          subtitle={`${stats.completedCount} completed payouts`}
          icon="ri-checkbox-circle-line"
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <StatCard
          title="In Progress"
          value={formatCurrency(stats.pendingAmount)}
          subtitle={`${stats.pendingCount} pending or processing`}
          icon="ri-time-line"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />

        <StatCard
          title="Failed Payouts"
          value={stats.failedCount}
          subtitle="Requires review"
          icon="ri-error-warning-line"
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {/* Bank Account Information */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <i className="ri-bank-line text-2xl text-gray-700" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Payout Bank Account
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Demo bank account information
              </p>

              <p className="mt-3 text-sm font-medium text-gray-800">
                Bank Account •••• 4521
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Bank verification status: Demo only
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
            <i className="ri-information-line" />
            Not connected
          </span>
        </div>
      </section>

      {/* Payout History */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Payout History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track previous and current payout requests.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <i className="ri-download-2-line text-lg" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-5 sm:grid-cols-2">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search payout ID or reference..."
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-primary/40"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              title="Clear filters"
              aria-label="Clear filters"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-50"
            >
              <i className="ri-refresh-line text-lg" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Payout ID</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Method</th>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredPayouts.map((payout) => (
                <tr
                  key={payout.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                      {payout.id}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {formatDate(payout.date)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900">
                    {formatCurrency(payout.amount)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-2">
                      <i className="ri-bank-line text-lg text-gray-400" />
                      {payout.method}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600">
                      {payout.reference}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
                        statusStyles[payout.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {payout.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedPayout(payout)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    >
                      <i className="ri-eye-line" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPayouts.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                      <i className="ri-wallet-3-line text-2xl text-gray-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-gray-900">
                      No payouts found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Try another search term or status.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-4 text-sm font-medium text-primary hover:text-primary"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {filteredPayouts.length} payout
            {filteredPayouts.length !== 1 ? "s" : ""} displayed
          </p>

          <p className="text-xs text-gray-400">
            Sample records for demonstration
          </p>
        </div>
      </section>

      {/* Payout Details Modal */}
      {selectedPayout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPayout(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payout-details-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <h2
                  id="payout-details-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Payout Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Payout request information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                aria-label="Close payout details"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="border-b border-gray-100 px-5 py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <i className="ri-bank-card-line text-2xl text-primary" />
              </div>

              <p className="mt-4 text-sm text-gray-500">Payout Amount</p>

              <h3 className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(selectedPayout.amount)}
              </h3>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                  statusStyles[selectedPayout.status] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {selectedPayout.status}
              </span>
            </div>

            <div className="space-y-4 p-5">
              {[
                ["Payout ID", selectedPayout.id],
                ["Request Date", formatDate(selectedPayout.date)],
                ["Payment Method", selectedPayout.method],
                ["Bank Account", selectedPayout.account],
                ["Reference Number", selectedPayout.reference],
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

            <div className="border-t border-gray-100 p-5">
              <div className="rounded-xl bg-gray-50 p-3 text-sm leading-6 text-gray-600">
                <i className="ri-information-line mr-2 text-gray-500" />
                This is a demo record. The actual transfer status must be
                confirmed by the connected payout provider.
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Payout Modal */}
      {showRequestModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowRequestModal(false);
              setRequestError("");
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-payout-title"
            className="my-auto w-full max-w-md rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <h2
                  id="request-payout-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  Request a Payout
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create a demo payout request.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestError("");
                }}
                aria-label="Close payout request"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-5 p-5">
              <div className="rounded-xl bg-primary/10 p-4">
                <p className="text-sm text-primary">Available demo balance</p>

                <p className="mt-1 text-2xl font-semibold text-primary">
                  {formatCurrency(availableBalance)}
                </p>
              </div>

              <div>
                <label
                  htmlFor="payout-amount"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Payout Amount (₹)
                </label>

                <input
                  id="payout-amount"
                  type="number"
                  min="500"
                  max={availableBalance}
                  step="1"
                  value={requestAmount}
                  onChange={(event) => {
                    setRequestAmount(event.target.value);
                    setRequestError("");
                  }}
                  placeholder="Enter amount"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Minimum request: ₹500
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payout Method
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <i className="ri-bank-line text-xl text-gray-700" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Bank Transfer
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Account ending in 4521 · Demo only
                    </p>
                  </div>
                </div>
              </div>

              {requestError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                >
                  {requestError}
                </p>
              )}

              <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                This action only updates the page's demo data. It will not
                transfer money or contact a bank.
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowRequestModal(false);
                    setRequestError("");
                  }}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
                >
                  Create Demo Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherPayouts;

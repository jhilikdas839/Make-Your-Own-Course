
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import TeacherPageHeader from "../../components/common/PageHeader";

const monthlyEarnings = [
  { month: "May", revenue: 18500 },
  { month: "Jun", revenue: 24000 },
  { month: "Jul", revenue: 21500 },
  { month: "Aug", revenue: 32000 },
  { month: "Sep", revenue: 28500 },
  { month: "Oct", revenue: 38500 },
];

const initialCourses = [
  {
    id: 1,
    name: "React JS Masterclass",
    category: "Development",
    students: 86,
    earnings: 42500,
    color: "#2563eb",
  },
  {
    id: 2,
    name: "JavaScript Fundamentals",
    category: "Development",
    students: 64,
    earnings: 28600,
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "UI/UX Design",
    category: "Design",
    students: 48,
    earnings: 19200,
    color: "#10b981",
  },
  {
    id: 4,
    name: "Frontend Development",
    category: "Development",
    students: 35,
    earnings: 14700,
    color: "#f59e0b",
  },
];

const initialTransactions = [
  {
    id: "TXN-1048",
    student: "Aarav Sharma",
    course: "React JS Masterclass",
    date: "Oct 24, 2026",
    amount: 1499,
    status: "Completed",
  },
  {
    id: "TXN-1047",
    student: "Priya Verma",
    course: "JavaScript Fundamentals",
    date: "Oct 23, 2026",
    amount: 999,
    status: "Completed",
  },
  {
    id: "TXN-1046",
    student: "Rahul Das",
    course: "UI/UX Design",
    date: "Oct 22, 2026",
    amount: 799,
    status: "Pending",
  },
  {
    id: "TXN-1045",
    student: "Ananya Singh",
    course: "React JS Masterclass",
    date: "Oct 21, 2026",
    amount: 1499,
    status: "Completed",
  },
  {
    id: "TXN-1044",
    student: "Rohan Gupta",
    course: "Frontend Development",
    date: "Oct 20, 2026",
    amount: 1199,
    status: "Pending",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function TeacherEarnings() {
  const [courses] = useState(initialCourses);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedPeriod, setSelectedPeriod] = useState("6 months");
  const [transactionFilter, setTransactionFilter] = useState("All");
  const [search, setSearch] = useState("");

  const totalEarnings = courses.reduce(
    (sum, course) => sum + course.earnings,
    0
  );

  const pendingAmount = transactions
    .filter((transaction) => transaction.status === "Pending")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const completedTransactions = transactions.filter(
    (transaction) => transaction.status === "Completed"
  );

  const completedAmount = completedTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const currentMonthRevenue = monthlyEarnings[monthlyEarnings.length - 1].revenue;
  const previousMonthRevenue = monthlyEarnings[monthlyEarnings.length - 2].revenue;

  const revenueGrowth = previousMonthRevenue
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100
    : 0;

  const chartData = useMemo(() => {
    if (selectedPeriod === "3 months") {
      return monthlyEarnings.slice(-3);
    }

    return monthlyEarnings;
  }, [selectedPeriod]);

  const courseChartData = courses.map((course) => ({
    name: course.name,
    value: course.earnings,
    color: course.color,
  }));

  const filteredTransactions = transactions.filter((transaction) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      transaction.student.toLowerCase().includes(searchTerm) ||
      transaction.course.toLowerCase().includes(searchTerm) ||
      transaction.id.toLowerCase().includes(searchTerm);

    const matchesStatus =
      transactionFilter === "All" ||
      transaction.status === transactionFilter;

    return matchesSearch && matchesStatus;
  });

  const handleMarkCompleted = (transactionId) => {
    setTransactions((previousTransactions) =>
      previousTransactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, status: "Completed" }
          : transaction
      )
    );
  };

  const handleExportCSV = () => {
    const headers = [
      "Transaction ID",
      "Student",
      "Course",
      "Date",
      "Amount INR",
      "Status",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.id,
      transaction.student,
      transaction.course,
      transaction.date,
      transaction.amount,
      transaction.status,
    ]);

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "teacher-earnings-transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      title: "Total Earnings",
      value: formatCurrency(totalEarnings),
      subtitle: "Across listed courses",
      icon: "ri-wallet-3-line",
      iconStyle: "bg-primary/10 text-primary",
    },
    {
      title: "This Month",
      value: formatCurrency(currentMonthRevenue),
      subtitle: "October 2026",
      icon: "ri-calendar-check-line",
      iconStyle: "bg-emerald-50 text-emerald-600",
      growth: `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(1)}%`,
    },
    {
      title: "Pending Transactions",
      value: formatCurrency(pendingAmount),
      subtitle: "From sample transactions",
      icon: "ri-time-line",
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Completed Transactions",
      value: formatCurrency(completedAmount),
      subtitle: `${completedTransactions.length} completed records`,
      icon: "ri-checkbox-circle-line",
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-8">
      {/* Header */}
      <TeacherPageHeader
        title="Earnings Overview"
        description="Track your course revenue, review transaction activity and understand your earnings."
      />

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {stat.value}
                </h2>

                <p className="mt-2 text-xs text-gray-500">
                  {stat.subtitle}
                </p>

                {stat.growth && (
                  <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                    <i className="ri-arrow-up-line"></i>
                    {stat.growth} vs previous month
                  </p>
                )}
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${stat.iconStyle}`}
              >
                <i className={stat.icon}></i>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Revenue Chart */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 xl:col-span-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monthly earnings trend
              </p>
            </div>

            <select
              value={selectedPeriod}
              onChange={(event) => setSelectedPeriod(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-primary/40"
            >
              <option value="3 months">Last 3 Months</option>
              <option value="6 months">Last 6 Months</option>
            </select>
          </div>

          <div className="mt-7 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 8, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="earningsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                      stopOpacity={0.22}
                    />
                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#f0f0f0"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                  tickFormatter={(value) =>
                    value >= 1000 ? `₹${value / 1000}k` : `₹${value}`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(Number(value)),
                    "Revenue",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#earningsGradient)"
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Revenue Breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Course Revenue
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Earnings by course
          </p>

          <div className="relative mt-4 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={57}
                  outerRadius={83}
                  paddingAngle={4}
                  stroke="none"
                >
                  {courseChartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    formatCurrency(Number(value)),
                    "Earnings",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-500">Total</span>
              <span className="mt-1 text-lg font-bold text-gray-900">
                {formatCurrency(totalEarnings)}
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {courses.map((course) => {
              const percentage = totalEarnings
                ? (course.earnings / totalEarnings) * 100
                : 0;

              return (
                <div key={course.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: course.color }}
                      ></span>

                      <span className="truncate text-sm text-gray-600">
                        {course.name}
                      </span>
                    </div>

                    <span className="shrink-0 text-sm font-semibold text-gray-900">
                      {formatCurrency(course.earnings)}
                    </span>
                  </div>

                  <div className="ml-[18px] mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: course.color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Earnings Table */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Course Performance
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Compare earnings across your courses.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Course
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Students
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Earnings
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Revenue Share
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => {
                const percentage = totalEarnings
                  ? (course.earnings / totalEarnings) * 100
                  : 0;

                return (
                  <tr
                    key={course.id}
                    className="transition hover:bg-gray-50/70"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-10 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: course.color }}
                        ></span>

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {course.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {course.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {course.students}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(course.earnings)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex min-w-[130px] items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: course.color,
                            }}
                          ></div>
                        </div>

                        <span className="w-10 text-right text-xs font-medium text-gray-600">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review recent sample payment records.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <i className="ri-download-2-line text-lg"></i>
            Export CSV
          </button>
        </div>

        {/* Transaction Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-5 sm:grid-cols-2 sm:p-6">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search student, course or transaction..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <select
            value={transactionFilter}
            onChange={(event) => setTransactionFilter(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-primary/40"
          >
            <option value="All">All Transactions</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Transaction
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Student / Course
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Amount
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
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-800">
                      {transaction.id}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.student}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {transaction.course}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {transaction.date}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                        transaction.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    {transaction.status === "Pending" ? (
                      <button
                        type="button"
                        onClick={() => handleMarkCompleted(transaction.id)}
                        className="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-primary transition hover:bg-primary/10"
                      >
                        Demo: Mark Complete
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">
                        Recorded
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="px-6 py-14 text-center">
              <i className="ri-search-line text-3xl text-gray-300"></i>

              <p className="mt-3 font-medium text-gray-800">
                No transactions found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try another search term or status filter.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500 sm:px-6">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
      </section>

      {/* Informational Notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-primary/40 bg-primary/10/60 p-4">
        <i className="ri-information-line mt-0.5 text-xl text-primary"></i>

        <div>
          <p className="text-sm font-semibold text-gray-800">
            Demo earnings data
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            These amounts and transactions are sample data for the interface.
            They are not connected to actual payments, your payment gateway,
            or a bank account. Marking a transaction complete only changes its
            demo status.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeacherEarnings;

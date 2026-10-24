import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { useCourses } from "../../hooks/useCourses";
import { usePayouts, useTickets, useTransactions, useUsers, useReviews } from "../../hooks/usePlatformData";
import { revenueByMonth } from "../../data/reportData";
import { formatPrice } from "../../utils/format";

function AdminDashboard() {
  const [users] = useUsers();
  const [courses] = useCourses();
  const [transactions] = useTransactions();
  const [payouts] = usePayouts();
  const [tickets] = useTickets();
  const [reviews] = useReviews();

  const revenue = transactions.filter((t) => t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const pendingCourses = courses.filter((c) => c.status === "Pending");
  const pendingTeachers = users.filter((u) => u.role === "teacher" && u.status === "Pending");

  const tasks = [
    { label: "Courses waiting for approval", count: pendingCourses.length, to: "/admin/courses", icon: "ri-book-open-line" },
    { label: "Teachers waiting for approval", count: pendingTeachers.length, to: "/admin/users", icon: "ri-user-add-line" },
    { label: "Payout requests", count: payouts.filter((p) => p.status === "Pending").length, to: "/admin/payouts", icon: "ri-bank-card-line" },
    { label: "Open support tickets", count: tickets.filter((t) => t.status === "Open").length, to: "/admin/support", icon: "ri-customer-service-2-line" },
    { label: "Reviews to moderate", count: reviews.filter((r) => r.status === "Pending").length, to: "/admin/reviews", icon: "ri-star-line" },
  ];

  return (
    <>
      <PageHeader eyebrow="Super Admin" title="Platform overview" description="Everything happening on Make Your Own Course, in one place." />

      <section className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Students" value={users.filter((u) => u.role === "student").length} icon="ri-user-3-line" />
        <StatCard label="Total Teachers" value={users.filter((u) => u.role === "teacher").length} icon="ri-presentation-line" tone="purple" />
        <StatCard label="Published Courses" value={courses.filter((c) => c.status === "Published").length} icon="ri-book-open-line" tone="green" />
        <StatCard label="Revenue (paid)" value={formatPrice(revenue)} icon="ri-money-rupee-circle-line" tone="yellow" />
      </section>

      <section className="mb-8 grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold">Revenue</h2>
              <p className="text-sm text-gray-400">Last 6 months</p>
            </div>
            <Link to="/admin/reports" className="text-sm font-medium text-primary hover:underline">Full report</Link>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByMonth}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#118BE9" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#118BE9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9aa3b2" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9aa3b2" }} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(v) => [formatPrice(v), "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#118BE9" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Needs your attention</h2>
          <div className="mt-4 space-y-2">
            {tasks.map((task) => (
              <Link key={task.label} to={task.to} className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-gray-50">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <i className={`${task.icon} text-primary`}></i>
                </span>
                <span className="flex-1 text-sm">{task.label}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${task.count ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-400"}`}>{task.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent payments</h2>
            <Link to="/admin/payments" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          {transactions.slice(0, 5).map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 border-b border-gray-100 py-3 last:border-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{t.student}</p>
                <p className="truncate text-xs text-gray-400">{t.course}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{formatPrice(t.amount)}</span>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Newest users</h2>
            <Link to="/admin/users" className="text-sm font-medium text-primary hover:underline">Manage users</Link>
          </div>
          {[...users].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 5).map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-3 border-b border-gray-100 py-3 last:border-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{u.name}</p>
                <p className="truncate text-xs capitalize text-gray-400">{u.role} · joined {u.joined}</p>
              </div>
              <StatusBadge status={u.status} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;

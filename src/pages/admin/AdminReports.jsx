import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import { useCourses } from "../../hooks/useCourses";
import { useUsers } from "../../hooks/usePlatformData";
import { revenueByMonth } from "../../data/reportData";
import { downloadCsv, formatPrice } from "../../utils/format";

const COLORS = ["#118BE9", "#FDC700", "#10131d", "#22c55e", "#a855f7", "#f97316"];

const Panel = ({ title, children }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-6">
    <h2 className="mb-5 text-lg font-semibold">{title}</h2>
    <div className="h-64">{children}</div>
  </div>
);

function AdminReports() {
  const [courses] = useCourses();
  const [users] = useUsers();

  const published = courses.filter((c) => c.status === "Published");
  const byCategory = Object.entries(
    published.reduce((acc, c) => ({ ...acc, [c.category]: (acc[c.category] || 0) + c.students }), {})
  ).map(([name, value]) => ({ name, value }));
  const topCourses = [...published].sort((a, b) => b.students - a.students).slice(0, 5).map((c) => ({ name: c.title.split(" ").slice(0, 2).join(" "), students: c.students }));
  const roles = ["student", "teacher", "admin"].map((role) => ({ name: role, value: users.filter((u) => u.role === role).length }));

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Reports"
        description="How the platform is growing."
        action={<Button variant="outline" icon="ri-download-2-line" onClick={() => downloadCsv("monthly-report.csv", revenueByMonth)}>Download report</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Revenue by month">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v) => [formatPrice(v), "Revenue"]} cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="revenue" fill="#118BE9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="New students per month">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#10131d" strokeWidth={2.5} dot={{ r: 4, fill: "#FDC700" }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Students by category">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                {byCategory.map((entry, i) => <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Top courses by students">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topCourses} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={110} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="students" fill="#FDC700" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        {roles.map((r, i) => (
          <div key={r.name} className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs capitalize text-gray-400">{r.name}s</p>
            <p className="mt-2 text-3xl font-semibold" style={{ color: COLORS[i] }}>{r.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminReports;


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const chartData = [
  { month: "May", students: 120 },
  { month: "Jun", students: 180 },
  { month: "Jul", students: 150 },
  { month: "Aug", students: 240 },
  { month: "Sep", students: 210 },
  { month: "Oct", students: 320 },
];

function TeacherChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Student Enrollments
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monthly enrollment performance
          </p>
        </div>

        <span className="w-fit rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600">
          Last 6 Months
        </span>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
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
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />

            <Area
              type="monotone"
              dataKey="students"
              name="Students"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#studentGradient)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default TeacherChart;

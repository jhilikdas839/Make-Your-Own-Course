import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import ProgressBar from "../../components/student/ProgressBar";
import { useMyCourses } from "../../hooks/useCourses";
import { weeklyActivity } from "../../data/studentData";

function MyProgress() {
  const { myCourses } = useMyCourses();

  const lessonsDone = myCourses.reduce((sum, c) => sum + c.completedCount, 0);
  const totalLessons = myCourses.reduce((sum, c) => sum + c.totalLessons, 0) || 1;
  const overall = Math.round((lessonsDone / totalLessons) * 100);
  const completed = myCourses.filter((c) => c.progress === 100).length;
  const hours = Math.round(weeklyActivity.reduce((sum, d) => sum + d.minutes, 0) / 60);

  return (
    <>
      <PageHeader eyebrow="Your Learning" title="My Progress" description="See how far you've come across all your courses." />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Overall Progress" value={`${overall}%`} icon="ri-pie-chart-line" />
        <StatCard label="Lessons Completed" value={lessonsDone} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="Hours This Week" value={`${hours}h`} icon="ri-time-line" tone="blue" />
        <StatCard label="Courses Completed" value={completed} icon="ri-award-line" tone="yellow" />
      </section>

      <section className="mb-8 grid gap-5 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-6">
          <div
            className="flex h-44 w-44 items-center justify-center rounded-full"
            style={{ background: `conic-gradient(#118BE9 ${overall * 3.6}deg, #f1f5f9 0deg)` }}
          >
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
              <p className="text-3xl font-bold">{overall}%</p>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-500">
            {lessonsDone} of {totalLessons} lessons done
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Weekly Activity</h2>
          <p className="text-sm text-gray-400">Minutes learned in the last 7 days</p>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9aa3b2" }} />
                <Tooltip cursor={{ fill: "#f1f5f9" }} formatter={(v) => [`${v} min`, "Learning"]} />
                <Bar dataKey="minutes" fill="#118BE9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold">Course Progress</h2>
        <div className="space-y-4">
          {myCourses.map((course) => (
            <Link key={course.id} to={`/student/learn/${course.id}`} className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-gray-50">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <i className={`${course.icon} text-xl text-primary`}></i>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{course.title}</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} className="mt-2" />
                <p className="mt-1.5 text-xs text-gray-400">
                  {course.completedCount} / {course.totalLessons} lessons
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default MyProgress;

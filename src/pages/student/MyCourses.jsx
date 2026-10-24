import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";
import SearchInput from "../../components/common/SearchInput";
import EmptyState from "../../components/common/EmptyState";
import CourseCover from "../../components/student/CourseCover";
import ProgressBar from "../../components/student/ProgressBar";
import { useMyCourses } from "../../hooks/useCourses";

const tabs = ["All", "In Progress", "Completed"];

function MyCourses() {
  const { myCourses } = useMyCourses();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const term = search.toLowerCase();
  const filtered = myCourses.filter(
    (course) =>
      (activeTab === "All" || course.learningStatus === activeTab) &&
      [course.title, course.category, course.instructor].some((v) => v.toLowerCase().includes(term))
  );

  const completed = myCourses.filter((c) => c.learningStatus === "Completed").length;
  const avg = myCourses.length ? Math.round(myCourses.reduce((s, c) => s + c.progress, 0) / myCourses.length) : 0;

  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="My Courses"
        description="Continue your learning journey and keep building your skills."
        action={
          <Link to="/courses" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#10131d] px-5 py-3 text-sm font-medium text-white transition hover:bg-primary">
            <i className="ri-add-line"></i> Explore Courses
          </Link>
        }
      />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Courses" value={myCourses.length} icon="ri-book-open-line" />
        <StatCard label="In Progress" value={myCourses.length - completed} icon="ri-loader-4-line" tone="blue" />
        <StatCard label="Completed" value={completed} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="Avg. Progress" value={`${avg}%`} icon="ri-pie-chart-line" tone="purple" />
      </section>

      <section className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search your courses..." className="w-full md:w-72" />
      </section>

      {filtered.length === 0 ? (
        <EmptyState icon="ri-book-open-line" title="No courses found" text="Try another keyword or tab." />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <div key={course.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CourseCover icon={course.icon} label={course.category} title={course.learningStatus} height="h-44" />
              <div className="p-5">
                <h3 className="text-lg font-semibold transition group-hover:text-primary">{course.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <i className="ri-user-line"></i> {course.instructor}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    {course.completedCount} / {course.totalLessons} lessons
                  </span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} className="mt-2" />
                <Link
                  to={`/student/learn/${course.id}`}
                  className="mt-5 block w-full rounded-xl bg-[#10131d] py-3 text-center text-sm font-medium text-white transition hover:bg-primary"
                >
                  <i className={`${course.progress === 100 ? "ri-eye-line" : "ri-play-circle-line"} mr-2`}></i>
                  {course.progress === 100 ? "View Course" : course.progress === 0 ? "Start Course" : "Resume Course"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <section className="relative mt-8 overflow-hidden rounded-3xl bg-[#10131d] p-7 text-white md:p-9">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/20"></div>
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Ready to learn something new?</h2>
            <p className="mt-2 text-sm text-white/50">Explore more courses and add a new skill to your journey.</p>
          </div>
          <Link to="/courses" className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#10131d]">
            Explore Courses <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>
    </>
  );
}

export default MyCourses;

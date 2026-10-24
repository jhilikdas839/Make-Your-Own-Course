import { useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import AnnouncementBanner from "../../components/common/AnnouncementBanner";
import CourseCover from "../../components/student/CourseCover";
import ProgressBar from "../../components/student/ProgressBar";
import { Avatar } from "../../components/common/PanelSidebar";
import { useCurrentUser } from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useMyCourses } from "../../hooks/useCourses";
import { liveClasses, certificates } from "../../data/studentData";

const quickLinks = [
  { to: "/student/library", icon: "ri-book-2-line text-primary", title: "Library", text: "Explore resources" },
  { to: "/student/assessments", icon: "ri-file-list-3-line text-blue-500", title: "Assessments", text: "Check your tests" },
  { to: "/student/certificates", icon: "ri-award-line text-yellow-500", title: "Certificates", text: "Your achievements" },
  { to: "/student/my-progress", icon: "ri-line-chart-line text-purple-500", title: "My Progress", text: "Track learning" },
];

function Dashboard() {
  const user = useCurrentUser();
  const { myCourses } = useMyCourses();
  const [showNotice, setShowNotice] = useLocalStorage("myoc_student_notice", true);
  const [expandedNotice, setExpandedNotice] = useState(false);

  const inProgress = myCourses.filter((course) => course.learningStatus === "In Progress");
  const completed = myCourses.length - inProgress.length;
  const avgProgress = myCourses.length
    ? Math.round(myCourses.reduce((sum, course) => sum + course.progress, 0) / myCourses.length)
    : 0;

  return (
    <>
      <AnnouncementBanner audience="Students" />

      {/* Profile banner */}
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/80 to-primary/25 p-6 md:p-8">
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/20"></div>
        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white p-1 shadow-sm">
              <Avatar user={user} size="h-16 w-16 md:h-[70px] md:w-[70px]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">{user.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium">Student</span>
                <span className="text-sm text-[#10131d]/60">Keep learning. Keep growing.</span>
              </div>
            </div>
          </div>
          <Link
            to="/student/settings"
            className="w-fit rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-[#10131d] hover:text-white"
          >
            <i className="ri-edit-line mr-2"></i>
            Edit Profile
          </Link>
        </div>
      </section>

      {showNotice && (
        <div className="mb-7 animate-fade-in rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <i className="ri-information-line"></i>
            </div>
            <p className="flex-1 text-sm">Your learning hub: resume courses, join live classes and track your progress.</p>
            <button type="button" onClick={() => setExpandedNotice((v) => !v)} aria-label="More info" className="text-gray-500 hover:text-[#10131d]">
              <i className={`ri-arrow-down-s-line text-xl transition ${expandedNotice ? "rotate-180" : ""}`}></i>
            </button>
            <button type="button" onClick={() => setShowNotice(false)} aria-label="Dismiss" className="text-gray-500 hover:text-[#10131d]">
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          {expandedNotice && (
            <p className="ml-12 mt-2 animate-fade-in text-sm text-gray-600">
              Tip: finish one lesson a day to keep your streak. You have {liveClasses.length} live classes this week.
            </p>
          )}
        </div>
      )}

      <div className="mb-10 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Courses Enrolled" value={myCourses.length} icon="ri-book-open-line" />
        <StatCard label="Avg. Progress" value={`${avgProgress}%`} icon="ri-pie-chart-line" tone="blue" />
        <StatCard label="Certificates" value={certificates.length} icon="ri-award-line" tone="yellow" />
        <StatCard label="Completed" value={completed} icon="ri-checkbox-circle-line" tone="green" />
      </div>

      {/* Continue learning */}
      <section className="mb-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Keep Going</p>
            <h2 className="mt-1 text-2xl font-semibold md:text-3xl">Continue Learning</h2>
          </div>
          <Link to="/student/my-courses" className="flex items-center gap-2 text-sm font-medium transition hover:text-primary">
            All Courses <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {inProgress.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">You have no courses in progress.</p>
            <Link to="/courses" className="mt-4 inline-flex rounded-xl bg-[#10131d] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary">
              Find a course
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {inProgress.slice(0, 3).map((course) => (
              <div key={course.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CourseCover icon={course.icon} label={course.category} />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="mt-1 text-xs text-gray-400">
                    {course.completedCount} / {course.totalLessons} lessons
                  </p>
                  <div className="mb-2 mt-5 flex justify-between text-xs">
                    <span className="text-gray-400">Course Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} />
                  <Link
                    to={`/student/learn/${course.id}`}
                    className="mt-5 block w-full rounded-xl bg-[#10131d] py-3 text-center text-sm font-medium text-white transition hover:bg-primary"
                  >
                    <i className="ri-play-circle-line mr-2"></i>
                    Resume Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Live classes */}
      <section className="mb-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Upcoming</p>
            <h2 className="mt-1 text-2xl font-semibold md:text-3xl">Upcoming Live Classes</h2>
          </div>
          <Link to="/student/live-classes" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
            View All <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
        <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {liveClasses.map((item) => (
            <Link key={item.id} to="/student/live-classes" className="flex items-center gap-4 p-4 transition hover:bg-gray-50 md:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <i className={`${item.status === "Live Now" ? "ri-live-line text-red-500" : "ri-time-line text-primary"} text-lg`}></i>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold md:text-base">{item.title}</h3>
                <p className="mt-1 truncate text-xs text-gray-400">
                  {item.date} · {item.time} · {item.instructor}
                </p>
              </div>
              <span className={`hidden whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium md:block ${item.status === "Live Now" ? "bg-red-50 text-red-500" : "bg-primary/10"}`}>
                {item.status}
              </span>
              <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-7">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/20"></div>
          <div className="relative">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/60">
              <i className="ri-trophy-line text-xl"></i>
            </div>
            <p className="text-sm font-medium">Community</p>
            <h3 className="mt-1 text-4xl font-bold">113 pts</h3>
            <p className="mt-1 text-sm text-[#10131d]/60">Level 2 · 7 badges earned</p>
            <Link to="/student/community" className="mt-6 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-[#10131d] hover:text-white">
              Open Community
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-xl font-semibold">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="rounded-xl border border-gray-200 p-4 transition hover:border-primary hover:bg-primary/5">
                <i className={`${link.icon} text-xl`}></i>
                <p className="mt-3 text-sm font-semibold">{link.title}</p>
                <p className="mt-1 text-xs text-gray-400">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;

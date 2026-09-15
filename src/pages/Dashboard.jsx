import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Dashboard = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const mainMenu = [
    {
      name: "Dashboard",
      icon: "ri-dashboard-line",
      path: "/dashboard",
    },
    {
      name: "My Courses",
      icon: "ri-book-open-line",
      path: "/my-courses",
    },
    {
      name: "Live Classes",
      icon: "ri-live-line",
      path: "/live-classes",
    },
    {
      name: "Library",
      icon: "ri-book-2-line",
      path: "/library",
    },
    {
      name: "My Progress",
      icon: "ri-bar-chart-line",
      path: "/my-progress",
    },
    {
      name: "Assessments",
      icon: "ri-file-list-3-line",
      path: "/assessments",
    },
    {
      name: "Certificates",
      icon: "ri-award-line",
      path: "/certificates",
    },
    {
      name: "Discussions",
      icon: "ri-chat-3-line",
      path: "/discussions",
    },
    {
      name: "Community",
      icon: "ri-group-line",
      path: "/community",
    },
    {
      name: "Recordings",
      icon: "ri-video-line",
      path: "/recordings",
      soon: true,
    },
    {
      name: "Sessions",
      icon: "ri-calendar-line",
      path: "/sessions",
    },
  ];

  const accountMenu = [
    {
      name: "Billing",
      icon: "ri-bank-card-line",
      path: "/billing",
    },
    {
      name: "Settings",
      icon: "ri-settings-3-line",
      path: "/settings",
    },
  ];

  const courses = [
    {
      title: "Intro to Data Science",
      category: "Data Science",
      progress: 72,
      lessons: "18 / 25 lessons",
      icon: "ri-bar-chart-box-line",
    },
    {
      title: "React 19 Pro",
      category: "Development",
      progress: 48,
      lessons: "12 / 25 lessons",
      icon: "ri-reactjs-line",
    },
    {
      title: "UI/UX Design Masterclass",
      category: "Design",
      progress: 31,
      lessons: "8 / 24 lessons",
      icon: "ri-pencil-ruler-2-line",
    },
  ];

  const liveClasses = [
    {
      title: "Pandas Patterns Workshop",
      date: "20 Jun",
      time: "5:00 PM",
      duration: "90 min",
      teacher: "Dr. Kapoor",
      joining: "2 joining",
    },
    {
      title: "React Advanced Concepts",
      date: "22 Jun",
      time: "6:30 PM",
      duration: "60 min",
      teacher: "Rahul Sharma",
      joining: "5 joining",
    },
    {
      title: "Full-Stack Bootcamp — Live Kickoff",
      date: "24 Jun",
      time: "12:30 PM",
      duration: "60 min",
      teacher: "Rohan Deshpande",
      joining: "8 joining",
    },
    {
      title: "UI Design Critique Session",
      date: "26 Jun",
      time: "4:00 PM",
      duration: "60 min",
      teacher: "Ananya Mehta",
      joining: "3 joining",
    },
  ];

  const SidebarMenu = () => {
    return (
      <>
        <div className="mb-7">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-3">
            Main Menu
          </p>

          <div className="space-y-1">
            {mainMenu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#e9e9e5] text-[#10131d]"
                      : "text-gray-500 hover:bg-gray-100 hover:text-[#10131d]"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <i className={`${item.icon} text-[18px]`}></i>
                  <span>{item.name}</span>
                </div>

                {item.soon && (
                  <span className="text-[9px] font-semibold bg-gray-100 text-gray-400 px-2 py-1 rounded-full">
                    SOON
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-3">
            Account
          </p>

          <div className="space-y-1">
            {accountMenu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#e9e9e5] text-[#10131d]"
                      : "text-gray-500 hover:bg-gray-100 hover:text-[#10131d]"
                  }`
                }
              >
                <i className={`${item.icon} text-[18px]`}></i>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[250px] bg-white border-r border-gray-200 flex-col z-50">
        {/* Logo */}
        <div className="h-[76px] px-6 flex items-center border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10131d] flex items-center justify-center">
              <span className="text-white text-xl font-bold">C</span>
            </div>

            <div>
              <h1 className="font-bold text-lg leading-none">CourseCraft</h1>

              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                Student Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <SidebarMenu />
        </div>

        {/* Profile */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
              JS
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">John Student</p>

              <p className="text-xs text-gray-400 truncate">john@example.com</p>
            </div>

            <i className="ri-more-2-fill text-gray-400"></i>
          </div>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenu(false)}
          ></div>

          <aside className="relative w-[280px] h-full bg-white shadow-2xl flex flex-col">
            <div className="h-[76px] px-5 flex items-center justify-between border-b border-gray-100">
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setMobileMenu(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-[#10131d] flex items-center justify-center">
                  <span className="text-white text-xl font-bold">C</span>
                </div>

                <div>
                  <h1 className="font-bold">CourseCraft</h1>

                  <p className="text-[9px] text-gray-400 uppercase tracking-widest">
                    Student Portal
                  </p>
                </div>
              </Link>

              <button
                onClick={() => setMobileMenu(false)}
                className="w-9 h-9 rounded-lg hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <SidebarMenu />
            </div>

            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold">
                  JS
                </div>

                <div>
                  <p className="text-sm font-semibold">John Student</p>
                  <p className="text-xs text-gray-400">Student</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <main className="lg:ml-[250px] min-h-screen">
        {/* TOP BAR */}
        <header className="h-[76px] bg-white border-b border-gray-200 px-5 md:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenu(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>

            <div>
              <p className="text-xs text-gray-400">Student Dashboard</p>

              <h2 className="text-base md:text-lg font-semibold">
                Welcome back, John 👋
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="hidden sm:flex w-10 h-10 rounded-xl border border-gray-200 items-center justify-center hover:bg-gray-50">
              <i className="ri-search-line text-gray-500"></i>
            </button>

            {/* Notification */}
            <button className="relative w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <i className="ri-notification-3-line text-gray-600"></i>

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"></span>
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#10131d] text-white flex items-center justify-center text-xs font-bold">
              JS
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-5 md:p-8 xl:p-10 max-w-[1450px] mx-auto">
          {/* PROFILE */}
          <section className="relative bg-gradient-to-r from-primary/80 to-primary/25 border border-primary/20 rounded-3xl p-6 md:p-8 overflow-hidden mb-6">
            <div className="absolute -right-16 -top-24 w-72 h-72 rounded-full bg-white/20"></div>

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-[74px] md:h-[74px] rounded-full bg-white flex items-center justify-center text-xl font-bold shadow-sm">
                  JS
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold">
                    John Student
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="bg-white/80 px-2.5 py-1 rounded-full text-[11px] font-medium">
                      Student
                    </span>

                    <span className="text-sm text-[#10131d]/60">
                      Keep learning. Keep growing.
                    </span>
                  </div>
                </div>
              </div>

              <button className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#10131d] hover:text-white transition-all duration-300">
                <i className="ri-edit-line mr-2"></i>
                Edit Profile
              </button>
            </div>
          </section>

          {/* NOTICE */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line"></i>
            </div>

            <p className="text-sm flex-1">
              Your learning hub — resume courses, join live classes, and track
              your progress.
            </p>

            <i className="ri-arrow-down-s-line text-gray-400"></i>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-xs text-gray-400">Courses Enrolled</p>

              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-semibold">6</h3>

                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <i className="ri-book-open-line text-primary text-lg"></i>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-xs text-gray-400">Avg. Progress</p>

              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-semibold">48%</h3>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <i className="ri-pie-chart-line text-blue-500 text-lg"></i>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-xs text-gray-400">Certificates</p>

              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-semibold">2</h3>

                <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
                  <i className="ri-award-line text-yellow-500 text-lg"></i>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <p className="text-xs text-gray-400">Completed</p>

              <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-semibold">2</h3>

                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-green-500 text-lg"></i>
                </div>
              </div>
            </div>
          </div>

          {/* CONTINUE LEARNING */}
          <section className="mb-10">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Keep Going
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold mt-1">
                  Continue Learning
                </h2>
              </div>

              <Link
                to="/my-courses"
                className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-primary transition"
              >
                All Courses
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="h-40 bg-gradient-to-br from-primary/80 to-primary/25 relative p-5">
                    <div className="absolute -right-10 -bottom-12 w-40 h-40 bg-white/20 rounded-full"></div>

                    <div className="relative w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">
                      <i className={`${course.icon} text-2xl`}></i>
                    </div>

                    <span className="absolute right-5 top-5 bg-white/75 px-3 py-1 rounded-full text-[11px] font-medium">
                      {course.category}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg">{course.title}</h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {course.lessons}
                    </p>

                    <div className="mt-5">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400">Course Progress</span>

                        <span className="font-semibold">
                          {course.progress}%
                        </span>
                      </div>

                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${course.progress}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <button className="w-full mt-5 bg-[#10131d] text-white py-3 rounded-xl text-sm font-medium hover:bg-primary hover:text-[#10131d] transition">
                      <i className="ri-play-circle-line mr-2"></i>
                      Resume Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LIVE CLASSES */}
          <section className="mb-10">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Upcoming
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold mt-1">
                  Upcoming Live Classes
                </h2>
              </div>

              <Link
                to="/live-classes"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              >
                View All
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {liveClasses.map((item, index) => (
                <div
                  key={item.title}
                  className={`p-4 md:p-5 flex items-center gap-4 ${
                    index !== liveClasses.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-primary text-lg"></i>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold truncate">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {item.date} · {item.time} · {item.duration} ·{" "}
                      {item.teacher}
                    </p>
                  </div>

                  <span className="hidden md:block bg-primary/10 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
                    {item.joining}
                  </span>

                  <button className="hidden sm:block border border-gray-300 px-4 py-2 rounded-xl text-xs font-medium hover:bg-[#10131d] hover:text-white transition">
                    View
                  </button>

                  <button className="sm:hidden w-9 h-9 rounded-lg border border-gray-200">
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM */}
          <section className="grid lg:grid-cols-2 gap-5">
            {/* COMMUNITY */}
            <div className="bg-primary rounded-3xl p-7 relative overflow-hidden">
              <div className="absolute -right-16 -top-20 w-64 h-64 bg-white/20 rounded-full"></div>

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center mb-5">
                  <i className="ri-trophy-line text-xl"></i>
                </div>

                <p className="text-sm font-medium">Community</p>

                <h3 className="text-4xl font-bold mt-1">113 pts</h3>

                <p className="text-sm text-[#10131d]/60 mt-1">
                  Level 2 · 7 badges earned
                </p>

                <button className="mt-6 bg-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#10131d] hover:text-white transition">
                  Open Community
                </button>
              </div>
            </div>

            {/* QUICK ACCESS */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-5">Quick Access</h2>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/library"
                  className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
                >
                  <i className="ri-book-2-line text-primary text-xl"></i>
                  <p className="font-semibold text-sm mt-3">Library</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Explore resources
                  </p>
                </Link>

                <Link
                  to="/assessments"
                  className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
                >
                  <i className="ri-file-list-3-line text-blue-500 text-xl"></i>
                  <p className="font-semibold text-sm mt-3">Assessments</p>
                  <p className="text-xs text-gray-400 mt-1">Check your tests</p>
                </Link>

                <Link
                  to="/certificates"
                  className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
                >
                  <i className="ri-award-line text-yellow-500 text-xl"></i>
                  <p className="font-semibold text-sm mt-3">Certificates</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Your achievements
                  </p>
                </Link>

                <Link
                  to="/my-progress"
                  className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
                >
                  <i className="ri-line-chart-line text-purple-500 text-xl"></i>
                  <p className="font-semibold text-sm mt-3">My Progress</p>
                  <p className="text-xs text-gray-400 mt-1">Track learning</p>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

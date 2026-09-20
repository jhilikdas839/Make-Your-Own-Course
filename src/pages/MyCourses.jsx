import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const courses = [
    {
      id: 1,
      title: "React 19 Pro",
      category: "Development",
      instructor: "Rahul Sharma",
      progress: 48,
      lessons: "12 / 25 lessons",
      status: "In Progress",
      icon: "ri-reactjs-line",
    },
    {
      id: 2,
      title: "Intro to Data Science",
      category: "Data Science",
      instructor: "Dr. Kapoor",
      progress: 72,
      lessons: "18 / 25 lessons",
      status: "In Progress",
      icon: "ri-bar-chart-box-line",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      category: "Design",
      instructor: "Ananya Mehta",
      progress: 31,
      lessons: "8 / 24 lessons",
      status: "In Progress",
      icon: "ri-pencil-ruler-2-line",
    },
    {
      id: 4,
      title: "JavaScript Essentials",
      category: "Development",
      instructor: "Amit Verma",
      progress: 100,
      lessons: "30 / 30 lessons",
      status: "Completed",
      icon: "ri-javascript-line",
    },
    {
      id: 5,
      title: "Digital Marketing Basics",
      category: "Marketing",
      instructor: "Priya Singh",
      progress: 100,
      lessons: "20 / 20 lessons",
      status: "Completed",
      icon: "ri-megaphone-line",
    },
    {
      id: 6,
      title: "Python for Beginners",
      category: "Programming",
      instructor: "Rohan Das",
      progress: 12,
      lessons: "3 / 25 lessons",
      status: "In Progress",
      icon: "ri-code-s-slash-line",
    },
  ];

  const tabs = ["All", "In Progress", "Completed"];

  // Filter by tab + search
  const filteredCourses = courses.filter((course) => {
    const matchesTab =
      activeTab === "All" || course.status === activeTab;

    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalCourses = courses.length;

  const inProgressCourses = courses.filter(
    (course) => course.status === "In Progress"
  ).length;

  const completedCourses = courses.filter(
    (course) => course.status === "Completed"
  ).length;

  const averageProgress = Math.round(
    courses.reduce((total, course) => total + course.progress, 0) /
      courses.length
  );

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="p-5 md:p-8 xl:p-10 max-w-[1450px] mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="mb-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Learning
              </p>

              <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                My Courses
              </h1>

              <p className="text-gray-500 mt-2 max-w-xl">
                Continue your learning journey and keep building
                your skills.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 bg-[#10131d] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-primary hover:text-[#10131d] transition"
            >
              <i className="ri-add-line"></i>
              Explore Courses
            </Link>

          </div>

        </section>


        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Total Courses */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Total Courses
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  {totalCourses}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className="ri-book-open-line text-primary text-xl"></i>
              </div>

            </div>

          </div>


          {/* In Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  In Progress
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  {inProgressCourses}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <i className="ri-loader-4-line text-blue-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Completed */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Completed
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  {completedCourses}
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Average Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Avg. Progress
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  {averageProgress}%
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <i className="ri-pie-chart-line text-purple-500 text-xl"></i>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FILTER + SEARCH
        ===================================================== */}

        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl p-1 flex w-fit">

            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-[#10131d] text-white"
                    : "text-gray-500 hover:text-[#10131d]"
                }`}
              >
                {tab}
              </button>
            ))}

          </div>


          {/* Search */}
          <div className="relative w-full md:w-72">

            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your courses..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition"
            />

          </div>

        </section>


        {/* =====================================================
            COURSE GRID
        ===================================================== */}

        <section>

          {filteredCourses.length === 0 ? (

            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center">
                <i className="ri-book-open-line text-2xl text-gray-400"></i>
              </div>

              <h3 className="text-lg font-semibold mt-5">
                No courses found
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

              {filteredCourses.map((course) => (

                <div
                  key={course.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >

                  {/* =================================================
                      COURSE COVER
                  ================================================= */}

                  <div className="h-44 bg-gradient-to-br from-primary/80 to-primary/20 relative p-5 overflow-hidden">

                    {/* Decorative Circle */}
                    <div className="absolute -right-12 -bottom-14 w-44 h-44 rounded-full bg-white/20"></div>

                    <div className="absolute -left-10 -top-12 w-32 h-32 rounded-full bg-white/10"></div>


                    <div className="relative flex items-start justify-between">

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center">
                        <i className={`${course.icon} text-2xl`}></i>
                      </div>

                      {/* Category */}
                      <span className="bg-white/80 px-3 py-1.5 rounded-full text-[11px] font-medium">
                        {course.category}
                      </span>

                    </div>


                    {/* Status */}
                    <div className="absolute left-5 bottom-5">

                      <p className="text-xs text-[#10131d]/60">
                        Online Course
                      </p>

                      <p className="text-lg font-semibold mt-1">
                        {course.status}
                      </p>

                    </div>

                  </div>


                  {/* =================================================
                      COURSE DETAILS
                  ================================================= */}

                  <div className="p-5">

                    <h3 className="text-lg font-semibold group-hover:text-primary transition">
                      {course.title}
                    </h3>


                    {/* Instructor */}
                    <div className="flex items-center gap-2 mt-2">

                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <i className="ri-user-line text-xs text-gray-500"></i>
                      </div>

                      <p className="text-xs text-gray-400">
                        {course.instructor}
                      </p>

                    </div>


                    {/* Lessons */}
                    <div className="flex justify-between items-center mt-5 text-xs">

                      <span className="text-gray-400">
                        {course.lessons}
                      </span>

                      <span className="font-semibold">
                        {course.progress}%
                      </span>

                    </div>


                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">

                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      ></div>

                    </div>


                    {/* Course Button */}
                    <button className="w-full mt-5 py-3 rounded-xl bg-[#10131d] text-white text-sm font-medium hover:bg-primary hover:text-[#10131d] transition">

                      {course.progress === 100 ? (
                        <>
                          <i className="ri-eye-line mr-2"></i>
                          View Course
                        </>
                      ) : (
                        <>
                          <i className="ri-play-circle-line mr-2"></i>
                          Resume Course
                        </>
                      )}

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          {/* Decoration */}
          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                Keep Learning
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                Ready to learn something new?
              </h2>

              <p className="text-white/50 text-sm mt-2">
                Explore more courses and add a new skill to your journey.
              </p>

            </div>


            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 bg-primary text-[#10131d] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white transition"
            >
              Explore Courses
              <i className="ri-arrow-right-line"></i>
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
};

export default MyCourses;
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

  return (
    <div className="p-5 md:p-8 xl:p-10 max-w-[1450px] mx-auto">

      {/* =====================================================
          PROFILE BANNER
      ===================================================== */}
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


      {/* =====================================================
          NOTICE
      ===================================================== */}
      <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-7">

        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">

          <i className="ri-information-line"></i>

        </div>

        <p className="text-sm flex-1">
          Your learning hub — resume courses, join live classes,
          and track your progress.
        </p>

        <i className="ri-arrow-down-s-line text-gray-400"></i>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">

        {/* Courses */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <p className="text-xs text-gray-400">
            Courses Enrolled
          </p>

          <div className="flex items-end justify-between mt-2">

            <h3 className="text-3xl font-semibold">
              6
            </h3>

            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">

              <i className="ri-book-open-line text-primary text-lg"></i>

            </div>

          </div>

        </div>


        {/* Progress */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <p className="text-xs text-gray-400">
            Avg. Progress
          </p>

          <div className="flex items-end justify-between mt-2">

            <h3 className="text-3xl font-semibold">
              48%
            </h3>

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">

              <i className="ri-pie-chart-line text-blue-500 text-lg"></i>

            </div>

          </div>

        </div>


        {/* Certificates */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <p className="text-xs text-gray-400">
            Certificates
          </p>

          <div className="flex items-end justify-between mt-2">

            <h3 className="text-3xl font-semibold">
              2
            </h3>

            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">

              <i className="ri-award-line text-yellow-500 text-lg"></i>

            </div>

          </div>

        </div>


        {/* Completed */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">

          <p className="text-xs text-gray-400">
            Completed
          </p>

          <div className="flex items-end justify-between mt-2">

            <h3 className="text-3xl font-semibold">
              2
            </h3>

            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">

              <i className="ri-checkbox-circle-line text-green-500 text-lg"></i>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTINUE LEARNING
      ===================================================== */}
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

              {/* Course Image */}
              <div className="h-40 bg-gradient-to-br from-primary/80 to-primary/25 relative p-5">

                <div className="absolute -right-10 -bottom-12 w-40 h-40 bg-white/20 rounded-full"></div>

                <div className="relative w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center">

                  <i className={`${course.icon} text-2xl`}></i>

                </div>

                <span className="absolute right-5 top-5 bg-white/75 px-3 py-1 rounded-full text-[11px] font-medium">

                  {course.category}

                </span>

              </div>


              {/* Course Details */}
              <div className="p-5">

                <h3 className="font-semibold text-lg">
                  {course.title}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  {course.lessons}
                </p>


                {/* Progress */}
                <div className="mt-5">

                  <div className="flex justify-between text-xs mb-2">

                    <span className="text-gray-400">
                      Course Progress
                    </span>

                    <span className="font-semibold">
                      {course.progress}%
                    </span>

                  </div>


                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
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


      {/* =====================================================
          UPCOMING LIVE CLASSES
      ===================================================== */}
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

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">

                <i className="ri-time-line text-primary text-lg"></i>

              </div>


              {/* Details */}
              <div className="flex-1 min-w-0">

                <h3 className="text-sm md:text-base font-semibold truncate">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400 mt-1 truncate">

                  {item.date} · {item.time} · {item.duration} ·{" "}

                  {item.teacher}

                </p>

              </div>


              {/* Joining */}
              <span className="hidden md:block bg-primary/10 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">

                {item.joining}

              </span>


              {/* View */}
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


      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}
      <section className="grid lg:grid-cols-2 gap-5">

        {/* Community */}
        <div className="bg-primary rounded-3xl p-7 relative overflow-hidden">

          <div className="absolute -right-16 -top-20 w-64 h-64 bg-white/20 rounded-full"></div>

          <div className="relative">

            <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center mb-5">

              <i className="ri-trophy-line text-xl"></i>

            </div>

            <p className="text-sm font-medium">
              Community
            </p>

            <h3 className="text-4xl font-bold mt-1">
              113 pts
            </h3>

            <p className="text-sm text-[#10131d]/60 mt-1">
              Level 2 · 7 badges earned
            </p>


            <Link
              to="/community"
              className="inline-flex mt-6 bg-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#10131d] hover:text-white transition"
            >
              Open Community
            </Link>

          </div>

        </div>


        {/* Quick Access */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-5">
            Quick Access
          </h2>


          <div className="grid grid-cols-2 gap-3">

            {/* Library */}
            <Link
              to="/library"
              className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
            >

              <i className="ri-book-2-line text-primary text-xl"></i>

              <p className="font-semibold text-sm mt-3">
                Library
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Explore resources
              </p>

            </Link>


            {/* Assessments */}
            <Link
              to="/assessments"
              className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
            >

              <i className="ri-file-list-3-line text-blue-500 text-xl"></i>

              <p className="font-semibold text-sm mt-3">
                Assessments
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Check your tests
              </p>

            </Link>


            {/* Certificates */}
            <Link
              to="/certificates"
              className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
            >

              <i className="ri-award-line text-yellow-500 text-xl"></i>

              <p className="font-semibold text-sm mt-3">
                Certificates
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Your achievements
              </p>

            </Link>


            {/* Progress */}
            <Link
              to="/my-progress"
              className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition"
            >

              <i className="ri-line-chart-line text-purple-500 text-xl"></i>

              <p className="font-semibold text-sm mt-3">
                My Progress
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Track learning
              </p>

            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;
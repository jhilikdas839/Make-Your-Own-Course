import React from "react";

const MyProgress = () => {
  const courses = [
    {
      id: 1,
      title: "React 19 Pro",
      category: "Development",
      progress: 72,
      completed: 18,
      total: 25,
      icon: "ri-reactjs-line",
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      category: "Development",
      progress: 100,
      completed: 30,
      total: 30,
      icon: "ri-javascript-line",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      category: "Design",
      progress: 48,
      completed: 12,
      total: 24,
      icon: "ri-pencil-ruler-2-line",
    },
    {
      id: 4,
      title: "Data Science with Python",
      category: "Data Science",
      progress: 35,
      completed: 9,
      total: 26,
      icon: "ri-bar-chart-box-line",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">

      <main className="p-5 md:p-8 xl:p-10 max-w-[1450px] mx-auto">

        {/* ================= PAGE HEADER ================= */}

        <section className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Your Learning
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            My Progress
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl">
            Track your learning journey, course completion and
            overall performance.
          </p>

        </section>


        {/* ================= OVERVIEW ================= */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Overall Progress */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Overall Progress
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  64%
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className="ri-pie-chart-line text-primary text-xl"></i>
              </div>

            </div>

          </div>


          {/* Lessons Completed */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Lessons Completed
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  69
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-blue-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Learning Hours */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Learning Hours
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  42h
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <i className="ri-time-line text-purple-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Completed Courses */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Courses Completed
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  3
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <i className="ri-medal-line text-green-500 text-xl"></i>
              </div>

            </div>

          </div>

        </section>


        {/* ================= PROGRESS + ACTIVITY ================= */}

        <section className="grid lg:grid-cols-3 gap-5 mb-8">

          {/* Overall Progress Card */}

          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-lg font-semibold">
                  Learning Overview
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Your overall learning performance
                </p>
              </div>

              <span className="text-sm font-semibold text-primary">
                64%
              </span>

            </div>


            {/* Progress Circle */}

            <div className="flex flex-col sm:flex-row items-center gap-8">

              <div
                className="w-40 h-40 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "conic-gradient(#10131d 0deg 230deg, #eeeeeb 230deg 360deg)",
                }}
              >

                <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center">

                  <span className="text-3xl font-bold">
                    64%
                  </span>

                  <span className="text-xs text-gray-400 mt-1">
                    Completed
                  </span>

                </div>

              </div>


              <div className="flex-1 w-full">

                <div className="flex items-center justify-between mb-3">

                  <span className="text-sm text-gray-500">
                    Course Completion
                  </span>

                  <span className="text-sm font-semibold">
                    64%
                  </span>

                </div>

                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "64%" }}
                  ></div>

                </div>


                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="bg-[#f8f8f5] rounded-xl p-4">

                    <p className="text-xs text-gray-400">
                      Completed
                    </p>

                    <p className="text-xl font-semibold mt-1">
                      69
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      lessons
                    </p>

                  </div>


                  <div className="bg-[#f8f8f5] rounded-xl p-4">

                    <p className="text-xs text-gray-400">
                      Remaining
                    </p>

                    <p className="text-xl font-semibold mt-1">
                      36
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      lessons
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Weekly Activity */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold">
                  Weekly Activity
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Last 7 days
                </p>

              </div>

              <i className="ri-bar-chart-line text-primary text-xl"></i>

            </div>


            {/* Activity */}

            <div className="flex items-end justify-between h-40 mt-7 gap-2">

              {[
                { day: "M", value: "45%" },
                { day: "T", value: "70%" },
                { day: "W", value: "55%" },
                { day: "T", value: "85%" },
                { day: "F", value: "65%" },
                { day: "S", value: "90%" },
                { day: "S", value: "40%" },
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex flex-col items-center justify-end h-full flex-1"
                >

                  <div className="w-full max-w-[28px] h-full flex items-end">

                    <div
                      className="w-full bg-primary rounded-t-lg"
                      style={{
                        height: item.value,
                      }}
                    ></div>

                  </div>

                  <span className="text-[10px] text-gray-400 mt-2">
                    {item.day}
                  </span>

                </div>

              ))}

            </div>


            <div className="flex items-center gap-2 mt-5">

              <span className="w-2 h-2 rounded-full bg-primary"></span>

              <span className="text-xs text-gray-400">
                Learning activity
              </span>

            </div>

          </div>

        </section>


        {/* ================= COURSE PROGRESS ================= */}

        <section>

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-semibold">
                Course Progress
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Track your progress across all courses.
              </p>
            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-5">

            {courses.map((course) => (

              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-2xl p-5"
              >

                {/* Course Header */}

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">

                    <i
                      className={`${course.icon} text-xl text-primary`}
                    ></i>

                  </div>


                  <div className="min-w-0 flex-1">

                    <h3 className="font-semibold truncate">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {course.category}
                    </p>

                  </div>


                  <span className="text-sm font-semibold">
                    {course.progress}%
                  </span>

                </div>


                {/* Progress */}

                <div className="mt-5">

                  <div className="flex items-center justify-between text-xs mb-2">

                    <span className="text-gray-400">
                      Course Progress
                    </span>

                    <span className="text-gray-500">
                      {course.completed} / {course.total} lessons
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


                {/* Bottom */}

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                      course.progress === 100
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {course.progress === 100
                      ? "Completed"
                      : "In Progress"}
                  </span>


                  <button className="text-sm font-semibold hover:text-primary transition">

                    {course.progress === 100
                      ? "View Course"
                      : "Continue Learning"}

                    <i className="ri-arrow-right-line ml-1"></i>

                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* ================= MOTIVATION CTA ================= */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative">

            <p className="text-primary text-xs font-semibold uppercase tracking-wider">
              Keep Going
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-2">
              Small progress every day adds up.
            </h2>

            <p className="text-white/50 text-sm mt-2 max-w-xl">
              Stay consistent with your learning and keep moving
              towards your goals.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
};

export default MyProgress;
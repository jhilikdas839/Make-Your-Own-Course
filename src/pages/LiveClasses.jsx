import React from "react";
import { Link } from "react-router-dom";

const LiveClasses = () => {
  const liveClasses = [
    {
      id: 1,
      title: "Advanced React & Hooks",
      instructor: "Rahul Sharma",
      date: "Today",
      time: "4:00 PM - 5:30 PM",
      duration: "90 Minutes",
      students: "124 Students",
      status: "Live Now",
      icon: "ri-reactjs-line",
    },
    {
      id: 2,
      title: "JavaScript Interview Preparation",
      instructor: "Amit Verma",
      date: "Today",
      time: "7:00 PM - 8:00 PM",
      duration: "60 Minutes",
      students: "86 Students",
      status: "Upcoming",
      icon: "ri-javascript-line",
    },
    {
      id: 3,
      title: "UI/UX Design Workshop",
      instructor: "Ananya Mehta",
      date: "Tomorrow",
      time: "11:00 AM - 12:30 PM",
      duration: "90 Minutes",
      students: "72 Students",
      status: "Upcoming",
      icon: "ri-pencil-ruler-2-line",
    },
    {
      id: 4,
      title: "Data Science with Python",
      instructor: "Dr. Kapoor",
      date: "Tomorrow",
      time: "5:00 PM - 6:30 PM",
      duration: "90 Minutes",
      students: "98 Students",
      status: "Upcoming",
      icon: "ri-bar-chart-box-line",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">

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
                Live Classes
              </h1>

              <p className="text-gray-500 mt-2 max-w-xl">
                Join live interactive classes, ask questions and learn
                directly from your instructors.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3">

              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>

              <span className="text-sm font-medium">
                1 class is live
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            LIVE NOW
        ===================================================== */}

        <section className="mb-10">

          <div className="flex items-center justify-between mb-4">

            <div>
              <h2 className="text-xl font-semibold">
                Live Now
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Join the class happening right now.
              </p>
            </div>

            <span className="text-xs font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-full">
              LIVE
            </span>

          </div>


          {/* Live Card */}

          {liveClasses
            .filter((item) => item.status === "Live Now")
            .map((item) => (

              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >

                <div className="p-5 md:p-6">

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                    {/* Left */}

                    <div className="flex items-start gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">

                        <i className={`${item.icon} text-2xl text-primary`}></i>

                      </div>


                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-lg md:text-xl font-semibold">
                            {item.title}
                          </h3>

                          <span className="flex items-center gap-1 text-[10px] font-semibold uppercase bg-red-50 text-red-500 px-2 py-1 rounded-full">

                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>

                            Live

                          </span>

                        </div>


                        <p className="text-sm text-gray-400 mt-1">
                          By {item.instructor}
                        </p>


                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-400">

                          <span className="flex items-center gap-1.5">
                            <i className="ri-time-line"></i>
                            {item.time}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <i className="ri-group-line"></i>
                            {item.students}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* Button */}

                    <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#10131d] text-white text-sm font-semibold hover:bg-primary hover:text-[#10131d] transition">

                      <i className="ri-video-chat-line mr-2"></i>

                      Join Live Class

                    </button>

                  </div>

                </div>

              </div>

            ))}

        </section>


        {/* =====================================================
            UPCOMING CLASSES
        ===================================================== */}

        <section>

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-semibold">
                Upcoming Classes
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Don't miss your upcoming learning sessions.
              </p>
            </div>

            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#10131d] transition">

              View Calendar

              <i className="ri-calendar-line"></i>

            </button>

          </div>


          {/* Upcoming Grid */}

          <div className="grid md:grid-cols-2 gap-5">

            {liveClasses
              .filter((item) => item.status === "Upcoming")
              .map((item) => (

                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >

                  {/* Top */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

                      <i className={`${item.icon} text-xl text-primary`}></i>

                    </div>


                    <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">
                      Upcoming
                    </span>

                  </div>


                  {/* Content */}

                  <h3 className="text-lg font-semibold mt-5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    By {item.instructor}
                  </p>


                  {/* Info */}

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <div className="bg-[#f8f8f5] rounded-xl p-3">

                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        Date
                      </p>

                      <p className="text-sm font-medium mt-1">
                        {item.date}
                      </p>

                    </div>


                    <div className="bg-[#f8f8f5] rounded-xl p-3">

                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        Time
                      </p>

                      <p className="text-sm font-medium mt-1">
                        {item.time}
                      </p>

                    </div>

                  </div>


                  {/* Bottom */}

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                    <div className="flex items-center gap-2 text-xs text-gray-400">

                      <i className="ri-group-line"></i>

                      {item.students}

                    </div>


                    <button className="text-sm font-semibold text-[#10131d] hover:text-primary transition">

                      Set Reminder

                      <i className="ri-arrow-right-line ml-1"></i>

                    </button>

                  </div>

                </div>

              ))}

          </div>

        </section>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                Keep Learning
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                Never miss a live session
              </h2>

              <p className="text-white/50 text-sm mt-2 max-w-lg">
                Stay connected with your instructors and make the most
                out of every live class.
              </p>

            </div>


            <Link
              to="/my-courses"
              className="inline-flex items-center justify-center gap-2 bg-primary text-[#10131d] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white transition"
            >
              My Courses
              <i className="ri-arrow-right-line"></i>
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
};

export default LiveClasses;
import React from "react";
import { Link } from "react-router-dom";

const Sessions = () => {
  const upcomingSessions = [
    {
      title: "React Project Mentoring",
      mentor: "Alex Johnson",
      date: "24 Sep 2026",
      time: "11:00 AM - 12:00 PM",
      type: "1:1 Mentorship",
      icon: "ri-reactjs-line",
    },
    {
      title: "Frontend Career Guidance",
      mentor: "Sarah Williams",
      date: "26 Sep 2026",
      time: "04:00 PM - 05:00 PM",
      type: "Career Session",
      icon: "ri-briefcase-4-line",
    },
    {
      title: "Portfolio Review",
      mentor: "Michael Brown",
      date: "29 Sep 2026",
      time: "02:00 PM - 03:00 PM",
      type: "Project Review",
      icon: "ri-layout-4-line",
    },
  ];

  const completedSessions = [
    {
      title: "JavaScript Interview Preparation",
      mentor: "Sarah Williams",
      date: "15 Sep 2026",
      time: "03:00 PM",
      status: "Completed",
    },
    {
      title: "React Fundamentals Doubt Session",
      mentor: "Alex Johnson",
      date: "10 Sep 2026",
      time: "11:00 AM",
      status: "Completed",
    },
  ];

  return (
    <div className="p-5 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-gray-400 mb-1">Learning Support</p>

          <h1 className="text-2xl md:text-3xl font-bold text-[#10131d]">
            Sessions
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Book and manage your mentoring and learning sessions.
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-primary text-[#10131d] text-sm font-semibold hover:opacity-90 transition">
          <i className="ri-add-line mr-2"></i>
          Book a Session
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <i className="ri-calendar-check-line text-blue-600 text-xl"></i>
          </div>

          <p className="text-sm text-gray-500">Upcoming</p>
          <h3 className="text-2xl font-bold mt-1">3</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
            <i className="ri-check-double-line text-green-600 text-xl"></i>
          </div>

          <p className="text-sm text-gray-500">Completed</p>
          <h3 className="text-2xl font-bold mt-1">8</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <i className="ri-time-line text-purple-600 text-xl"></i>
          </div>

          <p className="text-sm text-gray-500">Hours Learned</p>
          <h3 className="text-2xl font-bold mt-1">12h</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
            <i className="ri-user-star-line text-orange-600 text-xl"></i>
          </div>

          <p className="text-sm text-gray-500">Mentors</p>
          <h3 className="text-2xl font-bold mt-1">4</h3>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#10131d]">
              Upcoming Sessions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your scheduled learning sessions
            </p>
          </div>

          <button className="hidden sm:block text-sm font-semibold text-[#10131d] hover:underline">
            View Calendar
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#10131d] text-white flex items-center justify-center">
                  <i className={`${session.icon} text-xl`}></i>
                </div>

                <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-600">
                  Upcoming
                </span>
              </div>

              <h3 className="font-bold text-[#10131d] text-base">
                {session.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                with {session.mentor}
              </p>

              {/* Details */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-calendar-line text-gray-400"></i>
                  <span>{session.date}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-time-line text-gray-400"></i>
                  <span>{session.time}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-user-line text-gray-400"></i>
                  <span>{session.type}</span>
                </div>
              </div>

              {/* Button */}
              <button className="w-full mt-6 py-3 rounded-xl bg-primary text-[#10131d] text-sm font-semibold hover:opacity-90 transition">
                View Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Session History */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#10131d]">
            Session History
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your recently completed sessions
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {completedSessions.map((session, index) => (
            <div
              key={index}
              className="p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                  <i className="ri-video-chat-line text-gray-600 text-lg"></i>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#10131d]">
                    {session.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {session.mentor} • {session.date} • {session.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-600">
                  {session.status}
                </span>

                <button className="text-sm font-semibold text-[#10131d] hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 bg-[#10131d] rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="text-xl font-bold">
            Need help with your learning?
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Book a personalized session with an experienced mentor.
          </p>
        </div>

        <Link
          to="/courses"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-[#10131d] text-sm font-semibold hover:opacity-90 transition"
        >
          Explore Courses
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </div>
  );
};

export default Sessions;
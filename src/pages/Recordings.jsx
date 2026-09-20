import React from "react";
import { Link } from "react-router-dom";

const Recordings = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">

      <main className="min-h-[calc(100vh-76px)] flex items-center justify-center p-5 md:p-8">

        <div className="w-full max-w-2xl text-center">

          {/* Icon */}

          <div className="relative w-24 h-24 mx-auto">

            <div className="absolute inset-0 rounded-3xl bg-primary/10"></div>

            <div className="relative w-full h-full rounded-3xl flex items-center justify-center">

              <i className="ri-video-line text-4xl text-primary"></i>

            </div>

          </div>


          {/* Badge */}

          <div className="inline-flex items-center gap-2 mt-7 px-4 py-2 rounded-full bg-white border border-gray-200">

            <span className="w-2 h-2 rounded-full bg-primary"></span>

            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Coming Soon
            </span>

          </div>


          {/* Heading */}

          <h1 className="text-3xl md:text-4xl font-semibold mt-5">
            Course Recordings
          </h1>


          {/* Description */}

          <p className="text-gray-500 mt-3 max-w-lg mx-auto leading-6">
            Missed a live class? Don't worry. Recorded sessions will
            be available here so you can learn whenever you want.
          </p>


          {/* Main Card */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7 mt-8 text-left">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">

                <i className="ri-play-circle-line text-primary text-xl"></i>

              </div>


              <div>

                <h3 className="font-semibold">
                  What you'll find here
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Your recorded classes and learning sessions will
                  appear here once this feature is available.
                </p>

              </div>

            </div>


            <div className="grid sm:grid-cols-3 gap-3 mt-6">

              <div className="bg-[#f8f8f5] rounded-xl p-4">

                <i className="ri-video-chat-line text-primary text-lg"></i>

                <p className="text-sm font-medium mt-2">
                  Live Classes
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Recorded sessions
                </p>

              </div>


              <div className="bg-[#f8f8f5] rounded-xl p-4">

                <i className="ri-history-line text-primary text-lg"></i>

                <p className="text-sm font-medium mt-2">
                  Watch Anytime
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Learn at your pace
                </p>

              </div>


              <div className="bg-[#f8f8f5] rounded-xl p-4">

                <i className="ri-bookmark-line text-primary text-lg"></i>

                <p className="text-sm font-medium mt-2">
                  Save Progress
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Continue learning
                </p>

              </div>

            </div>

          </div>


          {/* Button */}

          <Link
            to="/live-classes"
            className="inline-flex items-center justify-center gap-2 mt-7 px-6 py-3 rounded-xl bg-[#10131d] text-white text-sm font-semibold hover:bg-primary hover:text-[#10131d] transition"
          >
            <i className="ri-live-line"></i>
            Explore Live Classes
          </Link>

        </div>

      </main>

    </div>
  );
};

export default Recordings;
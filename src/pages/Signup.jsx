import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f5] flex items-center justify-center px-4 py-8">

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">


        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex relative bg-[#10131d] p-10 lg:p-14 text-white flex-col justify-between overflow-hidden">

          {/* Decorative Shapes */}

          <div className="absolute top-12 right-12 w-12 h-12 border border-white/10 rounded-xl"></div>

          <div className="absolute top-28 right-28 w-8 h-8 bg-primary rounded-lg"></div>

          <div className="absolute bottom-24 left-12 w-10 h-10 bg-yellow-400 rounded-lg"></div>

          <div className="absolute bottom-10 right-20 w-6 h-6 border border-white/10 rounded-lg"></div>


          {/* Logo */}
          <div className="relative z-10">

            <Link
              to="/"
              className="text-2xl font-bold font-inter"
            >
              Make{" "}
              <span className="italic text-primary">
                Your Own
              </span>{" "}
              Course
            </Link>

          </div>


          {/* Main Content */}
          <div className="relative z-10">

            <p className="text-primary text-sm font-medium font-inter mb-4">
              LEARN • CREATE • GROW
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight font-inter">
              Start building
              <span className="block">
                your future.
              </span>
            </h2>

            <p className="mt-5 text-gray-400 leading-7 max-w-md font-inter">
              Create your account and get access to
              practical courses, expert instructors,
              and everything you need to grow your skills.
            </p>


            {/* Small Stats */}
            <div className="flex gap-8 mt-8">

              <div>
                <p className="text-2xl font-bold text-white">
                  500+
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Courses
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold text-white">
                  10K+
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Students
                </p>
              </div>


              <div>
                <p className="text-2xl font-bold text-white">
                  100+
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Instructors
                </p>
              </div>

            </div>

          </div>


          {/* Bottom Text */}
          <div className="relative z-10">

            <p className="text-sm text-gray-500 font-inter">
              Your journey starts here.
            </p>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="p-7 sm:p-10 lg:p-12">

          {/* Heading */}
          <div className="mb-7">

            <p className="text-primary text-sm font-medium font-inter mb-2">
              GET STARTED
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#10131d] font-inter">
              Create your account
            </h1>

            <p className="mt-2 text-gray-500 text-sm sm:text-base font-inter">
              Start your learning journey with us.
            </p>

          </div>


          {/* Signup Form */}
          <form className="space-y-4">


            {/* Full Name */}
            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Full Name
              </label>

              <div className="relative">

                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Email Address
              </label>

              <div className="relative">

                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Password
              </label>

              <div className="relative">

                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* Confirm Password */}
            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Confirm Password
              </label>

              <div className="relative">

                <i className="ri-lock-password-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">

              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-primary"
              />

              <p className="text-xs sm:text-sm text-gray-500 font-inter leading-5">

                I agree to the{" "}

                <span className="text-primary cursor-pointer hover:text-sec">
                  Terms & Conditions
                </span>

              </p>

            </div>


            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-[#10131d] text-white py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-primary hover:-translate-y-0.5"
            >
              Create Account

              <i className="ri-arrow-right-line ml-2"></i>

            </button>

          </form>


          {/* Divider */}
          <div className="flex items-center gap-4 my-6">

            <div className="h-px bg-gray-200 flex-1"></div>

            <span className="text-xs text-gray-400 font-inter">
              OR
            </span>

            <div className="h-px bg-gray-200 flex-1"></div>

          </div>


          {/* Login */}
          <div className="text-center">

            <p className="text-sm text-gray-500 font-inter">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 text-primary font-medium hover:text-sec"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;
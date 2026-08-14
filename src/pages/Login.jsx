import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f5] flex items-center justify-center px-4 py-10">

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">


        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex relative bg-[#10131d] p-10 lg:p-14 text-white flex-col justify-between overflow-hidden">

          {/* Decorative Squares */}
          <div className="absolute top-10 right-10 w-12 h-12 border border-white/10 rounded-xl"></div>

          <div className="absolute top-24 right-24 w-8 h-8 bg-primary rounded-lg"></div>

          <div className="absolute bottom-20 left-10 w-10 h-10 bg-yellow-400 rounded-lg"></div>


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


          {/* Main Text */}
          <div className="relative z-10">

            <p className="text-primary text-sm font-medium mb-4">
              LEARN • CREATE • GROW
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight font-inter">
              Continue your
              <span className="block">
                learning journey.
              </span>
            </h2>

            <p className="mt-5 text-gray-400 leading-7 max-w-md font-inter">
              Access your courses, track your progress,
              and keep building the skills that move
              your career forward.
            </p>

          </div>


          {/* Bottom Text */}
          <div className="relative z-10 text-sm text-gray-500 font-inter">
            Learn something new every day.
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="p-7 sm:p-10 lg:p-14">

          {/* Heading */}
          <div className="mb-8">

            <p className="text-primary text-sm font-medium font-inter mb-2">
              WELCOME BACK
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#10131d] font-inter">
              Login to your account
            </h1>

            <p className="mt-2 text-gray-500 text-sm sm:text-base font-inter">
              Continue where you left off.
            </p>

          </div>


          {/* Login Form */}
          <form className="space-y-5">


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

              <div className="flex items-center justify-between mb-2">

                <label className="text-sm font-medium text-[#10131d] font-inter">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs sm:text-sm text-primary hover:text-sec font-inter"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* Remember Me */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                className="w-4 h-4 accent-primary"
              />

              <label className="text-sm text-gray-500 font-inter">
                Remember me
              </label>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#10131d] text-white py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-primary hover:-translate-y-0.5"
            >
              Login
              <i className="ri-arrow-right-line ml-2"></i>
            </button>

          </form>


          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-gray-200 flex-1"></div>

            <span className="text-xs text-gray-400 font-inter">
              OR
            </span>

            <div className="h-px bg-gray-200 flex-1"></div>

          </div>


          {/* Signup */}
          <div className="text-center">

            <p className="text-sm text-gray-500 font-inter">

              Don't have an account?

              <Link
                to="/signup"
                className="ml-2 text-primary font-medium hover:text-sec"
              >
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
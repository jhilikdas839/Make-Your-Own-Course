import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black font-lora">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2 font-lora">
            Login to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 text-black font-lora">
              Email Address
            </label>

            <div className="relative">
              <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none font-ubuntu focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-black font-lora">
              Password
            </label>

            <div className="relative">
              <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none font-ubuntu focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm font-lora">

            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                className="accent-primary"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-primary hover:text-sec"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-lora text-lg hover:bg-sec transition"
          >
            Login
          </button>

        </form>

        {/* Signup */}
        <div className="text-center mt-7 font-lora text-gray-600">
          Don't have an account?

          <Link
            to="/signup"
            className="ml-2 text-primary font-medium hover:text-sec"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
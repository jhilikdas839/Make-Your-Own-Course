import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

      {/* Signup Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black font-lora">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 font-ubuntu">
            Start your learning journey with us
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 text-black font-lora">
              Full Name
            </label>

            <div className="relative">
              <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none font-ubuntu focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

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
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none font-ubuntu focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-black font-lora">
              Confirm Password
            </label>

            <div className="relative">
              <i className="ri-lock-password-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 outline-none font-ubuntu focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm font-lora text-gray-600">
            <input
              type="checkbox"
              className="mt-1 accent-primary"
            />

            <p>
              I agree to the{" "}
              <span className="text-primary cursor-pointer">
                Terms & Conditions
              </span>
            </p>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-lora text-lg hover:bg-sec transition"
          >
            Create Account
          </button>

        </form>

        {/* Login */}
        <div className="text-center mt-7 font-lora text-gray-600">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-primary font-medium hover:text-sec"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
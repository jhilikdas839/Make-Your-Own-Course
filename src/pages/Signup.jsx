
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // ================= STATES =================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [terms, setTerms] = useState(false);

  const [loading, setLoading] = useState(false);

  // ================= SIGNUP FUNCTION =================

  const handleSignup = async (e) => {
    e.preventDefault();

    // Empty field validation
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      alert("Please fill all fields");
      return;
    }

    // Password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Terms validation
    if (!terms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://makeyourowncoursbackend.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      console.log("Signup Response:", res.data);

      alert("Account created successfully!");

      // Redirect to login
      navigate("/login");

    } catch (error) {
      console.log("Signup Error:", error);

      alert(
        error.response?.data?.message ||
        "Signup failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] flex items-center justify-center px-4 py-8">

      {/* ================= MAIN CONTAINER ================= */}

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">


        {/* ================= LEFT SIDE ================= */}

        <div className="hidden md:flex relative bg-[#10131d] p-10 lg:p-14 text-white flex-col justify-between overflow-hidden">

          {/* Decorative Shapes */}

          <div className="absolute top-12 right-12 w-12 h-12 border border-white/10 rounded-xl"></div>

          <div className="absolute top-28 right-28 w-8 h-8 bg-primary rounded-lg"></div>

          <div className="absolute bottom-24 left-12 w-10 h-10 bg-yellow-400 rounded-lg"></div>

          <div className="absolute bottom-10 right-20 w-6 h-6 border border-white/10 rounded-lg"></div>


          {/* ================= LOGO ================= */}

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


          {/* ================= MAIN CONTENT ================= */}

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


            {/* ================= STATS ================= */}

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


          {/* ================= BOTTOM TEXT ================= */}

          <div className="relative z-10">

            <p className="text-sm text-gray-500 font-inter">
              Your journey starts here.
            </p>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="p-7 sm:p-10 lg:p-12">


          {/* ================= HEADING ================= */}

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


          {/* ================= SIGNUP FORM ================= */}

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >


            {/* ================= FULL NAME ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Full Name
              </label>

              <div className="relative">

                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* ================= EMAIL ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Email Address
              </label>

              <div className="relative">

                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* ================= ROLE ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                I want to sign up as
              </label>


              <div className="grid grid-cols-2 gap-3">


                {/* ================= STUDENT ================= */}

                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`p-4 rounded-xl border text-left transition duration-200 ${
                    role === "student"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      role === "student"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-500"
                    }`}
                  >

                    <i className="ri-graduation-cap-line"></i>

                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#10131d] font-inter">
                    Student
                  </p>

                  <p className="mt-1 text-xs text-gray-500 font-inter">
                    Learn new skills
                  </p>

                </button>


                {/* ================= TEACHER ================= */}

                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`p-4 rounded-xl border text-left transition duration-200 ${
                    role === "teacher"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                  }`}
                >

                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                      role === "teacher"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-500"
                    }`}
                  >

                    <i className="ri-presentation-line"></i>

                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#10131d] font-inter">
                    Teacher
                  </p>

                  <p className="mt-1 text-xs text-gray-500 font-inter">
                    Create & teach
                  </p>

                </button>

              </div>

            </div>


            {/* ================= PASSWORD ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Password
              </label>

              <div className="relative">

                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* ================= CONFIRM PASSWORD ================= */}

            <div>

              <label className="block mb-2 text-sm font-medium text-[#10131d] font-inter">
                Confirm Password
              </label>

              <div className="relative">

                <i className="ri-lock-password-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>


            {/* ================= TERMS ================= */}

            <div className="flex items-start gap-2 pt-1">

              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-4 w-4 accent-primary"
              />

              <p className="text-xs sm:text-sm text-gray-500 font-inter leading-5">

                I agree to the{" "}

                <span className="text-primary cursor-pointer hover:text-sec">
                  Terms & Conditions
                </span>

              </p>

            </div>


            {/* ================= SIGNUP BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#10131d] text-white py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-primary hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"
              }

              {!loading && (
                <i className="ri-arrow-right-line ml-2"></i>
              )}

            </button>

          </form>


          {/* ================= DIVIDER ================= */}

          <div className="flex items-center gap-4 my-6">

            <div className="h-px bg-gray-200 flex-1"></div>

            <span className="text-xs text-gray-400 font-inter">
              OR
            </span>

            <div className="h-px bg-gray-200 flex-1"></div>

          </div>


          {/* ================= LOGIN ================= */}

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




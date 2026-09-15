
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // ================= STATES =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= LOGIN FUNCTION =================
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // ================= API CALL =================
      const response = await axios.post(
        "https://makeyourowncoursbackend.onrender.com/api/auth/login",
        {
          email: email.trim(),
          password: password,
        }
      );

      console.log("Login Response:", response.data);

      // ================= TOKEN =================
      const token = response.data?.token;

      if (token) {
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
      }

      // ================= SUCCESS =================
      alert("Login successful!");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);

      // ================= ERROR HANDLING =================
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403) {
          alert("Login failed! Please check your email and password.");
        } else if (status === 404) {
          alert("Login API not found. Please check the API URL.");
        } else if (status === 422) {
          alert(
            error.response.data?.message ||
            "Please enter valid login details."
          );
        } else if (status >= 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(
            error.response.data?.message ||
            "Something went wrong. Please try again."
          );
        }
      } else if (error.request) {
        alert(
          "Unable to connect to the server. Please check your backend."
        );
      } else {
        alert("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5] flex items-center justify-center px-4 py-10">

      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">

        {/* ========================================================= */}
        {/* ================= LEFT SIDE ============================= */}
        {/* ========================================================= */}

        <div className="hidden md:flex relative bg-[#10131d] p-10 lg:p-14 text-white flex-col justify-between overflow-hidden">

          {/* Decorative Square - Top Right */}
          <div className="absolute top-10 right-10 w-12 h-12 border border-white/10 rounded-xl"></div>

          {/* Decorative Square - Primary */}
          <div className="absolute top-24 right-24 w-8 h-8 bg-primary rounded-lg"></div>

          {/* Decorative Square - Bottom Left */}
          <div className="absolute bottom-20 left-10 w-10 h-10 bg-yellow-400 rounded-lg"></div>

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

          {/* ================= MAIN TEXT ================= */}
          <div className="relative z-10">

            <p className="text-primary text-sm font-medium mb-4 font-inter">
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

          {/* ================= BOTTOM TEXT ================= */}
          <div className="relative z-10 text-sm text-gray-500 font-inter">
            Learn something new every day.
          </div>

        </div>

        {/* ========================================================= */}
        {/* ================= RIGHT SIDE ============================ */}
        {/* ========================================================= */}

        <div className="p-7 sm:p-10 lg:p-14">

          {/* ================= HEADING ================= */}

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

          {/* ========================================================= */}
          {/* ================= LOGIN FORM ============================ */}
          {/* ========================================================= */}

          <form
            className="space-y-5"
            onSubmit={handleLogin}
          >

            {/* ================= EMAIL ================= */}

            <div>

              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#10131d] font-inter"
              >
                Email Address
              </label>

              <div className="relative">

                {/* Email Icon */}
                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>

            {/* ================= PASSWORD ================= */}

            <div>

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#10131d] font-inter"
                >
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

                {/* Password Icon */}
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                />

              </div>

            </div>

            {/* ================= REMEMBER ME ================= */}

            <div className="flex items-center gap-2">

              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />

              <label
                htmlFor="rememberMe"
                className="text-sm text-gray-500 font-inter cursor-pointer"
              >
                Remember me
              </label>

            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#10131d] text-white py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-primary hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#10131d] disabled:hover:translate-y-0"
            >

              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <i className="ri-arrow-right-line ml-2"></i>
                </>
              )}

            </button>

          </form>

          {/* ========================================================= */}
          {/* ================= DIVIDER =============================== */}
          {/* ========================================================= */}

          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-gray-200 flex-1"></div>

            <span className="text-xs text-gray-400 font-inter">
              OR
            </span>

            <div className="h-px bg-gray-200 flex-1"></div>

          </div>

          {/* ========================================================= */}
          {/* ================= GOOGLE LOGIN ========================== */}
          {/* ========================================================= */}

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white py-3.5 rounded-xl font-medium text-[#10131d] font-inter transition duration-300 hover:bg-gray-50 hover:border-gray-300"
          >

            {/* Google Logo */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >

              {/* Red */}
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.72 1.22 9.22 3.6l6.85-6.85C35.9 2.52 30.47 0 24 0 14.61 0 6.51 5.38 2.56 13.22l7.98 6.19C12.45 13.06 17.74 9.5 24 9.5z"
              />

              {/* Blue */}
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.6-.15-3.14-.43-4.64H24v9.08h12.65c-.54 2.92-2.17 5.39-4.63 7.04l7.48 5.81C43.87 37.65 46.5 31.61 46.5 24.5z"
              />

              {/* Yellow */}
              <path
                fill="#FBBC05"
                d="M10.54 28.59A14.45 14.45 0 0 1 9.5 24c0-1.59.37-3.13 1.04-4.59l-7.98-6.19A23.92 23.92 0 0 0 0 24c0 3.86.93 7.5 2.56 10.78l7.98-6.19z"
              />

              {/* Green */}
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.91-2.13 15.88-5.79l-7.48-5.81c-2.07 1.39-4.72 2.22-8.4 2.22-6.26 0-11.55-3.56-13.46-9.91l-7.98 6.19C6.51 42.62 14.61 48 24 48z"
              />

            </svg>

            Continue with Google

          </button>

          {/* ========================================================= */}
          {/* ================= SIGN UP =============================== */}
          {/* ========================================================= */}

          <div className="text-center mt-7">

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


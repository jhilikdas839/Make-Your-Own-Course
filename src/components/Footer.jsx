import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#10131d] text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* ================= TOP ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ================= LOGO ================= */}

          <div className="lg:col-span-1">

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

            <p className="mt-5 text-gray-400 text-sm leading-7 max-w-xs font-inter">
              Learn practical skills, build real projects,
              and grow your career with courses designed
              for your future.
            </p>


            {/* Social Icons */}

            <div className="flex items-center gap-3 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
              >
                <i className="ri-facebook-fill"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
              >
                <i className="ri-instagram-line"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
              >
                <i className="ri-linkedin-fill"></i>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
              >
                <i className="ri-youtube-line"></i>
              </a>

            </div>

          </div>


          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="text-sm font-semibold text-white font-inter">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Sign Up
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= COURSES ================= */}

          <div>

            <h3 className="text-sm font-semibold text-white font-inter">
              Popular Categories
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/courses"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Web Development
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  UI / UX Design
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Programming
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Data Science
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="text-sm text-gray-400 hover:text-primary transition font-inter"
                >
                  Digital Marketing
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="text-sm font-semibold text-white font-inter">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-4">

              {/* Email */}

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                  <i className="ri-mail-line"></i>
                </div>

                <div>

                  <p className="text-xs text-gray-500 font-inter">
                    Email
                  </p>

                  <p className="text-sm text-gray-300 mt-1 font-inter">
                    hello@makeyourowncourse.com
                  </p>

                </div>

              </div>


              {/* Phone */}

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                  <i className="ri-phone-line"></i>
                </div>

                <div>

                  <p className="text-xs text-gray-500 font-inter">
                    Phone
                  </p>

                  <p className="text-sm text-gray-300 mt-1 font-inter">
                    +91 0000000000
                  </p>

                </div>

              </div>


              {/* Location */}

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                  <i className="ri-map-pin-line"></i>
                </div>

                <div>

                  <p className="text-xs text-gray-500 font-inter">
                    Location
                  </p>

                  <p className="text-sm text-gray-300 mt-1 font-inter">
                    India
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= NEWSLETTER ================= */}

       


        {/* ================= BOTTOM ================= */}

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-500 font-inter text-center md:text-left">
            © 2026 Make Your Own Course. All rights reserved.
          </p>


          <div className="flex items-center gap-5">

            <a
              href="#"
              className="text-xs text-gray-500 hover:text-primary transition font-inter"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-gray-500 hover:text-primary transition font-inter"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
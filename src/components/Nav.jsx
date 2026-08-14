import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#f8f8f5] px-4 pt-4 md:px-6">

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto">

        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 md:px-7 shadow-sm">

          <div className="flex items-center justify-between">


            {/* ================= LOGO ================= */}
            <Link
              to="/"
              className="font-inter text-xl md:text-2xl font-bold tracking-tight text-[#10131d]"
            >
              Make

              <span className="italic text-primary ml-1">
                Your Own
              </span>

              <span className="ml-1">
                Course
              </span>
            </Link>


            {/* ================= DESKTOP MENU ================= */}
            <div className="hidden md:flex items-center gap-8">

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative font-inter text-sm font-medium transition ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                Home
              </NavLink>


              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `font-inter text-sm font-medium transition ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                Courses
              </NavLink>


              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-inter text-sm font-medium transition ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 hover:text-black"
                  }`
                }
              >
                Contact
              </NavLink>

            </div>


            {/* ================= DESKTOP BUTTONS ================= */}
            <div className="hidden md:flex items-center gap-2">

              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#10131d] transition hover:bg-gray-100"
              >
                Login
              </Link>


              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl bg-[#10131d] text-sm font-medium text-white transition duration-300 hover:bg-primary"
              >
                Get Started
              </Link>

            </div>


            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-[#10131d] text-xl text-white"
            >
              <i
                className={
                  menuOpen
                    ? "ri-close-line"
                    : "ri-menu-line"
                }
              ></i>
            </button>

          </div>


          {/* ================= MOBILE MENU ================= */}
          {menuOpen && (
            <div className="md:hidden">

              <div className="mt-4 border-t border-gray-200 pt-4">

                <div className="flex flex-col gap-1">

                  <NavLink
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 font-inter text-sm font-medium transition ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    Home
                  </NavLink>


                  <NavLink
                    to="/courses"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 font-inter text-sm font-medium transition ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    Courses
                  </NavLink>


                  <NavLink
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 font-inter text-sm font-medium transition ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    Contact
                  </NavLink>

                </div>


                {/* Mobile Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">

                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-[#10131d] hover:bg-gray-100"
                  >
                    Login
                  </Link>


                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center rounded-xl bg-[#10131d] px-4 py-3 text-sm font-medium text-white hover:bg-primary"
                  >
                    Get Started
                  </Link>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
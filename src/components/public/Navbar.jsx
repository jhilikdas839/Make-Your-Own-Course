import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROLE_HOME, getInitials } from "../../utils/auth";

const links = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const session = useAuth();
  const dashboardPath = session ? ROLE_HOME[session.user.role] || "/" : null;
  const close = () => setMenuOpen(false);

  const desktopLink = ({ isActive }) =>
    `relative font-inter text-sm font-medium transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-primary after:transition-all ${
      isActive ? "text-primary after:w-full" : "text-gray-600 after:w-0 hover:text-black hover:after:w-full"
    }`;

  const mobileLink = ({ isActive }) =>
    `rounded-lg px-4 py-3 font-inter text-sm font-medium transition ${
      isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#f8f8f5]/80 px-4 pt-4 backdrop-blur md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm md:px-7">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={close} className="font-inter text-xl font-bold tracking-tight text-[#10131d] md:text-2xl">
              Make<span className="ml-1 italic text-primary">Your Own</span>
              <span className="ml-1">Course</span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                <NavLink key={link.path} to={link.path} end={link.path === "/"} className={desktopLink}>
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop buttons */}
            <div className="hidden items-center gap-2 md:flex">
              {session ? (
                <Link
                  to={dashboardPath}
                  className="flex items-center gap-2 rounded-xl bg-[#10131d] py-2 pl-2 pr-5 text-sm font-medium text-white transition duration-300 hover:bg-primary"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-xs font-bold">
                    {getInitials(session.user.name)}
                  </span>
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="rounded-xl px-5 py-2.5 text-sm font-medium text-[#10131d] transition hover:bg-gray-100">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-xl bg-[#10131d] px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-primary"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10131d] text-xl text-white md:hidden"
            >
              <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="animate-fade-in md:hidden">
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex flex-col gap-1">
                  {links.map((link) => (
                    <NavLink key={link.path} to={link.path} end={link.path === "/"} onClick={close} className={mobileLink}>
                      {link.name}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 border-t border-gray-200 pt-4">
                  {session ? (
                    <Link
                      to={dashboardPath}
                      onClick={close}
                      className="flex-1 rounded-xl bg-[#10131d] px-4 py-3 text-center text-sm font-medium text-white hover:bg-primary"
                    >
                      Go to dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={close}
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-medium text-[#10131d] hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={close}
                        className="flex-1 rounded-xl bg-[#10131d] px-4 py-3 text-center text-sm font-medium text-white hover:bg-primary"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

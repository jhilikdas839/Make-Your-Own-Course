import React, { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================================
  // MAIN MENU
  // ================================
  const mainMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "ri-dashboard-line",
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: "ri-book-open-line",
    },
    {
      name: "Live Classes",
      path: "/live-classes",
      icon: "ri-live-line",
    },
    {
      name: "Library",
      path: "/library",
      icon: "ri-folder-open-line",
    },
    {
      name: "My Progress",
      path: "/my-progress",
      icon: "ri-bar-chart-box-line",
    },
    {
      name: "Assessments",
      path: "/assessments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Certificates",
      path: "/certificates",
      icon: "ri-medal-line",
    },
    {
      name: "Discussions",
      path: "/discussions",
      icon: "ri-chat-3-line",
    },
    {
      name: "Community",
      path: "/community",
      icon: "ri-group-line",
    },
    {
      name: "Recordings",
      path: "/recordings",
      icon: "ri-video-line",
      soon: true,
    },
    {
      name: "Sessions",
      path: "/sessions",
      icon: "ri-calendar-line",
    },
  ];

  // ================================
  // ACCOUNT MENU
  // ================================
  const accountMenu = [
    {
      name: "Billing",
      path: "/billing",
      icon: "ri-wallet-3-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-3-line",
    },
  ];

  // ================================
  // SIDEBAR CONTENT
  // ================================
  const SidebarMenu = () => {
    return (
      <div className="flex flex-col h-full">

        {/* =================================
            LOGO
        ================================= */}
        <div className="h-[76px] px-7 flex items-center border-b border-gray-100 flex-shrink-0">
          <Link
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="text-[30px] font-bold tracking-tight text-[#10131d]"
          >
            MY<span className="text-[#168ee5]">OC</span>
          </Link>
        </div>

        {/* =================================
            SCROLLABLE MENU
        ================================= */}
        <div className="flex-1 overflow-y-auto px-5 py-6">

          {/* MAIN MENU TITLE */}
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9aa3b2] mb-4">
            Main Menu
          </p>

          {/* MAIN MENU */}
          <div className="space-y-2">

            {mainMenu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-4 rounded-[20px] text-[16px] transition-all duration-200 ${
                    isActive
                      ? "bg-[#168ee5] text-[#10131d] font-semibold"
                      : "text-[#687386] hover:bg-gray-50 hover:text-[#10131d]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-5">

                      <i
                        className={`${item.icon} text-[25px] ${
                          isActive
                            ? "text-[#10131d]"
                            : "text-[#737d8e]"
                        }`}
                      ></i>

                      <span>{item.name}</span>
                    </div>

                    {/* SOON BADGE */}
                    {item.soon && (
                      <span
                        className={`text-[12px] px-3 py-1.5 rounded-full ${
                          isActive
                            ? "bg-white/40 text-[#10131d]"
                            : "bg-gray-100 text-[#9aa3b2]"
                        }`}
                      >
                        Soon
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </div>

          {/* =================================
              ACCOUNT
          ================================= */}
          <div className="mt-10">

            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9aa3b2] mb-4">
              Account
            </p>

            <div className="space-y-2">

              {accountMenu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-5 px-3 py-4 rounded-[20px] text-[16px] transition-all duration-200 ${
                      isActive
                        ? "bg-[#168ee5] text-[#10131d] font-semibold"
                        : "text-[#687386] hover:bg-gray-50 hover:text-[#10131d]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i
                        className={`${item.icon} text-[25px] ${
                          isActive
                            ? "text-[#10131d]"
                            : "text-[#737d8e]"
                        }`}
                      ></i>

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}

            </div>
          </div>

        </div>

        {/* =================================
            USER PROFILE
        ================================= */}
        <div className="border-t border-gray-100 p-6 flex-shrink-0 bg-white">

          <div className="flex items-center gap-5">

            {/* Avatar */}
            <div className="w-[54px] h-[54px] rounded-full bg-[#10131d] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              JS
            </div>

            {/* User Info */}
            <div className="min-w-0">

              <p className="text-[17px] font-semibold text-[#10131d] truncate">
                John Smith
              </p>

              <p className="text-[15px] text-[#9aa3b2] mt-1">
                Student
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f8f5]">

      {/* =========================================
          DESKTOP SIDEBAR
      ========================================= */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-[345px] bg-white border-r border-gray-200 z-50">

        <SidebarMenu />

      </aside>

      {/* =========================================
          MOBILE OVERLAY
      ========================================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* =========================================
          MOBILE SIDEBAR
      ========================================= */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[300px] bg-white z-50 lg:hidden transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <SidebarMenu />
      </aside>

      {/* =========================================
          MAIN AREA
      ========================================= */}
      <main className="lg:ml-[345px] min-h-screen">

        {/* =========================================
            TOPBAR
        ========================================= */}
        <header className="h-[76px] bg-white border-b border-gray-200 px-5 md:px-8 flex items-center justify-between sticky top-0 z-30">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center"
            >
              <i className="ri-menu-line text-xl text-[#10131d]"></i>
            </button>

            <div>
              <p className="text-xs text-gray-400">
                Student Dashboard
              </p>

              <h2 className="text-base md:text-lg font-semibold text-[#10131d]">
                Welcome back, John 👋
              </h2>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <button className="hidden sm:flex w-10 h-10 rounded-xl border border-gray-200 items-center justify-center hover:bg-gray-50 transition">
              <i className="ri-search-line text-gray-500"></i>
            </button>

            {/* Notification */}
            <button className="relative w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">

              <i className="ri-notification-3-line text-gray-600"></i>

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#168ee5]"></span>

            </button>

            {/* Profile */}
            <div className="w-10 h-10 rounded-full bg-[#10131d] text-white flex items-center justify-center text-xs font-bold">
              JS
            </div>

          </div>

        </header>

        {/* =========================================
            PAGE CONTENT
        ========================================= */}
        <Outlet />

      </main>

    </div>
  );
};

export default DashboardLayout;
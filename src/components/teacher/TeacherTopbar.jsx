
import { useState } from "react";

function TeacherTopbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="flex h-[76px] items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">

      {/* Left Section */}
      <div>
        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
          Teacher Dashboard
        </h1>

        <p className="hidden text-xs text-gray-500 sm:block">
          Manage your courses and students
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 md:flex">
          <i className="ri-search-line text-gray-400"></i>

          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-40 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 lg:w-52"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-gray-700"
              aria-label="Clear search"
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50"
          aria-label="Notifications"
        >
          <i className="ri-notification-3-line text-xl"></i>

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* Divider */}
        <div className="hidden h-9 w-px bg-gray-200 sm:block"></div>

        {/* Teacher Profile */}
        <button
          type="button"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            T
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Teacher Name
            </p>

            <p className="text-xs text-gray-500">
              Instructor
            </p>
          </div>

          <i className="ri-arrow-down-s-line hidden text-gray-500 sm:block"></i>
        </button>

      </div>
    </header>
  );
}

export default TeacherTopbar;

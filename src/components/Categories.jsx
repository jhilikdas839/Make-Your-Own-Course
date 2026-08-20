import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {

  const categories = [
    {
      id: 1,
      name: "Web Development",
      courses: "120+ Courses",
      icon: "ri-code-s-slash-line",
      bg: "bg-primary",
      text: "text-white",
    },

    {
      id: 2,
      name: "UI / UX Design",
      courses: "80+ Courses",
      icon: "ri-palette-line",
      bg: "bg-white",
      text: "text-[#10131d]",
    },

    {
      id: 3,
      name: "Programming",
      courses: "100+ Courses",
      icon: "ri-terminal-box-line",
      bg: "bg-[#10131d]",
      text: "text-white",
    },

    {
      id: 4,
      name: "Data Science",
      courses: "60+ Courses",
      icon: "ri-bar-chart-box-line",
      bg: "bg-yellow-400",
      text: "text-[#10131d]",
    },

    {
      id: 5,
      name: "Digital Marketing",
      courses: "70+ Courses",
      icon: "ri-megaphone-line",
      bg: "bg-white",
      text: "text-[#10131d]",
    },

    {
      id: 6,
      name: "Business",
      courses: "50+ Courses",
      icon: "ri-briefcase-line",
      bg: "bg-primary",
      text: "text-white",
    },
  ];


  return (
    <section className="bg-[#f8f8f5] px-4 md:px-8 py-20">

      <div className="max-w-7xl mx-auto">


        {/* ================= HEADING ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>

            <p className="text-primary text-sm font-medium font-inter mb-3">
              EXPLORE CATEGORIES
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] font-inter">
              Find what you want to learn.
            </h2>

            <p className="mt-4 text-gray-500 max-w-xl leading-7 font-inter">
              Explore courses across different categories and
              find the right skills for your learning journey.
            </p>

          </div>


          {/* View All */}

          <Link
            to="/courses"
            className="flex items-center gap-2 text-sm font-medium text-primary font-inter hover:text-[#10131d] transition"
          >
            View All Courses

            <i className="ri-arrow-right-line"></i>
          </Link>

        </div>


        {/* ================= CATEGORY GRID ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {categories.map((category) => (

            <Link
              to="/courses"
              key={category.id}
              className={`${category.bg} ${category.text} group relative min-h-[190px] rounded-2xl p-6 overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >

              {/* Decorative Circle */}

              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-black/5 group-hover:scale-125 transition duration-500"></div>


              {/* Icon */}

              <div className="relative z-10 w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center text-xl">

                <i className={category.icon}></i>

              </div>


              {/* Content */}

              <div className="relative z-10 mt-8">

                <h3 className="text-xl font-semibold font-inter">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm opacity-60 font-inter">
                  {category.courses}
                </p>

              </div>


              {/* Arrow */}

              <div className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-black/10 flex items-center justify-center transition duration-300 group-hover:translate-x-1">

                <i className="ri-arrow-right-line"></i>

              </div>

            </Link>

          ))}

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">

              <i className="ri-compass-3-line"></i>

            </div>

            <div>

              <h3 className="font-semibold text-[#10131d] font-inter">
                Not sure where to start?
              </h3>

              <p className="text-sm text-gray-500 mt-1 font-inter">
                Explore all courses and find something that fits you.
              </p>

            </div>

          </div>


          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-[#10131d] text-white px-5 py-2.5 rounded-xl text-sm font-medium font-inter hover:bg-primary transition"
          >

            Explore Courses

            <i className="ri-arrow-right-line"></i>

          </Link>

        </div>

      </div>

    </section>
  );
};

export default Categories;
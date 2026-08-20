import React from "react";
import { Link } from "react-router-dom";

const PopularInstructors = () => {

  const instructors = [
    {
      id: 1,
      name: "John Doe",
      role: "React & Frontend Developer",
      students: "12K+ Students",
      courses: "15 Courses",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },

    {
      id: 2,
      name: "Sarah Smith",
      role: "UI/UX Design Expert",
      students: "8K+ Students",
      courses: "12 Courses",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },

    {
      id: 3,
      name: "David Wilson",
      role: "Full Stack Developer",
      students: "15K+ Students",
      courses: "18 Courses",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },

    {
      id: 4,
      name: "Emily Johnson",
      role: "Data Science Instructor",
      students: "9K+ Students",
      courses: "10 Courses",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    },
  ];


  return (
    <section className="bg-[#f8f8f5] px-4 md:px-8 py-20">

      <div className="max-w-7xl mx-auto">


        {/* ================= HEADING ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>

            <p className="text-primary text-sm font-medium font-inter mb-3">
              MEET THE EXPERTS
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] font-inter">
              Learn from the best.
            </h2>

            <p className="mt-4 text-gray-500 max-w-xl leading-7 font-inter">
              Learn from experienced instructors who bring real-world
              knowledge and practical skills to every course.
            </p>

          </div>


          {/* View All */}

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary font-inter hover:text-[#10131d] transition"
          >
            View All Instructors

            <i className="ri-arrow-right-line"></i>
          </Link>

        </div>


        {/* ================= INSTRUCTOR GRID ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {instructors.map((instructor) => (

            <div
              key={instructor.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >


              {/* ================= IMAGE ================= */}

              <div className="relative h-64 overflow-hidden bg-gray-100">

                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
                />


                {/* Rating */}

                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">

                  <i className="ri-star-fill text-yellow-400"></i>

                  <span className="text-xs font-semibold text-[#10131d] font-inter">
                    {instructor.rating}
                  </span>

                </div>


                {/* Online Badge */}

                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#10131d]/90 text-white px-3 py-1.5 rounded-full">

                  <span className="w-2 h-2 rounded-full bg-green-400"></span>

                  <span className="text-xs font-inter">
                    Instructor
                  </span>

                </div>

              </div>


              {/* ================= DETAILS ================= */}

              <div className="p-5">


                {/* Name */}

                <h3 className="text-lg font-semibold text-[#10131d] font-inter">
                  {instructor.name}
                </h3>


                {/* Role */}

                <p className="mt-1 text-sm text-gray-500 font-inter">
                  {instructor.role}
                </p>


                {/* Stats */}

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">

                  <div className="flex items-center gap-1 text-xs text-gray-500 font-inter">

                    <i className="ri-user-line text-primary"></i>

                    {instructor.students}

                  </div>


                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>


                  <div className="flex items-center gap-1 text-xs text-gray-500 font-inter">

                    <i className="ri-book-open-line text-primary"></i>

                    {instructor.courses}

                  </div>

                </div>


                {/* Button */}

                <button
                  type="button"
                  className="w-full mt-5 py-2.5 rounded-xl bg-[#10131d] text-white text-sm font-medium font-inter flex items-center justify-center gap-2 transition hover:bg-primary"
                >

                  View Profile

                  <i className="ri-arrow-right-line"></i>

                </button>

              </div>

            </div>

          ))}

        </div>


        {/* ================= BOTTOM MESSAGE ================= */}

        <div className="mt-5 bg-[#10131d] rounded-2xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 text-yellow-400 flex items-center justify-center text-xl">

              <i className="ri-graduation-cap-line"></i>

            </div>

            <div>

              <h3 className="font-semibold text-white font-inter">
                Learn from people who do it for real.
              </h3>

              <p className="text-sm text-gray-400 mt-1 font-inter">
                Practical knowledge from experienced professionals.
              </p>

            </div>

          </div>


          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-white text-[#10131d] px-5 py-2.5 rounded-xl text-sm font-medium font-inter hover:bg-primary hover:text-white transition"
          >

            Start Learning

            <i className="ri-arrow-right-line"></i>

          </Link>

        </div>

      </div>

    </section>
  );
};

export default PopularInstructors;
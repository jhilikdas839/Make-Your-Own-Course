import React from "react";

const Courses = () => {

  const courses = [
    {
      id: 1,
      title: "Complete React JS Course",
      instructor: "John Doe",
      level: "Beginner",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    },

    {
      id: 2,
      title: "JavaScript From Zero to Hero",
      instructor: "Sarah Smith",
      level: "Beginner",
      price: "₹799",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    },

    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Alex Martin",
      level: "Intermediate",
      price: "₹899",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    },

    {
      id: 4,
      title: "Full Stack Web Development",
      instructor: "David Wilson",
      level: "Advanced",
      price: "₹1499",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },

    {
      id: 5,
      title: "Tailwind CSS Complete Guide",
      instructor: "Michael Lee",
      level: "Beginner",
      price: "₹599",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },

    {
      id: 6,
      title: "Node JS & Express",
      instructor: "Robert Brown",
      level: "Intermediate",
      price: "₹999",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    },
  ];


  return (
    <div className="min-h-screen bg-[#f8f8f5]">


      {/* ================= HERO ================= */}

      <section className="px-4 md:px-8 pt-10">

        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-[#10131d] px-6 py-14 md:px-12 md:py-20">

          {/* Decorative Shapes */}

          <div className="absolute top-8 right-10 w-14 h-14 border border-white/10 rounded-xl"></div>

          <div className="absolute top-20 right-24 w-8 h-8 bg-primary rounded-lg"></div>

          <div className="absolute bottom-10 right-12 w-10 h-10 bg-yellow-400 rounded-lg"></div>


          {/* Hero Content */}

          <div className="relative z-10 max-w-2xl">

            <p className="text-primary text-sm font-medium font-inter mb-4">
              LEARN • CREATE • GROW
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight font-inter">

              Explore courses
              <span className="block text-gray-400">
                that help you grow.
              </span>

            </h1>

            <p className="mt-5 text-gray-400 max-w-xl leading-7 font-inter">

              Learn practical skills from industry experts,
              improve your knowledge, and build your future
              with courses designed for you.

            </p>


            {/* Search */}

            <div className="relative mt-8 max-w-xl">

              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

              <input
                type="text"
                placeholder="Search for a course..."
                className="w-full bg-white rounded-xl py-4 pl-11 pr-5 outline-none text-sm font-inter text-[#10131d] focus:ring-4 focus:ring-primary/20"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= COURSES ================= */}

      <section className="px-4 md:px-8 py-16">

        <div className="max-w-7xl mx-auto">


          {/* Heading */}

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">

            <div>

              <p className="text-primary text-sm font-medium font-inter mb-2">
                OUR COURSES
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#10131d] font-inter">
                All Courses
              </h2>

              <p className="mt-2 text-gray-500 font-inter">
                Choose a course and start learning today.
              </p>

            </div>


            {/* Course Count */}

            <div className="text-sm text-gray-500 font-inter">

              <span className="font-semibold text-[#10131d]">
                {courses.length}
              </span>{" "}
              courses available

            </div>

          </div>


          {/* ================= CATEGORY BUTTONS ================= */}

          <div className="flex flex-wrap gap-2 mb-10">

            <button className="px-5 py-2.5 rounded-full bg-[#10131d] text-white text-sm font-medium font-inter">
              All
            </button>

            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium font-inter hover:border-primary hover:text-primary transition">
              Development
            </button>

            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium font-inter hover:border-primary hover:text-primary transition">
              Design
            </button>

            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-medium font-inter hover:border-primary hover:text-primary transition">
              Programming
            </button>

          </div>


          {/* ================= COURSE CARDS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (

              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >


                {/* Image */}

                <div className="relative h-52 overflow-hidden">

                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />


                  {/* Level */}

                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#10131d] font-inter">
                    {course.level}
                  </span>


                  {/* Favorite */}

                  <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-500 transition">

                    <i className="ri-heart-line"></i>

                  </button>

                </div>


                {/* Details */}

                <div className="p-5">


                  {/* Course Title */}

                  <h3 className="text-lg font-semibold text-[#10131d] font-inter leading-6">
                    {course.title}
                  </h3>


                  {/* Instructor */}

                  <div className="flex items-center gap-2 mt-3">

                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">

                      <i className="ri-user-line text-sm"></i>

                    </div>

                    <p className="text-sm text-gray-500 font-inter">
                      {course.instructor}
                    </p>

                  </div>


                  {/* Course Info */}

                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 font-inter">

                    <span className="flex items-center gap-1">
                      <i className="ri-play-circle-line"></i>
                      24 Lessons
                    </span>

                    <span className="flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      8 Hours
                    </span>

                  </div>


                  {/* Bottom */}

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                    <div>

                      <p className="text-xs text-gray-400 font-inter">
                        Course Price
                      </p>

                      <p className="text-xl font-bold text-primary font-inter">
                        {course.price}
                      </p>

                    </div>


                    <button className="flex items-center gap-2 bg-[#10131d] text-white px-4 py-2.5 rounded-xl text-sm font-medium font-inter hover:bg-primary transition">

                      View Course

                      <i className="ri-arrow-right-line"></i>

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
};

export default Courses;
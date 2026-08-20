import React from "react";
import { Link } from "react-router-dom";

const CourseCom = () => {

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
    <section className="bg-[#f8f8f5] py-20 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}

        <div className="mb-10">

          <p className="text-primary text-sm font-medium font-inter mb-3">
            LEARN SOMETHING NEW
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] font-inter">
            Popular Courses
          </h2>

          <p className="mt-3 text-gray-500 max-w-xl font-inter">
            Learn practical skills from carefully designed courses
            and take the next step in your learning journey.
          </p>

        </div>


        {/* ================= COURSE CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {courses.map((course) => (

            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 group transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Image */}

              <div className="relative h-48 overflow-hidden">

                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Level */}

                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#10131d] font-inter">
                  {course.level}
                </span>

              </div>


              {/* Course Details */}

              <div className="p-5">

                <h3 className="text-lg font-semibold text-[#10131d] font-inter line-clamp-2">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500 font-inter">
                  By {course.instructor}
                </p>


                {/* Bottom */}

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                  <div>

                    <p className="text-xs text-gray-400 font-inter">
                      Course Price
                    </p>

                    <p className="text-lg font-bold text-primary font-inter">
                      {course.price}
                    </p>

                  </div>


                  <button
                    type="button"
                    className="w-10 h-10 rounded-xl bg-[#10131d] text-white flex items-center justify-center hover:bg-primary transition"
                  >
                    <i className="ri-arrow-right-line"></i>
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* ================= EXPLORE MORE ================= */}

        <div className="flex justify-center mt-12">

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-[#10131d] text-white px-7 py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-primary hover:-translate-y-0.5"
          >

            Explore More Courses

            <i className="ri-arrow-right-line"></i>

          </Link>

        </div>

      </div>

    </section>
  );
};

export default CourseCom;
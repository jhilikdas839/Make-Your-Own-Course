import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/HeroImg.png";

const Home = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-white flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - DETAILS */}
          <div>

            {/* Small Text */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-0.5 bg-primary"></span>

              <p className="font-inter italic font-medium text-primary uppercase tracking-wide">
                Learn. <span className="font-medium italic text-black">Create.</span> Grow.
              </p>
            </div>

            {/* Heading */}
            <h1 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Create Your Own
              <span className="block text-primary">
                Online Course
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-600 font-inter text-base sm:text-lg leading-7 max-w-xl">
              Share your knowledge, create engaging courses, and help
              students learn new skills. Build your course and start
              teaching with ease.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/signup"
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-inter hover:bg-sec transition"
              >
                Start Creating
                <i className="ri-arrow-right-line"></i>
              </Link>

              <Link
                to="/courses"
                className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-inter hover:bg-primary hover:text-white transition"
              >
                Explore Courses
                <i className="ri-book-open-line"></i>
              </Link>

            </div>

            {/* Small Stats */}
            <div className="flex flex-wrap gap-8 mt-10 pt-6 border-t border-gray-200">

              <div>
                <h3 className="text-2xl font-bold text-primary font-inter">
                  500+
                </h3>

                <p className="text-black font-medium font-inter text-sm">
                  Courses
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary font-inter">
                  10K+
                </h3>

                <p className="text-black font-medium font-inter text-sm">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary font-inter">
                  100+
                </h3>

                <p className="text-black font-medium font-inter text-sm">
                  Instructors
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE - IMAGE */}
          <div className="relative flex justify-center">

            {/* Background Shape */}
            <div className="absolute w-[80%] h-[80%] bg-gray-300 rounded-full blur-3xl"></div>

            {/* Image Container */}
            <div className="relative w-full max-w-lg">

              <img
                src={HeroImg}
                alt="Online Course"
                className="w-full h-auto object-cover rounded-2xl"
              />

              {/* Floating Card */}
              <div className="absolute bottom-5 left-5 bg-white shadow-lg rounded-xl px-5 py-4 flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center">
                  <i className="ri-graduation-cap-line text-xl text-white"></i>
                </div>

                <div>
                  <p className="font-one text-primary">
                    Start Learning
                  </p>

                  <p className="text-sm text-gray-500 font-inter">
                    Learn from experts
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Home;
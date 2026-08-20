import React from "react";
import { Link } from "react-router-dom";
import CourseCom from '../components/CourseCom'
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import PopularInstructors from "../components/PopularInstructors";
import LearningProcess from "../components/LearningProcess";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <section className="min-h-screen bg-[#f8f8f5] px-4 py-8 md:px-8">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">

        {/* ================= HERO ================= */}
        <div className="relative min-h-[520px] flex flex-col items-center justify-center text-center overflow-hidden rounded-3xl bg-white border border-gray-200">

          {/* LEFT DECORATION */}
          <div className="absolute left-5 md:left-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">

            <div className="w-8 h-8 md:w-11 md:h-11 border border-gray-200 rounded-lg"></div>

            <div className="w-8 h-8 md:w-11 md:h-11 bg-primary rounded-lg"></div>

            <div className="w-8 h-8 md:w-11 md:h-11 border border-gray-200 rounded-lg"></div>

            <div className="w-8 h-8 md:w-11 md:h-11 bg-yellow-400 rounded-lg"></div>

          </div>


          {/* RIGHT DECORATION */}
          <div className="absolute right-5 md:right-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">

            <div className="flex gap-3">
              <div className="w-8 h-8 md:w-11 md:h-11 border border-gray-200 rounded-lg"></div>
              <div className="w-8 h-8 md:w-11 md:h-11 border border-gray-200 rounded-lg"></div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 md:w-11 md:h-11 bg-primary rounded-lg"></div>
              <div className="w-8 h-8 md:w-11 md:h-11 border border-gray-200 rounded-lg"></div>
            </div>

            <div className="w-8 h-8 md:w-11 md:h-11 bg-yellow-400 rounded-lg ml-8"></div>

          </div>


          {/* HERO CONTENT */}
          <div className="relative z-10 max-w-3xl px-6">

            {/* Small Text */}
            <p className="mb-5 text-sm md:text-base font-medium text-primary">
              Learn • Build • Grow
            </p>


            {/* Heading */}
            <h1 className="font-inter text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-[#10131d]">

              One place for all

              <span className="block">
                your learning
              </span>

            </h1>


            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-sm md:text-lg leading-7 text-gray-600">

              Learn new skills, build your career, and grow with
              practical courses designed to help you move forward.

            </p>


            {/* Button */}
            <Link
              to="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#10131d] px-7 py-3.5 text-sm md:text-base font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-primary"
            >

              Explore Courses

              <i className="ri-arrow-right-line"></i>

            </Link>

          </div>

        </div>


        {/* ================= BOTTOM CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">


          {/* CARD 1 */}
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-primary p-6">

            {/* Circle */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10"></div>

            <div className="relative z-10">

              <p className="text-3xl md:text-4xl font-bold text-white">
                500+
              </p>

              <p className="mt-2 text-sm text-white/80">
                Courses available
              </p>

            </div>


            {/* Small Progress Bars */}
            <div className="absolute bottom-6 left-6 right-6">

              <div className="mb-2 flex justify-between text-xs text-white/80">
                <span>Learning Progress</span>
                <span>85%</span>
              </div>

              <div className="h-2 rounded-full bg-white/20">
                <div className="h-2 w-[85%] rounded-full bg-white"></div>
              </div>

            </div>

          </div>


          {/* CARD 2 */}
          <div className="min-h-[220px] rounded-2xl bg-[#11141f] p-6 text-white">

            <p className="text-2xl md:text-3xl font-semibold leading-tight">
              Build the skills
              <br />
              you want.
            </p>


            {/* Skill Pills */}
            <div className="mt-7 flex flex-wrap gap-2">

              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black">

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                  <i className="ri-code-line"></i>
                </span>

                Web Development

              </div>


              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black">

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                  <i className="ri-palette-line"></i>
                </span>

                Design

              </div>

            </div>

          </div>


          {/* CARD 3 */}
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-yellow-400 p-6">

            {/* Decorative Circle */}
            <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-black/10"></div>


            <div className="relative z-10">

              <p className="max-w-xs text-2xl md:text-3xl font-semibold leading-tight text-[#11141f]">

                Learn from
                <br />
                industry experts.

              </p>


              {/* Instructor Avatars */}
              <div className="mt-7 flex items-center">

                <div className="flex -space-x-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 bg-gray-800 text-white">
                    <i className="ri-user-line"></i>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 bg-blue-500 text-white">
                    <i className="ri-user-line"></i>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 bg-primary text-white">
                    <i className="ri-user-line"></i>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-black">
                    +20
                  </div>

                </div>

              </div>


              {/* Small Button */}
              <Link
                to="/signup"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                Get Started
              </Link>

            </div>

          </div>

        </div>

      </div>

       <CourseCom />
       <About />
       <WhyChooseUs />
       <Categories />
       <PopularInstructors />
       <Testimonials />
       <LearningProcess />
       <CTA />

    </section>

   
  );
};

export default Home;
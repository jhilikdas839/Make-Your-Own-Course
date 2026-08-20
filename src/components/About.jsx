import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f5]">


      {/* ================= HERO ================= */}

      <section className="px-4 md:px-8 pt-8">

        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl bg-[#10131d] px-6 py-16 md:px-12 lg:px-16 md:py-20">

          {/* Decorative Shapes */}

          <div className="absolute top-10 right-10 w-16 h-16 border border-white/10 rounded-2xl"></div>

          <div className="absolute top-24 right-28 w-8 h-8 bg-primary rounded-lg"></div>

          <div className="absolute bottom-12 right-12 w-12 h-12 bg-yellow-400 rounded-xl"></div>

          <div className="absolute bottom-20 left-10 w-8 h-8 border border-white/10 rounded-lg"></div>


          {/* Hero Content */}

          <div className="relative z-10 max-w-3xl">

            <p className="text-primary text-sm font-medium font-inter mb-5">
              ABOUT OUR PLATFORM
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1] font-inter">

              Learning should
              <span className="block text-gray-400">
                move you forward.
              </span>

            </h1>

            <p className="mt-6 text-gray-400 text-base md:text-lg leading-8 max-w-2xl font-inter">

              We are building a simple and powerful place where
              anyone can learn new skills, discover their potential,
              and create a better future through education.

            </p>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section className="px-4 md:px-8 py-20">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


          {/* Left Content */}

          <div>

            <p className="text-primary text-sm font-medium font-inter mb-3">
              WHO WE ARE
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] leading-tight font-inter">

              We make learning
              <span className="block">
                simple & meaningful.
              </span>

            </h2>

            <p className="mt-6 text-gray-500 leading-7 font-inter max-w-xl">

              Our platform is designed for students, professionals,
              creators, and anyone who wants to learn something new.
              We believe that good education should be accessible,
              practical, and easy to understand.

            </p>

            <p className="mt-4 text-gray-500 leading-7 font-inter max-w-xl">

              That's why we bring carefully designed courses,
              experienced instructors, and practical learning
              experiences together in one place.

            </p>


            {/* Button */}

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 mt-7 bg-[#10131d] text-white px-6 py-3.5 rounded-xl font-medium font-inter transition hover:bg-primary"
            >

              Explore Courses

              <i className="ri-arrow-right-line"></i>

            </Link>

          </div>


          {/* Right Visual */}

          <div className="relative">

            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">

              {/* Top */}

              <div className="flex items-center justify-between">

                <p className="font-semibold text-[#10131d] font-inter">
                  Our Learning Community
                </p>

                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="ri-group-line"></i>
                </div>

              </div>


              {/* Stats */}

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-[#f8f8f5] rounded-2xl p-5">

                  <p className="text-3xl font-bold text-[#10131d] font-inter">
                    10K+
                  </p>

                  <p className="text-sm text-gray-500 mt-1 font-inter">
                    Active Students
                  </p>

                </div>


                <div className="bg-primary rounded-2xl p-5">

                  <p className="text-3xl font-bold text-white font-inter">
                    500+
                  </p>

                  <p className="text-sm text-white/70 mt-1 font-inter">
                    Courses
                  </p>

                </div>


                <div className="bg-[#10131d] rounded-2xl p-5">

                  <p className="text-3xl font-bold text-white font-inter">
                    100+
                  </p>

                  <p className="text-sm text-gray-400 mt-1 font-inter">
                    Instructors
                  </p>

                </div>


                <div className="bg-yellow-400 rounded-2xl p-5">

                  <p className="text-3xl font-bold text-[#10131d] font-inter">
                    95%
                  </p>

                  <p className="text-sm text-[#10131d]/60 mt-1 font-inter">
                    Satisfaction
                  </p>

                </div>

              </div>


              {/* Bottom */}

              <div className="mt-5 p-5 rounded-2xl border border-gray-200">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white">
                    <i className="ri-graduation-cap-line text-xl"></i>
                  </div>

                  <div>

                    <p className="font-medium text-[#10131d] font-inter">
                      Keep Learning
                    </p>

                    <p className="text-sm text-gray-500 font-inter">
                      Your next skill is waiting.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MISSION ================= */}

      <section className="px-4 md:px-8 pb-20">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-primary text-sm font-medium font-inter mb-3">
              OUR MISSION
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] font-inter">
              Education without limits.
            </h2>

            <p className="mt-4 text-gray-500 leading-7 font-inter">
              We want to make quality learning easier to access,
              easier to understand, and more useful in the real world.
            </p>

          </div>


          {/* Mission Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">


            {/* Card 1 */}

            <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:-translate-y-1 transition duration-300">

              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                <i className="ri-lightbulb-line"></i>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#10131d] font-inter">
                Learn Smarter
              </h3>

              <p className="mt-3 text-gray-500 leading-6 text-sm font-inter">
                Practical courses focused on skills that
                actually matter in the real world.
              </p>

            </div>


            {/* Card 2 */}

            <div className="bg-[#10131d] rounded-2xl p-7 text-white hover:-translate-y-1 transition duration-300">

              <div className="w-12 h-12 rounded-xl bg-white/10 text-yellow-400 flex items-center justify-center text-xl">
                <i className="ri-user-star-line"></i>
              </div>

              <h3 className="mt-6 text-xl font-semibold font-inter">
                Expert Instructors
              </h3>

              <p className="mt-3 text-gray-400 leading-6 text-sm font-inter">
                Learn from people who have real experience
                and know how to teach what they do.
              </p>

            </div>


            {/* Card 3 */}

            <div className="bg-yellow-400 rounded-2xl p-7 hover:-translate-y-1 transition duration-300">

              <div className="w-12 h-12 rounded-xl bg-black/10 text-[#10131d] flex items-center justify-center text-xl">
                <i className="ri-rocket-line"></i>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#10131d] font-inter">
                Grow Faster
              </h3>

              <p className="mt-3 text-[#10131d]/60 leading-6 text-sm font-inter">
                Build confidence, develop new skills, and
                take the next step in your career.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= LEARNING JOURNEY ================= */}

      <section className="px-4 md:px-8 pb-20">

        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-3xl p-7 md:p-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">


            {/* Heading */}

            <div>

              <p className="text-primary text-sm font-medium font-inter mb-3">
                YOUR JOURNEY
              </p>

              <h2 className="text-3xl font-bold text-[#10131d] font-inter">
                Learn at your own pace.
              </h2>

            </div>


            {/* Steps */}

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">


              <div>

                <div className="text-4xl font-bold text-gray-200 font-inter">
                  01
                </div>

                <h3 className="mt-2 font-semibold text-[#10131d] font-inter">
                  Choose
                </h3>

                <p className="mt-1 text-sm text-gray-500 font-inter">
                  Find a course that matches your goals.
                </p>

              </div>


              <div>

                <div className="text-4xl font-bold text-gray-200 font-inter">
                  02
                </div>

                <h3 className="mt-2 font-semibold text-[#10131d] font-inter">
                  Learn
                </h3>

                <p className="mt-1 text-sm text-gray-500 font-inter">
                  Learn through practical lessons and projects.
                </p>

              </div>


              <div>

                <div className="text-4xl font-bold text-gray-200 font-inter">
                  03
                </div>

                <h3 className="mt-2 font-semibold text-[#10131d] font-inter">
                  Grow
                </h3>

                <p className="mt-1 text-sm text-gray-500 font-inter">
                  Apply your skills and move forward.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="px-4 md:px-8 pb-10">

        <div className="max-w-7xl mx-auto bg-primary rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">

          <div className="absolute top-5 left-10 w-10 h-10 border border-white/20 rounded-lg"></div>

          <div className="absolute bottom-5 right-10 w-8 h-8 bg-yellow-400 rounded-lg"></div>

          <div className="relative z-10">

            <h2 className="text-3xl md:text-5xl font-bold text-white font-inter">
              Ready to start learning?
            </h2>

            <p className="mt-4 text-white/70 max-w-xl mx-auto font-inter">
              Explore our courses and start building the skills
              that can change your future.
            </p>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 mt-7 bg-white text-[#10131d] px-7 py-3.5 rounded-xl font-medium font-inter hover:bg-[#10131d] hover:text-white transition"
            >
              Explore Courses
              <i className="ri-arrow-right-line"></i>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;
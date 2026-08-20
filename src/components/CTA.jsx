import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-[#f8f8f5] px-4 md:px-8 py-20">

      <div className="max-w-7xl mx-auto">

        {/* CTA Container */}

        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 md:px-12 lg:px-16 md:py-16">

          {/* Decorative Shapes */}

          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>

          <div className="absolute bottom-[-30px] left-[-20px] w-32 h-32 rounded-full bg-black/10"></div>

          <div className="absolute top-10 right-32 w-10 h-10 border border-white/20 rounded-xl rotate-12"></div>

          <div className="absolute bottom-10 right-16 w-7 h-7 bg-yellow-400 rounded-lg"></div>


          {/* Content */}

          <div className="relative z-10 max-w-3xl">

            <p className="text-white/70 text-sm font-medium font-inter mb-4">
              START YOUR JOURNEY
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight font-inter">
              Your next skill
              <span className="block text-white/60">
                starts here.
              </span>
            </h2>

            <p className="mt-5 text-white/70 text-base md:text-lg leading-7 max-w-2xl font-inter">
              Learn new skills, build real projects, and move
              closer to your goals with courses designed for
              practical learning.
            </p>


            {/* Buttons */}

            <div className="flex flex-wrap items-center gap-3 mt-8">

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-[#10131d] text-white px-6 py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-white hover:text-sec hover:-translate-y-0.5"
              >
                Explore Courses

                <i className="ri-arrow-right-line"></i>
              </Link>


              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-white hover:text-[#10131d]"
              >
                Create Account

                <i className="ri-user-add-line"></i>
              </Link>

            </div>

          </div>


          {/* Bottom Stats */}

          <div className="relative z-10 mt-12 pt-6 border-t border-white/15">

            <div className="flex flex-wrap gap-8 md:gap-14">

              <div>

                <p className="text-2xl font-bold text-white font-inter">
                  10K+
                </p>

                <p className="text-sm text-white/50 mt-1 font-inter">
                  Students
                </p>

              </div>


              <div>

                <p className="text-2xl font-bold text-white font-inter">
                  500+
                </p>

                <p className="text-sm text-white/50 mt-1 font-inter">
                  Courses
                </p>

              </div>


              <div>

                <p className="text-2xl font-bold text-white font-inter">
                  100+
                </p>

                <p className="text-sm text-white/50 mt-1 font-inter">
                  Instructors
                </p>

              </div>


              <div>

                <p className="text-2xl font-bold text-white font-inter">
                  4.9/5
                </p>

                <p className="text-sm text-white/50 mt-1 font-inter">
                  Rating
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;
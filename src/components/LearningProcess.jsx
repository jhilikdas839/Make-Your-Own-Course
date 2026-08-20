import React from "react";
import { Link } from "react-router-dom";

const LearningProcess = () => {

  const steps = [
    {
      id: "01",
      icon: "ri-search-line",
      title: "Choose a Course",
      description:
        "Explore our courses and choose the one that matches your goals and interests.",
    },

    {
      id: "02",
      icon: "ri-play-circle-line",
      title: "Start Learning",
      description:
        "Learn through simple lessons, practical examples, and easy-to-follow content.",
    },

    {
      id: "03",
      icon: "ri-code-box-line",
      title: "Practice & Build",
      description:
        "Apply what you learn by working on exercises, projects, and real-world problems.",
    },

    {
      id: "04",
      icon: "ri-award-line",
      title: "Grow & Achieve",
      description:
        "Complete your course, earn your certificate, and use your new skills with confidence.",
    },
  ];


  return (
    <section className="bg-[#f8f8f5] px-4 md:px-8 py-20">

      <div className="max-w-7xl mx-auto">


        {/* ================= HEADING ================= */}

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-primary text-sm font-medium font-inter mb-3">
            HOW IT WORKS
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] font-inter">
            Your learning journey,
            <span className="block">
              made simple.
            </span>
          </h2>

          <p className="mt-4 text-gray-500 leading-7 font-inter">
            From choosing your course to building real skills,
            we make every step simple and easy to follow.
          </p>

        </div>


        {/* ================= PROCESS ================= */}

        <div className="relative mt-14">


          {/* Connecting Line */}

          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gray-200"></div>


          {/* Steps */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {steps.map((step, index) => (

              <div
                key={step.id}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >


                {/* Step Number + Icon */}

                <div className="relative z-10 flex items-center justify-between">

                  <span className="text-4xl font-bold text-gray-100 font-inter">
                    {step.id}
                  </span>


                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${
                      index === 0
                        ? "bg-primary text-white"
                        : index === 1
                        ? "bg-[#10131d] text-white"
                        : index === 2
                        ? "bg-yellow-400 text-[#10131d]"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <i className={step.icon}></i>
                  </div>

                </div>


                {/* Content */}

                <h3 className="mt-8 text-xl font-semibold text-[#10131d] font-inter">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500 leading-6 font-inter">
                  {step.description}
                </p>


                {/* Arrow */}

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-5 top-6 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center text-gray-400 z-20">

                    <i className="ri-arrow-right-line"></i>

                  </div>
                )}

              </div>

            ))}

          </div>

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <p className="text-primary text-sm font-medium font-inter mb-2">
              READY TO START?
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-white font-inter">
              Turn your curiosity into a skill.
            </h3>

            <p className="mt-2 text-sm text-gray-400 font-inter">
              Pick a course and start learning today.
            </p>

          </div>


          <Link
            to="/courses"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-[#10131d] px-6 py-3.5 rounded-xl font-medium font-inter transition hover:bg-primary hover:text-white"
          >

            Explore Courses

            <i className="ri-arrow-right-line"></i>

          </Link>

        </div>

      </div>

    </section>
  );
};

export default LearningProcess;
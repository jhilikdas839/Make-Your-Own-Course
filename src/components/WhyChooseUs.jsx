import React from "react";

const WhyChooseUs = () => {

  const features = [
    {
      id: 1,
      icon: "ri-book-open-line",
      title: "Practical Learning",
      description:
        "Learn through practical lessons, real-world examples, and projects that help you build useful skills.",
      bg: "bg-primary",
      iconBg: "bg-white/15",
      iconColor: "text-white",
    },

    {
      id: 2,
      icon: "ri-user-star-line",
      title: "Expert Instructors",
      description:
        "Learn from experienced instructors who understand the industry and know how to teach effectively.",
      bg: "bg-white",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },

    {
      id: 3,
      icon: "ri-time-line",
      title: "Learn at Your Pace",
      description:
        "Study whenever you want and learn at your own speed without worrying about fixed schedules.",
      bg: "bg-yellow-400",
      iconBg: "bg-black/10",
      iconColor: "text-[#10131d]",
    },

    {
      id: 4,
      icon: "ri-award-line",
      title: "Earn Certificates",
      description:
        "Complete your courses and showcase your achievements with certificates you can be proud of.",
      bg: "bg-[#10131d]",
      iconBg: "bg-white/10",
      iconColor: "text-yellow-400",
    },
  ];


  return (
    <section className="bg-[#f8f8f5] px-4 md:px-8 py-20">

      <div className="max-w-7xl mx-auto">


        {/* ================= HEADING ================= */}

        <div className="max-w-2xl mb-12">

          <p className="text-primary text-sm font-medium font-inter mb-3">
            WHY CHOOSE US
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] leading-tight font-inter">
            Everything you need
            <span className="block">
              to keep growing.
            </span>
          </h2>

          <p className="mt-4 text-gray-500 leading-7 font-inter">
            We make learning simple, practical, and accessible so
            you can focus on developing skills that actually matter.
          </p>

        </div>


        {/* ================= FEATURE CARDS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {features.map((feature) => (

            <div
              key={feature.id}
              className={`${feature.bg} rounded-2xl p-6 min-h-[300px] flex flex-col justify-between transition duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >


              {/* Top */}

              <div>

                {/* Icon */}

                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center text-xl`}
                >
                  <i className={feature.icon}></i>
                </div>


                {/* Title */}

                <h3
                  className={`mt-7 text-xl font-semibold font-inter ${
                    feature.bg === "bg-white"
                      ? "text-[#10131d]"
                      : feature.bg === "bg-yellow-400"
                      ? "text-[#10131d]"
                      : "text-white"
                  }`}
                >
                  {feature.title}
                </h3>


                {/* Description */}

                <p
                  className={`mt-3 text-sm leading-6 font-inter ${
                    feature.bg === "bg-white"
                      ? "text-gray-500"
                      : feature.bg === "bg-yellow-400"
                      ? "text-[#10131d]/60"
                      : "text-white/60"
                  }`}
                >
                  {feature.description}
                </p>

              </div>


              {/* Bottom Number */}

              <div
                className={`text-5xl font-bold font-inter ${
                  feature.bg === "bg-white"
                    ? "text-gray-100"
                    : feature.bg === "bg-yellow-400"
                    ? "text-black/10"
                    : "text-white/10"
                }`}
              >
                0{feature.id}
              </div>

            </div>

          ))}

        </div>


        {/* ================= BOTTOM MESSAGE ================= */}

        <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">

              <i className="ri-lightbulb-line"></i>

            </div>

            <div>

              <h3 className="font-semibold text-[#10131d] font-inter">
                Your growth starts with one course.
              </h3>

              <p className="text-sm text-gray-500 mt-1 font-inter">
                Choose a skill, start learning, and take the next step.
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2 text-sm font-medium text-primary font-inter">

            Start Learning

            <i className="ri-arrow-right-line"></i>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;
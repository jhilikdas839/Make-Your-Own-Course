import React from "react";

const Testimonials = () => {

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Frontend Developer",
      rating: 5,
      review:
        "The React course was exactly what I needed. The lessons were simple, practical, and easy to follow. I built my first real project after completing the course.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },

    {
      id: 2,
      name: "Priya Das",
      role: "UI/UX Designer",
      rating: 5,
      review:
        "I really enjoyed learning here. The course structure is amazing and the instructors explain difficult concepts in a very simple way.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },

    {
      id: 3,
      name: "Aman Verma",
      role: "Full Stack Developer",
      rating: 5,
      review:
        "What I liked most was the practical approach. Instead of only watching videos, I was actually building things and improving my skills.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
  ];


  return (
    <section className="bg-[#f8f8f5] px-4 md:px-8 py-20">

      <div className="max-w-7xl mx-auto">


        {/* ================= HEADING ================= */}

        <div className="max-w-2xl mb-12">

          <p className="text-primary text-sm font-medium font-inter mb-3">
            STUDENT STORIES
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-[#10131d] leading-tight font-inter">
            Loved by learners.
          </h2>

          <p className="mt-4 text-gray-500 leading-7 font-inter">
            See what our students have to say about their learning
            experience and the skills they've gained.
          </p>

        </div>


        {/* ================= TESTIMONIALS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {testimonials.map((testimonial, index) => (

            <div
              key={testimonial.id}
              className={`relative rounded-2xl p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
                index === 1
                  ? "bg-[#10131d] text-white"
                  : "bg-white border border-gray-200"
              }`}
            >


              {/* Quote Icon */}

              <div
                className={`absolute top-6 right-6 text-4xl ${
                  index === 1
                    ? "text-white/10"
                    : "text-gray-100"
                }`}
              >
                <i className="ri-double-quotes-r"></i>
              </div>


              {/* Stars */}

              <div className="flex gap-1">

                {[...Array(testimonial.rating)].map((_, i) => (

                  <i
                    key={i}
                    className="ri-star-fill text-yellow-400"
                  ></i>

                ))}

              </div>


              {/* Review */}

              <p
                className={`mt-6 text-base leading-7 font-inter ${
                  index === 1
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                "{testimonial.review}"
              </p>


              {/* User */}

              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200/10">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover"
                />


                <div>

                  <h3
                    className={`font-semibold font-inter ${
                      index === 1
                        ? "text-white"
                        : "text-[#10131d]"
                    }`}
                  >
                    {testimonial.name}
                  </h3>

                  <p
                    className={`text-xs mt-1 font-inter ${
                      index === 1
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {testimonial.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* ================= BOTTOM STATS ================= */}

        <div className="mt-5 bg-primary rounded-2xl p-7 md:p-8">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div>

              <p className="text-3xl md:text-4xl font-bold text-white font-inter">
                10K+
              </p>

              <p className="mt-1 text-sm text-white/60 font-inter">
                Happy Students
              </p>

            </div>


            <div>

              <p className="text-3xl md:text-4xl font-bold text-white font-inter">
                500+
              </p>

              <p className="mt-1 text-sm text-white/60 font-inter">
                Courses
              </p>

            </div>


            <div>

              <p className="text-3xl md:text-4xl font-bold text-white font-inter">
                4.9
              </p>

              <p className="mt-1 text-sm text-white/60 font-inter">
                Average Rating
              </p>

            </div>


            <div>

              <p className="text-3xl md:text-4xl font-bold text-white font-inter">
                95%
              </p>

              <p className="mt-1 text-sm text-white/60 font-inter">
                Satisfaction
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Testimonials;
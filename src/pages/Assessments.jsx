import React from "react";

const Assessments = () => {
  const assessments = [
    {
      id: 1,
      title: "React Fundamentals Test",
      course: "React 19 Pro",
      questions: 25,
      duration: "30 min",
      date: "Today, 6:00 PM",
      status: "Upcoming",
      icon: "ri-reactjs-line",
    },
    {
      id: 2,
      title: "JavaScript ES6 Assessment",
      course: "JavaScript Essentials",
      questions: 30,
      duration: "40 min",
      date: "Completed",
      score: 86,
      status: "Completed",
      icon: "ri-javascript-line",
    },
    {
      id: 3,
      title: "UI/UX Design Quiz",
      course: "UI/UX Design Masterclass",
      questions: 20,
      duration: "25 min",
      date: "Tomorrow, 11:00 AM",
      status: "Upcoming",
      icon: "ri-pencil-ruler-2-line",
    },
    {
      id: 4,
      title: "Data Science Basics",
      course: "Intro to Data Science",
      questions: 25,
      duration: "35 min",
      date: "Completed",
      score: 74,
      status: "Completed",
      icon: "ri-bar-chart-box-line",
    },
    {
      id: 5,
      title: "Python Programming Test",
      course: "Python for Beginners",
      questions: 30,
      duration: "40 min",
      date: "Sep 23, 2026",
      status: "Upcoming",
      icon: "ri-code-s-slash-line",
    },
  ];

  const upcoming = assessments.filter(
    (item) => item.status === "Upcoming"
  );

  const completed = assessments.filter(
    (item) => item.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">

      <main className="p-5 md:p-8 xl:p-10 max-w-[1450px] mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Test & Evaluation
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            Assessments
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl">
            Test your knowledge, track your scores and improve your
            learning performance.
          </p>

        </section>


        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Total */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Total Assessments
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  12
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className="ri-file-list-3-line text-primary text-xl"></i>
              </div>

            </div>

          </div>


          {/* Completed */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Completed
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  8
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Upcoming */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Upcoming
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  4
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <i className="ri-calendar-check-line text-blue-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Average Score */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Average Score
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  82%
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <i className="ri-bar-chart-line text-purple-500 text-xl"></i>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            UPCOMING ASSESSMENTS
        ===================================================== */}

        <section className="mb-10">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-xl font-semibold">
                Upcoming Assessments
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Complete these assessments to continue your progress.
              </p>

            </div>

            <span className="text-xs font-medium bg-primary/10 text-[#10131d] px-3 py-1.5 rounded-full">
              {upcoming.length} Upcoming
            </span>

          </div>


          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {upcoming.map((assessment) => (

              <div
                key={assessment.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >

                {/* Top */}

                <div className="flex items-start justify-between">

                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

                    <i
                      className={`${assessment.icon} text-xl text-primary`}
                    ></i>

                  </div>

                  <span className="text-[11px] font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                    Upcoming
                  </span>

                </div>


                {/* Title */}

                <h3 className="text-lg font-semibold mt-5">
                  {assessment.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {assessment.course}
                </p>


                {/* Details */}

                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-[#f8f8f5] rounded-xl p-3">

                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Questions
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      {assessment.questions}
                    </p>

                  </div>


                  <div className="bg-[#f8f8f5] rounded-xl p-3">

                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Duration
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      {assessment.duration}
                    </p>

                  </div>

                </div>


                {/* Date */}

                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">

                  <i className="ri-calendar-line"></i>

                  {assessment.date}

                </div>


                {/* Button */}

                <button className="w-full mt-5 py-3 rounded-xl bg-[#10131d] text-white text-sm font-medium hover:bg-primary hover:text-[#10131d] transition">

                  <i className="ri-play-circle-line mr-2"></i>

                  Start Assessment

                </button>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            COMPLETED ASSESSMENTS
        ===================================================== */}

        <section>

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Recent Results
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Review your recently completed assessments.
            </p>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

            {/* Desktop Header */}

            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-400">

              <div className="col-span-5">
                Assessment
              </div>

              <div className="col-span-2">
                Course
              </div>

              <div className="col-span-2">
                Questions
              </div>

              <div className="col-span-2">
                Score
              </div>

              <div className="col-span-1">
                Action
              </div>

            </div>


            {completed.map((assessment) => (

              <div
                key={assessment.id}
                className="grid md:grid-cols-12 gap-4 items-center px-5 md:px-6 py-5 border-b border-gray-100 last:border-b-0"
              >

                {/* Assessment */}

                <div className="md:col-span-5 flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">

                    <i
                      className={`${assessment.icon} text-primary`}
                    ></i>

                  </div>

                  <div>

                    <p className="text-sm font-semibold">
                      {assessment.title}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Completed
                    </p>

                  </div>

                </div>


                {/* Course */}

                <div className="md:col-span-2">

                  <p className="text-xs text-gray-500">
                    {assessment.course}
                  </p>

                </div>


                {/* Questions */}

                <div className="md:col-span-2">

                  <p className="text-xs text-gray-500">
                    {assessment.questions} Questions
                  </p>

                </div>


                {/* Score */}

                <div className="md:col-span-2">

                  <div className="flex items-center gap-3">

                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${assessment.score}%`,
                        }}
                      ></div>

                    </div>

                    <span className="text-sm font-semibold">
                      {assessment.score}%
                    </span>

                  </div>

                </div>


                {/* Action */}

                <div className="md:col-span-1">

                  <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">

                    <i className="ri-eye-line text-gray-500"></i>

                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            MOTIVATION CTA
        ===================================================== */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative">

            <p className="text-primary text-xs font-semibold uppercase tracking-wider">
              Keep Improving
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-2">
              Every assessment is a step forward.
            </h2>

            <p className="text-white/50 text-sm mt-2 max-w-xl">
              Practice regularly, review your results and keep
              improving your skills.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Assessments;
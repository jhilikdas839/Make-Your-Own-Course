import React from "react";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "JavaScript Essentials",
      instructor: "Amit Verma",
      issueDate: "September 12, 2026",
      certificateId: "CERT-JS-2026-001",
      icon: "ri-javascript-line",
    },
    {
      id: 2,
      title: "HTML & CSS Masterclass",
      instructor: "Rahul Sharma",
      issueDate: "August 28, 2026",
      certificateId: "CERT-WD-2026-002",
      icon: "ri-code-box-line",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Ananya Mehta",
      issueDate: "July 19, 2026",
      certificateId: "CERT-UX-2026-003",
      icon: "ri-pencil-ruler-2-line",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">

      <main className="p-5 md:p-8 xl:p-10 max-w-[1450px] mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Achievements
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            Certificates
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl">
            View and download the certificates you have earned by
            completing your courses.
          </p>

        </section>


        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Total Certificates */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Total Certificates
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  3
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className="ri-medal-line text-primary text-xl"></i>
              </div>

            </div>

          </div>


          {/* Courses Completed */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Courses Completed
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  3
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Learning Hours */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Learning Hours
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  42h
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <i className="ri-time-line text-blue-500 text-xl"></i>
              </div>

            </div>

          </div>


          {/* Achievement */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Achievement Level
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  Pro
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <i className="ri-award-line text-purple-500 text-xl"></i>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CERTIFICATE GRID
        ===================================================== */}

        <section>

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-semibold">
                Your Certificates
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Certificates you have earned so far.
              </p>
            </div>

            <span className="text-xs font-medium bg-primary/10 text-[#10131d] px-3 py-1.5 rounded-full">
              3 Certificates
            </span>

          </div>


          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {certificates.map((certificate) => (

              <div
                key={certificate.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >

                {/* =================================================
                    CERTIFICATE PREVIEW
                ================================================= */}

                <div className="h-52 bg-[#10131d] relative overflow-hidden p-5">

                  {/* Decorative circles */}

                  <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-primary/20"></div>

                  <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-primary/10"></div>


                  <div className="relative h-full border border-white/10 rounded-xl flex flex-col items-center justify-center text-center">

                    {/* Icon */}

                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">

                      <i className="ri-award-fill text-[#10131d] text-2xl"></i>

                    </div>


                    <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-semibold mt-3">
                      Certificate of Completion
                    </p>


                    <h3 className="text-white font-semibold text-lg mt-2 px-4">
                      {certificate.title}
                    </h3>

                  </div>

                </div>


                {/* =================================================
                    DETAILS
                ================================================= */}

                <div className="p-5">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">

                      <i
                        className={`${certificate.icon} text-primary text-lg`}
                      ></i>

                    </div>

                    <div>

                      <p className="text-sm font-semibold">
                        {certificate.title}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {certificate.instructor}
                      </p>

                    </div>

                  </div>


                  {/* Date */}

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                    <div>

                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        Issued On
                      </p>

                      <p className="text-xs font-medium mt-1">
                        {certificate.issueDate}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-[10px] uppercase tracking-wide text-gray-400">
                        Certificate ID
                      </p>

                      <p className="text-[10px] font-medium mt-1">
                        {certificate.certificateId}
                      </p>

                    </div>

                  </div>


                  {/* Buttons */}

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <button className="py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">

                      <i className="ri-eye-line mr-1.5"></i>

                      View

                    </button>

                    <button className="py-2.5 rounded-xl bg-[#10131d] text-white text-sm font-medium hover:bg-primary hover:text-[#10131d] transition">

                      <i className="ri-download-2-line mr-1.5"></i>

                      Download

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            EMPTY / UPCOMING CERTIFICATE INFO
        ===================================================== */}

        <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center gap-5">

            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">

              <i className="ri-lock-unlock-line text-primary text-2xl"></i>

            </div>

            <div className="flex-1">

              <h2 className="text-lg font-semibold">
                More certificates are waiting for you
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Complete your ongoing courses to unlock new
                certificates and showcase your skills.
              </p>

            </div>

            <button className="px-5 py-3 rounded-xl bg-[#10131d] text-white text-sm font-medium hover:bg-primary hover:text-[#10131d] transition">

              View My Courses

              <i className="ri-arrow-right-line ml-2"></i>

            </button>

          </div>

        </section>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative">

            <p className="text-primary text-xs font-semibold uppercase tracking-wider">
              Keep Achieving
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-2">
              Your next certificate starts with your next lesson.
            </h2>

            <p className="text-white/50 text-sm mt-2 max-w-xl">
              Keep learning, complete your courses and build a
              collection of certificates that represents your skills.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Certificates;
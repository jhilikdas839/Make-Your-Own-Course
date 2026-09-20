import React from "react";

const Community = () => {
  const groups = [
    {
      id: 1,
      name: "Frontend Developers",
      description: "React, JavaScript, CSS aur frontend development par discuss karein.",
      members: "1.8K",
      icon: "ri-code-s-slash-line",
    },
    {
      id: 2,
      name: "UI/UX Designers",
      description: "Design ideas, feedback aur creative inspiration share karein.",
      members: "920",
      icon: "ri-pencil-ruler-2-line",
    },
    {
      id: 3,
      name: "Career & Jobs",
      description: "Jobs, interviews, resumes aur career growth ke liye community.",
      members: "2.4K",
      icon: "ri-briefcase-4-line",
    },
  ];

  const members = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Frontend Developer",
      avatar: "RS",
    },
    {
      id: 2,
      name: "Ananya Mehta",
      role: "UI/UX Designer",
      avatar: "AM",
    },
    {
      id: 3,
      name: "Amit Verma",
      role: "JavaScript Developer",
      avatar: "AV",
    },
    {
      id: 4,
      name: "Priya Singh",
      role: "Digital Marketer",
      avatar: "PS",
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
            Student Network
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            Community
          </h1>

          <p className="text-gray-500 mt-2 max-w-xl">
            Connect with fellow learners, join communities and
            grow together.
          </p>

        </section>


        {/* =====================================================
            COMMUNITY HERO
        ===================================================== */}

        <section className="bg-[#10131d] rounded-3xl p-7 md:p-10 text-white relative overflow-hidden mb-8">

          <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-primary/20"></div>

          <div className="absolute -left-24 -bottom-28 w-72 h-72 rounded-full bg-primary/10"></div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">

            <div>

              <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 px-3 py-1.5 rounded-full">

                <span className="w-2 h-2 rounded-full bg-primary"></span>

                5,000+ Learners

              </span>


              <h2 className="text-3xl md:text-4xl font-semibold mt-5 max-w-xl">
                Learn together.
                <br />
                Grow together.
              </h2>


              <p className="text-white/50 text-sm md:text-base mt-4 max-w-lg leading-6">
                Ask questions, share your knowledge and connect with
                learners who are working towards similar goals.
              </p>


              <button className="mt-6 inline-flex items-center gap-2 bg-primary text-[#10131d] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white transition">

                Join the Community

                <i className="ri-arrow-right-line"></i>

              </button>

            </div>


            {/* Community Visual */}

            <div className="hidden lg:flex justify-center">

              <div className="relative w-72 h-52">

                <div className="absolute top-4 left-16 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-[#10131d] font-bold">
                  RS
                </div>

                <div className="absolute top-20 right-8 w-14 h-14 rounded-full bg-white text-[#10131d] flex items-center justify-center font-bold">
                  AM
                </div>

                <div className="absolute bottom-2 left-8 w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  AV
                </div>

                <div className="absolute bottom-8 right-24 w-14 h-14 rounded-full bg-primary/50 flex items-center justify-center font-bold">
                  PS
                </div>

                <div className="absolute top-24 left-28 w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center">
                  <i className="ri-group-line text-primary text-3xl"></i>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            COMMUNITY STATS
        ===================================================== */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Community Members
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  5.2K
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className="ri-group-line text-primary text-xl"></i>
              </div>

            </div>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Active Today
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  846
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <i className="ri-user-follow-line text-green-500 text-xl"></i>
              </div>

            </div>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Active Groups
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  24
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <i className="ri-community-line text-blue-500 text-xl"></i>
              </div>

            </div>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-400">
                  Discussions Today
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  128
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <i className="ri-chat-3-line text-purple-500 text-xl"></i>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            COMMUNITY GROUPS
        ===================================================== */}

        <section className="mb-8">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-xl font-semibold">
                Popular Communities
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Find a community that matches your interests.
              </p>

            </div>

            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#10131d] transition">

              View All

              <i className="ri-arrow-right-line"></i>

            </button>

          </div>


          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

            {groups.map((group) => (

              <div
                key={group.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >

                <div className="flex items-start justify-between">

                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

                    <i className={`${group.icon} text-xl text-primary`}></i>

                  </div>

                  <button className="text-gray-400 hover:text-[#10131d]">

                    <i className="ri-more-2-fill"></i>

                  </button>

                </div>


                <h3 className="text-lg font-semibold mt-5">
                  {group.name}
                </h3>

                <p className="text-sm text-gray-400 mt-2 leading-5">
                  {group.description}
                </p>


                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                  <span className="flex items-center gap-1.5 text-xs text-gray-400">

                    <i className="ri-group-line"></i>

                    {group.members} members

                  </span>


                  <button className="text-sm font-semibold hover:text-primary transition">

                    Join

                    <i className="ri-arrow-right-line ml-1"></i>

                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            TWO COLUMN SECTION
        ===================================================== */}

        <section className="grid lg:grid-cols-3 gap-5">

          {/* ================= ACTIVE MEMBERS ================= */}

          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-lg font-semibold">
                  Active Members
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Learners making an impact in the community.
                </p>

              </div>

              <button className="text-sm font-medium text-gray-500 hover:text-[#10131d]">
                View All
              </button>

            </div>


            <div className="space-y-4">

              {members.map((member) => (

                <div
                  key={member.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
                >

                  <div className="w-11 h-11 rounded-full bg-[#10131d] text-white flex items-center justify-center text-xs font-semibold">
                    {member.avatar}
                  </div>


                  <div className="flex-1">

                    <p className="text-sm font-semibold">
                      {member.name}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {member.role}
                    </p>

                  </div>


                  <span className="hidden sm:flex items-center gap-1.5 text-xs text-green-500">

                    <span className="w-2 h-2 rounded-full bg-green-500"></span>

                    Online

                  </span>


                  <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">

                    <i className="ri-user-add-line text-gray-500"></i>

                  </button>

                </div>

              ))}

            </div>

          </div>


          {/* ================= COMMUNITY RULES ================= */}

          <div className="bg-white border border-gray-200 rounded-2xl p-6">

            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

              <i className="ri-heart-3-line text-primary text-xl"></i>

            </div>


            <h2 className="text-lg font-semibold mt-5">
              Community Guidelines
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-5">
              Help us keep the community friendly, useful and
              welcoming for everyone.
            </p>


            <div className="space-y-4 mt-6">

              <div className="flex items-start gap-3">

                <i className="ri-check-line text-green-500 mt-0.5"></i>

                <p className="text-sm text-gray-500">
                  Be respectful to other learners.
                </p>

              </div>


              <div className="flex items-start gap-3">

                <i className="ri-check-line text-green-500 mt-0.5"></i>

                <p className="text-sm text-gray-500">
                  Share useful and relevant information.
                </p>

              </div>


              <div className="flex items-start gap-3">

                <i className="ri-check-line text-green-500 mt-0.5"></i>

                <p className="text-sm text-gray-500">
                  Avoid spam and promotional content.
                </p>

              </div>


              <div className="flex items-start gap-3">

                <i className="ri-check-line text-green-500 mt-0.5"></i>

                <p className="text-sm text-gray-500">
                  Help others whenever you can.
                </p>

              </div>

            </div>


            <button className="w-full mt-7 py-3 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">

              Read Full Guidelines

            </button>

          </div>

        </section>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                Your Community
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                Your next great connection could be here.
              </h2>

              <p className="text-white/50 text-sm mt-2 max-w-lg">
                Ask questions, share knowledge and build meaningful
                connections with fellow learners.
              </p>

            </div>


            <button className="inline-flex items-center justify-center gap-2 bg-primary text-[#10131d] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white transition">

              Explore Community

              <i className="ri-arrow-right-line"></i>

            </button>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Community;
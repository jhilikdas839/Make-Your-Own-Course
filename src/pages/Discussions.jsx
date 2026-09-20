import React, { useState } from "react";

const Discussions = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const discussions = [
    {
      id: 1,
      title: "How does useEffect cleanup work in React?",
      course: "React 19 Pro",
      author: "Rahul Mehta",
      replies: 12,
      views: 148,
      time: "2 hours ago",
      category: "Development",
      solved: true,
      avatar: "RM",
    },
    {
      id: 2,
      title: "Best way to prepare for JavaScript interviews?",
      course: "JavaScript Essentials",
      author: "Priya Sharma",
      replies: 18,
      views: 236,
      time: "5 hours ago",
      category: "Interview",
      solved: false,
      avatar: "PS",
    },
    {
      id: 3,
      title: "Which color combination works best for dashboards?",
      course: "UI/UX Design Masterclass",
      author: "Ananya Das",
      replies: 8,
      views: 92,
      time: "Yesterday",
      category: "Design",
      solved: true,
      avatar: "AD",
    },
    {
      id: 4,
      title: "Python Pandas vs NumPy — when should I use them?",
      course: "Data Science with Python",
      author: "Arjun Roy",
      replies: 15,
      views: 174,
      time: "Yesterday",
      category: "Data Science",
      solved: false,
      avatar: "AR",
    },
    {
      id: 5,
      title: "How can I improve my frontend project portfolio?",
      course: "React 19 Pro",
      author: "Neha Singh",
      replies: 21,
      views: 310,
      time: "2 days ago",
      category: "Career",
      solved: true,
      avatar: "NS",
    },
    {
      id: 6,
      title: "Tips for understanding JavaScript promises",
      course: "JavaScript Essentials",
      author: "Aman Kumar",
      replies: 9,
      views: 121,
      time: "3 days ago",
      category: "Development",
      solved: true,
      avatar: "AK",
    },
  ];

  const tabs = ["All", "My Discussions", "Solved"];

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Solved" && discussion.solved) ||
      (activeTab === "My Discussions" &&
        discussion.author === "You");

    const matchesSearch =
      discussion.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      discussion.course
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      discussion.category
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#10131d]">

      <main className="p-5 md:p-8 xl:p-10 max-w-[1450px] mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="mb-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Community
              </p>

              <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                Discussions
              </h1>

              <p className="text-gray-500 mt-2 max-w-xl">
                Ask questions, share ideas and learn together with
                other students.
              </p>

            </div>

            <button className="inline-flex items-center justify-center gap-2 bg-[#10131d] text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-primary hover:text-[#10131d] transition">

              <i className="ri-add-line"></i>

              Start Discussion

            </button>

          </div>

        </section>


        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Total Discussions
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  248
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">

                <i className="ri-chat-3-line text-primary text-xl"></i>

              </div>

            </div>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  My Discussions
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  12
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                <i className="ri-question-answer-line text-blue-500 text-xl"></i>

              </div>

            </div>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Questions Solved
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  86
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

                <i className="ri-checkbox-circle-line text-green-500 text-xl"></i>

              </div>

            </div>

          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Community Replies
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  42
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                <i className="ri-reply-line text-purple-500 text-xl"></i>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            SEARCH + FILTER
        ===================================================== */}

        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

          <div className="bg-white border border-gray-200 rounded-xl p-1 flex w-fit">

            {tabs.map((tab) => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-[#10131d] text-white"
                    : "text-gray-500 hover:text-[#10131d]"
                }`}
              >
                {tab}
              </button>

            ))}

          </div>


          <div className="relative w-full md:w-72">

            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search discussions..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition"
            />

          </div>

        </section>


        {/* =====================================================
            DISCUSSION LIST
        ===================================================== */}

        <section>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

            {filteredDiscussions.length === 0 ? (

              <div className="p-12 text-center">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center">

                  <i className="ri-chat-search-line text-2xl text-gray-400"></i>

                </div>

                <h3 className="text-lg font-semibold mt-5">
                  No discussions found
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Try another search or start a new discussion.
                </p>

              </div>

            ) : (

              filteredDiscussions.map((discussion) => (

                <div
                  key={discussion.id}
                  className="p-5 md:p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/70 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center gap-5">

                    {/* Avatar */}

                    <div className="w-11 h-11 rounded-full bg-[#10131d] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {discussion.avatar}
                    </div>


                    {/* Main Content */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-base md:text-lg font-semibold">
                          {discussion.title}
                        </h3>

                        {discussion.solved && (

                          <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">

                            <i className="ri-check-line"></i>

                            Solved

                          </span>

                        )}

                      </div>


                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-xs text-gray-400">

                        <span className="flex items-center gap-1">

                          <i className="ri-book-open-line"></i>

                          {discussion.course}

                        </span>

                        <span className="flex items-center gap-1">

                          <i className="ri-user-line"></i>

                          {discussion.author}

                        </span>

                        <span>
                          {discussion.time}
                        </span>

                      </div>

                    </div>


                    {/* Stats */}

                    <div className="flex items-center gap-5 text-xs text-gray-400 shrink-0">

                      <div className="text-center">

                        <i className="ri-chat-3-line block text-base mb-1"></i>

                        <span>
                          {discussion.replies}
                        </span>

                      </div>

                      <div className="text-center">

                        <i className="ri-eye-line block text-base mb-1"></i>

                        <span>
                          {discussion.views}
                        </span>

                      </div>

                      <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:text-[#10131d] transition">

                        <i className="ri-arrow-right-line"></i>

                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>


        {/* =====================================================
            ASK QUESTION CTA
        ===================================================== */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                Join the Conversation
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                Have a question?
              </h2>

              <p className="text-white/50 text-sm mt-2 max-w-lg">
                Don't hesitate to ask. Someone from the community
                might already have the answer.
              </p>

            </div>

            <button className="inline-flex items-center justify-center gap-2 bg-primary text-[#10131d] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white transition">

              Ask a Question

              <i className="ri-arrow-right-line"></i>

            </button>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Discussions;
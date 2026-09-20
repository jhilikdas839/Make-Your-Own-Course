import React, { useState } from "react";

const Library = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const resources = [
    {
      id: 1,
      title: "React Hooks Cheat Sheet",
      type: "PDF",
      category: "Development",
      size: "2.4 MB",
      icon: "ri-file-pdf-2-line",
      color: "red",
    },
    {
      id: 2,
      title: "JavaScript ES6 Guide",
      type: "PDF",
      category: "Development",
      size: "4.1 MB",
      icon: "ri-file-text-line",
      color: "blue",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      type: "Document",
      category: "Design",
      size: "1.8 MB",
      icon: "ri-file-list-3-line",
      color: "purple",
    },
    {
      id: 4,
      title: "Data Science Notes",
      type: "PDF",
      category: "Data Science",
      size: "5.6 MB",
      icon: "ri-file-pdf-2-line",
      color: "green",
    },
    {
      id: 5,
      title: "Frontend Interview Questions",
      type: "Document",
      category: "Interview",
      size: "1.2 MB",
      icon: "ri-questionnaire-line",
      color: "orange",
    },
    {
      id: 6,
      title: "Python Beginner Notes",
      type: "PDF",
      category: "Programming",
      size: "3.7 MB",
      icon: "ri-code-box-line",
      color: "cyan",
    },
  ];

  const tabs = [
    "All",
    "PDF",
    "Documents",
    "Videos",
  ];

  const filteredResources = resources.filter((resource) => {

    const matchesTab =
      activeTab === "All" ||
      (activeTab === "PDF" && resource.type === "PDF") ||
      (activeTab === "Documents" && resource.type === "Document");

    const matchesSearch =
      resource.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      resource.category
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
                Resources
              </p>

              <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                Library
              </h1>

              <p className="text-gray-500 mt-2 max-w-xl">
                Access your course materials, notes, documents and
                other learning resources in one place.
              </p>

            </div>


            {/* Search */}

            <div className="relative w-full md:w-72">

              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search library..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary transition"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            LIBRARY STATS
        ===================================================== */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Total Resources */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Total Resources
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  24
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">

                <i className="ri-folder-open-line text-primary text-xl"></i>

              </div>

            </div>

          </div>


          {/* PDFs */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  PDF Files
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  12
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">

                <i className="ri-file-pdf-2-line text-red-500 text-xl"></i>

              </div>

            </div>

          </div>


          {/* Documents */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Documents
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  8
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                <i className="ri-file-text-line text-blue-500 text-xl"></i>

              </div>

            </div>

          </div>


          {/* Videos */}

          <div className="bg-white border border-gray-200 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-gray-400">
                  Videos
                </p>

                <h3 className="text-3xl font-semibold mt-2">
                  4
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">

                <i className="ri-video-line text-purple-500 text-xl"></i>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FILTER TABS
        ===================================================== */}

        <section className="mb-6">

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

        </section>


        {/* =====================================================
            RESOURCE GRID
        ===================================================== */}

        <section>

          {filteredResources.length === 0 ? (

            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center">

                <i className="ri-folder-search-line text-2xl text-gray-400"></i>

              </div>

              <h3 className="text-lg font-semibold mt-5">
                No resources found
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

              {filteredResources.map((resource) => (

                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >

                  {/* Top */}

                  <div className="flex items-start justify-between">

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        resource.color === "red"
                          ? "bg-red-50 text-red-500"
                          : resource.color === "blue"
                          ? "bg-blue-50 text-blue-500"
                          : resource.color === "purple"
                          ? "bg-purple-50 text-purple-500"
                          : resource.color === "green"
                          ? "bg-green-50 text-green-500"
                          : resource.color === "orange"
                          ? "bg-orange-50 text-orange-500"
                          : "bg-cyan-50 text-cyan-500"
                      }`}
                    >

                      <i className={`${resource.icon} text-2xl`}></i>

                    </div>


                    <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#10131d] hover:bg-gray-50 transition">

                      <i className="ri-more-2-fill"></i>

                    </button>

                  </div>


                  {/* Content */}

                  <div className="mt-5">

                    <h3 className="text-lg font-semibold">
                      {resource.title}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      {resource.category}
                    </p>

                  </div>


                  {/* Info */}

                  <div className="flex items-center justify-between mt-5 text-xs text-gray-400">

                    <span className="flex items-center gap-1.5">

                      <i className="ri-file-line"></i>

                      {resource.type}

                    </span>

                    <span className="flex items-center gap-1.5">

                      <i className="ri-hard-drive-2-line"></i>

                      {resource.size}

                    </span>

                  </div>


                  {/* Button */}

                  <button className="w-full mt-5 py-3 rounded-xl bg-[#10131d] text-white text-sm font-medium hover:bg-primary hover:text-[#10131d] transition">

                    <i className="ri-download-2-line mr-2"></i>

                    Download Resource

                  </button>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="mt-8 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white relative overflow-hidden">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-primary/20"></div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>

              <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                Learning Resources
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                Everything you need to keep learning.
              </h2>

              <p className="text-white/50 text-sm mt-2 max-w-lg">
                Find notes, guides and course materials whenever
                you need them.
              </p>

            </div>

            <button className="inline-flex items-center justify-center gap-2 bg-primary text-[#10131d] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white transition">

              Browse Resources

              <i className="ri-arrow-right-line"></i>

            </button>

          </div>

        </section>

      </main>

    </div>
  );
};

export default Library;
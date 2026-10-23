
import { useNavigate } from "react-router-dom";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

function TeacherCourses() {
  const navigate = useNavigate();

  // Demo courses — later connect with backend
  const courses = [
    {
      id: 1,
      title: "React JS Masterclass",
      category: "Development",
      students: 86,
      rating: 4.8,
      lessons: 24,
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      students: 64,
      rating: 4.9,
      lessons: 18,
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "JavaScript for Beginners",
      category: "Development",
      students: 96,
      rating: 4.7,
      lessons: 30,
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "HTML & CSS Complete Guide",
      category: "Web Design",
      students: 42,
      rating: 4.6,
      lessons: 20,
      status: "Draft",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Tailwind CSS Essentials",
      category: "Development",
      students: 38,
      rating: 4.8,
      lessons: 16,
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Figma for Beginners",
      category: "Design",
      students: 27,
      rating: 4.7,
      lessons: 14,
      status: "Draft",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="space-y-8 pb-6">
      {/* Page Header */}
      <TeacherPageHeader
        title="My Courses"
        description="Manage your courses, students and course content."
        buttonText="Create Course"
        buttonIcon="ri-add-line"
        onButtonClick={() => navigate("/teacher/create-course")}
      />

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Courses</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <i className="ri-book-open-line text-xl" />
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">12</h3>
          <p className="mt-1 text-xs text-gray-500">All your courses</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Published</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <i className="ri-checkbox-circle-line text-xl" />
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">8</h3>
          <p className="mt-1 text-xs text-gray-500">Available to students</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Drafts</p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <i className="ri-draft-line text-xl" />
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">4</h3>
          <p className="mt-1 text-xs text-gray-500">Courses in progress</p>
        </div>
      </section>

      {/* Course List */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            All Courses
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all the courses you have created.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your courses..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                document.querySelectorAll("[data-course-card]").forEach((card) => {
                  card.style.display = card.dataset.courseCard.includes(value)
                    ? ""
                    : "none";
                });
              }}
            />
          </div>

          <select
            onChange={(e) => {
              const value = e.target.value;
              document.querySelectorAll("[data-course-status]").forEach((card) => {
                card.style.display =
                  value === "All" || card.dataset.courseStatus === value
                    ? ""
                    : "none";
              });
            }}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-400"
          >
            <option value="All">All Courses</option>
            <option value="Published">Published</option>
            <option value="Draft">Drafts</option>
          </select>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              data-course-card={course.title.toLowerCase()}
              data-course-status={course.status}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-44 overflow-hidden bg-blue-50">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />

                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                    course.status === "Published"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div className="p-5">
                <span className="text-xs font-medium text-blue-600">
                  {course.category}
                </span>

                <h3 className="mt-2 line-clamp-1 text-base font-semibold text-gray-900">
                  {course.title}
                </h3>

                <div className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-500">
                  <span>
                    <i className="ri-group-line mr-1.5" />
                    {course.students} Students
                  </span>

                  <span>
                    <i className="ri-star-fill mr-1 text-amber-400" />
                    {course.rating}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <i className="ri-play-circle-line text-base" />
                  {course.lessons} Lessons
                </div>

                <button
                  onClick={() => navigate(`/teacher/courses/${course.id}`)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  Manage Course
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TeacherCourses;

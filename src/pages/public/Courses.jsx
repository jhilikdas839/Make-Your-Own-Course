import { useSearchParams } from "react-router-dom";
import CourseCard from "../../components/public/CourseCard";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import { useCourses } from "../../hooks/useCourses";
import useLocalStorage from "../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../data/keys";
import { levels } from "../../data/courses";
import { useCategories } from "../../hooks/usePlatformData";

const SORTS = {
  popular: { label: "Most popular", fn: (a, b) => b.students - a.students },
  rating: { label: "Highest rated", fn: (a, b) => b.rating - a.rating },
  newest: { label: "Newest", fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  "price-low": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-high": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
};

const selectClass =
  "rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-inter text-sm text-gray-700 outline-none transition focus:border-primary";

function Courses() {
  const [courses] = useCourses();
  const [wishlist] = useLocalStorage(STORAGE_KEYS.wishlist, []);
  const [categories] = useCategories();
  const [params, setParams] = useSearchParams();

  // Filters live in the URL, so search results can be shared and linked to.
  const search = params.get("search") || "";
  const category = params.get("category") || "All";
  const level = params.get("level") || "All";
  const sort = params.get("sort") || "popular";
  const savedOnly = params.get("saved") === "1";

  const updateParam = (key, value, defaultValue = "") => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const term = search.trim().toLowerCase();
  const results = courses
    .filter((course) => course.status === "Published")
    .filter((course) => category === "All" || course.category === category)
    .filter((course) => level === "All" || course.level === level)
    .filter((course) => !savedOnly || wishlist.includes(course.id))
    .filter(
      (course) =>
        !term ||
        [course.title, course.instructor, course.category].some((value) => value.toLowerCase().includes(term))
    )
    .sort(SORTS[sort]?.fn || SORTS.popular.fn);

  const hasFilters = search || category !== "All" || level !== "All" || savedOnly;

  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      {/* Hero */}
      <section className="px-4 pt-10 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#10131d] px-6 py-14 md:px-12 md:py-20">
          <div className="absolute right-10 top-8 h-14 w-14 rounded-xl border border-white/10"></div>
          <div className="absolute right-24 top-20 h-8 w-8 animate-float rounded-lg bg-primary"></div>
          <div className="absolute bottom-10 right-12 h-10 w-10 rounded-lg bg-yellow-400"></div>

          <div className="relative z-10 max-w-2xl">
            <p className="mb-4 font-inter text-sm font-medium text-primary">LEARN • CREATE • GROW</p>
            <h1 className="font-inter text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Explore courses
              <span className="block text-gray-400">that help you grow.</span>
            </h1>
            <p className="mt-5 max-w-xl font-inter leading-7 text-gray-400">
              Learn practical skills from industry experts, improve your knowledge, and build your future with courses
              designed for you.
            </p>

            <div className="relative mt-8 max-w-xl">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400"></i>
              <input
                type="search"
                value={search}
                onChange={(event) => updateParam("search", event.target.value)}
                placeholder="Search by course, instructor or category..."
                aria-label="Search courses"
                className="w-full rounded-xl bg-white py-4 pl-11 pr-5 font-inter text-sm text-[#10131d] outline-none focus:ring-4 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-inter text-sm font-medium text-primary">OUR COURSES</p>
              <h2 className="font-inter text-3xl font-bold text-[#10131d] md:text-4xl">
                {category === "All" ? "All Courses" : category}
              </h2>
              <p className="mt-2 font-inter text-gray-500">
                <span className="font-semibold text-[#10131d]">{results.length}</span> courses found
                {search && <> for “{search}”</>}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select value={level} onChange={(e) => updateParam("level", e.target.value, "All")} className={selectClass} aria-label="Level">
                <option value="All">All levels</option>
                {levels.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select value={sort} onChange={(e) => updateParam("sort", e.target.value, "popular")} className={selectClass} aria-label="Sort">
                {Object.entries(SORTS).map(([value, option]) => (
                  <option key={value} value={value}>{option.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => updateParam("saved", savedOnly ? "" : "1")}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 font-inter text-sm transition ${
                  savedOnly ? "border-red-200 bg-red-50 text-red-500" : "border-gray-200 bg-white text-gray-700 hover:border-red-200"
                }`}
              >
                <i className={savedOnly ? "ri-heart-fill" : "ri-heart-line"}></i>
                Saved ({wishlist.length})
              </button>
            </div>
          </div>

          {/* Category chips */}
          <div className="mb-10 flex flex-wrap gap-2">
            {["All", ...categories.map((item) => item.name)].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => updateParam("category", name, "All")}
                className={`rounded-full px-5 py-2.5 font-inter text-sm font-medium transition ${
                  category === name
                    ? "bg-[#10131d] text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon="ri-search-eye-line"
              title="No courses match your filters"
              text="Try a different keyword or clear the filters to see every course."
              action={hasFilters && <Button onClick={() => setParams({})}>Clear filters</Button>}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((course, index) => (
                <div key={course.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Courses;

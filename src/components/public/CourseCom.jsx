import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { useCourses } from "../../hooks/useCourses";

// "Popular courses" section on the home page.
function CourseCom() {
  const [courses] = useCourses();
  const popular = courses
    .filter((course) => course.status === "Published")
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.students - a.students)
    .slice(0, 6);

  return (
    <section className="bg-[#f8f8f5] px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-inter text-sm font-medium text-primary">LEARN SOMETHING NEW</p>
            <h2 className="font-inter text-3xl font-bold text-[#10131d] md:text-5xl">Popular Courses</h2>
            <p className="mt-3 max-w-xl font-inter text-gray-500">
              Learn practical skills from carefully designed courses and take the next step in your learning journey.
            </p>
          </div>
          <Link to="/courses" className="flex items-center gap-2 font-inter text-sm font-medium text-primary transition hover:text-[#10131d]">
            View all courses
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-[#10131d] px-7 py-3.5 font-inter font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary"
          >
            Explore More Courses
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CourseCom;

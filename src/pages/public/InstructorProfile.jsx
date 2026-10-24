import { Link, useParams } from "react-router-dom";
import SafeImage from "../../components/common/SafeImage";
import CourseCard from "../../components/public/CourseCard";
import NotFound from "./NotFound";
import { instructors } from "../../data/instructors";
import { useCourses } from "../../hooks/useCourses";

function InstructorProfile() {
  const { id } = useParams();
  const [courses] = useCourses();
  const instructor = instructors.find((item) => String(item.id) === id);

  if (!instructor) return <NotFound />;

  const theirCourses = courses.filter((course) => course.instructor === instructor.name && course.status === "Published");

  return (
    <div className="bg-[#f8f8f5] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <i className="ri-arrow-left-line"></i>
          Back to home
        </Link>

        <section className="grid gap-8 overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 md:grid-cols-[280px_1fr] md:p-10">
          <SafeImage src={instructor.image} alt={instructor.name} icon="ri-user-line" className="h-72 w-full animate-scale-in rounded-2xl object-cover" />
          <div className="animate-fade-up">
            <p className="text-sm font-medium text-primary">Instructor</p>
            <h1 className="mt-2 text-3xl font-bold md:text-5xl">{instructor.name}</h1>
            <p className="mt-2 text-gray-500">{instructor.role}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: "ri-star-fill text-yellow-400", label: `${instructor.rating} rating` },
                { icon: "ri-group-line text-primary", label: `${instructor.students} students` },
                { icon: "ri-book-open-line text-primary", label: instructor.courses },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm">
                  <i className={item.icon}></i>
                  {item.label}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-2xl leading-7 text-gray-600">{instructor.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {instructor.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Courses by {instructor.name.split(" ")[0]}</h2>
          {theirCourses.length === 0 ? (
            <p className="text-gray-500">New courses are coming soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {theirCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default InstructorProfile;

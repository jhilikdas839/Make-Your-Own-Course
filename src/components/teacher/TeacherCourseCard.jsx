
import { Link } from "react-router-dom";

function TeacherCourseCard({
  id,
  image,
  title,
  category,
  students,
  rating,
  progress,
  status,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Course Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {/* Status Badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status || "Draft"}
        </span>
      </div>

      {/* Course Details */}
      <div className="p-5">

        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {category}
        </p>

        <h3 className="mt-2 line-clamp-2 min-h-12 text-lg font-bold text-gray-900">
          {title}
        </h3>

        {/* Students and Rating */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <i className="ri-group-line text-base"></i>
            {students} Students
          </span>

          <span className="flex items-center gap-1">
            <i className="ri-star-fill text-yellow-400"></i>
            {rating}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">Course Completion</span>
            <span className="font-semibold text-gray-800">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(0, Number(progress) || 0))}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Manage Course Button */}
        <Link
          to={`/teacher/courses/${id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          Manage Course
          <i className="ri-arrow-right-line"></i>
        </Link>

      </div>
    </div>
  );
}

export default TeacherCourseCard;

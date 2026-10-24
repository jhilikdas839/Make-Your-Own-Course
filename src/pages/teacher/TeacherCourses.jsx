import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import SafeImage from "../../components/common/SafeImage";
import ConfirmModal from "../../components/common/ConfirmModal";
import { useToast } from "../../components/common/toastContext";
import { useCourses } from "../../hooks/useCourses";
import { useCurrentUser } from "../../hooks/useAuth";

const statuses = ["All", "Published", "Pending", "Draft", "Rejected"];

function TeacherCourses() {
  const navigate = useNavigate();
  const toast = useToast();
  const user = useCurrentUser();
  const [courses, setCourses] = useCourses();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [deleteId, setDeleteId] = useState(null);

  // Admins see every course; teachers see their own.
  const mine = user.role === "admin" ? courses : courses.filter((course) => course.instructor === user.name);
  const filtered = mine.filter(
    (course) =>
      (status === "All" || course.status === status) &&
      `${course.title} ${course.category}`.toLowerCase().includes(search.toLowerCase())
  );
  const count = (value) => mine.filter((course) => course.status === value).length;

  const remove = () => {
    setCourses((prev) => prev.filter((course) => course.id !== deleteId));
    toast("Course deleted.", "info");
  };

  return (
    <>
      <PageHeader
        eyebrow="Teaching"
        title="My Courses"
        description="Manage your courses, students and course content."
        buttonText="Create Course"
        buttonIcon="ri-add-line"
        onButtonClick={() => navigate("/teacher/create-course")}
      />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Courses" value={mine.length} icon="ri-book-open-line" />
        <StatCard label="Published" value={count("Published")} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="Waiting for review" value={count("Pending")} icon="ri-time-line" tone="yellow" />
        <StatCard label="Total Students" value={mine.reduce((s, c) => s + c.students, 0).toLocaleString("en-IN")} icon="ri-group-line" tone="blue" />
      </section>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={search} onChange={setSearch} placeholder="Search your courses..." className="w-full sm:max-w-sm" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary">
          {statuses.map((value) => (
            <option key={value} value={value}>{value === "All" ? "All courses" : value}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="ri-book-open-line"
          title={mine.length ? "No courses match your search" : "You haven't created a course yet"}
          action={
            <Link to="/teacher/create-course" className="rounded-xl bg-[#10131d] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary">
              Create your first course
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <article key={course.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <SafeImage src={course.image} alt={course.title} icon={course.icon} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4">
                  <StatusBadge status={course.status} />
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium text-primary">{course.category}</p>
                <h3 className="mt-1 line-clamp-2 text-lg font-semibold">{course.title}</h3>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span><i className="ri-group-line"></i> {course.students} Students</span>
                  <span><i className="ri-star-fill text-yellow-400"></i> {course.rating || "New"}</span>
                  <span><i className="ri-play-circle-line"></i> {course.lessons} Lessons</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/teacher/courses/${course.id}`)}
                    className="flex-1 rounded-xl bg-[#10131d] py-2.5 text-sm font-medium text-white transition hover:bg-primary"
                  >
                    Manage Content
                  </button>
                  {course.status === "Published" && (
                    <Link to={`/courses/${course.id}`} title="View on website" className="flex w-11 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50">
                      <i className="ri-external-link-line"></i>
                    </Link>
                  )}
                  <button type="button" onClick={() => setDeleteId(course.id)} title="Delete course" className="flex w-11 items-center justify-center rounded-xl border border-gray-200 text-red-500 hover:bg-red-50">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ConfirmModal
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={remove}
        title="Delete this course?"
        message="Students will lose access and this can't be undone."
        confirmText="Delete course"
        danger
      />
    </>
  );
}

export default TeacherCourses;

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SafeImage from "../../components/common/SafeImage";
import Button from "../../components/common/Button";
import CourseCard from "../../components/public/CourseCard";
import NotFound from "./NotFound";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useCourses, useEnrollments } from "../../hooks/useCourses";
import { useTransactions } from "../../hooks/usePlatformData";
import { useToast } from "../../components/common/toastContext";
import { getCurriculum } from "../../data/courses";
import { getInstructorByName } from "../../data/instructors";
import { STORAGE_KEYS } from "../../data/keys";
import { formatPrice } from "../../utils/format";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const session = useAuth();
  const [courses] = useCourses();
  const [enrollments, setEnrollments] = useEnrollments();
  const [, setTransactions] = useTransactions();
  const [wishlist, setWishlist] = useLocalStorage(STORAGE_KEYS.wishlist, []);
  const [openSection, setOpenSection] = useState(0);

  const course = courses.find((item) => String(item.id) === id);
  if (!course || course.status !== "Published") return <NotFound />;

  const curriculum = getCurriculum(course);
  const instructor = getInstructorByName(course.instructor);
  const enrolled = enrollments.some((item) => item.courseId === course.id);
  const saved = wishlist.includes(course.id);
  const related = courses
    .filter((item) => item.status === "Published" && item.category === course.category && item.id !== course.id)
    .slice(0, 3);

  const enroll = () => {
    if (!session) {
      toast("Please log in to enroll in this course.", "info");
      navigate("/login", { state: { from: `/courses/${course.id}` } });
      return;
    }
    if (session.user.role === "teacher") {
      toast("Teacher accounts can't enroll. Log in with a student account.", "error");
      return;
    }
    if (enrolled) {
      navigate(`/student/learn/${course.id}`);
      return;
    }

    setEnrollments((prev) => [...prev, { courseId: course.id, completed: [], enrolledAt: new Date().toISOString() }]);
    if (course.price > 0) {
      setTransactions((prev) => [
        {
          id: `TXN-${Date.now().toString().slice(-5)}`,
          student: session.user.name,
          course: course.title,
          amount: course.price,
          method: "Card",
          date: new Date().toISOString().slice(0, 10),
          status: "Paid",
        },
        ...prev,
      ]);
    }
    toast(`You're enrolled in ${course.title}!`);
    navigate(`/student/learn/${course.id}`);
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("Course link copied.");
    } catch {
      toast("Couldn't copy the link. Copy it from the address bar.", "error");
    }
  };

  const stats = [
    { icon: "ri-star-fill text-yellow-400", text: course.rating ? `${course.rating} rating` : "New course" },
    { icon: "ri-group-line", text: `${course.students.toLocaleString("en-IN")} students` },
    { icon: "ri-play-circle-line", text: `${course.lessons} lessons` },
    { icon: "ri-time-line", text: `${course.hours} hours` },
    { icon: "ri-bar-chart-line", text: course.level },
  ];

  return (
    <div className="bg-[#f8f8f5] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/courses" className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <i className="ri-arrow-left-line"></i>
          Back to courses
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <div className="space-y-6">
            <section className="relative overflow-hidden rounded-3xl bg-[#10131d] p-7 text-white md:p-10">
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/20"></div>
              <div className="relative animate-fade-up">
                <Link
                  to={`/courses?category=${encodeURIComponent(course.category)}`}
                  className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary hover:bg-white/20"
                >
                  {course.category}
                </Link>
                <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{course.title}</h1>
                <p className="mt-4 max-w-2xl leading-7 text-gray-400">{course.description}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
                  {stats.map((item) => (
                    <span key={item.text} className="flex items-center gap-1.5">
                      <i className={item.icon}></i>
                      {item.text}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm text-gray-400">
                  Created by{" "}
                  {instructor ? (
                    <Link to={`/instructors/${instructor.id}`} className="font-medium text-white underline-offset-4 hover:underline">
                      {course.instructor}
                    </Link>
                  ) : (
                    <span className="font-medium text-white">{course.instructor}</span>
                  )}
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
              <h2 className="text-xl font-semibold">What you'll learn</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {(course.outcomes || []).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <i className="ri-check-line mt-0.5 text-lg text-green-500"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
              <div className="flex items-end justify-between">
                <h2 className="text-xl font-semibold">Course content</h2>
                <p className="text-sm text-gray-400">
                  {curriculum.length} modules • {course.lessons} lessons
                </p>
              </div>
              <div className="mt-5 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200">
                {curriculum.map((section, index) => (
                  <div key={section.id}>
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === index ? -1 : index)}
                      className="flex w-full items-center justify-between gap-3 bg-gray-50/60 px-5 py-4 text-left hover:bg-gray-50"
                      aria-expanded={openSection === index}
                    >
                      <span className="font-medium">{section.title}</span>
                      <span className="flex items-center gap-3 text-xs text-gray-400">
                        {section.lessons.length} lessons
                        <i className={`ri-arrow-down-s-line text-lg transition ${openSection === index ? "rotate-180" : ""}`}></i>
                      </span>
                    </button>
                    {openSection === index && (
                      <ul className="animate-fade-in px-5 py-2">
                        {section.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-center justify-between py-2.5 text-sm text-gray-600">
                            <span className="flex items-center gap-3">
                              <i className="ri-play-circle-line text-primary"></i>
                              {lesson.title}
                            </span>
                            <span className="text-xs text-gray-400">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {instructor && (
              <section className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center md:p-8">
                <SafeImage src={instructor.image} alt={instructor.name} icon="ri-user-line" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-primary">Your instructor</p>
                  <h3 className="mt-1 text-lg font-semibold">{instructor.name}</h3>
                  <p className="text-sm text-gray-500">{instructor.role}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">{instructor.bio}</p>
                </div>
                <Link to={`/instructors/${instructor.id}`} className="w-fit rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
                  View profile
                </Link>
              </section>
            )}
          </div>

          {/* Purchase card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="animate-scale-in overflow-hidden rounded-3xl border border-gray-200 bg-white">
              <SafeImage src={course.image} alt={course.title} icon={course.icon} className="h-48 w-full object-cover" />
              <div className="p-6">
                <p className="text-3xl font-bold text-[#10131d]">{formatPrice(course.price)}</p>
                <Button size="lg" className="mt-5 w-full" icon={enrolled ? "ri-play-circle-line" : "ri-shopping-bag-3-line"} onClick={enroll}>
                  {enrolled ? "Go to course" : course.price === 0 ? "Enroll for free" : "Enroll now"}
                </Button>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    icon={saved ? "ri-heart-fill text-red-500" : "ri-heart-line"}
                    onClick={() => setWishlist((prev) => (saved ? prev.filter((x) => x !== course.id) : [...prev, course.id]))}
                  >
                    {saved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" icon="ri-share-line" onClick={share}>
                    Share
                  </Button>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  {["Full lifetime access", "Certificate of completion", "Access on mobile and desktop", "Live doubt sessions"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <i className="ri-checkbox-circle-line text-primary"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">More in {course.category}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;

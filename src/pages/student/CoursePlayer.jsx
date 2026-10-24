import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import ProgressBar from "../../components/student/ProgressBar";
import { useToast } from "../../components/common/toastContext";
import { useCourses, useEnrollments, getProgress } from "../../hooks/useCourses";
import { getCurriculum } from "../../data/courses";

// Turns a normal YouTube link into an embeddable one.
const toEmbedUrl = (url = "") => {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

function CoursePlayer() {
  const { id } = useParams();
  const toast = useToast();
  const [courses] = useCourses();
  const [enrollments, setEnrollments] = useEnrollments();

  const course = courses.find((item) => String(item.id) === id);
  const enrollment = enrollments.find((item) => String(item.courseId) === id);
  const curriculum = course ? getCurriculum(course) : [];
  const lessons = curriculum.flatMap((section) => section.lessons);
  const completed = enrollment?.completed || [];

  const firstOpen = lessons.find((lesson) => !completed.includes(lesson.id)) || lessons[0];
  const [currentId, setCurrentId] = useState(firstOpen?.id);

  if (!course || !enrollment) {
    return (
      <EmptyState
        icon="ri-lock-line"
        title="You're not enrolled in this course"
        text="Enroll first to start learning."
        action={<Link to={course ? `/courses/${course.id}` : "/courses"} className="rounded-xl bg-[#10131d] px-5 py-2.5 text-sm text-white">View course</Link>}
      />
    );
  }

  const index = lessons.findIndex((lesson) => lesson.id === currentId);
  const current = lessons[index] || lessons[0];
  const isDone = completed.includes(current.id);
  const progress = getProgress(course, enrollment);
  const embed = toEmbedUrl(current.videoUrl);

  const toggleComplete = () => {
    setEnrollments((prev) =>
      prev.map((item) =>
        item.courseId !== course.id
          ? item
          : {
              ...item,
              completed: isDone ? item.completed.filter((x) => x !== current.id) : [...item.completed, current.id],
            }
      )
    );
    if (!isDone) {
      toast("Lesson marked as complete.");
      if (index < lessons.length - 1) setCurrentId(lessons[index + 1].id);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="min-w-0">
        <Link to="/student/my-courses" className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
          <i className="ri-arrow-left-line"></i> My Courses
        </Link>

        <div key={current.id} className="aspect-video animate-fade-in overflow-hidden rounded-3xl bg-[#10131d]">
          {embed ? (
            <iframe src={embed} title={current.title} className="h-full w-full" allowFullScreen></iframe>
          ) : (
            <div className="relative flex h-full flex-col items-center justify-center p-6 text-center text-white">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/20"></div>
              <i className={`${course.icon} text-5xl text-primary`}></i>
              <p className="mt-4 text-lg font-semibold">{current.title}</p>
              <p className="mt-1 text-sm text-white/50">Lesson video will appear here once the teacher uploads it.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm text-primary">{course.title}</p>
            <h1 className="mt-1 text-2xl font-semibold">{current.title}</h1>
            <p className="mt-1 text-sm text-gray-400">
              Lesson {index + 1} of {lessons.length} · {current.duration}
            </p>
          </div>
          <Button variant={isDone ? "outline" : "dark"} icon={isDone ? "ri-check-double-line text-green-500" : "ri-check-line"} onClick={toggleComplete}>
            {isDone ? "Completed" : "Mark as complete"}
          </Button>
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <Button variant="outline" icon="ri-arrow-left-s-line" disabled={index <= 0} onClick={() => setCurrentId(lessons[index - 1].id)}>
            Previous
          </Button>
          <Button variant="outline" disabled={index >= lessons.length - 1} onClick={() => setCurrentId(lessons[index + 1].id)}>
            Next <i className="ri-arrow-right-s-line"></i>
          </Button>
        </div>

        {progress === 100 && (
          <div className="mt-6 flex animate-scale-in flex-col justify-between gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-green-700">🎉 You finished this course! Your certificate is ready.</p>
            <Link to="/student/certificates" className="w-fit rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
              View certificates
            </Link>
          </div>
        )}
      </div>

      <aside className="overflow-hidden rounded-3xl border border-gray-200 bg-white xl:sticky xl:top-28 xl:self-start">
        <div className="border-b border-gray-100 p-5">
          <p className="font-semibold">Course content</p>
          <div className="mb-2 mt-3 flex justify-between text-xs">
            <span className="text-gray-400">
              {completed.length} / {lessons.length} lessons
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {curriculum.map((section) => (
            <div key={section.id}>
              <p className="bg-gray-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-500">{section.title}</p>
              {section.lessons.map((lesson) => {
                const done = completed.includes(lesson.id);
                const active = lesson.id === current.id;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => setCurrentId(lesson.id)}
                    className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition ${active ? "bg-primary/10 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <i className={done ? "ri-checkbox-circle-fill text-green-500" : active ? "ri-play-circle-fill text-primary" : "ri-play-circle-line text-gray-400"}></i>
                    <span className="flex-1 truncate">{lesson.title}</span>
                    <span className="text-xs text-gray-400">{lesson.duration}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default CoursePlayer;

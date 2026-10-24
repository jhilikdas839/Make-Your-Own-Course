
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import { getCurriculum } from "../../data/courses";

function CourseContent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeLesson, setActiveLesson] = useState(null);

  const [courses] = useCourses();
  const course = courses.find((item) => String(item.id) === id);

  // Lessons come from the shared course store; demo content is the fallback.
  const courseSections = course
    ? getCurriculum(course).map((section, sIndex) => ({
        id: sIndex + 1,
        title: section.title,
        lessons: section.lessons.map((lesson, lIndex) => ({
          id: `${sIndex}-${lIndex}`,
          title: lesson.title,
          duration: lesson.duration,
          type: "Video",
          videoUrl: lesson.videoUrl || "",
        })),
      }))
    : null;

  const [demoSections] = useState([
    {
      id: 1,
      title: "Getting Started",
      lessons: [
        {
          id: 1,
          title: "Introduction to the Course",
          duration: "08:25",
          type: "Video",
          videoUrl: "",
        },
        {
          id: 2,
          title: "Tools and Setup",
          duration: "12:40",
          type: "Video",
          videoUrl: "",
        },
      ],
    },
    {
      id: 2,
      title: "Core Concepts",
      lessons: [
        {
          id: 3,
          title: "Understanding the Basics",
          duration: "15:10",
          type: "Video",
          videoUrl: "",
        },
        {
          id: 4,
          title: "Practice Notes",
          duration: "PDF",
          type: "PDF",
          videoUrl: "",
        },
      ],
    },
  ]);
  const sections = courseSections || demoSections;

  const allLessons = sections.flatMap((section) => section.lessons);
  const selectedLesson = allLessons.find(
    (lesson) => lesson.id === activeLesson
  );

  const getVideoEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);

      if (
        parsed.hostname === "youtu.be" ||
        parsed.hostname.endsWith(".youtu.be")
      ) {
        const videoId = parsed.pathname.split("/").filter(Boolean)[0];
        return videoId
          ? `https://www.youtube-nocookie.com/embed/${videoId}`
          : "";
      }

      if (
        parsed.hostname === "youtube.com" ||
        parsed.hostname.endsWith(".youtube.com")
      ) {
        const videoId =
          parsed.searchParams.get("v") ||
          parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];

        return videoId
          ? `https://www.youtube-nocookie.com/embed/${videoId}`
          : "";
      }

      if (
        parsed.hostname === "vimeo.com" ||
        parsed.hostname.endsWith(".vimeo.com")
      ) {
        const videoId = parsed.pathname.match(/\/(\d+)/)?.[1];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
      }
    } catch {
      return "";
    }

    return "";
  };

  const embedUrl = selectedLesson?.videoUrl
    ? getVideoEmbedUrl(selectedLesson.videoUrl)
    : "";

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/teacher/courses")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 transition hover:text-primary"
        >
          <i className="ri-arrow-left-line" />
          Back to My Courses
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
              Course Management
            </p>

            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Course Content
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage lessons and review your course structure.
            </p>
          </div>

          <button
            onClick={() => navigate("/teacher/create-course")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            <i className="ri-add-line" />
            Add Content
          </button>
        </div>
      </div>

      {/* Course Summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary">
            <i className="ri-book-open-line" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-xs font-medium text-primary">
              COURSE ID: {id || "1"}
            </span>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              {course?.title || "React JS Masterclass"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Organize your lessons and learning materials.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:min-w-40">
            <div>
              <p className="text-xs text-gray-500">Sections</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {sections.length}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Lessons</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {allLessons.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Preview */}
      {selectedLesson && (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Lesson Preview
              </p>

              <h2 className="mt-2 text-lg font-semibold text-gray-900">
                {selectedLesson.title}
              </h2>
            </div>

            <button
              onClick={() => setActiveLesson(null)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="Close preview"
            >
              <i className="ri-close-line text-xl" />
            </button>
          </div>

          {selectedLesson.type === "PDF" ? (
            <div className="rounded-xl bg-gray-50 p-8 text-center">
              <i className="ri-file-pdf-2-line text-4xl text-red-500" />
              <p className="mt-3 text-sm text-gray-600">
                PDF preview will be available when lesson files are connected.
              </p>
            </div>
          ) : embedUrl ? (
            <div className="overflow-hidden rounded-xl bg-black">
              <iframe
                src={embedUrl}
                title={selectedLesson.title}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : selectedLesson.videoUrl ? (
            <video
              src={selectedLesson.videoUrl}
              controls
              className="aspect-video w-full rounded-xl bg-black"
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="rounded-xl bg-gray-50 px-5 py-12 text-center">
              <i className="ri-video-line text-4xl text-gray-400" />
              <p className="mt-3 text-sm font-medium text-gray-700">
                No video linked yet
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Connect a video URL or upload a video through the course editor.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Sections and Lessons */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Sections & Lessons
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select a lesson to preview its content.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                  {sectionIndex + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {section.lessons.length} lessons
                  </p>
                </div>

                <i className="ri-folder-open-line text-xl text-gray-400" />
              </div>

              <div className="divide-y divide-gray-100">
                {section.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    className={`flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-primary/10/50 ${
                      activeLesson === lesson.id ? "bg-primary/10/70" : "bg-white"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                      <i
                        className={`text-lg ${
                          lesson.type === "PDF"
                            ? "ri-file-pdf-2-line"
                            : "ri-play-circle-line"
                        }`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {lessonIndex + 1}. {lesson.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {lesson.type}
                        {lesson.duration !== "PDF" && ` · ${lesson.duration}`}
                      </p>
                    </div>

                    <i className="ri-eye-line text-lg text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-primary/40 bg-primary/10/70 p-4">
        <p className="text-sm leading-6 text-primary">
          <i className="ri-information-line mr-2" />
          This page currently uses sample content. Connect it to your saved
          course data and backend to manage real sections, lessons, videos and
          PDFs.
        </p>
      </div>
    </div>
  );
}

export default CourseContent;

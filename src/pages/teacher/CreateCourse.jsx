
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import { useCurrentUser } from "../../hooks/useAuth";
import { usePlatformSettings } from "../../hooks/usePlatformData";
import { useToast } from "../../components/common/toastContext";
import { categories } from "../../data/courses";

function CreateCourse() {
  const navigate = useNavigate();
  const toast = useToast();
  const user = useCurrentUser();
  const [, setCourses] = useCourses();
  const [platform] = usePlatformSettings();

  const [course, setCourse] = useState({
    title: "",
    category: "",
    level: "Beginner",
    price: "",
    description: "",
    thumbnail: "",
  });

  const [sections, setSections] = useState(() => [
    {
      id: Date.now(),
      title: "Introduction",
      lessons: [
        {
          id: Date.now() + 1,
          title: "",
          description: "",
          videoUrl: "",
          videoFile: null,
          notes: null,
        },
      ],
    },
  ]);

  const [message, setMessage] = useState("");

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/10";

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (sectionId, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, title: value } : section
      )
    );
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        title: "",
        lessons: [
          {
            id: Date.now() + Math.random(),
            title: "",
            description: "",
            videoUrl: "",
            videoFile: null,
            notes: null,
          },
        ],
      },
    ]);
  };

  const removeSection = (sectionId) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const addLesson = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: Date.now() + Math.random(),
                  title: "",
                  description: "",
                  videoUrl: "",
                  videoFile: null,
                  notes: null,
                },
              ],
            }
          : section
      )
    );
  };

  const updateLesson = (sectionId, lessonId, field, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, [field]: value }
                  : lesson
              ),
            }
          : section
      )
    );
  };

  const removeLesson = (sectionId, lessonId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : section
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyLesson = sections.some(
      (section) =>
        !section.title.trim() ||
        section.lessons.some((lesson) => !lesson.title.trim())
    );

    if (hasEmptyLesson) {
      setMessage("Please enter a title for every section and lesson.");
      return;
    }

    const lessonCount = sections.reduce((sum, section) => sum + section.lessons.length, 0);
    const status = platform.autoApproveCourses ? "Published" : "Pending";

    // Saved in the shared course store: the admin reviews it, then it shows on the public site.
    // Video/PDF files are not stored in the browser; they need a backend upload later.
    const newCourse = {
      id: Date.now(),
      title: course.title.trim(),
      category: course.category,
      level: course.level,
      price: Number(course.price) || 0,
      description: course.description,
      image: course.thumbnail,
      instructor: user.name,
      icon: "ri-book-open-line",
      rating: 0,
      students: 0,
      lessons: lessonCount,
      hours: Math.max(1, Math.round(lessonCount / 2)),
      outcomes: [],
      featured: false,
      status,
      createdAt: new Date().toISOString().slice(0, 10),
      sections: sections.map((section) => ({
        title: section.title,
        lessons: section.lessons.map((lesson) => ({
          title: lesson.title,
          description: lesson.description,
          videoUrl: lesson.videoUrl,
          videoFileName: lesson.videoFile?.name || "",
          notesFileName: lesson.notes?.name || "",
        })),
      })),
    };

    setCourses((prev) => [newCourse, ...prev]);
    toast(status === "Published" ? "Course published!" : "Course sent to admin for review.");
    navigate("/teacher/courses");
  };


  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-8">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/teacher/courses")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
        >
          <i className="ri-arrow-left-line" />
          Back to My Courses
        </button>

        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
          Course Management
        </p>

        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Create a New Course
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Add course details, organize lessons and attach learning materials.
        </p>
      </div>

      {message && (
        <div
          role="status"
          className="rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Course Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add the main details students will see.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Course Title *
              </label>
              <input
                id="title"
                name="title"
                value={course.title}
                onChange={handleCourseChange}
                className={inputClass}
                placeholder="e.g. Complete React JS Masterclass"
                maxLength={120}
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Course Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleCourseChange}
                rows={4}
                maxLength={3000}
                className={`${inputClass} resize-y`}
                placeholder="What will students learn?"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={course.category}
                  onChange={handleCourseChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="text-sm font-medium text-gray-700"
                >
                  Difficulty
                </label>
                <select
                  id="level"
                  name="level"
                  value={course.level}
                  onChange={handleCourseChange}
                  className={inputClass}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  
                </select>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700"
                >
                  Price (₹) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={course.price}
                  onChange={handleCourseChange}
                  className={inputClass}
                  placeholder="999"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="thumbnail"
                className="text-sm font-medium text-gray-700"
              >
                Thumbnail Image URL
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="url"
                value={course.thumbnail}
                onChange={handleCourseChange}
                className={inputClass}
                placeholder="https://example.com/course-image.jpg"
              />

              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt="Course thumbnail preview"
                  className="mt-4 h-44 w-full rounded-xl border border-gray-200 object-cover sm:max-w-md"
                />
              )}
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Course Content
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Organize your course into sections and lessons.
              </p>
            </div>

            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              <i className="ri-add-line" />
              Add Section
            </button>
          </div>

          <div className="space-y-5">
            {sections.map((section, sectionIndex) => (
              <div
                key={section.id}
                className="rounded-xl border border-gray-200 p-4 sm:p-5"
              >
                <div className="mb-5 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {sectionIndex + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor={`section-${section.id}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Section Title *
                    </label>
                    <input
                      id={`section-${section.id}`}
                      value={section.title}
                      onChange={(e) =>
                        handleSectionChange(section.id, e.target.value)
                      }
                      className={inputClass}
                      placeholder="e.g. React Basics"
                      required
                    />
                  </div>

                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      aria-label="Delete section"
                      className="mt-7 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <i className="ri-delete-bin-line" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="rounded-xl bg-gray-50 p-4"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-gray-800">
                          Lesson {lessonIndex + 1}
                        </h3>

                        {section.lessons.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeLesson(section.id, lesson.id)
                            }
                            className="text-xs font-medium text-red-500 hover:text-red-700"
                          >
                            <i className="ri-delete-bin-line mr-1" />
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor={`lesson-title-${lesson.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Lesson Title *
                          </label>
                          <input
                            id={`lesson-title-${lesson.id}`}
                            value={lesson.title}
                            onChange={(e) =>
                              updateLesson(
                                section.id,
                                lesson.id,
                                "title",
                                e.target.value
                              )
                            }
                            className={inputClass}
                            placeholder="e.g. Introduction to React"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`lesson-description-${lesson.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            Lesson Description
                          </label>
                          <textarea
                            id={`lesson-description-${lesson.id}`}
                            value={lesson.description}
                            onChange={(e) =>
                              updateLesson(
                                section.id,
                                lesson.id,
                                "description",
                                e.target.value
                              )
                            }
                            rows={2}
                            className={`${inputClass} resize-y`}
                            placeholder="Briefly describe this lesson"
                          />
                        </div>

                        {/* Video URL */}
                        <div>
                          <label
                            htmlFor={`video-url-${lesson.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            <i className="ri-link mr-1 text-primary" />
                            Video URL
                          </label>
                          <input
                            id={`video-url-${lesson.id}`}
                            type="url"
                            value={lesson.videoUrl}
                            onChange={(e) =>
                              updateLesson(
                                section.id,
                                lesson.id,
                                "videoUrl",
                                e.target.value
                              )
                            }
                            className={inputClass}
                            placeholder="YouTube, Vimeo or hosted video URL"
                          />
                        </div>

                        {/* Video File */}
                        <div>
                          <label
                            htmlFor={`video-file-${lesson.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            <i className="ri-video-line mr-1 text-primary" />
                            Upload Video
                          </label>

                          <label
                            htmlFor={`video-file-${lesson.id}`}
                            className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-4 py-6 text-center transition hover:border-primary/40 hover:bg-primary/10/40"
                          >
                            <i className="ri-upload-cloud-2-line text-2xl text-primary" />
                            <span className="mt-2 text-sm font-medium text-gray-700">
                              {lesson.videoFile
                                ? lesson.videoFile.name
                                : "Choose a video file"}
                            </span>
                            <span className="mt-1 text-xs text-gray-400">
                              MP4, WebM or MOV
                            </span>
                          </label>

                          <input
                            id={`video-file-${lesson.id}`}
                            type="file"
                            accept="video/mp4,video/webm,video/quicktime"
                            className="sr-only"
                            onChange={(e) =>
                              updateLesson(
                                section.id,
                                lesson.id,
                                "videoFile",
                                e.target.files?.[0] || null
                              )
                            }
                          />

                          {lesson.videoFile && (
                            <button
                              type="button"
                              onClick={() =>
                                updateLesson(
                                  section.id,
                                  lesson.id,
                                  "videoFile",
                                  null
                                )
                              }
                              className="mt-2 text-xs text-red-500 hover:text-red-700"
                            >
                              Remove selected video
                            </button>
                          )}
                        </div>

                        {/* PDF Notes */}
                        <div>
                          <label
                            htmlFor={`notes-${lesson.id}`}
                            className="text-sm font-medium text-gray-700"
                          >
                            <i className="ri-file-pdf-2-line mr-1 text-primary" />
                            Lesson Notes / PDF
                          </label>

                          <label
                            htmlFor={`notes-${lesson.id}`}
                            className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-primary/40"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                              <i className="ri-file-pdf-2-line text-xl" />
                            </span>

                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-gray-700">
                                {lesson.notes
                                  ? lesson.notes.name
                                  : "Choose PDF notes"}
                              </span>
                              <span className="mt-1 block text-xs text-gray-400">
                                PDF files only
                              </span>
                            </span>

                            <i className="ri-upload-2-line ml-auto text-gray-400" />
                          </label>

                          <input
                            id={`notes-${lesson.id}`}
                            type="file"
                            accept="application/pdf,.pdf"
                            className="sr-only"
                            onChange={(e) =>
                              updateLesson(
                                section.id,
                                lesson.id,
                                "notes",
                                e.target.files?.[0] || null
                              )
                            }
                          />

                          {lesson.notes && (
                            <button
                              type="button"
                              onClick={() =>
                                updateLesson(
                                  section.id,
                                  lesson.id,
                                  "notes",
                                  null
                                )
                              }
                              className="mt-2 text-xs text-red-500 hover:text-red-700"
                            >
                              Remove selected PDF
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addLesson(section.id)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
                >
                  <i className="ri-add-circle-line text-lg" />
                  Add Lesson
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/teacher/courses")}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/10"
          >
            <i className="ri-save-line mr-2" />
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;

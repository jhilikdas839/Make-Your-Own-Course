import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "../data/keys";
import { getLessonIds, initialCourses } from "../data/courses";
import { initialAssessments } from "../data/studentData";

// Shared course catalog: public site, teacher panel and admin panel all use this.
export function useCourses() {
  return useLocalStorage(STORAGE_KEYS.courses, initialCourses);
}

// Seed: the demo student already started a few courses.
const seed = (courseId, completedCount) => {
  const course = initialCourses.find((item) => item.id === courseId);
  return {
    courseId,
    completed: getLessonIds(course).slice(0, completedCount),
    enrolledAt: "2026-08-01",
  };
};

const initialEnrollments = [seed(7, 18), seed(8, 12), seed(3, 8), seed(2, 30), seed(10, 20), seed(9, 3)];

export function useEnrollments() {
  return useLocalStorage(STORAGE_KEYS.enrollments, initialEnrollments);
}

export function getProgress(course, enrollment) {
  const total = getLessonIds(course).length || 1;
  const done = enrollment?.completed?.length || 0;
  return Math.min(100, Math.round((done / total) * 100));
}

/** Joins enrollments with course data: [{ ...course, progress, completedCount, totalLessons, learningStatus }] */
export function useMyCourses() {
  const [courses] = useCourses();
  const [enrollments, setEnrollments] = useEnrollments();

  const myCourses = enrollments
    .map((enrollment) => {
      const course = courses.find((item) => item.id === enrollment.courseId);
      if (!course) return null;
      const totalLessons = getLessonIds(course).length;
      const progress = getProgress(course, enrollment);
      return {
        ...course,
        progress,
        completedCount: enrollment.completed.length,
        totalLessons,
        learningStatus: progress === 100 ? "Completed" : "In Progress",
      };
    })
    .filter(Boolean);

  return { myCourses, enrollments, setEnrollments };
}

export function useAssessments() {
  return useLocalStorage("myoc_student_assessments", initialAssessments);
}

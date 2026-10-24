const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const categories = [
  { name: "Web Development", icon: "ri-code-s-slash-line" },
  { name: "UI / UX Design", icon: "ri-palette-line" },
  { name: "Programming", icon: "ri-terminal-box-line" },
  { name: "Data Science", icon: "ri-bar-chart-box-line" },
  { name: "Digital Marketing", icon: "ri-megaphone-line" },
  { name: "Business", icon: "ri-briefcase-line" },
];

export const levels = ["Beginner", "Intermediate", "Advanced"];

const course = (data) => ({
  status: "Published",
  featured: false,
  createdAt: "2026-07-01",
  ...data,
});

export const initialCourses = [
  course({
    id: 1,
    title: "Complete React JS Course",
    category: "Web Development",
    instructor: "John Doe",
    level: "Beginner",
    price: 999,
    rating: 4.8,
    students: 2140,
    lessons: 24,
    hours: 18,
    icon: "ri-reactjs-line",
    image: img("photo-1633356122544-f134324a6cee"),
    featured: true,
    description:
      "Learn React from the ground up: components, props, state, hooks and routing. You will finish by building and deploying a complete course dashboard.",
    outcomes: ["Build apps with components and hooks", "Manage state the simple way", "Add routing and protected pages", "Deploy your project online"],
  }),
  course({
    id: 2,
    title: "JavaScript From Zero to Hero",
    category: "Programming",
    instructor: "David Wilson",
    level: "Beginner",
    price: 799,
    rating: 4.7,
    students: 3260,
    lessons: 30,
    hours: 22,
    icon: "ri-javascript-line",
    image: img("photo-1627398242454-45a1465c2479"),
    featured: true,
    description:
      "Start with variables and finish with async code and modern ES6+. Every topic comes with small exercises so the ideas stick.",
    outcomes: ["Write clean modern JavaScript", "Understand arrays, objects and functions", "Work with promises and async/await", "Prepare for interviews"],
  }),
  course({
    id: 3,
    title: "UI/UX Design Masterclass",
    category: "UI / UX Design",
    instructor: "Sarah Smith",
    level: "Intermediate",
    price: 899,
    rating: 4.9,
    students: 1580,
    lessons: 24,
    hours: 16,
    icon: "ri-pencil-ruler-2-line",
    image: img("photo-1561070791-2526d30994b5"),
    featured: true,
    description:
      "Go from idea to polished prototype. Learn user research, wireframing, visual design and how to hand off designs to developers.",
    outcomes: ["Run quick user interviews", "Wireframe and prototype in Figma", "Build a small design system", "Present your work with confidence"],
  }),
  course({
    id: 4,
    title: "Full Stack Web Development",
    category: "Web Development",
    instructor: "David Wilson",
    level: "Advanced",
    price: 1499,
    rating: 4.8,
    students: 1890,
    lessons: 40,
    hours: 36,
    icon: "ri-stack-line",
    image: img("photo-1498050108023-c5249f4df085"),
    featured: true,
    description:
      "Build a real product with React, Node.js, Express and MongoDB. Covers authentication, REST APIs, file uploads and deployment.",
    outcomes: ["Design REST APIs", "Add login with JWT", "Connect React to your API", "Deploy frontend and backend"],
  }),
  course({
    id: 5,
    title: "Tailwind CSS Complete Guide",
    category: "Web Development",
    instructor: "John Doe",
    level: "Beginner",
    price: 599,
    rating: 4.7,
    students: 1320,
    lessons: 18,
    hours: 9,
    icon: "ri-css3-line",
    image: img("photo-1516321318423-f06f85e504b3"),
    featured: true,
    description:
      "Style responsive websites quickly with utility classes. Learn layout, theming, dark mode and how to keep Tailwind code tidy.",
    outcomes: ["Build responsive layouts", "Create a custom theme", "Add small animations", "Organise reusable components"],
  }),
  course({
    id: 6,
    title: "Node JS & Express",
    category: "Programming",
    instructor: "David Wilson",
    level: "Intermediate",
    price: 999,
    rating: 4.6,
    students: 1170,
    lessons: 26,
    hours: 20,
    icon: "ri-server-line",
    image: img("photo-1555066931-4365d14bab8c"),
    featured: true,
    description:
      "Learn backend development with Node.js and Express: routing, middleware, databases, validation and error handling.",
    outcomes: ["Create an Express server", "Connect to MongoDB", "Validate and secure requests", "Structure a backend project"],
  }),
  course({
    id: 7,
    title: "Intro to Data Science",
    category: "Data Science",
    instructor: "Emily Johnson",
    level: "Beginner",
    price: 1199,
    rating: 4.8,
    students: 2010,
    lessons: 25,
    hours: 21,
    icon: "ri-bar-chart-box-line",
    image: img("photo-1551288049-bebda4e38f71"),
    description:
      "Understand data, statistics and Python tools like Pandas and Matplotlib. Finish with a full analysis of a real dataset.",
    outcomes: ["Clean and explore data", "Use Pandas confidently", "Make clear charts", "Share findings in a report"],
  }),
  course({
    id: 8,
    title: "React 19 Pro",
    category: "Web Development",
    instructor: "John Doe",
    level: "Advanced",
    price: 1299,
    rating: 4.9,
    students: 980,
    lessons: 25,
    hours: 19,
    icon: "ri-reactjs-line",
    image: img("photo-1517694712202-14dd9538aa97"),
    description:
      "Go deeper into React 19: actions, suspense, performance and patterns used in large apps.",
    outcomes: ["Use new React 19 features", "Speed up slow screens", "Share logic with custom hooks", "Structure large apps"],
  }),
  course({
    id: 9,
    title: "Python for Beginners",
    category: "Programming",
    instructor: "Emily Johnson",
    level: "Beginner",
    price: 0,
    rating: 4.7,
    students: 4120,
    lessons: 25,
    hours: 14,
    icon: "ri-code-s-slash-line",
    image: img("photo-1526379095098-d400fd0bf935"),
    description:
      "A free, friendly introduction to Python. Perfect if you have never written code before.",
    outcomes: ["Write your first programs", "Use loops and functions", "Work with files", "Build small automation scripts"],
  }),
  course({
    id: 10,
    title: "Digital Marketing Basics",
    category: "Digital Marketing",
    instructor: "Sarah Smith",
    level: "Beginner",
    price: 699,
    rating: 4.5,
    students: 1450,
    lessons: 20,
    hours: 12,
    icon: "ri-megaphone-line",
    image: img("photo-1460925895917-afdab827c52f"),
    description:
      "Learn SEO, social media, email marketing and ads, and how to measure what works.",
    outcomes: ["Plan a simple marketing strategy", "Grow on social media", "Run your first ad campaign", "Read analytics reports"],
  }),
  course({
    id: 11,
    title: "Business Communication Skills",
    category: "Business",
    instructor: "Sarah Smith",
    level: "Beginner",
    price: 499,
    rating: 4.6,
    students: 860,
    lessons: 15,
    hours: 8,
    icon: "ri-briefcase-line",
    image: img("photo-1454165804606-c3d57bc86b40"),
    description:
      "Write clear emails, run better meetings and present ideas with confidence at work.",
    outcomes: ["Write clear emails", "Lead short meetings", "Give and receive feedback", "Present to a group"],
  }),
  course({
    id: 12,
    title: "Machine Learning Foundations",
    category: "Data Science",
    instructor: "Emily Johnson",
    level: "Advanced",
    price: 1599,
    rating: 4.8,
    students: 740,
    lessons: 32,
    hours: 28,
    icon: "ri-brain-line",
    image: img("photo-1555949963-aa79dcee981c"),
    description:
      "Learn how machine learning models work and train your own with scikit-learn.",
    outcomes: ["Understand core ML ideas", "Train and test models", "Avoid common mistakes", "Present model results"],
  }),
  course({
    id: 13,
    title: "Next.js for React Developers",
    category: "Web Development",
    instructor: "John Doe",
    level: "Intermediate",
    price: 1099,
    rating: 0,
    students: 0,
    lessons: 20,
    hours: 15,
    icon: "ri-global-line",
    image: img("photo-1519389950473-47ba0277781c"),
    status: "Pending",
    createdAt: "2026-10-20",
    description: "Server rendering, routing and data fetching with Next.js.",
    outcomes: ["Build pages with the App Router", "Fetch data on the server", "Optimise images and fonts", "Deploy to Vercel"],
  }),
];

const MODULE_TITLES = [
  "Getting started",
  "Core concepts",
  "Hands-on practice",
  "Real-world project",
  "Wrap-up and next steps",
];

/**
 * Builds a simple curriculum for a course.
 * Courses created by teachers keep their own sections;
 * catalog courses get modules generated from their lesson count.
 */
export function getCurriculum(course) {
  if (course.sections?.length) {
    return course.sections.map((section, sIndex) => ({
      id: `${course.id}-s${sIndex}`,
      title: section.title,
      lessons: section.lessons.map((lesson, lIndex) => ({
        id: `${course.id}-${sIndex}-${lIndex}`,
        title: lesson.title,
        duration: "10:00",
        videoUrl: lesson.videoUrl,
      })),
    }));
  }

  const perModule = Math.ceil(course.lessons / MODULE_TITLES.length);
  return MODULE_TITLES.map((title, sIndex) => {
    const start = sIndex * perModule;
    const count = Math.max(0, Math.min(perModule, course.lessons - start));
    return {
      id: `${course.id}-s${sIndex}`,
      title,
      lessons: Array.from({ length: count }, (_, i) => ({
        id: `${course.id}-${start + i + 1}`,
        title: `${title}: part ${i + 1}`,
        duration: `${8 + ((start + i) % 9)}:${(start + i) % 2 ? "30" : "15"}`,
      })),
    };
  }).filter((section) => section.lessons.length > 0);
}

export const getLessonIds = (course) =>
  getCurriculum(course).flatMap((section) => section.lessons.map((lesson) => lesson.id));

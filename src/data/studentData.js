// Demo data for the student panel. Replace with API calls when the backend is ready.

export const liveClasses = [
  { id: 1, title: "Advanced React & Hooks", instructor: "John Doe", date: "Today", time: "4:00 PM - 5:30 PM", duration: "90 Minutes", students: 124, status: "Live Now", icon: "ri-reactjs-line", link: "https://meet.google.com/" },
  { id: 2, title: "JavaScript Interview Preparation", instructor: "David Wilson", date: "Today", time: "7:00 PM - 8:00 PM", duration: "60 Minutes", students: 86, status: "Upcoming", icon: "ri-javascript-line", link: "https://meet.google.com/" },
  { id: 3, title: "UI/UX Design Workshop", instructor: "Sarah Smith", date: "Tomorrow", time: "11:00 AM - 12:30 PM", duration: "90 Minutes", students: 72, status: "Upcoming", icon: "ri-pencil-ruler-2-line", link: "https://meet.google.com/" },
  { id: 4, title: "Data Science with Python", instructor: "Emily Johnson", date: "Tomorrow", time: "5:00 PM - 6:30 PM", duration: "90 Minutes", students: 98, status: "Upcoming", icon: "ri-bar-chart-box-line", link: "https://meet.google.com/" },
];

export const resources = [
  { id: 1, title: "React Hooks Cheat Sheet", type: "PDF", category: "Development", size: "2.4 MB", icon: "ri-file-pdf-2-line" },
  { id: 2, title: "JavaScript ES6 Guide", type: "PDF", category: "Development", size: "4.1 MB", icon: "ri-file-text-line" },
  { id: 3, title: "UI/UX Design Principles", type: "Document", category: "Design", size: "1.8 MB", icon: "ri-file-list-3-line" },
  { id: 4, title: "Data Science Notes", type: "PDF", category: "Data Science", size: "5.6 MB", icon: "ri-file-pdf-2-line" },
  { id: 5, title: "Frontend Interview Questions", type: "Document", category: "Interview", size: "1.2 MB", icon: "ri-questionnaire-line" },
  { id: 6, title: "Python Beginner Notes", type: "PDF", category: "Programming", size: "3.7 MB", icon: "ri-code-box-line" },
  { id: 7, title: "Building a React Project (video)", type: "Video", category: "Development", size: "18 min", icon: "ri-video-line", url: "https://www.youtube.com/embed/SqcY0GlETPk" },
  { id: 8, title: "JavaScript for Beginners (video)", type: "Video", category: "Development", size: "48 min", icon: "ri-video-line", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
];

const q = (question, options, answer) => ({ question, options, answer });

const sampleQuestions = [
  q("Which hook stores local state in a React component?", ["useEffect", "useState", "useRef", "useMemo"], 1),
  q("What does JSX compile to?", ["HTML strings", "React.createElement calls", "CSS", "JSON"], 1),
  q("Which method creates a new array with items that pass a test?", ["map", "reduce", "filter", "forEach"], 2),
  q("What does HTTP status 404 mean?", ["Server error", "Not found", "Unauthorized", "Success"], 1),
  q("Which keyword declares a constant in JavaScript?", ["var", "let", "const", "static"], 2),
];

export const initialAssessments = [
  { id: 1, title: "React Fundamentals Test", course: "React 19 Pro", duration: 10, date: "Today, 6:00 PM", status: "Upcoming", icon: "ri-reactjs-line", questions: sampleQuestions },
  { id: 2, title: "JavaScript ES6 Assessment", course: "JavaScript From Zero to Hero", duration: 10, date: "Sep 30, 2026", status: "Completed", score: 86, icon: "ri-javascript-line", questions: sampleQuestions },
  { id: 3, title: "UI/UX Design Quiz", course: "UI/UX Design Masterclass", duration: 8, date: "Tomorrow, 11:00 AM", status: "Upcoming", icon: "ri-pencil-ruler-2-line", questions: sampleQuestions },
  { id: 4, title: "Data Science Basics", course: "Intro to Data Science", duration: 10, date: "Sep 22, 2026", status: "Completed", score: 74, icon: "ri-bar-chart-box-line", questions: sampleQuestions },
  { id: 5, title: "Python Programming Test", course: "Python for Beginners", duration: 10, date: "Nov 2, 2026", status: "Upcoming", icon: "ri-code-s-slash-line", questions: sampleQuestions },
];

export const certificates = [
  { id: 1, title: "JavaScript From Zero to Hero", instructor: "David Wilson", issueDate: "September 12, 2026", certificateId: "CERT-JS-2026-001", icon: "ri-javascript-line" },
  { id: 2, title: "Digital Marketing Basics", instructor: "Sarah Smith", issueDate: "August 28, 2026", certificateId: "CERT-DM-2026-002", icon: "ri-megaphone-line" },
  { id: 3, title: "HTML & CSS Masterclass", instructor: "John Doe", issueDate: "July 19, 2026", certificateId: "CERT-WD-2026-003", icon: "ri-code-box-line" },
];

export const initialDiscussions = [
  { id: 1, title: "How does useEffect cleanup work in React?", course: "React 19 Pro", author: "Rahul Mehta", views: 148, time: "2 hours ago", category: "Development", solved: true, replies: [{ author: "John Doe", text: "The cleanup runs before the effect runs again and when the component unmounts.", time: "1 hour ago" }] },
  { id: 2, title: "Best way to prepare for JavaScript interviews?", course: "JavaScript From Zero to Hero", author: "Priya Sharma", views: 236, time: "5 hours ago", category: "Interview", solved: false, replies: [] },
  { id: 3, title: "Which color combination works best for dashboards?", course: "UI/UX Design Masterclass", author: "Ananya Das", views: 92, time: "Yesterday", category: "Design", solved: true, replies: [{ author: "Sarah Smith", text: "Start with neutrals and keep one accent colour for actions.", time: "Yesterday" }] },
  { id: 4, title: "Pandas vs NumPy: when should I use which?", course: "Intro to Data Science", author: "Arjun Roy", views: 174, time: "Yesterday", category: "Data Science", solved: false, replies: [] },
  { id: 5, title: "How can I improve my frontend portfolio?", course: "React 19 Pro", author: "Neha Singh", views: 310, time: "2 days ago", category: "Career", solved: true, replies: [] },
];

export const groups = [
  { id: 1, name: "Frontend Developers", description: "Talk about React, JavaScript, CSS and everything frontend.", members: 1800, icon: "ri-code-s-slash-line" },
  { id: 2, name: "UI/UX Designers", description: "Share design ideas, get feedback and find inspiration.", members: 920, icon: "ri-pencil-ruler-2-line" },
  { id: 3, name: "Career & Jobs", description: "Jobs, interviews, resumes and career growth.", members: 2400, icon: "ri-briefcase-4-line" },
  { id: 4, name: "Data & AI", description: "Python, data analysis and machine learning projects.", members: 1300, icon: "ri-brain-line" },
  { id: 5, name: "Freelancers", description: "Find clients, price your work and manage projects.", members: 640, icon: "ri-hand-coin-line" },
];

export const members = [
  { id: 1, name: "Rahul Sharma", role: "Frontend Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { id: 2, name: "Ananya Mehta", role: "UI/UX Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { id: 3, name: "Amit Verma", role: "JavaScript Developer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
  { id: 4, name: "Priya Singh", role: "Digital Marketer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
];

export const recordings = [
  { id: 1, title: "React fundamentals replay", course: "React 19 Pro", date: "Oct 18, 2026", duration: "52 min", url: "https://www.youtube.com/embed/SqcY0GlETPk" },
  { id: 2, title: "JavaScript basics replay", course: "JavaScript From Zero to Hero", date: "Oct 12, 2026", duration: "48 min", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
  { id: 3, title: "Python crash course replay", course: "Python for Beginners", date: "Oct 9, 2026", duration: "61 min", url: "https://www.youtube.com/embed/rfscVS0vtbw" },
  { id: 4, title: "Cleaning data with Pandas", course: "Intro to Data Science", date: "Oct 3, 2026", duration: "44 min", url: "https://www.youtube.com/embed/vmEHCJofslg" },
];

export const mentors = ["John Doe", "Sarah Smith", "David Wilson", "Emily Johnson"];

export const initialSessions = [
  { id: 1, title: "React Project Mentoring", mentor: "John Doe", date: "2026-10-28", time: "11:00", type: "1:1 Mentorship", status: "Upcoming" },
  { id: 2, title: "Frontend Career Guidance", mentor: "Sarah Smith", date: "2026-10-30", time: "16:00", type: "Career Session", status: "Upcoming" },
  { id: 3, title: "Portfolio Review", mentor: "David Wilson", date: "2026-11-02", time: "14:00", type: "Project Review", status: "Upcoming" },
  { id: 4, title: "JavaScript Interview Preparation", mentor: "Sarah Smith", date: "2026-09-15", time: "15:00", type: "Career Session", status: "Completed" },
  { id: 5, title: "React Fundamentals Doubt Session", mentor: "John Doe", date: "2026-09-10", time: "11:00", type: "1:1 Mentorship", status: "Completed" },
];

export const plans = [
  { id: "basic", name: "Basic Plan", price: 0, features: ["Free courses", "Community access", "Course certificates"] },
  { id: "pro", name: "Pro Plan", price: 29, features: ["Unlimited courses", "Live classes", "Certificates", "Mentor sessions"] },
  { id: "team", name: "Team Plan", price: 79, features: ["Everything in Pro", "Up to 5 learners", "Team progress reports", "Priority support"] },
];

export const initialInvoices = [
  { id: "INV-2026-010", date: "15 Oct 2026", plan: "Pro Plan", amount: 29, status: "Paid" },
  { id: "INV-2026-009", date: "15 Sep 2026", plan: "Pro Plan", amount: 29, status: "Paid" },
  { id: "INV-2026-008", date: "15 Aug 2026", plan: "Pro Plan", amount: 29, status: "Paid" },
  { id: "INV-2026-007", date: "15 Jul 2026", plan: "Pro Plan", amount: 29, status: "Paid" },
  { id: "INV-2026-006", date: "15 Jun 2026", plan: "Pro Plan", amount: 29, status: "Paid" },
  { id: "INV-2026-005", date: "15 May 2026", plan: "Pro Plan", amount: 29, status: "Paid" },
];

export const weeklyActivity = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 70 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 95 },
  { day: "Fri", minutes: 60 },
  { day: "Sat", minutes: 120 },
  { day: "Sun", minutes: 40 },
];

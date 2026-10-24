import PanelLayout from "../common/PanelLayout";

const menu = [
  {
    title: "Main menu",
    items: [
      { name: "Dashboard", path: "/teacher", icon: "ri-dashboard-line", end: true },
      { name: "My Courses", path: "/teacher/courses", icon: "ri-book-open-line" },
      { name: "Create Course", path: "/teacher/create-course", icon: "ri-add-circle-line" },
      { name: "Students", path: "/teacher/students", icon: "ri-group-line" },
      { name: "Assignments", path: "/teacher/assignments", icon: "ri-file-list-3-line" },
      { name: "Assessments", path: "/teacher/assessments", icon: "ri-survey-line" },
      { name: "Live Classes", path: "/teacher/live-classes", icon: "ri-live-line" },
      { name: "Recordings", path: "/teacher/recordings", icon: "ri-video-line" },
      { name: "Discussions", path: "/teacher/discussions", icon: "ri-chat-3-line" },
      { name: "Announcements", path: "/teacher/announcements", icon: "ri-megaphone-line" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { name: "Course Analytics", path: "/teacher/course-analytics", icon: "ri-bar-chart-box-line" },
      { name: "Student Progress", path: "/teacher/student-progress", icon: "ri-line-chart-line" },
      { name: "Reviews & Ratings", path: "/teacher/reviews", icon: "ri-star-line" },
    ],
  },
  {
    title: "Earnings",
    items: [
      { name: "Earnings Overview", path: "/teacher/earnings", icon: "ri-wallet-3-line" },
      { name: "Transactions", path: "/teacher/transactions", icon: "ri-exchange-dollar-line" },
      { name: "Payouts", path: "/teacher/payouts", icon: "ri-bank-card-line" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Profile", path: "/teacher/profile", icon: "ri-user-line" },
      { name: "Settings", path: "/teacher/settings", icon: "ri-settings-3-line" },
      { name: "Help & Support", path: "/teacher/support", icon: "ri-customer-service-2-line" },
    ],
  },
];

const notifications = [
  { id: 1, title: "12 new students joined React JS course", time: "1 hour ago", icon: "ri-group-line", path: "/teacher/students", read: false },
  { id: 2, title: "New 5-star review on UI/UX Masterclass", time: "3 hours ago", icon: "ri-star-line", path: "/teacher/reviews", read: false },
  { id: 3, title: "Payout of ₹18,500 was processed", time: "Yesterday", icon: "ri-bank-card-line", path: "/teacher/payouts", read: true },
];

function TeacherLayout() {
  return (
    <PanelLayout
      role="teacher"
      panelName="Teacher Dashboard"
      roleLabel="Teacher"
      homePath="/teacher"
      menu={menu}
      notifications={notifications}
      profilePath="/teacher/profile"
      settingsPath="/teacher/settings"
    />
  );
}

export default TeacherLayout;

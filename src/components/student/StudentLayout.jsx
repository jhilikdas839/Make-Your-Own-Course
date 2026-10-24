import PanelLayout from "../common/PanelLayout";

const menu = [
  {
    title: "Main menu",
    items: [
      { name: "Dashboard", path: "/student", icon: "ri-dashboard-line", end: true },
      { name: "My Courses", path: "/student/my-courses", icon: "ri-book-open-line" },
      { name: "Live Classes", path: "/student/live-classes", icon: "ri-live-line" },
      { name: "Library", path: "/student/library", icon: "ri-folder-open-line" },
      { name: "My Progress", path: "/student/my-progress", icon: "ri-bar-chart-box-line" },
      { name: "Assessments", path: "/student/assessments", icon: "ri-file-list-3-line" },
      { name: "Certificates", path: "/student/certificates", icon: "ri-medal-line" },
      { name: "Discussions", path: "/student/discussions", icon: "ri-chat-3-line" },
      { name: "Community", path: "/student/community", icon: "ri-group-line" },
      { name: "Recordings", path: "/student/recordings", icon: "ri-video-line" },
      { name: "Sessions", path: "/student/sessions", icon: "ri-calendar-line" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Billing", path: "/student/billing", icon: "ri-wallet-3-line" },
      { name: "Settings", path: "/student/settings", icon: "ri-settings-3-line" },
    ],
  },
];

const notifications = [
  { id: 1, title: "Advanced React & Hooks is live now", time: "Just now", icon: "ri-live-line", path: "/student/live-classes", read: false },
  { id: 2, title: "New quiz added: React Fundamentals Test", time: "2 hours ago", icon: "ri-file-list-3-line", path: "/student/assessments", read: false },
  { id: 3, title: "Your certificate for JavaScript is ready", time: "Yesterday", icon: "ri-medal-line", path: "/student/certificates", read: true },
];

function StudentLayout() {
  return (
    <PanelLayout
      role="student"
      panelName="Student Dashboard"
      roleLabel="Student"
      homePath="/student"
      menu={menu}
      notifications={notifications}
      profilePath="/student/settings"
      settingsPath="/student/settings"
    />
  );
}

export default StudentLayout;

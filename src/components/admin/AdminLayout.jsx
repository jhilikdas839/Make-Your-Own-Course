import PanelLayout from "../common/PanelLayout";

const menu = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", path: "/admin", icon: "ri-dashboard-line", end: true },
      { name: "Reports", path: "/admin/reports", icon: "ri-pie-chart-2-line" },
    ],
  },
  {
    title: "Manage",
    items: [
      { name: "Users", path: "/admin/users", icon: "ri-group-line" },
      { name: "Courses", path: "/admin/courses", icon: "ri-book-open-line" },
      { name: "Categories", path: "/admin/categories", icon: "ri-folders-line" },
      { name: "Reviews", path: "/admin/reviews", icon: "ri-star-line" },
      { name: "Announcements", path: "/admin/announcements", icon: "ri-megaphone-line" },
      { name: "Messages", path: "/admin/messages", icon: "ri-mail-line" },
      { name: "Support Tickets", path: "/admin/support", icon: "ri-customer-service-2-line" },
    ],
  },
  {
    title: "Finance",
    items: [
      { name: "Payments", path: "/admin/payments", icon: "ri-exchange-dollar-line" },
      { name: "Payouts", path: "/admin/payouts", icon: "ri-bank-card-line" },
    ],
  },
  {
    title: "Panels",
    items: [
      { name: "Open Student Panel", path: "/student", icon: "ri-user-3-line" },
      { name: "Open Teacher Panel", path: "/teacher", icon: "ri-presentation-line" },
      { name: "Public Website", path: "/", icon: "ri-global-line" },
    ],
  },
  {
    title: "System",
    items: [{ name: "Platform Settings", path: "/admin/settings", icon: "ri-settings-3-line" }],
  },
];

const notifications = [
  { id: 1, title: "1 course is waiting for your approval", time: "10 min ago", icon: "ri-book-open-line", path: "/admin/courses", read: false },
  { id: 2, title: "2 payout requests need review", time: "1 hour ago", icon: "ri-bank-card-line", path: "/admin/payouts", read: false },
  { id: 3, title: "New support ticket from a teacher", time: "Today", icon: "ri-customer-service-2-line", path: "/admin/support", read: false },
];

function AdminLayout() {
  return (
    <PanelLayout
      role="admin"
      panelName="Super Admin"
      roleLabel="Admin"
      homePath="/admin"
      menu={menu}
      notifications={notifications}
      profilePath="/admin/settings"
      settingsPath="/admin/settings"
    />
  );
}

export default AdminLayout;

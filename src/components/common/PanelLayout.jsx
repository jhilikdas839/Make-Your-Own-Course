import { Suspense, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PanelSidebar from "./PanelSidebar";
import PanelTopbar from "./PanelTopbar";
import useAuth from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { clearSession } from "../../utils/auth";
import { useToast } from "./toastContext";
import PageLoader from "./PageLoader";

/**
 * Shared dashboard shell for the student, teacher and admin panels:
 * sidebar + topbar + animated page area. Each panel only passes its menu.
 */
function PanelLayout({ role, panelName, roleLabel, homePath, menu, notifications, profilePath, settingsPath }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useLocalStorage(`myoc_notifications_${role}`, notifications);
  const session = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const user = session?.user || { name: "Guest", email: "" };
  const pages = menu.flatMap((group) => group.items);
  const adminPreview = user.role === "admin" && role !== "admin";

  const logout = () => {
    clearSession();
    toast("You have been logged out.", "info");
    navigate("/login");
  };

  const sidebar = (
    <PanelSidebar
      menu={menu}
      homePath={homePath}
      roleLabel={roleLabel}
      user={user}
      onNavigate={() => setSidebarOpen(false)}
      onLogout={logout}
    />
  );

  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      {/* Desktop sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-[300px] border-r border-gray-200 bg-white lg:block">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 animate-fade-in bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 w-[290px] transform bg-white transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      <main className="min-h-screen lg:ml-[300px]">
        {adminPreview && (
          <div className="flex items-center justify-between gap-3 bg-[#10131d] px-5 py-2 text-xs text-white md:px-8">
            <span>You are viewing the {roleLabel.toLowerCase()} panel as Super Admin.</span>
            <Link to="/admin" className="font-semibold text-[#168ee5] hover:underline">Back to admin</Link>
          </div>
        )}

        <PanelTopbar
          panelName={panelName}
          user={user}
          pages={pages}
          notifications={items}
          setNotifications={setItems}
          profilePath={profilePath}
          settingsPath={settingsPath}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={logout}
        />

        <div key={location.pathname} className="mx-auto max-w-[1450px] animate-fade-up p-5 md:p-8 xl:p-10">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default PanelLayout;


import { Outlet } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import TeacherTopbar from "./TeacherTopbar";

function TeacherLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f5]">

      {/* Sidebar */}
      <div className="hidden lg:block">
        <TeacherSidebar />
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Topbar */}
        <TeacherTopbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default TeacherLayout;

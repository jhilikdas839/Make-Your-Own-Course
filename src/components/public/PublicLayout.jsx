import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageLoader from "../common/PageLoader";
import { usePlatformSettings } from "../../hooks/usePlatformData";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout() {
  const { pathname } = useLocation();
  const [platform] = usePlatformSettings();

  return (
    <div className="flex min-h-screen w-full flex-col">
      {platform.maintenanceMode && (
        <div className="bg-yellow-400 px-4 py-2 text-center text-sm font-medium text-[#10131d]">
          We're doing some maintenance. Some features may be unavailable for a short time.
        </div>
      )}
      <Navbar />
      <main key={pathname} className="flex-1 animate-fade-in">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;

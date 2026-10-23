
import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import Allroutes from "./Routes/Allroutes";

const App = () => {
  const location = useLocation();

  const dashboardPaths = [
    "/dashboard",
    "/my-courses",
    "/live-classes",
    "/library",
    "/my-progress",
    "/assessments",
    "/certificates",
    "/discussions",
    "/community",
    "/recordings",
    "/sessions",
    "/billing",
    "/settings",
  ];

  const isStudentDashboard = dashboardPaths.includes(location.pathname);

  // Hide public Navbar and Footer on all teacher pages
  const isTeacherDashboard = location.pathname.startsWith("/teacher");

  const hideNavbarFooter = isStudentDashboard || isTeacherDashboard;

  return (
    <div className="w-full">
      {!hideNavbarFooter && <Navbar />}

      <Allroutes />

      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default App;

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

  const isDashboard = dashboardPaths.includes(location.pathname);

  return (
    <div className="w-full">

      {!isDashboard && <Navbar />}

      <Allroutes />

      {!isDashboard && <Footer />}

    </div>
  );
};

export default App;
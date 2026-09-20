import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Courses from "../pages/Courses";

import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import MyCourses from "../pages/MyCourses";
import LiveClasses from "../pages/LiveClasses";
import Library from "../pages/Library";
import MyProgress from "../pages/MyProgress";
import Assessments from "../pages/Assessments";
import Certificates from "../pages/Certificates";
import Discussions from "../pages/Discussions";
import Community from "../pages/Community";
import Recordings from "../pages/Recordings";
import Sessions from "../pages/Sessions";
import Billing from "../pages/Billing";
import Settings from "../pages/Settings";

const Allroutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC PAGES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/courses" element={<Courses />} />

      {/* ================= DASHBOARD PAGES ================= */}

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/my-courses" element={<MyCourses />} />

        <Route path="/live-classes" element={<LiveClasses />} />

        <Route path="/library" element={<Library />} />

        <Route path="/my-progress" element={<MyProgress />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/community" element={<Community />} />
        <Route path="/recordings" element={<Recordings />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default Allroutes;

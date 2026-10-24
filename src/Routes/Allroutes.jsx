import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Courses from "../pages/Courses";
import Contact from "../pages/Contact";

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

// TEACHER PANEL ROUTES 

import TeacherLayout from "../components/teacher/TeacherLayout";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherCourses from "../pages/teacher/TeacherCourses";
import CreateCourse from "../pages/teacher/CreateCourse";
import CourseContent from "../pages/teacher/CourseContent";
import TeacherStudents from "../pages/teacher/TeacherStudents";
import TeacherAssignments from "../pages/teacher/TeacherAssignments";
import TeacherAssessments from "../pages/teacher/TeacherAssessments";
import TeacherLiveClasses from "../pages/teacher/TeacherLiveClasses";
import TeacherRecordings from "../pages/teacher/TeacherRecordings";
import TeacherDiscussions from "../pages/teacher/TeacherDiscussions";
import TeacherAnnouncements from "../pages/teacher/TeacherAnnouncements";
import TeacherCourseAnalytics from "../pages/teacher/TeacherCourseAnalytics";
import TeacherStudentProgress from "../pages/teacher/TeacherStudentProgress";
import TeacherReviews from "../pages/teacher/TeacherReviews";
import TeacherEarnings from "../pages/teacher/TeacherEarnings";
import TeacherTransactions from "../pages/teacher/TeacherTransactions";
import TeacherPayouts from "../pages/teacher/TeacherPayouts";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import TeacherSettings from "../pages/teacher/TeacherSettings";
import TeacherSupport from "../pages/teacher/TeacherSupport";




const Allroutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC PAGES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/courses" element={<Courses />} />
      <Route path="/contact" element={<Contact />} />

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


{/* ================= TEACHER  DASHBOARD PAGES ================= */}


<Route path="/teacher" element={<TeacherLayout />}>
  <Route index element={<TeacherDashboard />} />
   <Route path="courses" element={<TeacherCourses />} />
   <Route path="create-course" element={<CreateCourse />} />
    <Route path="courses/:id" element={<CourseContent />} />
    <Route path="students" element={<TeacherStudents />} />
    <Route path="assignments" element={<TeacherAssignments />} />
    <Route path="assessments" element={<TeacherAssessments />} />
    <Route path="live-classes" element={<TeacherLiveClasses />} />
    <Route path="recordings" element={<TeacherRecordings />} />
    <Route path="discussions" element={<TeacherDiscussions />} />
    <Route path="announcements" element={<TeacherAnnouncements />}/>
    <Route path="course-analytics" element={<TeacherCourseAnalytics />}/>
    <Route path="student-progress" element={<TeacherStudentProgress />}/>
    <Route path="reviews" element={<TeacherReviews />} />
    <Route path="earnings" element={<TeacherEarnings />} />
    <Route path="transactions" element={<TeacherTransactions />} />
    <Route path="payouts" element={<TeacherPayouts />} />
    <Route path="profile" element={<TeacherProfile />} />
    <Route path="settings" element={<TeacherSettings />} />
    <Route path="support" element={<TeacherSupport />} />

</Route>


    </Routes>
  );
};

export default Allroutes;

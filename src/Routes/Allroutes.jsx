import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageLoader from "../components/common/PageLoader";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicLayout from "../components/public/PublicLayout";
import StudentLayout from "../components/student/StudentLayout";
import TeacherLayout from "../components/teacher/TeacherLayout";
import AdminLayout from "../components/admin/AdminLayout";
import useAuth from "../hooks/useAuth";
import { ROLE_HOME } from "../utils/auth";

// Pages load only when they are opened (keeps the first load small).
const page = (loader) => lazy(loader);

// ---------- Public ----------
const Home = page(() => import("../pages/public/Home"));
const Courses = page(() => import("../pages/public/Courses"));
const CourseDetails = page(() => import("../pages/public/CourseDetails"));
const InstructorProfile = page(() => import("../pages/public/InstructorProfile"));
const About = page(() => import("../pages/public/About"));
const Contact = page(() => import("../pages/public/Contact"));
const Legal = page(() => import("../pages/public/Legal"));
const Login = page(() => import("../pages/public/Login"));
const Signup = page(() => import("../pages/public/Signup"));
const NotFound = page(() => import("../pages/public/NotFound"));

// ---------- Student ----------
const StudentDashboard = page(() => import("../pages/student/Dashboard"));
const MyCourses = page(() => import("../pages/student/MyCourses"));
const CoursePlayer = page(() => import("../pages/student/CoursePlayer"));
const LiveClasses = page(() => import("../pages/student/LiveClasses"));
const Library = page(() => import("../pages/student/Library"));
const MyProgress = page(() => import("../pages/student/MyProgress"));
const Assessments = page(() => import("../pages/student/Assessments"));
const TakeAssessment = page(() => import("../pages/student/TakeAssessment"));
const Certificates = page(() => import("../pages/student/Certificates"));
const Discussions = page(() => import("../pages/student/Discussions"));
const Community = page(() => import("../pages/student/Community"));
const Recordings = page(() => import("../pages/student/Recordings"));
const Sessions = page(() => import("../pages/student/Sessions"));
const Billing = page(() => import("../pages/student/Billing"));
const StudentSettings = page(() => import("../pages/student/Settings"));

// ---------- Teacher ----------
const TeacherDashboard = page(() => import("../pages/teacher/TeacherDashboard"));
const TeacherCourses = page(() => import("../pages/teacher/TeacherCourses"));
const CreateCourse = page(() => import("../pages/teacher/CreateCourse"));
const CourseContent = page(() => import("../pages/teacher/CourseContent"));
const TeacherStudents = page(() => import("../pages/teacher/TeacherStudents"));
const TeacherAssignments = page(() => import("../pages/teacher/TeacherAssignments"));
const TeacherAssessments = page(() => import("../pages/teacher/TeacherAssessments"));
const TeacherLiveClasses = page(() => import("../pages/teacher/TeacherLiveClasses"));
const TeacherRecordings = page(() => import("../pages/teacher/TeacherRecordings"));
const TeacherDiscussions = page(() => import("../pages/teacher/TeacherDiscussions"));
const TeacherAnnouncements = page(() => import("../pages/teacher/TeacherAnnouncements"));
const TeacherCourseAnalytics = page(() => import("../pages/teacher/TeacherCourseAnalytics"));
const TeacherStudentProgress = page(() => import("../pages/teacher/TeacherStudentProgress"));
const TeacherReviews = page(() => import("../pages/teacher/TeacherReviews"));
const TeacherEarnings = page(() => import("../pages/teacher/TeacherEarnings"));
const TeacherTransactions = page(() => import("../pages/teacher/TeacherTransactions"));
const TeacherPayouts = page(() => import("../pages/teacher/TeacherPayouts"));
const TeacherProfile = page(() => import("../pages/teacher/TeacherProfile"));
const TeacherSettings = page(() => import("../pages/teacher/TeacherSettings"));
const TeacherSupport = page(() => import("../pages/teacher/TeacherSupport"));

// ---------- Super admin ----------
const AdminDashboard = page(() => import("../pages/admin/AdminDashboard"));
const AdminReports = page(() => import("../pages/admin/AdminReports"));
const AdminUsers = page(() => import("../pages/admin/AdminUsers"));
const AdminCourses = page(() => import("../pages/admin/AdminCourses"));
const AdminCategories = page(() => import("../pages/admin/AdminCategories"));
const AdminReviews = page(() => import("../pages/admin/AdminReviews"));
const AdminAnnouncements = page(() => import("../pages/admin/AdminAnnouncements"));
const AdminMessages = page(() => import("../pages/admin/AdminMessages"));
const AdminSupport = page(() => import("../pages/admin/AdminSupport"));
const AdminPayments = page(() => import("../pages/admin/AdminPayments"));
const AdminPayouts = page(() => import("../pages/admin/AdminPayouts"));
const AdminSettings = page(() => import("../pages/admin/AdminSettings"));

// "/dashboard" sends each user to their own panel.
function DashboardRedirect() {
  const session = useAuth();
  return <Navigate to={session ? ROLE_HOME[session.user.role] || "/" : "/login"} replace />;
}

const guard = (roles, element) => <ProtectedRoute roles={roles}>{element}</ProtectedRoute>;

function AllRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/instructors/:id" element={<InstructorProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student" element={guard(["student"], <StudentLayout />)}>
          <Route index element={<StudentDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="learn/:id" element={<CoursePlayer />} />
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="library" element={<Library />} />
          <Route path="my-progress" element={<MyProgress />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="assessments/:id" element={<TakeAssessment />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="discussions" element={<Discussions />} />
          <Route path="community" element={<Community />} />
          <Route path="recordings" element={<Recordings />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<StudentSettings />} />
          <Route path="*" element={<NotFound inPanel />} />
        </Route>

        {/* ================= TEACHER ================= */}
        <Route path="/teacher" element={guard(["teacher"], <TeacherLayout />)}>
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
          <Route path="announcements" element={<TeacherAnnouncements />} />
          <Route path="course-analytics" element={<TeacherCourseAnalytics />} />
          <Route path="student-progress" element={<TeacherStudentProgress />} />
          <Route path="reviews" element={<TeacherReviews />} />
          <Route path="earnings" element={<TeacherEarnings />} />
          <Route path="transactions" element={<TeacherTransactions />} />
          <Route path="payouts" element={<TeacherPayouts />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="settings" element={<TeacherSettings />} />
          <Route path="support" element={<TeacherSupport />} />
          <Route path="*" element={<NotFound inPanel />} />
        </Route>

        {/* ================= SUPER ADMIN ================= */}
        <Route path="/admin" element={guard(["admin"], <AdminLayout />)}>
          <Route index element={<AdminDashboard />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="payouts" element={<AdminPayouts />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="*" element={<NotFound inPanel />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AllRoutes;

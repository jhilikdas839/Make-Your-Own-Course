// Demo data for the whole platform. The super admin manages all of it.
// Replace these with API calls once the backend endpoints are ready.
import { categories } from "./courses";

export const initialUsers = [
  { id: 1, name: "John Smith", email: "student@myoc.dev", role: "student", status: "Active", joined: "2026-01-12", courses: 6 },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "student", status: "Active", joined: "2026-03-04", courses: 3 },
  { id: 3, name: "Arjun Roy", email: "arjun@example.com", role: "student", status: "Blocked", joined: "2026-04-18", courses: 1 },
  { id: 4, name: "Neha Singh", email: "neha@example.com", role: "student", status: "Active", joined: "2026-06-22", courses: 4 },
  { id: 5, name: "Aman Kumar", email: "aman@example.com", role: "student", status: "Active", joined: "2026-09-02", courses: 2 },
  { id: 6, name: "John Doe", email: "teacher@myoc.dev", role: "teacher", status: "Active", joined: "2025-11-10", courses: 4 },
  { id: 7, name: "Sarah Smith", email: "sarah@example.com", role: "teacher", status: "Active", joined: "2025-12-01", courses: 3 },
  { id: 8, name: "David Wilson", email: "david@example.com", role: "teacher", status: "Active", joined: "2026-01-20", courses: 3 },
  { id: 9, name: "Emily Johnson", email: "emily@example.com", role: "teacher", status: "Active", joined: "2026-02-14", courses: 3 },
  { id: 10, name: "Rohan Das", email: "rohan@example.com", role: "teacher", status: "Pending", joined: "2026-10-21", courses: 0 },
  { id: 11, name: "Super Admin", email: "admin@myoc.dev", role: "admin", status: "Active", joined: "2025-10-01", courses: 0 },
];

export const initialTransactions = [
  { id: "TXN-10231", student: "Priya Sharma", course: "Complete React JS Course", amount: 999, method: "UPI", date: "2026-10-22", status: "Paid" },
  { id: "TXN-10230", student: "Neha Singh", course: "UI/UX Design Masterclass", amount: 899, method: "Card", date: "2026-10-21", status: "Paid" },
  { id: "TXN-10229", student: "Aman Kumar", course: "Full Stack Web Development", amount: 1499, method: "Net banking", date: "2026-10-20", status: "Paid" },
  { id: "TXN-10228", student: "Arjun Roy", course: "Node JS & Express", amount: 999, method: "UPI", date: "2026-10-18", status: "Refunded" },
  { id: "TXN-10227", student: "John Smith", course: "Intro to Data Science", amount: 1199, method: "Card", date: "2026-10-15", status: "Paid" },
  { id: "TXN-10226", student: "Priya Sharma", course: "Digital Marketing Basics", amount: 699, method: "UPI", date: "2026-10-11", status: "Pending" },
  { id: "TXN-10225", student: "Neha Singh", course: "Machine Learning Foundations", amount: 1599, method: "Card", date: "2026-10-08", status: "Failed" },
];

export const initialPayouts = [
  { id: "PO-2041", teacher: "John Doe", amount: 18500, method: "Bank transfer", requested: "2026-10-22", status: "Pending" },
  { id: "PO-2040", teacher: "Sarah Smith", amount: 12400, method: "UPI", requested: "2026-10-21", status: "Pending" },
  { id: "PO-2039", teacher: "David Wilson", amount: 21000, method: "Bank transfer", requested: "2026-10-12", status: "Paid" },
  { id: "PO-2038", teacher: "Emily Johnson", amount: 9600, method: "UPI", requested: "2026-10-05", status: "Paid" },
  { id: "PO-2037", teacher: "John Doe", amount: 15200, method: "Bank transfer", requested: "2026-09-28", status: "Rejected" },
];

export const initialReviews = [
  { id: 1, student: "Priya Sharma", course: "Complete React JS Course", rating: 5, comment: "Clear explanations and great projects. I finally understand hooks!", date: "2026-10-20", status: "Visible" },
  { id: 2, student: "Neha Singh", course: "UI/UX Design Masterclass", rating: 5, comment: "Sarah's feedback on the final project was really useful.", date: "2026-10-18", status: "Visible" },
  { id: 3, student: "Arjun Roy", course: "Node JS & Express", rating: 2, comment: "Buy cheap followers at my website!!!", date: "2026-10-16", status: "Pending" },
  { id: 4, student: "Aman Kumar", course: "Full Stack Web Development", rating: 4, comment: "Long but worth it. Deployment section could be longer.", date: "2026-10-12", status: "Visible" },
  { id: 5, student: "John Smith", course: "Intro to Data Science", rating: 4, comment: "Good pace for beginners.", date: "2026-10-09", status: "Pending" },
];

export const initialTickets = [
  { id: "TCK-311", from: "John Doe", role: "teacher", subject: "Video upload keeps failing", priority: "High", date: "2026-10-23", status: "Open", messages: [{ by: "John Doe", text: "My 1.2 GB lesson video fails at 80% every time.", at: "2026-10-23" }] },
  { id: "TCK-310", from: "Priya Sharma", role: "student", subject: "Certificate name is wrong", priority: "Medium", date: "2026-10-21", status: "Open", messages: [{ by: "Priya Sharma", text: "My certificate shows 'Priya S'. Can you update it to my full name?", at: "2026-10-21" }] },
  { id: "TCK-309", from: "Aman Kumar", role: "student", subject: "Charged twice for one course", priority: "High", date: "2026-10-19", status: "Resolved", messages: [{ by: "Aman Kumar", text: "I was charged twice for Full Stack Web Development.", at: "2026-10-19" }, { by: "Super Admin", text: "Refund for the extra payment is done. Sorry for the trouble!", at: "2026-10-20" }] },
];

export const initialAnnouncements = [
  { id: 1, title: "Diwali offer: 30% off all courses", message: "Use code DIWALI30 at checkout until 5 November.", audience: "Everyone", date: "2026-10-20" },
  { id: 2, title: "New payout schedule", message: "From November, teacher payouts are processed every Monday.", audience: "Teachers", date: "2026-10-15" },
];

export const initialCategories = categories.map((category, index) => ({ id: index + 1, ...category }));

export const initialPlatformSettings = {
  siteName: "Make Your Own Course",
  supportEmail: "hello@makeyourowncourse.com",
  commission: 20,
  currency: "INR",
  allowSignups: true,
  autoApproveCourses: false,
  autoApproveTeachers: false,
  maintenanceMode: false,
  emailNotifications: true,
};

export const initialContactMessages = [
  { id: 1, name: "Kavya Nair", email: "kavya@example.com", subject: "Group discount", message: "Do you offer discounts for a team of 10 learners?", date: "2026-10-22", read: false },
  { id: 2, name: "Rahul Verma", email: "rahul@example.com", subject: "Become an instructor", message: "I'd like to teach Flutter. How do I apply?", date: "2026-10-19", read: true },
];

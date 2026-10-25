# Make Your Own Course (MYOC)

An online learning platform frontend built with **React 19**, **Vite**, **Tailwind CSS v4** and **React Router 7**.

It has four parts:

| Part | URL | Who can open it |
| --- | --- | --- |
| Public website | `/`, `/courses`, `/courses/:id`, `/about`, `/contact` ... | Everyone |
| Student panel | `/student/...` | Students (and super admin) |
| Teacher panel | `/teacher/...` | Teachers (and super admin) |
| Super admin panel | `/admin/...` | Admin only |

## Getting started

```bash
npm install
cp .env.example .env   # then edit the values
npm run dev
```

### Login and signup (fake, frontend-only)

Login and signup work **without a backend**. Accounts are saved in the browser
(`localStorage`) by `src/utils/fakeAuth.js`, and every new account appears in **Admin > Users**,
where the admin can block it, approve it or change its role.

| Role | Email | Password |
| --- | --- | --- |
| Student | student@myoc.dev | demo123 |
| Teacher | teacher@myoc.dev | demo123 |
| Super admin | admin@myoc.dev | demo123 |

- New students are logged in right after signing up.
- New teachers wait for admin approval (unless "Auto-approve teachers" is on in Platform Settings).
- "Forgot password" resets the password to `demo123`.

⚠️ Fake auth is only for demos: anyone can open the browser storage. When the backend is ready,
replace the functions in `fakeAuth.js` with API calls.

## Folder structure

```
src/
├── components/
│   ├── common/    # Shared UI: PanelLayout (sidebar + topbar), Modal, Button, Toast, StatCard...
│   ├── public/    # Website parts: Navbar, Footer, CourseCard, Home sections
│   ├── student/   # StudentLayout + student-only pieces
│   ├── teacher/   # TeacherLayout + teacher-only pieces
│   └── admin/     # AdminLayout, DataTable, IconButton
├── pages/
│   ├── public/    # Home, Courses, CourseDetails, Login, Signup...
│   ├── student/   # Dashboard, MyCourses, CoursePlayer, Assessments...
│   ├── teacher/   # TeacherDashboard, CreateCourse, Earnings...
│   └── admin/     # AdminDashboard, Users, Courses, Payments...
├── data/          # Demo data (courses, users, payments...) and storage keys
├── hooks/         # useAuth, useLocalStorage, useCourses, usePlatformData
├── utils/         # Auth helpers, formatting, file downloads
└── Routes/        # All routes (lazy loaded) with role protection
```

All three panels use the same `PanelLayout`, so they look and behave the same.
Each panel only defines its menu in its `*Layout.jsx` file.

## How data works right now

All data (including login and signup) is demo data saved in the
browser (`localStorage`) through small hooks in `src/hooks/`, so the whole app is clickable
while the backend is being built:

- A teacher creates a course -> it is **Pending** -> the admin approves it -> it appears on the website.
- A student enrolls -> the course shows in **My Courses** -> the payment shows in **Admin > Payments**.
- Contact form messages arrive in **Admin > Messages**; admin announcements show on dashboards.

To connect the backend later, replace the hook for that data (for example `useCourses`)
with API calls. The pages do not need to change.

Admin > Platform Settings has a **Reset demo data** button.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

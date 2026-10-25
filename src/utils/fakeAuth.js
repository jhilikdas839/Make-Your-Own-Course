// Fake (frontend-only) accounts for login and signup.
// Users live in the same list the super admin manages (Admin > Users),
// and passwords are kept in a separate map in localStorage.
// ⚠️ This is for demos only. Real apps must check passwords on a backend.
import { STORAGE_KEYS } from "../data/keys";
import { initialUsers, initialPlatformSettings } from "../data/platformData";

export const DEMO_PASSWORD = "demo123";
const PASSWORDS_KEY = "myoc_passwords";

const read = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  // Lets useLocalStorage hooks on the page refresh (e.g. the admin users table).
  window.dispatchEvent(new CustomEvent("myoc-storage", { detail: key }));
};

const normalise = (email) => email.trim().toLowerCase();

const getUsers = () => read(STORAGE_KEYS.users, initialUsers);

// Every seeded demo user can log in with DEMO_PASSWORD.
const getPassword = (email) => {
  const saved = read(PASSWORDS_KEY, {});
  if (saved[email]) return saved[email];
  return initialUsers.some((user) => user.email === email) ? DEMO_PASSWORD : null;
};

const toSessionUser = (user) => ({ id: user.id, name: user.name, email: user.email, role: user.role });

/** Returns { user } on success or { error } with a message to show. */
export function fakeLogin(email, password) {
  const key = normalise(email);
  const user = getUsers().find((item) => item.email.toLowerCase() === key);

  if (!user || getPassword(user.email) !== password) {
    return { error: "Wrong email or password." };
  }
  if (user.status === "Blocked") {
    return { error: "This account has been blocked. Please contact support." };
  }
  if (user.status === "Pending") {
    return { error: "Your teacher account is waiting for admin approval." };
  }
  return { user: toSessionUser(user) };
}

/** Creates a new account. Returns { user, pending } or { error }. */
export function fakeSignup({ name, email, password, role }) {
  const settings = read(STORAGE_KEYS.platformSettings, initialPlatformSettings);
  if (!settings.allowSignups) {
    return { error: "New sign-ups are paused right now. Please try again later." };
  }

  const key = normalise(email);
  const users = getUsers();
  if (users.some((item) => item.email.toLowerCase() === key)) {
    return { error: "An account with this email already exists. Please log in." };
  }

  const pending = role === "teacher" && !settings.autoApproveTeachers;
  const user = {
    id: Date.now(),
    name: name.trim(),
    email: key,
    role,
    status: pending ? "Pending" : "Active",
    joined: new Date().toISOString().slice(0, 10),
    courses: 0,
  };

  write(STORAGE_KEYS.users, [user, ...users]);
  write(PASSWORDS_KEY, { ...read(PASSWORDS_KEY, {}), [key]: password });
  return { user: toSessionUser(user), pending };
}

/** Changes the password of an existing account. Returns { error } on failure. */
export function fakeChangePassword(email, currentPassword, newPassword) {
  const key = normalise(email);
  if (getPassword(key) !== currentPassword) {
    return { error: "Your current password is wrong." };
  }
  write(PASSWORDS_KEY, { ...read(PASSWORDS_KEY, {}), [key]: newPassword });
  return {};
}

/** Pretend "forgot password": resets the password to the demo password. */
export function fakeResetPassword(email) {
  const key = normalise(email);
  const exists = getUsers().some((item) => item.email.toLowerCase() === key);
  if (exists) write(PASSWORDS_KEY, { ...read(PASSWORDS_KEY, {}), [key]: DEMO_PASSWORD });
  return exists;
}

import { STORAGE_KEYS } from "../data/keys";

export const API_URL =
  import.meta.env.VITE_API_URL || "https://makeyourowncoursbackend.onrender.com";

export const ROLE_HOME = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};

// Demo accounts let you open every panel without the backend.
// They only show when VITE_ENABLE_DEMO_LOGIN=true (see .env.example).
export const DEMO_USERS = {
  student: { name: "John Smith", email: "student@myoc.dev", role: "student" },
  teacher: { name: "John Doe", email: "teacher@myoc.dev", role: "teacher" },
  admin: { name: "Super Admin", email: "admin@myoc.dev", role: "admin" },
};

// Password for all demo accounts (only works when demo login is enabled).
export const DEMO_PASSWORD = "demo123";

export const findDemoUser = (email, password) =>
  password === DEMO_PASSWORD
    ? Object.values(DEMO_USERS).find((user) => user.email === email.trim().toLowerCase())
    : undefined;

export const isDemoLoginEnabled =
  import.meta.env.VITE_ENABLE_DEMO_LOGIN === "true";

function storageFor(remember) {
  return remember ? localStorage : sessionStorage;
}

export function saveSession({ token, user }, remember = true) {
  clearSession();
  const store = storageFor(remember);
  store.setItem(STORAGE_KEYS.token, token);
  store.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  window.dispatchEvent(new Event("myoc-auth"));
}

export function getSession() {
  const token =
    localStorage.getItem(STORAGE_KEYS.token) ||
    sessionStorage.getItem(STORAGE_KEYS.token);
  const rawUser =
    localStorage.getItem(STORAGE_KEYS.user) ||
    sessionStorage.getItem(STORAGE_KEYS.user);

  if (!token || !rawUser) return null;

  try {
    return { token, user: JSON.parse(rawUser) };
  } catch {
    return null;
  }
}

export function updateSessionUser(changes) {
  const session = getSession();
  if (!session) return;
  const store = localStorage.getItem(STORAGE_KEYS.token) ? localStorage : sessionStorage;
  store.setItem(STORAGE_KEYS.user, JSON.stringify({ ...session.user, ...changes }));
  window.dispatchEvent(new Event("myoc-auth"));
}

export function clearSession() {
  [localStorage, sessionStorage].forEach((store) => {
    store.removeItem(STORAGE_KEYS.token);
    store.removeItem(STORAGE_KEYS.user);
  });
  window.dispatchEvent(new Event("myoc-auth"));
}

export function getInitials(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "U"
  );
}

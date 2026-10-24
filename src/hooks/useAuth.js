import { useEffect, useState } from "react";
import { getSession } from "../utils/auth";

// Returns the current session ({ token, user }) or null, and updates on login/logout.
export default function useAuth() {
  const [session, setSession] = useState(getSession);

  useEffect(() => {
    const refresh = () => setSession(getSession());
    window.addEventListener("myoc-auth", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("myoc-auth", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return session;
}

// The logged-in user, with a safe fallback (avoids crashes during logout).
export function useCurrentUser() {
  const session = useAuth();
  return session?.user || { name: "Guest", email: "", role: "" };
}

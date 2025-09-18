import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });

  function login({ token: t, user: u }) {
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setToken("");
    setUser(null);
    // Optional: hard redirect to login
    window.location.replace("/login");
  }

  const value = useMemo(() => ({ token, user, login, logout, isAuthed: !!token }), [token, user]);

  // Keep state in sync across tabs
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "auth_token" || e.key === "auth_user") {
        const t = localStorage.getItem("auth_token") || "";
        const u = localStorage.getItem("auth_user");
        setToken(t);
        setUser(u ? JSON.parse(u) : null);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

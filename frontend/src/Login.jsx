import { useState } from "react";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({})))?.message || "Login failed.";
        throw new Error(msg);
      }
      const data = await res.json(); // { token, user }
      // Store token for later API calls
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      if (onSuccess) onSuccess(data);
      // Basic redirect—adjust route as needed
      window.location.href = "/dashboard";
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>Sign in</h1>

        {err && <div style={styles.error} role="alert">{err}</div>}

        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Password
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={styles.input}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              style={styles.showBtn}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <button type="submit" disabled={loading} style={styles.submit}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p style={styles.help}>
          Don’t have an account? <a href="/signup">Create one</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    display: "grid",
    gap: 14,
  },
  title: { margin: 0, fontSize: 28, color: "#111827" },
  label: { display: "grid", gap: 6, fontSize: 14, color: "#374151" },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
  },
  showBtn: {
    position: "absolute",
    right: 10,
    top: 8,
    padding: "6px 8px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    cursor: "pointer",
    fontSize: 12,
  },
  submit: {
    marginTop: 6,
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
  error: {
    background: "#fef2f2",
    color: "#991b1b",
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    border: "1px solid #fecaca",
  },
  help: { fontSize: 13, color: "#6b7280", textAlign: "center", marginTop: 4 },
};

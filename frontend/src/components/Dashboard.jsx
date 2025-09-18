import { useAuth } from "../contexts/AuthContext.jsx";
import LogoutButton from "./LogoutButton.jsx";

export default function Dashboard() {
  const { user, token } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email || "user"}!</p>
      <p>Your token (trimmed): {token?.slice(0, 12)}…</p>
      <LogoutButton />
      <hr />
      <h2>Test Protected API</h2>
      <button
        onClick={async () => {
          try {
            const res = await fetch("/api/data/items", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            alert("Success: " + JSON.stringify(json));
          } catch (e) {
            alert("Request failed: " + e.message);
          }
        }}
      >
        Call /api/data/items
      </button>
    </div>
  );
}

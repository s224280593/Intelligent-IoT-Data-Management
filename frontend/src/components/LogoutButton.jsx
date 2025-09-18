import { useAuth } from "../contexts/AuthContext.jsx";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        background: "#f3f4f6",
        cursor: "pointer",
        marginTop: 12
      }}
    >
      Log out
    </button>
  );
}

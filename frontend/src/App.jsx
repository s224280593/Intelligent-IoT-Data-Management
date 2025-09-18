import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

export default function App() {
  const { login, isAuthed } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthed ? "/dashboard" : "/login"} replace />}
      />
      <Route path="/login" element={<Login onSuccess={login} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
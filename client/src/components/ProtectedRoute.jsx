import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { token, user, authLoading } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

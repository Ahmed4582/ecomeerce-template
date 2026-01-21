import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const localToken = localStorage.getItem("token");

  // Avoid flashing protected content while restoring auth state
  if (loading) return null;

  // If not logged in
  if (!isAuthenticated && !localToken) {
    return <Navigate to="/login" replace />;
  }

  // Allow access
  return <Outlet />;
};

export default ProtectedRoute;
